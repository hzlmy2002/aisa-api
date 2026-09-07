import {readFileSync} from 'node:fs';
export type Json = Record<string, any>;
export interface Route {
  name: string; method: string; path: string;
  parameterMap: Record<string, {location: string; openapi_name: string}>;
  parameters: {name: string; in: string; style?: string; explode?: boolean}[];
  body?: {contentType: string; mode: 'object' | 'value'; required: boolean};
}
export interface Operation extends Partial<Route> {
  name: string; title?: string; description: string; inputSchema: Json; outputSchema?: Json;
  annotations: Json; servers: string[]; kind: 'atomic' | 'composed'; timeoutMs: number;
}
export const catalog: {operations: Operation[]; servers: Json[]; modules: {categories: Record<string, Json>; modules: Record<string, Json>}} = JSON.parse(readFileSync(new URL('../catalog/operations.json', import.meta.url), 'utf8'));
export const operations = new Map(catalog.operations.map(op => [op.name, op]));
export const routes: Record<string, Route> = JSON.parse(readFileSync(new URL('../catalog/routes.json', import.meta.url), 'utf8'));

export function moduleOperations(name: string, curated = true): Operation[] {
  const all = name.endsWith('-all');
  const key = all ? name.slice(0, -4) : name;
  const group = catalog.modules.categories[key] ?? catalog.modules.modules[key];
  if (group) {
    if (curated && !all && group.default_tools?.length) return catalog.operations.filter(op => group.default_tools.includes(op.name));
    return catalog.operations.filter(op => op.servers.some(s => group.servers?.includes(s)) || group.tools?.includes(op.name));
  }
  if (!catalog.servers.some(s => s.slug === key)) throw Error(`Unknown module: ${name}`);
  return catalog.operations.filter(op => op.servers.includes(key));
}

export function tokenize(text: string): string[] {
  return text.normalize('NFKC').toLowerCase().replace(/[_-]/g, ' ').match(/[a-z0-9]+|\p{Script=Han}/gu) ?? [];
}
export function ranked<T>(items: T[], query: string, fields: (item: T) => string, exact: (item: T) => string): T[] {
  const terms = [...new Set(tokenize(query))];
  if (!terms.length) return [];
  return items.map(item => {
    const haystack = fields(item).normalize('NFKC').toLowerCase();
    const words = new Set(tokenize(haystack));
    const score = (exact(item).toLowerCase() === query.toLowerCase() ? 10000 : 0) + terms.reduce((n,t) => n + (words.has(t) ? 3 : haystack.includes(t) ? 1 : 0), 0);
    return {item, score};
  }).filter(r => r.score > 0).sort((a,b) => b.score - a.score).map(r => r.item);
}
