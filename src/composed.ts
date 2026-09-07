/** L1 compositions. The injected caller owns transport, auth, and request timeouts.
 * Arguments passed to it are flat operation parameters; results are parsed JSON.
 */
type Json = Record<string, any>;
type Call = (operationId: string, args: Json) => Promise<any>;

const annotations = {
  readOnlyHint: true, destructiveHint: false, idempotentHint: false, openWorldHint: true,
};

export const composedDefinitions = [
  {
    name: 'twitter_stock_pulse',
    description: "Assemble everything behind \"what is X saying about stocks right now\" in one call.\n\nSearches X/Twitter for a topic, extracts every $TICKER cashtag mentioned in the\nresults, then fetches a price snapshot for the most-mentioned symbols — optionally\nrecent company news too.\n\nUse this when you need the posts AND the market data behind them together. Doing it\nyourself means one search call, parsing cashtags, then one price call per symbol, then\njoining the results; this returns the joined bundle.\n\nReturns the raw tweets, per-symbol mention counts, price snapshots, a `coverage`\nblock saying which upstream sources succeeded or failed, and a `billing` block with\nthe calls made.\n\nIt does NOT rank, score, or interpret. `mentions` is a raw count, not a heat ranking —\nyou decide what \"hot\" means and what the numbers imply. If you only need the posts,\nuse `get_twitter_tweet_advanced_search`. If you already know the symbols, use\n`get_financial_prices_snapshot` directly.",
    inputSchema: {
      type: 'object', additionalProperties: false, properties: {
        topic: { type: 'string' }, since: { type: 'string', default: '7d' },
        max_tickers: { type: 'integer', default: 5 },
        include_news: { type: 'boolean', default: false },
      }, required: ['topic'],
    }, annotations: { ...annotations },
  },
  {
    name: 'instagram_posts_digest',
    description: "One page of a public account's timeline, projected down to what fits a context window.\n\nCalls the same upstream as `get_instagram_user_posts` and keeps, per post: code,\nfull caption text, taken_at, media_type, like/comment/play counts, owner, ONE\nimage URL and ONE video URL (the largest variant of each), video_duration, and\nthe carousel slide count. Measured: 632 KB raw becomes about 20 KB; nothing is\nsummarised and no post is dropped — every post and every caption byte survives,\nin upstream order.\n\nWhat does NOT survive: the other 9 resolution variants per image, dash manifests,\nand ~100 internal flag fields per post. If you need any of those — downloading\nevery resolution, building a player, forensic detail — call\n`get_instagram_user_posts` instead; it returns the upstream response untouched.\n\nPage with `next_max_id` from the previous response; `more_available` says whether\nanother page exists.",
    inputSchema: {
      type: 'object', additionalProperties: false, properties: {
        handle: { type: 'string' },
        next_max_id: { anyOf: [{ type: 'string' }, { type: 'null' }], default: null },
      }, required: ['handle'],
    }, annotations: { ...annotations },
  },
  {
    name: 'instagram_profile_digest',
    description: "A public profile as a flat card, projected from the same upstream as `get_instagram_profile`.\n\nKeeps: username, full_name, numeric id, biography, external_url, bio_links\n(title + url), follower/following/posts counts, verification and privacy flags,\ncategory, one profile picture URL, and the recent posts Instagram embeds in the\nprofile (shortcode, full caption, like/comment counts, taken_at, one display\nURL each). Measured: 380 KB raw becomes about 15 KB — the recent posts\nand their display URLs are most of it.\n\nCounts are flattened from their upstream wrappers: `followers` here is\n`data.user.edge_followed_by.count` there. The numeric `id` feeds\n`get_instagram_basic_profile`, which is the cheap (4.5 KB) per-id lookup for\nenriching many accounts.\n\nFor the untouched upstream response — every field, every wrapper — call\n`get_instagram_profile` instead.",
    inputSchema: {
      type: 'object', additionalProperties: false, properties: { handle: { type: 'string' } }, required: ['handle'],
    }, annotations: { ...annotations },
  },
  {
    name: 'edinet_filings_digest',
    description: "One day of Japanese EDINET filings as a scannable list, with the filtering upstream lacks.\n\nCalls the same upstream as `get_edinet_documents` (which measured 612 KB for one\nbusiness day, with no filter parameters at all) and keeps six fields per filing:\ndocID, filerName, secCode, docTypeCode, docDescription, submitDateTime. Filters\nrun only on what you pass: `doc_type_code` matches exactly (for example 120 for\nannual securities reports, 140 for quarterly, 160 for semi-annual, 350 for large\nshareholding reports), and `listed_only=true` keeps filings that carry a secCode\n— about two thirds of a typical day. Measured: 112 KB unfiltered, 73 KB with\nlisted_only, around 10 KB with a doc_type_code.\n\nReturns `filings` in upstream order plus `total_filings` (the day's full count)\nand `returned`, so a filtered view can never pass for the whole day. Each docID\nfeeds the REST download endpoint; the raw fourteen-field records live in\n`get_edinet_documents`.\n\n`date` is YYYY-MM-DD. It does NOT rank or select beyond your filters.",
    inputSchema: {
      type: 'object', additionalProperties: false, properties: {
        date: { type: 'string' },
        doc_type_code: { anyOf: [{ type: 'string' }, { type: 'null' }], default: null },
        listed_only: { type: 'boolean', default: false },
      }, required: ['date'],
    }, annotations: { ...annotations, idempotentHint: true },
  },
];

