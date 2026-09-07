import './isolate-env.mjs';
import test, {before, after} from 'node:test';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
import {InMemoryTransport} from '@modelcontextprotocol/sdk/inMemory.js';
import {createServer} from '../dist/server.js';
import {ApiClient, ApiError} from '../dist/api.js';
import {catalog, operations, moduleOperations} from '../dist/catalog.js';

const operation = 'get_apollo_account_stages';
const metaNames = ['search', 'get_details', 'use', 'batch_use', 'list_categories', 'search_skills', 'list_resources', 'read_resource'];
const originalFetch = globalThis.fetch;
before(() => {globalThis.fetch = () => {throw Error('Unexpected real network request');};});
after(() => {globalThis.fetch = originalFetch;});
const forbiddenApi = {execute: async () => assert.fail('local discovery must not execute upstream calls')};
const decode = result => {
  assert.equal(result.content[0].type, 'text');
  const data = JSON.parse(result.content[0].text);
  assert.deepEqual(result.structuredContent, data !== null && typeof data === 'object' && !Array.isArray(data) ? data : {result: data});
  return data;
};
async function connect(t, options = {}) {
  const server = createServer({api: forbiddenApi, ...options});
  const client = new Client({name: 'aisa-integration-test', version: '1.0.0'});
  t.after(async () => {await client.close(); await server.close();});
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);
  await client.connect(clientTransport);
  return client;
}
const call = (client, name, args = {}, options) => client.callTool({name, arguments: args}, undefined, options);

test('default MCP surface, search, details and category metadata are local and faithful', async t => {
  const client = await connect(t);
  assert.equal(client.getServerVersion().name, 'aisa-api');
  assert.ok(client.getServerCapabilities().resources);
  assert.match(client.getInstructions(), /max_price_usd/);
  const {tools} = await client.listTools();
  assert.deepEqual(tools.map(t => t.name), metaNames);
  for (const name of ['use', 'batch_use']) {
    assert.equal(tools.find(t => t.name === name).annotations.destructiveHint, true);
    assert.equal(tools.find(t => t.name === name).annotations.readOnlyHint, false);
  }
  assert.equal(tools.find(t => t.name === 'search').annotations.openWorldHint, false);
  const search = decode(await call(client, 'search', {query: operation, limit: 1}));
  assert.equal(search.backend, 'local');
  assert.equal(search.candidates.length, 1);
  assert.equal(search.candidates[0].operation_id, operation);
  assert.deepEqual(search.candidates[0].input_schema, operations.get(operation).inputSchema);
  const details = decode(await call(client, 'get_details', search.candidates[0].details_ref.arguments));
  const op = operations.get(operation);
  assert.equal(details.path, op.path);
  assert.equal(details.method, op.method);
  assert.equal(details.description, op.description);
  assert.deepEqual(details.arguments_schema, op.inputSchema);
  assert.deepEqual(details.response_schema, op.outputSchema ?? {});
  assert.deepEqual(details.annotations, op.annotations);
  assert.equal(details.price.amount, null);
  assert.equal(details.availability, 'unknown');
  const mixed = decode(await call(client, 'get_details', {operation_ids: [operation, 'nonexistent']}));
  assert.equal(mixed.success_count, 1);
  assert.equal(mixed.error_count, 1);
  assert.equal(mixed.results[1].error.code, 'unknown_operation');
  const categories = decode(await call(client, 'list_categories'));
  assert.equal(categories.operation_count, 575);
  for (const category of categories.categories) assert.equal(category.tool_count, moduleOperations(category.module, false).length);
  const scoped = decode(await call(client, 'search', {query: 'domain', category: 'seo', limit: 20}));
  const allowed = new Set(moduleOperations('seo', false).map(op => op.name));
  assert.ok(scoped.candidates.length > 0);
  assert.ok(scoped.candidates.every(c => allowed.has(c.operation_id)));
});

