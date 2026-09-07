import test from 'node:test';
import assert from 'node:assert/strict';
import { composedDefinitions, executeComposed } from '../dist/composed.js';

// All upstreams are local fixtures. This suite never makes a network request.
function fixtureCall(handler) {
  const calls = [];
  const call = async (op, args) => {
    calls.push({ op, args: structuredClone(args) });
    return handler(op, args);
  };
  return { calls, call };
}
function ledger(result, requested, succeeded, failed = []) {
  assert.deepEqual(result.coverage, { requested, succeeded, failed });
  assert.equal(result.billing.count, succeeded);
  assert.equal(result.billing.calls.length, succeeded);
  for (const entry of result.billing.calls) {
    assert.deepEqual(Object.keys(entry).sort(), ['ms', 'op']);
    assert.ok(Number.isInteger(entry.ms) && entry.ms >= 0);
  }
}
const emptyPost = {
  code: null, caption: null, taken_at: null, media_type: null,
  like_count: null, comment_count: null, play_count: null, owner: null,
  image_url: null, video_url: null, video_duration: null, carousel_count: null,
};

test('definitions advertise all four tools, defaults, nullable inputs and annotations', () => {
  assert.deepEqual(composedDefinitions.map(d => d.name), [
    'twitter_stock_pulse', 'instagram_posts_digest', 'instagram_profile_digest', 'edinet_filings_digest',
  ]);
  for (const d of composedDefinitions) {
    assert.deepEqual(d.annotations, {
      readOnlyHint: true, destructiveHint: false,
      idempotentHint: d.name === 'edinet_filings_digest', openWorldHint: true,
    });
    assert.equal(d.inputSchema.type, 'object');
    assert.ok(d.description.length > 100);
  }
  assert.equal(composedDefinitions[0].inputSchema.properties.max_tickers.default, 5);
  assert.equal(composedDefinitions[0].inputSchema.properties.since.default, '7d');
  assert.equal(composedDefinitions[0].inputSchema.properties.include_news.default, false);
  assert.deepEqual(composedDefinitions[1].inputSchema.required, ['handle']);
  assert.equal(composedDefinitions[1].inputSchema.properties.next_max_id.default, null);
  assert.equal(composedDefinitions[3].inputSchema.properties.listed_only.default, false);
  assert.deepEqual(composedDefinitions[3].inputSchema.properties.doc_type_code.anyOf, [{ type: 'string' }, { type: 'null' }]);
});

test('posts preserve order, complete captions, zero values and largest media, without mutating input', async () => {
  const caption = '日本語 🚀\n'.repeat(1000);
  const raw = {
    items: [{
      code: 'first', caption: { text: caption }, taken_at: 123, media_type: 8,
      like_count: 0, comment_count: 2, play_count: 3, user: { username: 'nasa' },
      image_versions2: { candidates: [
        { width: 1000, height: 10, url: 'wide' },
        { width: 200, height: 200, url: 'largest' },
        { width: 200, height: 200, url: 'tie-loses' },
      ] },
      video_versions: [{ url: 'unsized' }, { width: 20, height: 30, url: 'video' }],
      video_duration: 0, carousel_media: [{ secret: 1 }, { secret: 2 }], internal: 'discard',
    }, {}, { code: 'last', caption: { text: '' }, carousel_media: [] }],
    next_max_id: 'cursor-2', more_available: false,
  };
  const before = structuredClone(raw);
  const mock = fixtureCall(() => raw);
  const out = await executeComposed('instagram_posts_digest', { handle: 'nasa', next_max_id: 'cursor-1' }, mock.call);
  assert.deepEqual(mock.calls, [{ op: 'get_instagram_user_posts', args: { handle: 'nasa', next_max_id: 'cursor-1' } }]);
  assert.deepEqual(out.posts, [{
    code: 'first', caption, taken_at: 123, media_type: 8, like_count: 0,
    comment_count: 2, play_count: 3, owner: 'nasa', image_url: 'largest',
    video_url: 'video', video_duration: 0, carousel_count: 2,
  }, emptyPost, { ...emptyPost, code: 'last', caption: '' }]);
  assert.equal(out.next_max_id, 'cursor-2');
  assert.equal(out.more_available, false);
  assert.deepEqual(raw, before);
  ledger(out, 1, 1);
});