// Python JSON truthiness matters for empty nodes and secCode, and .get returns
// None for absent fields (which must remain explicit JSON nulls in projections).
function truthy(value: any): boolean {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === 'object') return Object.keys(value).length > 0;
  return Boolean(value);
}
function pick(value: Json, keys: string[]): Json {
  return Object.fromEntries(keys.map(key => [key, value[key] ?? null]));
}
function largest(candidates: Json[] | null | undefined): any {
  if (!candidates?.length) return null;
  const area = (c: Json) => (c.width || 0) * (c.height || 0);
  const best = candidates.reduce((best, c) => area(c) > area(best) ? c : best);
  return best.url ?? null;
}
function projectPost(item: Json): Json {
  return {
    ...pick(item, ['code']), caption: item.caption?.text ?? null,
    ...pick(item, ['taken_at', 'media_type', 'like_count', 'comment_count', 'play_count']),
    owner: item.user?.username ?? null,
    image_url: largest(item.image_versions2?.candidates),
    video_url: largest(item.video_versions), video_duration: item.video_duration ?? null,
    carousel_count: item.carousel_media?.length || null,
  };
}
function projectProfile(user: Json): Json {
  const timeline = user.edge_owner_to_timeline_media || {};
  return {
    ...pick(user, ['username', 'full_name', 'id', 'biography', 'external_url']),
    bio_links: (user.bio_links || []).map((b: Json) => pick(b, ['title', 'url'])),
    followers: user.edge_followed_by?.count ?? null,
    following: user.edge_follow?.count ?? null, posts_count: timeline.count ?? null,
    ...pick(user, ['highlight_reel_count', 'is_verified', 'is_private', 'is_business_account', 'is_professional_account']),
    category: (user.category_name || user.category) ?? null,
    profile_pic_url: (user.profile_pic_url_hd || user.profile_pic_url) ?? null,
    recent_posts: (timeline.edges || []).filter((e: Json) => truthy(e.node)).map(({ node: n }: Json) => ({
      shortcode: n.shortcode ?? null,
      caption: n.edge_media_to_caption?.edges?.[0]?.node?.text ?? null,
      is_video: n.is_video ?? null, like_count: n.edge_liked_by?.count ?? null,
      comment_count: n.edge_media_to_comment?.count ?? null,
      taken_at: n.taken_at_timestamp ?? null,
      video_view_count: n.video_view_count ?? null, display_url: n.display_url ?? null,
    })),
  };
}

// ApiError is owned by the injected transport. Preserve its identity without
// importing the API client (and its non-Node dependencies) into this module.
function isApiError(error: any): boolean {
  return error instanceof Error && error.constructor.name === 'ApiError';
}

const safeCodes = new Set([
  'unknown_operation', 'invalid_input', 'internal_error', 'authentication_required',
  'missing_credentials', 'response_too_large', 'unauthorized', 'payment_required',
  'forbidden', 'not_found', 'conflict', 'rate_limited', 'upstream_error',
  'cost_limit_exceeded', 'invalid_response', 'cancelled', 'timeout', 'network_error',
  'ECONNRESET', 'ECONNREFUSED', 'ENOTFOUND', 'EAI_AGAIN',
]);

function classify(error: any): { reason: string; status?: number } {
  const candidate = error?.status ?? error?.statusCode ?? error?.code;
  const status = Number(candidate);
  if (Number.isInteger(status) && status >= 400 && status <= 599) {
    const names: Record<number, string> = {
      400: 'bad_request', 401: 'unauthorized', 402: 'payment_required_or_bad_key',
      403: 'forbidden', 404: 'not_found', 429: 'rate_limited',
    };
    return { reason: names[status] ?? (status >= 500 ? 'upstream_5xx' : `http_${status}`), status };
  }
  const code = String(error?.code ?? '');
  const name = String(error?.name ?? '');
  if (/timeout/i.test(name) || /^(ETIMEDOUT|ESOCKETTIMEDOUT|UND_ERR_.*TIMEOUT)$/.test(code)) {
    return { reason: 'timeout' };
  }
  return { reason: safeCodes.has(code) ? code : ['Error', 'TypeError', 'RangeError'].includes(name) ? name : 'Error' };
}

class Ledger {
  private items: { op: string; ms: number }[] = [];
  private failures: { op: string; reason: string; status?: number }[] = [];
  private errors: any[] = [];

  async request(call: Call, op: string, args: Json): Promise<any> {
    const start = performance.now();
    try {
      const raw = await call(op, args);
      this.items.push({ op, ms: Math.round(performance.now() - start) });
      return raw;
    } catch (error) {
      const failure = { op, ...classify(error) };
      this.failures.push(failure);
      this.errors.push(error);
      return { _error: failure.reason };
    }
  }

