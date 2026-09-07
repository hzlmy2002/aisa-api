import {readFile, readdir, writeFile, mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import YAML from 'yaml';

const read = async p => JSON.parse(await readFile(p, 'utf8'));
const contracts = await read('upstream/tool-contracts.json');
const snapshot = await read('upstream/snapshot.json');
// A migrated MCP schema must not silently drift from its source OpenAPI.
for (const [file, hash] of Object.entries(snapshot.files)) {
  if (createHash('sha256').update(await readFile(file)).digest('hex') !== hash) {
    throw Error(`Source changed: ${file}. Review and refresh the migration snapshot before generating.`);
  }
}
export function resolve(spec, value) {
  const seen = new Set();
  while (value?.$ref) {
    const ref = value.$ref;
    if (!ref.startsWith('#/') || seen.has(ref)) throw Error(`Unresolvable reference: ${ref}`);
    seen.add(ref);
    const resolved = ref.slice(2).split('/').reduce((o, key) => o?.[key.replace(/~1/g, '/').replace(/~0/g, '~')], spec);
    if (!resolved) throw Error(`Missing reference: ${ref}`);
    const {$ref, ...rest} = value;
    value = {...resolved, ...rest};
  }
  return value;
}
const specs = new Map(), routeIndex = new Map(), selected = new Map(), servers = [];
const methods = new Set(['get', 'post', 'put', 'patch', 'delete']);
for (const file of (await readdir('upstream/servers')).filter(f => f.endsWith('.yaml')).sort()) {
  const cfg = YAML.parse(await readFile(`upstream/servers/${file}`, 'utf8'));
  servers.push({slug: cfg.slug, name: cfg.name, description: cfg.description, kind: cfg.kind});
  for (const include of cfg.include ?? []) {
    let spec = specs.get(include.spec);
    if (!spec) {spec = await read(`upstream/specs/${include.spec}`); specs.set(include.spec, spec);}
    const found = new Set();
    for (const [path, rawItem] of Object.entries(spec.paths)) {
      const item = resolve(spec, rawItem);
      for (const [method, op] of Object.entries(item)) {
        if (!methods.has(method) || !op.operationId) continue;
        const name = op.operationId;
        const base = new URL((op.servers ?? item.servers ?? spec.servers)?.[0]?.url ?? 'https://api.aisa.one/apis/v1');
        if (base.origin !== 'https://api.aisa.one' || !base.pathname.startsWith('/apis/v1')) throw Error(`Unexpected API origin for ${name}`);
        const parameters = new Map();
        for (const raw of [...(item.parameters ?? []), ...(op.parameters ?? [])]) {
          const p = resolve(spec, raw); parameters.set(`${p.in}:${p.name}`, p);
        }
        const body = resolve(spec, op.requestBody);
        const contentType = body ? Object.keys(body.content ?? {})[0] : undefined;
        const bodySchema = resolve(spec, body?.content?.[contentType]?.schema);
        const parameterMap = contracts[name]?.parameterMap ?? Object.fromEntries([...parameters.values()].map(p => [p.name, {location: p.in, openapi_name: p.name}]));
        const route = {name, method: method.toUpperCase(), path: base.pathname.replace(/\/$/, '') + path,
          parameterMap, parameters: [...parameters.values()].map(p => ({name: p.name, in: p.in, style: p.style, explode: p.explode})),
          ...(body ? {body: {contentType, mode: bodySchema?.type === 'object' ? 'object' : 'value', required: Boolean(body.required)}} : {})};
        const existing = routeIndex.get(name);
        if (existing && (existing.path !== route.path || existing.method !== route.method)) throw Error(`Conflicting route ${name}`);
        routeIndex.set(name, route);
        if (include.operations !== '*' && !(include.operations ?? []).includes(name)) continue;
        found.add(name);
        if (contentType && contentType !== 'application/json') throw Error(`Unsupported exposed content type: ${name} ${contentType}`);
        const contract = contracts[name];
        if (!contract) throw Error(`Missing migrated tool contract: ${name}`);
        if (!selected.has(name)) selected.set(name, {...contract, kind: 'atomic', ...route, timeoutMs: (cfg.timeout_seconds ?? 15) * 1000});
        else selected.get(name).timeoutMs = Math.max(selected.get(name).timeoutMs, (cfg.timeout_seconds ?? 15) * 1000);
      }
    }
    if (include.operations !== '*') for (const name of include.operations) if (!found.has(name)) throw Error(`Missing selected operation ${name}`);
  }
  for (const group of cfg.composed ?? []) for (const name of group.tools) {
    if (!contracts[name]) throw Error(`Missing composed contract ${name}`);
    selected.set(name, {...contracts[name], kind: 'composed', timeoutMs: (cfg.timeout_seconds ?? 15) * 1000});
  }
}
if (selected.size !== Object.keys(contracts).length) throw Error('Selected operations do not match migrated MCP tool set');
// Authentication belongs to the local transport. Some legacy OpenAPI specs
// exposed Authorization as a required tool input; do not ask an agent for a key.
const credentialAdaptations = [];
for (const [name, operation] of selected) {
  const authInputs = Object.entries(operation.parameterMap ?? {}).filter(([, mapping]) => mapping.location === 'header' && mapping.openapi_name.toLowerCase() === 'authorization').map(([arg]) => arg);
  if (!authInputs.length) continue;
  const effective = structuredClone(operation);
  for (const arg of authInputs) {
    delete effective.inputSchema.properties[arg];
    effective.inputSchema.required = (effective.inputSchema.required ?? []).filter(key => key !== arg);
    delete effective.parameterMap[arg];
  }
  effective.parameters = effective.parameters.filter(p => !(p.in === 'header' && p.name.toLowerCase() === 'authorization'));
  selected.set(name, effective);
  const route = routeIndex.get(name);
  route.parameterMap = effective.parameterMap;
  route.parameters = effective.parameters;
  credentialAdaptations.push({operation_id: name, removed_inputs: authInputs, reason: 'Authorization is injected from local credentials.'});
}
const modules = YAML.parse(await readFile('upstream/modules.yaml', 'utf8'));
for (const [name, group] of Object.entries({...modules.categories, ...modules.modules})) {
  for (const slug of group.servers ?? []) if (!servers.some(s => s.slug === slug)) throw Error(`Unknown server ${slug} in ${name}`);
  for (const op of [...(group.tools ?? []), ...(group.default_tools ?? [])]) if (!selected.has(op)) throw Error(`Unknown operation ${op} in ${name}`);
}
await mkdir('catalog', {recursive: true});
await writeFile('catalog/operations.json', JSON.stringify({operations: [...selected.values()].sort((a,b) => a.name.localeCompare(b.name)), servers, modules}, null, 2) + '\n');
await writeFile('catalog/routes.json', JSON.stringify(Object.fromEntries(routeIndex), null, 2) + '\n');
await writeFile('catalog/adaptations.json', JSON.stringify({credential_adaptations: credentialAdaptations}, null, 2) + '\n');
console.log(`Catalog: ${selected.size} tools, ${servers.length} servers, ${specs.size} OpenAPI specs`);