test('posts omit empty cursors, keep absent fields as null and select first zero-area candidate', async () => {
  for (const next_max_id of [undefined, null, '']) {
    const mock = fixtureCall(() => ({ items: [{ image_versions2: { candidates: [{ url: 'first' }, { url: 'second' }] } }] }));
    const out = await executeComposed('instagram_posts_digest', { handle: 'x', next_max_id }, mock.call);
    assert.deepEqual(mock.calls[0].args, { handle: 'x' });
    assert.deepEqual(out.posts, [{ ...emptyPost, image_url: 'first' }]);
    assert.equal(out.next_max_id, null);
    assert.equal(out.more_available, null);
  }
});

test('profile unwraps data.user, flattens counts, projects links and timeline captions', async () => {
  const raw = { data: { user: {
    username: 'nasa', full_name: 'NASA', id: '12345678901234567890', biography: '🌌\nFull bio', external_url: '',
    bio_links: [{ title: 'Home', url: 'https://example.com', lynx_url: 'tracking' }, {}],
    edge_followed_by: { count: 0 }, edge_follow: { count: 12 },
    highlight_reel_count: 0, is_verified: true, is_private: false,
    is_business_account: false, is_professional_account: true,
    category_name: '', category: 'Science', profile_pic_url_hd: '', profile_pic_url: 'fallback',
    edge_owner_to_timeline_media: { count: 7, edges: [
      {}, { node: null }, { node: {} }, { node: {
        shortcode: 'A', edge_media_to_caption: { edges: [{ node: { text: 'all\n文字' } }, { node: { text: 'not used' } }] },
        is_video: false, edge_liked_by: { count: 0 }, edge_media_to_comment: { count: 2 },
        taken_at_timestamp: 42, video_view_count: 0, display_url: 'image', internal: 'drop',
      } }, { node: { shortcode: 'B' } },
    ] },
  } } };
  const mock = fixtureCall(() => raw);
  const out = await executeComposed('instagram_profile_digest', { handle: 'nasa' }, mock.call);
  assert.deepEqual(mock.calls, [{ op: 'get_instagram_profile', args: { handle: 'nasa' } }]);
  assert.deepEqual(out.profile, {
    username: 'nasa', full_name: 'NASA', id: '12345678901234567890', biography: '🌌\nFull bio', external_url: '',
    bio_links: [{ title: 'Home', url: 'https://example.com' }, { title: null, url: null }],
    followers: 0, following: 12, posts_count: 7, highlight_reel_count: 0,
    is_verified: true, is_private: false, is_business_account: false, is_professional_account: true,
    category: 'Science', profile_pic_url: 'fallback', recent_posts: [
      { shortcode: 'A', caption: 'all\n文字', is_video: false, like_count: 0, comment_count: 2, taken_at: 42, video_view_count: 0, display_url: 'image' },
      { shortcode: 'B', caption: null, is_video: null, like_count: null, comment_count: null, taken_at: null, video_view_count: null, display_url: null },
    ],
  });
  ledger(out, 1, 1);
});

test('empty successful responses are successful empty digests, with explicit nulls', async () => {
  for (const name of ['instagram_posts_digest', 'instagram_profile_digest', 'edinet_filings_digest']) {
    const out = await executeComposed(name, { handle: 'empty', date: '2026-08-14' }, async () => ({}));
    ledger(out, 1, 1);
    if (name === 'instagram_posts_digest') assert.deepEqual(out.posts, []);
    if (name === 'edinet_filings_digest') {
      assert.deepEqual(out.filings, []);
      assert.equal(out.total_filings, 0);
      assert.equal(out.returned, 0);
    }
    if (name === 'instagram_profile_digest') {
      assert.deepEqual(out.profile.recent_posts, []);
      assert.deepEqual(out.profile.bio_links, []);
      for (const [key, value] of Object.entries(out.profile)) {
        if (!['recent_posts', 'bio_links'].includes(key)) assert.equal(value, null, key);
      }
    }
  }
});