  finish(): Json {
    if (!this.items.length && this.failures.length) {
      const first = this.failures[0];
      const cause = this.errors[0];
      // The API client has already sanitized its errors; retaining the instance
      // lets the parent keep code/status/retryable through its safeError wrapper.
      if (isApiError(cause)) throw cause;
      const head = first.status ? `HTTP error ${first.status}: ${first.reason}` : first.reason;
      const error = new Error(`${head} (every upstream call failed: ${this.failures.map(f => f.op).join(', ')})`);
      error.name = 'SceneUpstreamError';
      if (first.status !== undefined) Object.assign(error, { status: first.status });
      if (safeCodes.has(String(cause?.code))) Object.assign(error, { code: cause.code });
      throw error;
    }
    return {
      coverage: { requested: this.items.length + this.failures.length, succeeded: this.items.length, failed: this.failures },
      billing: { calls: this.items, count: this.items.length },
    };
  }
}

// Preserve order despite concurrent completion; at most five calls per fan-out.
async function gather(symbols: string[], request: (symbol: string) => Promise<any>): Promise<any[]> {
  const results = new Array(symbols.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(5, symbols.length) }, async () => {
    while (next < symbols.length) {
      const index = next++;
      results[index] = await request(symbols[index]);
    }
  }));
  return results;
}

export async function executeComposed(name: string, args: Record<string, any>, call: (operationId: string, args: Record<string, any>) => Promise<any>): Promise<any> {
  if (!composedDefinitions.some(def => def.name === name)) throw new Error(`Unknown composed tool: ${name}`);
  const ledger = new Ledger();
  const request = (op: string, params: Json) => ledger.request(call, op, params);
  if (name === 'twitter_stock_pulse') {
    const { topic, since = '7d', max_tickers = 5, include_news = false } = args;
    const search = await request('get_twitter_tweet_advanced_search', { query: `${topic} since:${since}`, queryType: 'Top' });
    const tweets = search.tweets || [];
    const excluded = new Set(['USD', 'EUR', 'CNY', 'JPY', 'GBP', 'BTC', 'ETH', 'USDT', 'AI', 'CEO', 'IPO']);
    const counts = new Map<string, number>();
    for (const tweet of tweets) {
      // Python's \b uses Unicode word characters; JavaScript's \b does not.
      const symbols = new Set<string>(Array.from((tweet.text || '').matchAll(/\$([A-Z]{1,5})(?![\p{L}\p{N}_])/gu), (m: any) => m[1]));
      for (const symbol of symbols) if (!excluded.has(symbol)) counts.set(symbol, (counts.get(symbol) || 0) + 1);
    }
    // Keep Python's slice behavior, including zero and negative caps. Equal
    // counts use first textual appearance; Python set iteration is unspecified.
    const symbols = [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)!).slice(0, max_tickers);
    const quotes = await gather(symbols, ticker => request('get_financial_prices_snapshot', { ticker }));
    const news = include_news ? await gather(symbols, ticker => request('get_financial_news', { ticker, limit: 5 })) : [];
    return {
      topic, since, tweets,
      tickers: symbols.map((symbol, i) => ({
        symbol, mentions: counts.get(symbol), quote: truthy(quotes[i]._error) ? null : quotes[i],
        news: include_news ? (truthy(news[i]._error) ? [] : news[i].news || []) : null,
      })), ...ledger.finish(),
    };
  }
  if (name === 'instagram_posts_digest') {
    const { handle, next_max_id } = args;
    const raw = await request('get_instagram_user_posts', { handle, ...(truthy(next_max_id) ? { next_max_id } : {}) });
    if (truthy(raw._error)) return { handle, posts: null, ...ledger.finish() };
    return { handle, posts: (raw.items || []).map(projectPost), next_max_id: raw.next_max_id ?? null, more_available: raw.more_available ?? null, ...ledger.finish() };
  }
  if (name === 'instagram_profile_digest') {
    const { handle } = args;
    const raw = await request('get_instagram_profile', { handle });
    if (truthy(raw._error)) return { handle, profile: null, ...ledger.finish() };
    return { handle, profile: projectProfile(raw.data?.user || {}), ...ledger.finish() };
  }
  const { date, doc_type_code = null, listed_only = false } = args;
  const raw = await request('get_edinet_documents', { date, type: '2' });
  if (truthy(raw._error)) return { date, filings: null, ...ledger.finish() };
  const results = raw.results || [];
  let filings = results.map((f: Json) => pick(f, ['docID', 'filerName', 'secCode', 'docTypeCode', 'docDescription', 'submitDateTime']));
  if (doc_type_code !== null) filings = filings.filter((f: Json) => f.docTypeCode === doc_type_code);
  if (listed_only) filings = filings.filter((f: Json) => truthy(f.secCode));
  return { date, total_filings: results.length, returned: filings.length, filings, ...ledger.finish() };
}
