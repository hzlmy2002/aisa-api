// Opt-in live smoke: three read-only operations, no Similarweb and no writes.
// Credential is inherited from the environment; never write it to the report.
import {ApiClient, validateArguments, safeError} from '../dist/api.js';
import {mkdir, writeFile, readFile} from 'node:fs/promises';
if (!process.env.AISA_API_KEY) throw Error('Set AISA_API_KEY in the process environment.');
const api = new ApiClient();
const maxPrice = Number(process.env.AISA_SMOKE_MAX_PRICE_USD ?? '0.01');
if (!Number.isFinite(maxPrice) || maxPrice < 0 || maxPrice > 0.05) throw Error('Smoke cap must be between $0 and $0.05.');
const report = {tested_at: new Date().toISOString(), max_price_usd_per_request: maxPrice, automatic_retries: false, similarweb_calls: 0, results: []};
const cases = [
  ['get_coingecko_simple_price', {ids: 'bitcoin', vs_currencies: 'usd'}],
  ['post_tavily_search', {query: 'AIsa API documentation', max_results: 1, search_depth: 'basic', include_answer: false}],
  ['get_financial_prices_snapshot', {ticker: 'AAPL'}],
];
const only = process.argv.slice(2);
const selected = only.length ? cases.filter(([name]) => only.includes(name)) : cases;
if (only.some(name => !cases.some(([op]) => name === op))) throw Error('Unknown smoke operation.');
for (const [name, input] of selected) {
  const start = Date.now();
  try {
    const data = await api.execute(name, validateArguments(name, input), {maxPriceUsd: maxPrice});
    const providerError = Boolean(data?.error || data?.meta?.status === 'error' || data?.success === false);
    const result = {operation_id: name, successful: !providerError, elapsed_ms: Date.now() - start, response_type: Array.isArray(data) ? 'array' : typeof data, top_level_keys: data && typeof data === 'object' && !Array.isArray(data) ? Object.keys(data).slice(0, 25) : [], ...(providerError ? {error: 'provider_reported_error'} : {})};
    report.results.push(result); console.log(JSON.stringify(result));
  } catch (error) {
    const e = safeError(error);
    const result = {operation_id: name, successful: false, elapsed_ms: Date.now() - start, code: e.code, http_status: e.status ?? null};
    report.results.push(result); console.log(JSON.stringify(result));
    if (e.status === 401 || e.status === 403) break;
  }
}
await mkdir('verification', {recursive: true});
let history = [];
try {const previous = JSON.parse(await readFile('verification/live-smoke.json', 'utf8')); history = previous.runs ?? [previous];} catch (e) {if (e.code !== 'ENOENT') throw e;}
await writeFile('verification/live-smoke.json', JSON.stringify({runs: [...history, report]}, null, 2) + '\n');
if (report.results.length !== selected.length || report.results.some(r => !r.successful)) process.exitCode = 1;