test('EDINET projects exactly six fields and applies only exact caller filters', async () => {
  const results = [
    { docID: 'A', filerName: '日本株式会社', secCode: '00000', docTypeCode: '120', docDescription: '有価証券報告書\n全文', submitDateTime: '2026-08-14 12:00', JCN: 'drop' },
    { docID: 'B', secCode: '', docTypeCode: '120' },
    { docID: 'C', secCode: '12340', docTypeCode: '350' },
    { docID: 'D', secCode: null, docTypeCode: 120 },
    {},
  ];
  for (const [filters, ids] of [
    [{}, ['A', 'B', 'C', 'D', null]],
    [{ doc_type_code: '120' }, ['A', 'B']],
    [{ listed_only: true }, ['A', 'C']],
    [{ listed_only: true, doc_type_code: '120' }, ['A']],
    [{ doc_type_code: '' }, []],
    [{ doc_type_code: null }, ['A', 'B', 'C', 'D', null]],
  ]) {
    const mock = fixtureCall(() => ({ results }));
    const out = await executeComposed('edinet_filings_digest', { date: '2026-08-14', ...filters }, mock.call);
    assert.deepEqual(mock.calls, [{ op: 'get_edinet_documents', args: { date: '2026-08-14', type: '2' } }]);
    assert.deepEqual(out.filings.map(f => f.docID), ids);
    assert.equal(out.total_filings, 5);
    assert.equal(out.returned, ids.length);
    for (const filing of out.filings) assert.deepEqual(Object.keys(filing), ['docID', 'filerName', 'secCode', 'docTypeCode', 'docDescription', 'submitDateTime']);
    if (ids.includes('A')) {
      assert.equal(out.filings[0].filerName, results[0].filerName);
      assert.equal(out.filings[0].docDescription, results[0].docDescription);
    }
    ledger(out, 1, 1);
  }
});

test('stock pulse counts each symbol once per tweet, caps by mentions and retains raw quote/news', async () => {
  const tweets = [
    { text: '$TSLA $TSLA $MSFT $USD $BTC $AI $CEO $IPO $TOOLONG $ABC1 $ABC_ $ABCé $tsla', untouched: true },
    { text: '$TSLA $MSFT' }, { text: '$TSLA $GOOG' }, { text: null }, {},
  ];
  const mock = fixtureCall((op, args) => {
    if (op === 'get_twitter_tweet_advanced_search') return { tweets };
    if (op === 'get_financial_news') return { news: [{ ticker: args.ticker, full: true }] };
    return { snapshot: { ticker: args.ticker, price: 123 }, extra: true };
  });
  const out = await executeComposed('twitter_stock_pulse', { topic: 'tech', since: '2d', max_tickers: 2, include_news: true }, mock.call);
  assert.deepEqual(mock.calls, [
    { op: 'get_twitter_tweet_advanced_search', args: { query: 'tech since:2d', queryType: 'Top' } },
    { op: 'get_financial_prices_snapshot', args: { ticker: 'TSLA' } },
    { op: 'get_financial_prices_snapshot', args: { ticker: 'MSFT' } },
    { op: 'get_financial_news', args: { ticker: 'TSLA', limit: 5 } },
    { op: 'get_financial_news', args: { ticker: 'MSFT', limit: 5 } },
  ]);
  assert.strictEqual(out.tweets, tweets);
  assert.deepEqual(out.tickers, ['TSLA', 'MSFT'].map((symbol, i) => ({
    symbol, mentions: 3 - i, quote: { snapshot: { ticker: symbol, price: 123 }, extra: true },
    news: [{ ticker: symbol, full: true }],
  })));
  ledger(out, 5, 5);
});

