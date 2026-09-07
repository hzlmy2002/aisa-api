import './isolate-env.mjs';
import test, {before, after} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {Ajv} from 'ajv';
import YAML from 'yaml';
import {ApiClient, ApiError, buildRequest, validateArguments, safeError} from '../dist/api.js';
import {catalog, operations, routes} from '../dist/catalog.js';

const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
const contracts = read('../upstream/tool-contracts.json');
const operation = 'get_apollo_account_stages';
const key = 'sk-aisa-test-only-secret';
const originalFetch = globalThis.fetch;
before(() => { globalThis.fetch = () => { throw new Error('Unexpected real network request'); }; });
after(() => { globalThis.fetch = originalFetch; });
const errorCode = code => error => error instanceof ApiError && error.code === code;

test('all 575 original schemas compile; effective contracts differ only by transport Authorization removal', () => {
  assert.equal(Object.keys(contracts).length, 575);
  assert.equal(operations.size, 575);
  assert.equal(catalog.operations.length, 575);
  const ajv = new Ajv({strict: false, validateFormats: false});
  for (const [name, contract] of Object.entries(contracts)) {
    assert.doesNotThrow(() => ajv.compile(contract.inputSchema), `${name} input`);
    if (contract.outputSchema) assert.doesNotThrow(() => ajv.compile(contract.outputSchema), `${name} output`);
    const actual = operations.get(name);
    assert.ok(actual, name);
    const expectedSchema = structuredClone(contract.inputSchema);
    const expectedMap = structuredClone(contract.parameterMap);
    if (contract.parameterMap?.Authorization?.location === 'header') {
      assert.equal(contract.parameterMap.Authorization.openapi_name, 'Authorization');
      delete expectedSchema.properties.Authorization;
      if (expectedSchema.required) expectedSchema.required = expectedSchema.required.filter(name => name !== 'Authorization');
      delete expectedMap.Authorization;
    }
    assert.deepEqual(actual.inputSchema, expectedSchema, `${name}.inputSchema`);
    assert.doesNotThrow(() => ajv.compile(actual.inputSchema), `${name} effective input`);
    for (const field of ['description', 'outputSchema', 'annotations', 'servers']) {
      assert.deepEqual(actual[field], contract[field], `${name}.${field}`);
    }
    if (actual.kind === 'atomic') {
      assert.deepEqual(actual.parameterMap, expectedMap, `${name} catalog parameterMap`);
      assert.deepEqual(routes[name].parameterMap, expectedMap, `${name} route parameterMap`);
      assert.ok(routes[name].parameters.every(p => !(p.in === 'header' && /^authorization$/i.test(p.name))), `${name} route parameters`);
    }
  }
});

test('server YAML selections exactly match catalog memberships and atomic routes', () => {
  const selected = new Map();
  const slugs = [];
  for (const file of readdirSync(new URL('../upstream/servers/', import.meta.url)).filter(f => f.endsWith('.yaml'))) {
    const cfg = YAML.parse(readFileSync(new URL(`../upstream/servers/${file}`, import.meta.url), 'utf8'));
    slugs.push(cfg.slug);
    const names = new Set((cfg.composed ?? []).flatMap(group => group.tools));
    for (const include of cfg.include ?? []) {
      const spec = read(`../upstream/specs/${include.spec}`);
      const found = new Set();
      for (const [path, item] of Object.entries(spec.paths)) {
        for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
          const op = item[method];
          if (!op?.operationId || (include.operations !== '*' && !include.operations.includes(op.operationId))) continue;
          found.add(op.operationId);
          names.add(op.operationId);
          const base = new URL((op.servers ?? item.servers ?? spec.servers)?.[0]?.url ?? 'https://api.aisa.one/apis/v1');
          assert.equal(routes[op.operationId]?.path, base.pathname.replace(/\/$/, '') + path, op.operationId);
          assert.equal(routes[op.operationId]?.method, method.toUpperCase(), op.operationId);
        }
      }
      if (include.operations !== '*') assert.deepEqual([...found].sort(), [...include.operations].sort());
    }
    assert.deepEqual(catalog.operations.filter(op => op.servers.includes(cfg.slug)).map(op => op.name).sort(), [...names].sort(), cfg.slug);
    for (const name of names) selected.set(name, true);
  }
  assert.deepEqual([...selected.keys()].sort(), Object.keys(contracts).sort());
  assert.deepEqual(catalog.servers.map(s => s.slug).sort(), slugs.sort());
});