test('use validates original arguments and forwards cap/signal while preserving results', async t => {
  const calls = [];
  const client = await connect(t, {api: {execute: async (...args) => {calls.push(args); return {provider: {items: [1]}, meta: {cost: 0.01}};}}});
  const response = await call(client, 'use', {operation_id: operation, max_price_usd: 0});
  const result = decode(response);
  assert.equal(response.isError, undefined);
  assert.equal(result.successful, true);
  assert.equal(result.operation_id, operation);
  assert.match(result.call_id, /^[0-9a-f-]{36}$/);
  assert.deepEqual(result.data, {provider: {items: [1]}, meta: {cost: 0.01}});
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], operation);
  assert.deepEqual(calls[0][1], {});
  assert.equal(calls[0][2].maxPriceUsd, 0);
  assert.ok(calls[0][2].signal instanceof AbortSignal);
  for (const [args, code] of [[{operation_id: operation, arguments: {typo: 1}}, 'invalid_input'], [{operation_id: 'absent'}, 'unknown_operation']]) {
    const error = await call(client, 'use', args);
    assert.equal(error.isError, true);
    assert.equal(decode(error).error.code, code);
  }
  assert.equal(calls.length, 1);
});

test('meta-tool invalid inputs fail before execution', async t => {
  const client = await connect(t);
  for (const [name, args] of [['search', {query: ''}], ['search', {query: 'x', limit: 21}], ['search', {query: 'x', category: 'absent'}], ['get_details', {}], ['get_details', {operation_id: operation, operation_ids: Array(20).fill(operation)}], ['use', {operation_id: operation, max_price_usd: -1}], ['use', {operation_id: operation, extra: true}], ['batch_use', {calls: []}], ['batch_use', {calls: Array.from({length: 21}, () => ({operation_id: operation}))}], ['batch_use', {calls: [{call_id: '2', operation_id: operation}, {operation_id: operation}]}]]) {
    const result = await call(client, name, args);
    assert.equal(result.isError, true, name);
    assert.equal(decode(result).error.code, 'invalid_input', name);
  }
  const missing = await call(client, operation);
  assert.equal(missing.isError, true);
  assert.equal(decode(missing).error.code, 'unknown_tool');
});

test('batch successes and failures are independent, ordered, capped and limited to five concurrent calls', {timeout: 5000}, async t => {
  const inputOperation = 'get_apollo_organizations_organization_id_job_postings';
  const gates = [];
  let active = 0, peak = 0;
  let firstWave;
  const started = new Promise(resolve => {firstWave = resolve;});
  const client = await connect(t, {api: {execute: async (name, args, options) => {
    assert.equal(name, inputOperation);
    assert.equal(options.maxPriceUsd, 0.25);
    assert.ok(options.signal instanceof AbortSignal);
    active++; peak = Math.max(peak, active);
    await new Promise(resolve => {gates.push(resolve); if (gates.length === 5) firstWave();});
    active--;
    if (args.organization_id === '3') throw new ApiError('rate_limited', 'fixture throttle', 429, true);
    return {id: args.organization_id};
  }}});
  const calls = Array.from({length: 8}, (_, i) => ({call_id: `call-${i}`, operation_id: inputOperation, arguments: {organization_id: String(i)}}));
  calls.push({call_id: 'unknown', operation_id: 'absent'});
  const pending = call(client, 'batch_use', {calls, max_price_usd: 0.25});
  await started;
  assert.equal(gates.length, 5);
  for (let i = 0; i < 8; i++) {
    // Releasing one request must allow the queued work to progress.
    while (!gates[i]) await new Promise(resolve => setImmediate(resolve));
    gates[i]();
  }
  const response = await pending;
  const result = decode(response);
  assert.equal(peak, 5);
  assert.equal(response.isError, undefined);
  assert.equal(result.total_count, 9);
  assert.equal(result.success_count, 7);
  assert.equal(result.error_count, 2);
  assert.deepEqual(result.results.map(r => r.call_id), calls.map(c => c.call_id));
  assert.deepEqual(result.results[0].data, {id: '0'});
  assert.deepEqual(result.results[3].error, {code: 'rate_limited', message: 'fixture throttle', status: 429, retryable: true});
  assert.equal(result.results[8].error.code, 'unknown_operation');
});

test('all-failed batch is a tool error and unexpected transport errors are sanitized', async t => {
  const client = await connect(t, {api: {execute: async () => {throw Error('sk-aisa-private-value');}}});
  const response = await call(client, 'batch_use', {calls: [{operation_id: operation}, {operation_id: 'absent'}]});
  const result = decode(response);
  assert.equal(response.isError, true);
  assert.equal(result.success_count, 0);
  assert.equal(result.error_count, 2);
  assert.deepEqual(result.results.map(r => r.call_id), ['1', '2']);
  assert.equal(result.results[0].error.code, 'internal_error');
  assert.doesNotMatch(JSON.stringify(result), /private-value/);
});