test('stock caps retain Python zero/negative slice behavior and defaults', async () => {
  for (const [max_tickers, expected] of [[undefined, 5], [0, 0], [-1, 5], [100, 6]]) {
    const mock = fixtureCall(op => op === 'get_twitter_tweet_advanced_search'
      ? { tweets: ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF'].map(s => ({ text: `$${s}` })) } : {});
    const out = await executeComposed('twitter_stock_pulse', { topic: 't', ...(max_tickers === undefined ? {} : { max_tickers }) }, mock.call);
    assert.equal(out.since, '7d');
    assert.equal(out.tickers.length, expected);
    assert.ok(out.tickers.every(t => t.news === null));
    ledger(out, 1 + expected, 1 + expected);
  }
});

test('stock with no valid cashtags makes only the search call even with news enabled', async () => {
  const mock = fixtureCall(() => ({ tweets: [{ text: '$USD $EUR $CNY $JPY $GBP $BTC $ETH $USDT $AI $CEO $IPO' }] }));
  const out = await executeComposed('twitter_stock_pulse', { topic: 'x', include_news: true }, mock.call);
  assert.deepEqual(out.tickers, []);
  ledger(out, 1, 1);
});

test('partial failures preserve successful symbols and bill only successes', async () => {
  const mock = fixtureCall((op, args) => {
    if (op === 'get_twitter_tweet_advanced_search') return { tweets: [{ text: '$AAA' }, { text: '$BBB' }] };
    if (op === 'get_financial_prices_snapshot' && args.ticker === 'AAA') throw Object.assign(new Error('limit'), { status: 429 });
    if (op === 'get_financial_news' && args.ticker === 'BBB') throw Object.assign(new Error('slow'), { code: 'ETIMEDOUT' });
    return op === 'get_financial_news' ? { news: ['article'] } : { price: 1 };
  });
  const out = await executeComposed('twitter_stock_pulse', { topic: 'x', include_news: true }, mock.call);
  assert.deepEqual(out.tickers, [
    { symbol: 'AAA', mentions: 1, quote: null, news: ['article'] },
    { symbol: 'BBB', mentions: 1, quote: { price: 1 }, news: [] },
  ]);
  ledger(out, 5, 3, [
    { op: 'get_financial_prices_snapshot', reason: 'rate_limited', status: 429 },
    { op: 'get_financial_news', reason: 'timeout' },
  ]);
});

test('all quote failures are still partial success when search succeeds', async () => {
  const out = await executeComposed('twitter_stock_pulse', { topic: 'x' }, async op => {
    if (op === 'get_twitter_tweet_advanced_search') return { tweets: [{ text: '$AAA' }] };
    throw Object.assign(new Error('down'), { status: 503 });
  });
  assert.equal(out.tickers[0].quote, null);
  ledger(out, 2, 1, [{ op: 'get_financial_prices_snapshot', reason: 'upstream_5xx', status: 503 }]);
});

test('single-source and search failures throw classified errors with status/code without raw unknown error text', async () => {
  for (const [name, op] of [
    ['instagram_posts_digest', 'get_instagram_user_posts'],
    ['instagram_profile_digest', 'get_instagram_profile'],
    ['edinet_filings_digest', 'get_edinet_documents'],
    ['twitter_stock_pulse', 'get_twitter_tweet_advanced_search'],
  ]) {
    for (const [status, reason] of [[400, 'bad_request'], [401, 'unauthorized'], [402, 'payment_required_or_bad_key'], [403, 'forbidden'], [404, 'not_found'], [418, 'http_418'], [429, 'rate_limited'], [503, 'upstream_5xx']]) {
      const cause = Object.assign(new Error('subscription_required'), { status, code: 'upstream_error' });
      const mock = fixtureCall(() => { throw cause; });
      await assert.rejects(executeComposed(name, { handle: 'x', date: '2026-08-14', topic: 'x' }, mock.call), error => {
        assert.equal(error.name, 'SceneUpstreamError');
        assert.equal(error.status, status);
        assert.equal(error.code, 'upstream_error');
        assert.equal(error.cause, undefined);
        assert.ok(!error.message.includes('subscription_required'));
        assert.ok(error.message.startsWith(`HTTP error ${status}: ${reason}`));
        assert.ok(error.message.includes(`every upstream call failed: ${op}`));
        return true;
      });
      assert.equal(mock.calls.length, 1);
    }
  }
});

test('classifies numeric codes, timeouts and connection errors and omits unknown error text', async () => {
  for (const [properties, reason] of [
    [{ code: 402 }, 'HTTP error 402: payment_required_or_bad_key'],
    [{ status: '503' }, 'HTTP error 503: upstream_5xx'],
    [{ name: 'TimeoutError' }, 'timeout'],
    [{ code: 'UND_ERR_CONNECT_TIMEOUT' }, 'timeout'],
    [{ code: 'ECONNRESET' }, 'ECONNRESET'],
    [{}, 'Error'],
  ]) {
    await assert.rejects(executeComposed('instagram_profile_digest', { handle: 'x' }, async () => {
      throw Object.assign(new Error('z'.repeat(1000)), properties);
    }), error => error.message.startsWith(reason) && !error.message.includes('z'.repeat(401)));
  }
});

test('fan-out is bounded at five, preserves symbol order and finishes quotes before news', async () => {
  const symbols = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG'];
  let active = 0, peak = 0, completedQuotes = 0;
  const out = await executeComposed('twitter_stock_pulse', { topic: 'x', max_tickers: 7, include_news: true }, async (op, args) => {
    if (op === 'get_twitter_tweet_advanced_search') return { tweets: symbols.map(s => ({ text: `$${s}` })) };
    active++;
    peak = Math.max(peak, active);
    if (op === 'get_financial_news') assert.equal(completedQuotes, 7);
    await new Promise(resolve => setTimeout(resolve, args.ticker === 'AAA' ? 15 : 1));
    active--;
    if (op === 'get_financial_prices_snapshot') completedQuotes++;
    return op === 'get_financial_news' ? { news: [args.ticker] } : { ticker: args.ticker };
  });
  assert.equal(peak, 5);
  assert.deepEqual(out.tickers.map(t => t.symbol), symbols);
  assert.ok(out.tickers.every(t => t.quote.ticker === t.symbol && t.news[0] === t.symbol));
  ledger(out, 15, 15);
});

test('concurrent executions have independent ledgers; unknown tools never call upstream', async () => {
  const [good, bad] = await Promise.allSettled([
    executeComposed('instagram_posts_digest', { handle: 'good' }, async () => ({ items: [] })),
    executeComposed('instagram_profile_digest', { handle: 'bad' }, async () => { throw new Error('offline'); }),
  ]);
  assert.equal(good.status, 'fulfilled');
  ledger(good.value, 1, 1);
  assert.equal(bad.status, 'rejected');
  let called = false;
  await assert.rejects(executeComposed('unknown', {}, async () => { called = true; }), /Unknown composed tool/);
  assert.equal(called, false);
});

// Mirrors the parent's error constructor without importing its dependencies.
class ApiError extends Error {
  constructor(code, message, status, retryable = false) {
    super(message); Object.assign(this, { code, status, retryable });
  }
}
test('transport ApiError identity, code, status and retryability reach the parent intact', async () => {
  const failure = new ApiError('payment_required', 'AIsa returned HTTP 402.', 402, false);
  await assert.rejects(executeComposed('instagram_profile_digest', { handle: 'x' }, async () => { throw failure; }), error => error === failure);
  const out = await executeComposed('twitter_stock_pulse', { topic: 'x' }, async op => {
    if (op === 'get_twitter_tweet_advanced_search') return { tweets: [{ text: '$AAA' }] };
    throw new ApiError('timeout', 'Request interrupted or unavailable.', undefined, true);
  });
  ledger(out, 2, 1, [{ op: 'get_financial_prices_snapshot', reason: 'timeout' }]);
});

test('unknown message, body, name and code text cannot leak through failure reporting', async () => {
  const secret = 'Bearer secret-token';
  const fail = () => { throw Object.assign(new Error(secret), { body: secret, code: secret, name: secret }); };
  await assert.rejects(executeComposed('instagram_profile_digest', { handle: 'x' }, fail), error => {
    assert.ok(!String(error).includes(secret));
    assert.ok(!JSON.stringify(error).includes(secret));
    assert.equal(error.cause, undefined);
    return true;
  });
  const out = await executeComposed('twitter_stock_pulse', { topic: 'x' }, async op => {
    if (op === 'get_twitter_tweet_advanced_search') return { tweets: [{ text: '$AAA' }] };
    return fail();
  });
  ledger(out, 2, 1, [{ op: 'get_financial_prices_snapshot', reason: 'Error' }]);
  assert.ok(!JSON.stringify(out).includes(secret));
});