test('GET encodes path identifiers and repeated array query values without a body', () => {
  const {url, init} = buildRequest(routes.get_agentmail_inbox_threads, {inbox_id: 'a/b ?#雪', labels: ['a b', 'c&d'], ascending: false, limit: 0, page_token: null});
  assert.equal(url.origin, 'https://api.aisa.one');
  assert.equal(url.pathname, '/apis/v1/agentmail/inboxes/a%2Fb%20%3F%23%E9%9B%AA/threads');
  assert.deepEqual(url.searchParams.getAll('labels'), ['a b', 'c&d']);
  assert.equal(url.searchParams.get('ascending'), 'false');
  assert.equal(url.searchParams.get('limit'), '0');
  assert.equal(url.searchParams.has('page_token'), false);
  assert.equal(init.method, 'GET');
  assert.equal(init.body, undefined);
});

test('flattened POST arguments form an object; array-body POST stays an array', () => {
  const args = {inbox_id: 'inbox/1', to: ['a@example.test'], subject: 'hello', text: '', headers: {'X-Test': 'value'}};
  const object = buildRequest(routes.post_agentmail_inbox_message_send, args);
  assert.equal(object.init.method, 'POST');
  assert.equal(object.init.headers['Content-Type'], 'application/json');
  const {inbox_id, ...body} = args;
  assert.deepEqual(JSON.parse(object.init.body), body);
  assert.equal(object.url.search, '');
  const tasks = [{keywords: ['test'], location_code: 2840, language_code: 'en'}];
  const array = buildRequest(routes.post_dataforseo_ai_keyword_volume_live, validateArguments('post_dataforseo_ai_keyword_volume_live', {body: tasks}));
  assert.deepEqual(JSON.parse(array.init.body), tasks);
});

test('query serialization respects OpenAPI styles and renamed parameters', () => {
  for (const [style, explode, expected] of [['form', true, ['a', 'b']], ['form', false, ['a,b']], ['spaceDelimited', false, ['a b']], ['pipeDelimited', false, ['a|b']]]) {
    const route = {method: 'GET', path: '/test', parameterMap: {values: {location: 'query', openapi_name: 'items[]'}}, parameters: [{in: 'query', name: 'items[]', style, explode}]};
    assert.deepEqual(buildRequest(route, {values: ['a', 'b']}).url.searchParams.getAll('items[]'), expected);
  }
});

test('validation rejects wrong shapes, unknown fields, missing requirements and nested invalid bodies', () => {
  for (const value of [null, [], 'text', 1]) assert.throws(() => validateArguments(operation, value), errorCode('invalid_input'));
  assert.throws(() => validateArguments(operation, {typo: true}), errorCode('invalid_input'));
  assert.throws(() => validateArguments('not-an-operation', {}), errorCode('unknown_operation'));
  assert.throws(() => validateArguments('get_apollo_organizations_organization_id_job_postings', {}), errorCode('invalid_input'));
  assert.throws(() => validateArguments('post_dataforseo_ai_keyword_volume_live', {body: [{keywords: [42]}]}), errorCode('invalid_input'));
  const input = {body: [{keywords: ['test'], location_code: 2840, language_code: 'en'}]};
  const result = validateArguments('post_dataforseo_ai_keyword_volume_live', input);
  result.body[0].keywords.push('another');
  assert.deepEqual(input.body[0].keywords, ['test']);
});