test('SDK cancellation reaches in-flight batch calls and prevents queued execution', {timeout: 5000}, async t => {
  let count = 0, aborted = 0, ready;
  const started = new Promise(resolve => {ready = resolve;});
  const client = await connect(t, {api: {execute: (_name, _args, {signal}) => new Promise((resolve, reject) => {
    count++;
    signal.addEventListener('abort', () => {aborted++; reject(new ApiError('cancelled', 'fixture cancelled'));}, {once: true});
    if (count === 5) ready();
  })}});
  const controller = new AbortController();
  const pending = call(client, 'batch_use', {calls: Array.from({length: 12}, () => ({operation_id: operation}))}, {signal: controller.signal});
  // Attach rejection handling before aborting the SDK request.
  const rejected = assert.rejects(pending, /cancel|abort/i);
  await started;
  controller.abort(new Error('test cancellation'));
  await rejected;
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(aborted, 5);
  assert.equal(count, 5);
});

test('resources and skill discovery lead to readable local content without execution', async t => {
  const client = await connect(t);
  const native = await client.listResources();
  const listed = decode(await call(client, 'list_resources')).resources;
  assert.ok(native.resources.length > 0);
  assert.deepEqual(native.resources.map(r => r.uri).sort(), listed.map(r => r.uri).sort());
  assert.ok(listed.every(r => !Object.hasOwn(r, 'path')));
  const found = decode(await call(client, 'search_skills', {query: 'SEO', limit: 3})).skills;
  assert.ok(found.length > 0);
  for (const skill of found) {
    assert.equal(Object.hasOwn(skill, 'path'), false);
    const direct = await client.readResource({uri: skill.uri});
    const viaTool = decode(await call(client, 'read_resource', {uri: skill.uri}));
    assert.deepEqual(viaTool, direct);
    assert.equal(direct.contents[0].uri, skill.uri);
    assert.match(direct.contents[0].text, /\S/);
  }
  const invalid = await call(client, 'read_resource', {uri: 'file:///etc/passwd'});
  assert.equal(invalid.isError, true);
  assert.equal(decode(invalid).error.code, 'unknown_resource');
  await assert.rejects(client.readResource({uri: 'file:///etc/passwd'}), error => error.code === -32602);
});

test('module/server/all-tools pinning preserves schemas, deduplicates and leaves use unrestricted', async t => {
  for (const [options, expected] of [
    [{modules: ['seo', 'seo']}, moduleOperations('seo')],
    [{modules: ['seo-all']}, moduleOperations('seo', false)],
    [{server: 'apollo'}, catalog.operations.filter(op => op.servers.includes('apollo'))],
    [{allTools: true, modules: ['seo']}, catalog.operations],
  ]) {
    const client = await connect(t, options);
    const {tools} = await client.listTools();
    assert.deepEqual(tools.map(t => t.name).sort(), [...metaNames, ...expected.map(op => op.name)].sort());
    for (const op of expected) assert.deepEqual(tools.find(t => t.name === op.name).inputSchema, op.inputSchema);
  }
  assert.throws(() => createServer({server: 'absent', api: forbiddenApi}), /Unknown server/);
  assert.throws(() => createServer({modules: ['absent'], api: forbiddenApi}), /Unknown module/);
  let count = 0;
  const client = await connect(t, {modules: ['seo'], api: {execute: async () => {count++; return [1, 2];}}});
  const result = decode(await call(client, 'use', {operation_id: operation}));
  assert.equal(result.successful, true);
  assert.deepEqual(result.data, [1, 2]);
  assert.equal(count, 1);
  const pinned = await connect(t, {server: 'apollo', api: {execute: async () => [1, 2]}});
  assert.deepEqual(decode(await call(pinned, operation)), [1, 2]);
});

test('real stdio child completes SDK handshake, discovery, resource reads and shutdown without credentials', {timeout: 10000}, async t => {
  const client = new Client({name: 'aisa-stdio-test', version: '1.0.0'});
  const transport = new StdioClientTransport({command: process.execPath, args: ['--import', fileURLToPath(new URL('./isolate-env.mjs', import.meta.url)), fileURLToPath(new URL('../dist/cli.js', import.meta.url)), 'serve', '--server', 'apollo'], env: {HOME: process.env.HOME, USERPROFILE: process.env.USERPROFILE}, stderr: 'pipe'});
  t.after(async () => {await client.close(); await transport.close();});
  let stderr = '';
  transport.stderr?.on('data', chunk => {stderr += chunk.toString();});
  await client.connect(transport);
  const {tools} = await client.listTools();
  assert.ok(tools.some(t => t.name === operation));
  assert.equal(decode(await call(client, 'search', {query: operation, limit: 1})).candidates[0].operation_id, operation);
  const {resources} = await client.listResources();
  assert.ok((await client.readResource({uri: resources[0].uri})).contents[0].text.length > 0);
  // Invalid arguments exercise the execution boundary without ever reaching auth/fetch.
  const invalid = await call(client, 'use', {operation_id: operation, arguments: {unexpected: true}});
  assert.equal(decode(invalid).error.code, 'invalid_input');
  await client.close();
  assert.equal(stderr, '');
});


