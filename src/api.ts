import {Ajv, type ValidateFunction} from 'ajv';
import {accessToken} from './oauth.js';
import {operations, routes, type Json, type Route} from './catalog.js';

export class ApiError extends Error {
  constructor(public code: string, message: string, public status?: number, public retryable = false, public details?: unknown) {super(message);}
}
export function safeError(error: unknown): ApiError {
  return error instanceof ApiError ? error : new ApiError('internal_error', 'The operation could not be completed.');
}
// Unknown schema formats are documentation only; structural input constraints are enforced.
const ajv = new Ajv({strict: false, validateFormats: false, allErrors: true, useDefaults: true});
const validators = new Map<string, ValidateFunction>();
export function validateArguments(name: string, input: unknown): Json {
  const operation = operations.get(name);
  if (!operation) throw new ApiError('unknown_operation', `Unknown operation: ${name}`, 404);
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new ApiError('invalid_input', 'arguments must be an object.', 400);
  const args = structuredClone(input) as Json;
  const unknown = Object.keys(args).filter(key => !Object.hasOwn(operation.inputSchema.properties ?? {}, key));
  if (unknown.length) throw new ApiError('invalid_input', `Unknown argument(s): ${unknown.join(', ')}`, 400);
  let validate = validators.get(name);
  if (!validate) {validate = ajv.compile(operation.inputSchema); validators.set(name, validate);}
  if (!validate(args)) throw new ApiError('invalid_input', ajv.errorsText(validate.errors), 400);
  return args;
}
export function validateCap(cap?: number): void {
  if (cap !== undefined && (!Number.isFinite(cap) || cap < 0)) throw new ApiError('invalid_input', 'max_price_usd must be a finite non-negative number.', 400);
}
const atom = (value: unknown) => typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value);
function queryValue(url: URL, name: string, value: any, style = 'form', explode = true) {
  if (Array.isArray(value)) {
    if (style === 'form' && explode) for (const v of value) url.searchParams.append(name, atom(v));
    else url.searchParams.append(name, value.map(atom).join(style === 'spaceDelimited' ? ' ' : style === 'pipeDelimited' ? '|' : ','));
  } else if (value && typeof value === 'object') {
    if (style === 'deepObject') for (const [key,v] of Object.entries(value)) url.searchParams.append(`${name}[${key}]`, atom(v));
    else if (explode) for (const [key,v] of Object.entries(value)) url.searchParams.append(key, atom(v));
    else url.searchParams.append(name, Object.entries(value).flatMap(([k,v]) => [k, atom(v)]).join(','));
  } else url.searchParams.append(name, atom(value));
}
export function buildRequest(route: Route, args: Json): {url: URL; init: RequestInit} {
  let pathname = route.path;
  const query: [string, any][] = [], headers: Record<string, string> = {}, cookies: string[] = [];
  const body: Json = Object.create(null);
  for (const [key, value] of Object.entries(args)) {
    if (value === undefined) continue;
    const binding = route.parameterMap[key];
    if (!binding) throw new ApiError('invalid_input', `Unmapped argument: ${key}`, 400);
    const name = binding.openapi_name;
    if (binding.location === 'path') {
      const encoded = encodeURIComponent(atom(value));
      if (encoded === '.' || encoded === '..') throw new ApiError('invalid_input', 'Path identifiers cannot be dot segments.', 400);
      pathname = pathname.replaceAll(`{${name}}`, encoded);
    } else if (binding.location === 'query') {if (value !== null) query.push([name, value]);}
    else if (binding.location === 'body') body[name] = value;
    else if (binding.location === 'header') {
      if (/^(authorization|host|content-length|cookie)$/i.test(name)) throw new ApiError('invalid_input', 'Credentials and transport headers cannot be set by tool arguments.', 400);
      headers[name] = atom(value);
    } else if (binding.location === 'cookie') cookies.push(`${encodeURIComponent(name)}=${encodeURIComponent(atom(value))}`);
    else throw new ApiError('invalid_input', `Unsupported parameter location: ${binding.location}`, 400);
  }
  if (/\{[^}]+\}/.test(pathname)) throw new ApiError('invalid_input', 'A required path parameter is missing.', 400);
  const url = new URL(`https://api.aisa.one${pathname}`);
  for (const [name, value] of query) {
    const p = route.parameters.find(p => p.in === 'query' && p.name === name);
    queryValue(url, name, value, p?.style, p?.explode ?? ((p?.style ?? 'form') === 'form'));
  }
  if (cookies.length) headers.Cookie = cookies.join('; ');
  const init: RequestInit = {method: route.method, headers};
  if (route.body && (Object.keys(body).length || route.body.required)) {
    headers['Content-Type'] = route.body.contentType;
    init.body = JSON.stringify(route.body.mode === 'object' ? body : Object.values(body)[0]);
  }
  return {url, init};
}
function redact(value: string, token: string): string {
  return value.split(token).join('[redacted]').replace(/sk-aisa-[A-Za-z0-9_-]+/g, '[redacted]').replace(/Bearer\s+[^\s"<>]+/gi, 'Bearer [redacted]');
}
async function readBounded(response: Response, limit: number): Promise<string> {
  if (!response.body) return '';
  const reader = response.body.getReader(); const chunks: Uint8Array[] = []; let bytes = 0;
  try {
    while (true) {
      const {done, value} = await reader.read(); if (done) break;
      bytes += value.byteLength;
      if (bytes > limit) {await reader.cancel(); throw new ApiError('response_too_large', `Upstream response exceeded ${limit} bytes.`);}
      chunks.push(value);
    }
    return Buffer.concat(chunks).toString('utf8');
  } finally {reader.releaseLock();}
}
export interface ExecuteOptions {maxPriceUsd?: number; signal?: AbortSignal; timeoutMs?: number}
export interface Transport {execute(name: string, args: Json, options?: ExecuteOptions): Promise<any>}
export class ApiClient implements Transport {
  constructor(private options: {key?: string; fetcher?: typeof fetch; resolveToken?: () => Promise<string | undefined>} = {}) {}
  async execute(name: string, args: Json, options: ExecuteOptions = {}): Promise<any> {
    const route = routes[name];
    if (!route) throw new ApiError('unknown_operation', `No API route for ${name}`, 404);
    validateCap(options.maxPriceUsd);
    const {url, init} = buildRequest(route, args);
    return this.request(url, init, {...options, timeoutMs: options.timeoutMs ?? operations.get(name)?.timeoutMs ?? 15000});
  }
  async accountRequest(path: '/v1/credits/balance' | '/v1/usage', params: Json = {}, signal?: AbortSignal) {
    const url = new URL('https://api.aisa.one' + path);
    for (const [key,value] of Object.entries(params)) url.searchParams.set(key, String(value));
    return this.request(url, {method: 'GET'}, {signal, timeoutMs: 15000});
  }
  private async request(url: URL, init: RequestInit, options: ExecuteOptions): Promise<any> {
    if (options.signal?.aborted) throw new ApiError('cancelled', 'Request cancelled before execution.');
    let token: string | undefined;
    try {token = this.options.key?.trim() || (this.options.resolveToken ? await this.options.resolveToken() : process.env.AISA_AUTH_FILE ? await accessToken() : process.env.AISA_API_KEY?.trim() || await accessToken());}
    catch {throw new ApiError('authentication_required', 'Run aisa-api setup --auth oauth to sign in again.');}
    if (!token) throw new ApiError('missing_credentials', 'Run aisa-api setup or configure AISA_API_KEY.');
    const signal = AbortSignal.any([AbortSignal.timeout(options.timeoutMs ?? 15000), ...(options.signal ? [options.signal] : [])]);
    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${token}`); headers.set('Accept', 'application/json'); headers.set('User-Agent', 'aisa-api/0.1.1');
    if (options.maxPriceUsd !== undefined) headers.set('X-AISA-Max-Price-USD', String(options.maxPriceUsd));
    try {
      const response = await (this.options.fetcher ?? fetch)(url, {...init, headers, signal, redirect: 'error'});
      const raw = await readBounded(response, response.ok ? 16 * 1024 * 1024 : 64 * 1024);
      let data: any;
      try {data = raw ? JSON.parse(raw) : null;} catch {data = undefined;}
      if (!response.ok) {
        const codes: Record<number, string> = {400: 'invalid_input', 401: 'unauthorized', 402: 'payment_required', 403: 'forbidden', 404: 'not_found', 409: 'conflict', 429: 'rate_limited'};
        const detail = redact(raw.slice(0, 4000), token);
        const capError = raw.includes('estimated_price_exceeds_max_price');
        throw new ApiError(capError ? 'cost_limit_exceeded' : codes[response.status] ?? 'upstream_error', `AIsa returned HTTP ${response.status}.${detail ? ' ' + detail : ''}`, response.status, response.status === 429 || response.status >= 500);
      }
      // Preserve every provider's successful JSON envelope, including arrays and body-level errors.
      // Text/binary endpoints remain usable without forcing an invented JSON response schema.
      if (data !== undefined) return data;
      const contentType = response.headers.get('content-type') ?? '';
      if (contentType.includes('json')) throw new ApiError('invalid_response', 'AIsa returned invalid JSON.');
      return {text: raw, content_type: contentType || 'text/plain'};
    } catch (e) {
      if (e instanceof ApiError) throw e;
      throw new ApiError(options.signal?.aborted ? 'cancelled' : signal.aborted ? 'timeout' : 'network_error', 'Request interrupted or unavailable. It may have been billed; it was not automatically retried.', undefined, true);
    }
  }
}