test('request construction rejects missing paths, dot segments and credential overrides', () => {
  for (const args of [{}, {thread_id: '.'}, {thread_id: '..'}, {thread_id: 'ok', Authorization: 'evil'}, {thread_id: 'ok', unknown: 1}]) {
    assert.throws(() => buildRequest(routes.get_agentmail_thread, args), errorCode('invalid_input'));
  }
});

test('client attaches credentials, zero price cap and cancellation signal; preserves provider envelopes', async () => {
  const payload = {data: [1], error: {provider: 'body-level'}, meta: {credits: 4}};
  let calls = 0;
  const client = new ApiClient({key: ` ${key} `, resolveToken: () => assert.fail('explicit key should win'), fetcher: async (url, init) => {
    calls++;
    assert.equal(url.origin, 'https://api.aisa.one');
    assert.equal(init.headers.get('Authorization'), `Bearer ${key}`);
    assert.equal(init.headers.get('X-AISA-Max-Price-USD'), '0');
    assert.equal(init.headers.get('Accept'), 'application/json');
    assert.equal(init.redirect, 'error');
    assert.ok(init.signal instanceof AbortSignal);
    return Response.json(payload);
  }});
  assert.deepEqual(await client.execute(operation, {}, {maxPriceUsd: 0}), payload);
  assert.equal(calls, 1);
});

test('arrays, empty responses, text and malformed JSON have distinct behavior', async () => {
  for (const [response, expected] of [[Response.json([1, 2]), [1, 2]], [new Response(null, {status: 204}), null], [new Response('hello', {headers: {'content-type': 'text/plain'}}), {text: 'hello', content_type: 'text/plain'}]]) {
    assert.deepEqual(await new ApiClient({key, fetcher: async () => response}).execute(operation, {}), expected);
  }
  await assert.rejects(new ApiClient({key, fetcher: async () => new Response('{bad', {headers: {'content-type': 'application/json'}})}).execute(operation, {}), errorCode('invalid_response'));
});

test('HTTP errors map status/retryability, redact secrets, and never retry', async () => {
  for (const [status, code] of [[400, 'invalid_input'], [401, 'unauthorized'], [402, 'payment_required'], [403, 'forbidden'], [404, 'not_found'], [409, 'conflict'], [429, 'rate_limited'], [503, 'upstream_error']]) {
    let calls = 0;
    const client = new ApiClient({key, fetcher: async () => { calls++; return new Response(`${key} Bearer other-secret sk-aisa-another-secret`, {status}); }});
    await assert.rejects(client.execute(operation, {}), error => {
      assert.equal(error.code, code);
      assert.equal(error.status, status);
      assert.equal(error.retryable, status === 429 || status >= 500);
      assert.doesNotMatch(error.message, /test-only-secret|other-secret|another-secret/);
      return true;
    });
    assert.equal(calls, 1);
  }
  await assert.rejects(new ApiClient({key, fetcher: async () => new Response('estimated_price_exceeds_max_price', {status: 402})}).execute(operation, {}), errorCode('cost_limit_exceeded'));
  assert.equal(safeError(new Error(key)).message.includes(key), false);
});

test('credential failures and invalid caps stop before fetch', async () => {
  const fetcher = () => assert.fail('must not fetch');
  await assert.rejects(new ApiClient({resolveToken: async () => undefined, fetcher}).execute(operation, {}), errorCode('missing_credentials'));
  await assert.rejects(new ApiClient({resolveToken: async () => {throw Error(key);}, fetcher}).execute(operation, {}), errorCode('authentication_required'));
  for (const maxPriceUsd of [-1, NaN, Infinity]) await assert.rejects(new ApiClient({key, fetcher}).execute(operation, {}, {maxPriceUsd}), errorCode('invalid_input'));
  const client = new ApiClient({resolveToken: async () => key, fetcher: async (_url, init) => {assert.equal(init.headers.get('Authorization'), `Bearer ${key}`); return Response.json({ok: true});}});
  assert.deepEqual(await client.execute(operation, {}), {ok: true});
});