test('SDK use flows through real ApiClient serialization and HTTP error mapping with mock fetch', async t => {
  let requests = 0;
  const api = new ApiClient({key: 'sk-aisa-integration-fixture', fetcher: async (url, init) => {
    requests++;
    assert.equal(url.pathname, '/apis/v1/apollo/organizations/org%2Ffixture/job_postings');
    assert.equal(url.searchParams.get('page'), '2');
    assert.equal(init.method, 'GET');
    assert.equal(init.headers.get('Authorization'), 'Bearer sk-aisa-integration-fixture');
    assert.equal(init.headers.get('X-AISA-Max-Price-USD'), '0.1');
    return requests === 1 ? Response.json({jobs: [{id: 'job-1'}], metadata: {page: 2}}) : new Response('estimated_price_exceeds_max_price', {status: 402});
  }});
  const client = await connect(t, {api});
  const args = {operation_id: 'get_apollo_organizations_organization_id_job_postings', arguments: {organization_id: 'org/fixture', page: 2}, max_price_usd: 0.1};
  const success = decode(await call(client, 'use', args));
  assert.deepEqual(success.data, {jobs: [{id: 'job-1'}], metadata: {page: 2}});
  const failure = await call(client, 'use', args);
  assert.equal(failure.isError, true);
  assert.equal(decode(failure).error.code, 'cost_limit_exceeded');
  assert.equal(decode(failure).error.status, 402);
  assert.equal(requests, 2);
});


test('AgentMail discovery never exposes credential arguments and use/direct calls authenticate through transport', async t => {
  const name = 'get_agentmail_thread';
  const token = 'sk-aisa-agentmail-fixture';
  let requests = 0;
  const client = await connect(t, {server: 'agentmail', api: new ApiClient({key: token, fetcher: async (url, init) => {
    requests++;
    assert.equal(url.pathname, '/apis/v1/agentmail/threads/fixture');
    assert.equal(init.headers.get('Authorization'), `Bearer ${token}`);
    return Response.json({id: 'fixture'});
  }})});
  const listed = await client.listTools();
  const direct = listed.tools.find(tool => tool.name === name);
  const details = decode(await call(client, 'get_details', {operation_id: name}));
  const search = decode(await call(client, 'search', {query: name, limit: 1}));
  assert.equal(search.candidates[0].operation_id, name);
  for (const schema of [direct.inputSchema, details.arguments_schema, search.candidates[0].input_schema]) {
    assert.deepEqual(schema, operations.get(name).inputSchema);
    assert.deepEqual(schema.required, ['thread_id']);
    assert.deepEqual(Object.keys(schema.properties), ['thread_id']);
  }
  for (const tool of listed.tools.filter(tool => operations.get(tool.name)?.servers.includes('agentmail'))) {
    assert.equal(Object.hasOwn(tool.inputSchema.properties, 'Authorization'), false, tool.name);
    assert.equal(tool.inputSchema.required?.includes('Authorization') ?? false, false, tool.name);
  }
  const success = await call(client, 'use', {operation_id: name, arguments: {thread_id: 'fixture'}});
  assert.equal(decode(success).successful, true);
  assert.deepEqual(decode(success).data, {id: 'fixture'});
  const directResult = await call(client, name, {thread_id: 'fixture'});
  assert.deepEqual(decode(directResult), {id: 'fixture'});
  for (const tool of ['use', name]) {
    const args = {thread_id: 'fixture', Authorization: 'Bearer attempted-override'};
    const failure = await call(client, tool, tool === 'use' ? {operation_id: name, arguments: args} : args);
    assert.equal(failure.isError, true);
    assert.equal(decode(failure).error.code, 'invalid_input');
  }
  assert.equal(requests, 2);
  assert.equal(JSON.stringify({listed, details, search, success, directResult}).includes(token), false);
});
