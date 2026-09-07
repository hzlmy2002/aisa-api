import {Server} from '@modelcontextprotocol/sdk/server/index.js';
import {CallToolRequestSchema, ListToolsRequestSchema, ListResourcesRequestSchema, ReadResourceRequestSchema, McpError, ErrorCode} from '@modelcontextprotocol/sdk/types.js';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {Ajv} from 'ajv';
import {ApiClient, ApiError, safeError, validateArguments, validateCap, type Transport} from './api.js';
import {catalog, operations, moduleOperations, ranked, type Operation, type Json} from './catalog.js';
import {executeComposed} from './composed.js';
import {VERSION} from './version.js';

const skillsCatalog = JSON.parse(readFileSync(new URL('../catalog/skills.json', import.meta.url), 'utf8'));
const skills: Json[] = skillsCatalog.skills;
const resources: Json[] = [...skills, ...(skillsCatalog.resources ?? [])];
const resourceMap = new Map(resources.map(r => [r.uri, r]));
const string = {type: 'string', minLength: 1};
const object = {type: 'object', additionalProperties: true};
const limit = {type: 'integer', minimum: 1, maximum: 20, default: 5};
const cap = {type: 'number', minimum: 0, description: 'Maximum USD per upstream request, including each request in a batch or composed fan-out. This is not a total workflow budget.'};
const readOnly = {readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false};
const schema = (properties: Json, required: string[] = []) => ({type: 'object' as const, properties, required, additionalProperties: false});
const meta = [
  {name: 'search', description: 'Find AIsa API operations by task, provider or operation ID. Returns input schemas. Free, local. English API terms work best; Chinese workflow discovery is available through search_skills.', inputSchema: schema({query: {...string, maxLength: 4096}, limit, category: {type: 'string', enum: Object.keys(catalog.modules.categories)}}, ['query'])},
  {name: 'get_details', description: 'Read the original MCP description, input/output schemas, annotations and AIsa route for one operation or up to 20. Free, local.', inputSchema: schema({operation_id: string, operation_ids: {type: 'array', minItems: 1, maxItems: 20, items: string}})},
  {name: 'use', description: 'Execute any supported AIsa operation using its original MCP arguments. Calls can be billed or change upstream state: inspect get_details first. Does not automatically retry.', inputSchema: schema({operation_id: string, arguments: {...object, default: {}}, max_price_usd: cap}, ['operation_id']), annotations: {readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: true}},
  {name: 'batch_use', description: 'Execute up to 20 AIsa operations with at most 5 concurrent operations. Each result succeeds or fails independently. max_price_usd is per upstream request, not a batch budget.', inputSchema: schema({calls: {type: 'array', minItems: 1, maxItems: 20, items: schema({call_id: string, operation_id: string, arguments: {...object, default: {}}}, ['operation_id'])}, max_price_usd: cap}, ['calls']), annotations: {readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: true}},
  {name: 'list_categories', description: 'List AIsa categories, server modules and tool counts. All APIs remain reachable through use; --modules pins selected tools in tools/list.', inputSchema: schema({})},
  {name: 'search_skills', description: 'Find installed AIsa task workflows from an English/Chinese description. Read the selected URI with read_resource before following its steps. Free, local.', inputSchema: schema({query: {...string, maxLength: 4096}, limit}, ['query'])},
  {name: 'list_resources', description: 'List bundled workflow skills and supporting references. Free, local.', inputSchema: schema({})},
  {name: 'read_resource', description: 'Read a bundled skill or reference by its exact URI. Reading guidance never executes API calls.', inputSchema: schema({uri: string}, ['uri'])},
].map(t => ({...t, annotations: t.annotations ?? readOnly}));
const ajv = new Ajv({strict: false, useDefaults: true});
const metaValidators = new Map(meta.map(t => [t.name, ajv.compile(t.inputSchema)]));
const coreToolNames = new Set(['get_details', 'use', 'batch_use']);
const unknownPrice = {currency: 'USD', amount: null, model: 'unknown', source: 'local'};
const wire = (data: any, isError = false) => ({content: [{type: 'text' as const, text: JSON.stringify(data)}], structuredContent: data !== null && typeof data === 'object' && !Array.isArray(data) ? data : {result: data}, ...(isError ? {isError: true} : {})});
function readResource(uri: string) {
  const r = resourceMap.get(uri);
  if (!r) throw new ApiError('unknown_resource', 'Unknown resource URI. Use list_resources.', 404);
  return {contents: [{uri, mimeType: r.mimeType ?? 'text/markdown', text: readFileSync(new URL('../' + r.path, import.meta.url), 'utf8')}]};
}
function details(op: Operation) {
  return {operation_id: op.name, successful: true, description: op.description, provider: op.path?.split('/')[3] ?? 'aisa',
    method: op.method ?? 'POST', path: op.path ?? `mcp://${op.name}`, arguments_schema: op.inputSchema,
    response_schema: op.outputSchema ?? {}, read_only: Boolean(op.annotations.readOnlyHint), idempotent: Boolean(op.annotations.idempotentHint),
    side_effects: op.annotations.readOnlyHint ? [] : ['writes-upstream'], annotations: op.annotations, price: unknownPrice,
    availability: 'unknown', source: 'local', servers: op.servers};
}
function errorResult(error: unknown) {
  const e = safeError(error);
  return {code: e.code, message: e.message, status: e.status ?? 0, retryable: e.retryable};
}
const account: Operation = {name: 'account', description: 'Read the AIsa account balance, subscription wallet and recent usage. Free; requires credentials.', inputSchema: schema({}), annotations: {...readOnly, openWorldHint: true}, kind: 'atomic', servers: [], timeoutMs: 15000};
async function fetchAccount(api: ApiClient, signal?: AbortSignal) {
  const out: Json = {balance: null, subscriptions: null, usage: null, errors: []};
  const now = Math.floor(Date.now() / 1000);
  const calls = await Promise.allSettled([api.accountRequest('/v1/credits/balance', {}, signal), api.accountRequest('/v1/usage', {start_time: now - 30 * 86400, end_time: now, bucket_width: '1d'}, signal)]);
  const usd = (v: any) => v === null || v === undefined || !Number.isFinite(Number(v)) ? null : Number(v) / 1000000;
  if (calls[0].status === 'fulfilled') {
    const body = calls[0].value;
    out.balance = {currency: body.currency ?? 'USD', account_usd: usd(body.account_balance_micros_usd), available_usd: usd(body.available_balance_micros_usd)};
    out.subscriptions = {hive_gtm: {active: body.gtm?.active ?? null, balance_usd: usd(body.gtm?.balance_micros_usd)}};
  } else out.errors.push(errorResult(calls[0].reason));
  if (calls[1].status === 'fulfilled') out.usage = calls[1].value;
  else out.errors.push(errorResult(calls[1].reason));
  return out;
}
export interface ServerOptions {modules?: string[]; server?: string; allTools?: boolean; discoveryTools?: boolean; api?: Transport}
export function createServer(options: ServerOptions = {}) {
  const api = options.api ?? new ApiClient();
  const visibleMeta = meta.filter(t => options.discoveryTools || coreToolNames.has(t.name));
  if (options.server && !catalog.servers.some(s => s.slug === options.server)) throw Error(`Unknown server: ${options.server}`);
  const pinned = new Map<string, Operation>();
  if (options.allTools) for (const op of catalog.operations) pinned.set(op.name, op);
  if (options.server) for (const op of catalog.operations.filter(op => op.servers.includes(options.server!))) pinned.set(op.name, op);
  for (const module of options.modules ?? []) {
    if (module === 'account') {pinned.set('account', account); continue;}
    for (const op of moduleOperations(module)) pinned.set(op.name, op);
  }
  const server = new Server({name: 'aisa-api', version: VERSION}, {capabilities: {tools: {}, resources: {}}, instructions:
    'AIsa APIs run through this local stdio server and use your AIsa credentials. Read the installed aisa-api skill for the complete API directory and workflow links, or use native resources/read with skill://aisa-api/SKILL.md. Select an operation ID from the directory; get_details gives its schema; use executes it. The default tools are get_details, use and batch_use. Pinned tools can be called directly. All supported APIs remain reachable through use. Directory and schema reads are local and free; API calls may be billed or write to external services. max_price_usd limits each upstream request, not a workflow total. Setup installs workflow skills into your client. If authentication fails, run aisa-api setup in a terminal; never request keys or OAuth callback URLs in conversation.'});
  const execute = async (name: string, input: Json, capValue?: number, signal?: AbortSignal): Promise<any> => {
    validateCap(capValue);
    if (signal?.aborted) throw new ApiError('cancelled', 'Request cancelled before execution.');
    if (name === 'account') {
      if (Object.keys(input).length) throw new ApiError('invalid_input', 'account takes no arguments.', 400);
      if (!(api instanceof ApiClient)) throw new ApiError('unavailable', 'Account transport is not configured.');
      return fetchAccount(api, signal);
    }
    const args = validateArguments(name, input);
    if (operations.get(name)!.kind === 'composed') {
      try {return await executeComposed(name, args, (op, args) => api.execute(op, validateArguments(op, args), {maxPriceUsd: capValue, signal}));}
      catch (e: any) {
        if (e instanceof ApiError) throw e;
        if (e?.name === 'SceneUpstreamError') throw new ApiError('upstream_error', e.message, e.status);
        throw e;
      }
    }
    return api.execute(name, args, {maxPriceUsd: capValue, signal});
  };
  const runOne = async (name: string, args: Json, callId: string, capValue?: number, signal?: AbortSignal) => {
    try {return {call_id: callId, operation_id: name, successful: true, data: await execute(name, args, capValue, signal)};}
    catch (e) {return {call_id: callId, operation_id: name, successful: false, error: errorResult(e)};}
  };
  server.setRequestHandler(ListToolsRequestSchema, async () => ({tools: [...visibleMeta, ...[...pinned.values()].map(op => ({name: op.name, title: op.title ?? undefined, description: op.description, inputSchema: op.inputSchema as any, annotations: op.annotations}))]}));
  server.setRequestHandler(ListResourcesRequestSchema, async () => ({resources: resources.map(r => ({uri: r.uri, name: r.name, description: r.description, mimeType: r.mimeType ?? 'text/markdown'}))}));
  server.setRequestHandler(ReadResourceRequestSchema, async request => {
    try {return readResource(request.params.uri);}
    catch {throw new McpError(ErrorCode.InvalidParams, 'Unknown or unavailable resource URI.');}
  });
  server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
    const {name} = request.params;
    const args: Json = structuredClone(request.params.arguments ?? {});
    try {
      if (metaValidators.has(name) && !visibleMeta.some(t => t.name === name)) throw new ApiError('unknown_tool', 'Read the aisa-api directory skill, or restart with --discovery-tools to enable legacy discovery helpers.', 404);
      const validator = metaValidators.get(name);
      if (validator && !validator(args)) throw new ApiError('invalid_input', ajv.errorsText(validator.errors), 400);
      if (!validator) {
        if (!pinned.has(name)) throw new ApiError('unknown_tool', 'Tool is not pinned. Use use({operation_id, arguments}) or restart with --modules/--all-tools.', 404);
        return wire(await execute(name, args, undefined, extra.signal));
      }
      if (name === 'use') {
        const result = await runOne(args.operation_id, args.arguments ?? {}, randomUUID(), args.max_price_usd, extra.signal);
        return wire(result, !result.successful);
      }
      if (name === 'batch_use') {
        const ids = args.calls.map((c: Json, i: number) => c.call_id ?? String(i + 1));
        if (new Set(ids).size !== ids.length) throw new ApiError('invalid_input', 'call_id values must be unique.', 400);
        const results: Json[] = new Array(args.calls.length); let next = 0;
        await Promise.all(Array.from({length: Math.min(5, args.calls.length)}, async () => {
          while (next < args.calls.length) {const i = next++; const c = args.calls[i]; results[i] = await runOne(c.operation_id, c.arguments ?? {}, ids[i], args.max_price_usd, extra.signal);}
        }));
        const success_count = results.filter(r => r.successful).length;
        return wire({batch_id: randomUUID(), total_count: results.length, success_count, error_count: results.length - success_count, results}, success_count === 0);
      }
      if (name === 'get_details') {
        const ids = [...(args.operation_id ? [args.operation_id] : []), ...(args.operation_ids ?? [])];
        if (!ids.length || ids.length > 20) throw new ApiError('invalid_input', 'Pass one operation_id or 1–20 operation_ids.', 400);
        const results = ids.map(id => {const op = id === 'account' ? account : operations.get(id); return op ? details(op) : {operation_id: id, successful: false, error: {code: 'unknown_operation'}};});
        const success_count = results.filter(r => r.successful).length;
        return wire(args.operation_id && !args.operation_ids ? results[0] : {total_count: results.length, success_count, error_count: results.length - success_count, results});
      }
      if (name === 'search') {
        const pool = args.category ? moduleOperations(args.category, false) : [...catalog.operations, account];
        const found = ranked(pool, args.query, op => [op.name, op.title, op.description, ...op.servers].join(' '), op => op.name).slice(0, args.limit);
        return wire({search_id: randomUUID(), backend: 'local', retrieval_mode: 'endpoint', plan: null, candidates: found.map(op => ({operation_id: op.name, summary: op.title ?? op.name, description: op.description, input_schema: op.inputSchema, provider: op.path?.split('/')[3] ?? 'aisa', method: op.method ?? 'POST', path: op.path ?? `mcp://${op.name}`, price: unknownPrice, details_ref: {tool: 'get_details', arguments: {operation_id: op.name}}})), next_steps_guidance: ['Read the schema, then call use with the operation_id and arguments.']});
      }
      if (name === 'list_categories') return wire({categories: Object.entries(catalog.modules.categories).map(([module, group]) => ({module, ...group, tool_count: moduleOperations(module, false).length})), servers: catalog.servers, fine_modules: catalog.modules.modules, operation_count: catalog.operations.length});
      if (name === 'search_skills') return wire({skills: ranked(skills, args.query, s => [s.name,s.description,...(s.aliases ?? []),...(s.tags ?? []),...(s.examples ?? []),...(s.providers ?? [])].join(' '), s => s.name).slice(0, args.limit).map(({path, ...s}) => s)});
      if (name === 'list_resources') return wire({resources: resources.map(({path, ...r}) => r)});
      return wire(readResource(args.uri));
    } catch (e) {return wire({error: errorResult(e)}, true);}
  });
  return server;
}