test('network failure, timeout and in-flight cancellation are classified without retry', async () => {
  await assert.rejects(new ApiClient({key, fetcher: async () => {throw Error(key);}}).execute(operation, {}), errorCode('network_error'));
  for (const cancelled of [false, true]) {
    const controller = new AbortController();
    let calls = 0;
    const client = new ApiClient({key, fetcher: (_url, init) => new Promise((resolve, reject) => {
      calls++;
      init.signal.addEventListener('abort', () => reject(init.signal.reason), {once: true});
      if (cancelled) controller.abort();
    })});
    // Keep Node alive while AbortSignal.timeout's unref'd timer runs.
    const keepAlive = setInterval(() => {}, 1000);
    try { await assert.rejects(client.execute(operation, {}, {signal: controller.signal, timeoutMs: 15}), errorCode(cancelled ? 'cancelled' : 'timeout')); }
    finally { clearInterval(keepAlive); }
    assert.equal(calls, 1);
  }
});

test('oversized upstream error body is bounded and its stream cancelled', async () => {
  let cancelled = false;
  const response = new Response(new ReadableStream({pull(controller) {controller.enqueue(new Uint8Array(65537));}, cancel() {cancelled = true;}}), {status: 500});
  await assert.rejects(new ApiClient({key, fetcher: async () => response}).execute(operation, {}), errorCode('response_too_large'));
  assert.equal(cancelled, true);
});

test('original snapshot remains byte-for-byte unchanged with all 49 required Authorization schemas', () => {
  const bytes = readFileSync(new URL('../upstream/tool-contracts.json', import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), '542a6a1230ed9197eafecddbb34acf536ddf9e6a9ffa34808cfd80fd3b39f70c');
  const originals = Object.values(contracts).filter(c => c.inputSchema.required?.includes('Authorization'));
  assert.equal(originals.length, 49);
  for (const contract of originals) {
    assert.ok(contract.servers.includes('agentmail'));
    assert.equal(contract.inputSchema.properties.Authorization.type, 'string');
    assert.deepEqual(contract.parameterMap.Authorization, {location: 'header', openapi_name: 'Authorization'});
  }
});

test('AgentMail executes without an Authorization argument using configured transport credentials', async () => {
  const name = 'get_agentmail_thread';
  const args = validateArguments(name, {thread_id: 'fixture'});
  assert.deepEqual(args, {thread_id: 'fixture'});
  assert.equal(Object.hasOwn(operations.get(name).inputSchema.properties, 'Authorization'), false);
  let requests = 0;
  const client = new ApiClient({key, fetcher: async (url, init) => {
    requests++;
    assert.equal(url.pathname, '/apis/v1/agentmail/threads/fixture');
    assert.equal(url.search, '');
    assert.equal(init.body, undefined);
    assert.equal(init.headers.get('Authorization'), `Bearer ${key}`);
    return Response.json({id: 'fixture'});
  }});
  assert.deepEqual(await client.execute(name, args), {id: 'fixture'});
  for (const field of ['Authorization', 'authorization', 'api_key', 'key']) {
    const override = {...args, [field]: 'untrusted-value'};
    assert.throws(() => validateArguments(name, override), errorCode('invalid_input'));
    await assert.rejects(client.execute(name, override), errorCode('invalid_input'));
  }
  assert.equal(requests, 1);
});

test('buildRequest still rejects transport-owned headers even if a route maps them', () => {
  for (const name of ['Authorization', 'authorization', 'AUTHORIZATION', 'Host', 'Content-Length', 'Cookie']) {
    const route = {method: 'GET', path: '/test', parameterMap: {override: {location: 'header', openapi_name: name}}, parameters: [{in: 'header', name}]};
    assert.throws(() => buildRequest(route, {override: 'untrusted-value'}), errorCode('invalid_input'));
  }
});

test('pre-aborted requests use the same cancelled ApiError as in-flight cancellation', async () => {
  const client = new ApiClient({resolveToken: () => assert.fail('must not resolve credentials'), fetcher: () => assert.fail('must not fetch')});
  await assert.rejects(client.execute(operation, {}, {signal: AbortSignal.abort()}), errorCode('cancelled'));
});
