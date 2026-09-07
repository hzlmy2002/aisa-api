import { lstat, mkdir, readFile, readdir, rmdir, unlink, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import YAML from 'yaml';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const compact = (text) => text.trim().replace(/\s+/gu, ' ');
const strings = (value) => Array.isArray(value) && value.length > 0 && value.every(nonempty);
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;
function requireValue(condition, message) {
  if (!condition) throw new Error(message);
}
function skillName(value) {
  requireValue(nonempty(value), 'Missing skill name');
  const name = `aisa-${value.replaceAll('_', '-')}`;
  requireValue(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) && name.length <= 64, `Invalid skill name: ${name}`);
  return name;
}
async function yamlFiles(directory) {
  const paths = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...await yamlFiles(path));
    else if (entry.isFile() && /\.ya?ml$/.test(entry.name)) paths.push(path);
  }
  return paths.sort();
}
async function readYaml(path) {
  return YAML.parse(await readFile(path, 'utf8'));
}

// Workflow YAML uses Python's simple {input} and escaped {{literal}} syntax.
// Parse it explicitly: replacing braces with a regex would corrupt JSON examples.
export function renderTemplate(template, argumentsList = []) {
  const inputs = new Set(argumentsList.map((arg) => arg.name));
  const used = new Set();
  let output = '';
  for (let i = 0; i < template.length;) {
    const char = template[i];
    if ((char === '{' || char === '}') && template[i + 1] === char) {
      output += char;
      i += 2;
    } else if (char === '{') {
      const end = template.indexOf('}', i + 1);
      const key = template.slice(i + 1, end);
      requireValue(end !== -1 && /^[A-Za-z_][A-Za-z0-9_]*$/.test(key) && inputs.has(key), `Invalid or undeclared template input: {${key}}`);
      used.add(key);
      output += `<input: ${key}>`;
      i = end + 1;
    } else {
      requireValue(char !== '}', 'Unescaped closing brace in template');
      output += char;
      i++;
    }
  }
  for (const key of inputs) requireValue(used.has(key), `Unused template input: ${key}`);
  return output;
}

function validateWorkflow(cfg, operations) {
  requireValue(cfg && typeof cfg === 'object', 'Workflow must be a mapping');
  const name = skillName(cfg.name);
  for (const field of ['description', 'template']) requireValue(nonempty(cfg[field]), `${name}: missing ${field}`);
  requireValue(strings(cfg.uses), `${name}: uses must be a nonempty list`);
  requireValue(new Set(cfg.uses).size === cfg.uses.length, `${name}: duplicate uses`);
  requireValue(nonempty(cfg.skill?.when_to_use), `${name}: skill.when_to_use is required`);
  for (const field of ['aliases', 'tags', 'providers', 'examples']) {
    requireValue(strings(cfg.skill?.[field]), `${name}: skill.${field} is required`);
  }
  const args = cfg.arguments ?? [];
  requireValue(Array.isArray(args), `${name}: arguments must be a list`);
  const names = new Set();
  for (const arg of args) {
    requireValue(arg && /^[A-Za-z_][A-Za-z0-9_]*$/.test(arg.name) && nonempty(arg.description), `${name}: invalid argument metadata`);
    requireValue(!names.has(arg.name), `${name}: duplicate argument ${arg.name}`);
    requireValue(arg.required === undefined || typeof arg.required === 'boolean', `${name}: invalid required flag`);
    names.add(arg.name);
  }
  const body = renderTemplate(cfg.template, args);
  for (const tool of cfg.uses) {
    requireValue(operations.has(tool), `${name}: unknown operation in uses: ${tool}`);
    requireValue(cfg.template.includes(`\`${tool}\``), `${name}: uses lists ${tool} but template never mentions it`);
  }
  for (const [, token] of cfg.template.matchAll(/`([A-Za-z_][A-Za-z0-9_]*)`/g)) {
    if (operations.has(token)) requireValue(cfg.uses.includes(token), `${name}: ${token} is missing from uses`);
    else if (/^(?:get|post|put|patch|delete)_/.test(token)) throw new Error(`${name}: unknown operation in template: ${token}`);
  }
  // As in the upstream checker, validate quoted enum literals against the
  // declared operations' parameter schemas, excluding resolved template inputs.
  const params = new Map();
  for (const tool of cfg.uses) {
    for (const [key, schema] of Object.entries(operations.get(tool).inputSchema.properties ?? {})) {
      if (!params.has(key)) params.set(key, schema);
    }
  }
  for (const [, key, value] of cfg.template.matchAll(/`?([A-Za-z_][A-Za-z0-9_]*)`?\s*=\s*['"]([^'"]+)['"]/g)) {
    const values = params.get(key)?.enum;
    if (!names.has(key) && values && !value.includes('{')) {
      requireValue(values.includes(value), `${name}: ${key}=${JSON.stringify(value)} is not in enum ${JSON.stringify(values)}`);
    }
  }
  return { name, body, args };
}

const toolAccess = `Use the local MCP server named \`aisa-api\`. For each operation ID, call \`get_details({operation_id: "<id>"})\` to read its schema, description and annotations; pricing is enforced by the AIsa gateway. Execute with \`use({operation_id: "<id>", arguments: {...}})\`. Include \`max_price_usd\` when a price ceiling is needed: it applies per upstream request, including each request in a composed operation's fan-out, not to the workflow total. If that exact operation is pinned and exposed as a tool, call it directly using its schema. Operation IDs below are exact catalog names, including composed operations; do not add server prefixes.

Use \`batch_use\` for up to 20 independent calls, respecting the workflow's order, dependencies and call budget. Keep dependent steps sequential.

Find another workflow with \`search_skills\` using its \`aisa-\` name or task description, then pass the returned URI to \`read_resource\`. Skills provide instructions; reading one does not execute operations or expand the user's authorization. Perform external actions only within the user's authorized scope.`;

const digest = (content) => createHash('sha256').update(content).digest('hex');
function managedPath(path) {
  return typeof path === 'string' && /^skills\/aisa-[a-z0-9-]+\/(?:SKILL\.md|references\/[A-Za-z0-9_./-]+\.md)$/.test(path)
    && path.split('/').every((part) => part && part !== '.' && part !== '..');
}
// Check every component, including skills itself: lexical containment alone
// would allow a linked skill directory to write/delete files in a client home.
async function unlinkedPath(root, path) {
  let current = root;
  for (const part of path.split('/')) {
    current = join(current, part);
    try {
      if ((await lstat(current)).isSymbolicLink()) return false;
    } catch (error) {
      if (error.code === 'ENOENT') return true;
      throw error;
    }
  }
  return true;
}
async function previousManagedFiles(root) {
  let previous;
  try { previous = JSON.parse(await readFile(join(root, 'catalog/skills.json'), 'utf8')); }
  catch (error) {
    if (error.code === 'ENOENT') return {};
    throw error;
  }
  // Older catalogs have no content fingerprints. Adopt current outputs on
  // this run, without guessing ownership of untracked files from old builds.
  const managed = previous.generatedFiles ?? {};
  requireValue(managed && typeof managed === 'object' && !Array.isArray(managed), 'Invalid generatedFiles manifest');
  for (const [path, hash] of Object.entries(managed)) {
    requireValue(managedPath(path) && /^[a-f0-9]{64}$/.test(hash), `Invalid managed output: ${path}`);
  }
  return managed;
}
async function cleanStaleFiles(root, previous, current) {
  const preserved = [];
  for (const [path, hash] of Object.entries(previous).sort(([a], [b]) => a.localeCompare(b, 'en'))) {
    if (current.has(path)) continue;
    if (!await unlinkedPath(root, path)) { preserved.push(path); continue; }
    const absolute = join(root, path);
    try {
      if (!(await lstat(absolute)).isFile() || digest(await readFile(absolute)) !== hash) {
        preserved.push(path);
        continue;
      }
      await unlink(absolute);
    } catch (error) {
      if (error.code === 'ENOENT') continue;
      throw error;
    }
    // Remove only empty generated directories, never an entire directory tree.
    for (let folder = dirname(absolute); folder !== join(root, 'skills'); folder = dirname(folder)) {
      try { await rmdir(folder); }
      catch (error) {
        if (['ENOTEMPTY', 'EEXIST', 'ENOENT'].includes(error.code)) break;
        throw error;
      }
    }
  }
  return preserved;
}

function markdown(entry, title, body) {
  return `---\n${YAML.stringify({ name: entry.name, description: entry.description }).trim()}\n---\n\n# ${title}\n\n${body.trim()}\n`;
}
function entryFor(name, description, extra = {}) {
  return { name, description, uri: `skill://${name}/SKILL.md`, path: `skills/${name}/SKILL.md`, aliases: [], tags: [], providers: [], examples: [], uses: [], ...extra };
}
function replaceWorkflowNames(text, workflows) {
  const replacements = new Map(workflows.map(({ cfg, name }) => [cfg.name, name]));
  return text.replace(/(?<![A-Za-z0-9_-])[A-Za-z][A-Za-z0-9_-]*(?![A-Za-z0-9_-])/g, (word) => replacements.get(word) ?? word);
}
function operationList(names, operations) {
  return names.map((name) => `- \`${name}\` — ${compact(operations.get(name).description || name)}`).join('\n');
}

/** Generate only package artifacts; never touches Codex/Claude/Hermes homes. */
export async function generateSkills({ root = projectRoot } = {}) {
  root = resolve(root);
  const catalog = JSON.parse(await readFile(join(root, 'catalog/operations.json'), 'utf8'));
  requireValue(Array.isArray(catalog.operations) && catalog.operations.length, 'operations catalog must be nonempty');
  const operations = new Map();
  for (const op of catalog.operations) {
    requireValue(nonempty(op.name) && Array.isArray(op.servers) && op.servers.every(nonempty) && op.inputSchema && typeof op.inputSchema === 'object', 'Invalid operation catalog entry');
    requireValue(!operations.has(op.name), `Duplicate operation: ${op.name}`);
    operations.set(op.name, op);
  }
  const modules = await readYaml(join(root, 'upstream/modules.yaml'));
  requireValue(modules?.categories && typeof modules.categories === 'object', 'modules.yaml requires categories');
  const workflows = [];
  for (const path of await yamlFiles(join(root, 'upstream/prompts'))) {
    const cfg = await readYaml(path);
    try {
      workflows.push({ cfg, ...validateWorkflow(cfg, operations), server: relative(join(root, 'upstream/prompts'), path).split(/[\\/]/)[0] });
    } catch (error) { throw new Error(`${path}: ${error.message}`, { cause: error }); }
  }
  requireValue(workflows.length > 0, 'No workflow YAML files found');
  const resources = [];
  const resourceUris = new Set();
  for (const path of await yamlFiles(join(root, 'upstream/resources'))) {
    const cfg = await readYaml(path);
    requireValue(cfg && nonempty(cfg.uri) && nonempty(cfg.name) && nonempty(cfg.description), `${path}: invalid resource metadata`);
    requireValue(!resourceUris.has(cfg.uri), `Duplicate resource URI: ${cfg.uri}`);
    resourceUris.add(cfg.uri);
    const server = relative(join(root, 'upstream/resources'), path).split(/[\\/]/)[0];
    const filename = `${skillName(cfg.name)}.md`;
    let body = cfg.text;
    if (!nonempty(body)) {
      requireValue(cfg.generator === 'src.aisa_mcp.resource_gen:venue_field_map', `${path}: unsupported resource generator ${cfg.generator}`);
      // Replace the Python-generated field table with the installed catalog's
      // actual schemas. No field names or enum values are copied by hand.
      const relevant = catalog.operations.filter((op) => op.servers.includes(server));
      requireValue(relevant.length > 0, `${path}: no operations for generated resource`);
      body = `# ${cfg.title || cfg.name}\n\n${cfg.description.trim()}\n\nParameter contracts from the installed operation catalog. Compare identifiers, paging, time filters and status using each operation's own schema; call get_details for the current contract.\n\n`;
      body += relevant.map((op) => `## ${op.name}\n\n\`\`\`json\n${JSON.stringify(op.inputSchema, null, 2)}\n\`\`\``).join('\n\n');
    }
    resources.push({ cfg, server, filename, body: replaceWorkflowNames(body, workflows) });
  }

  // Build and validate all artifacts in memory before writing any output.
  const files = new Map();
  const entries = [];
  const resourceEntries = new Map();
  for (const resource of resources) {
    const path = `skills/aisa-api/references/${resource.server}/${resource.filename}`;
    files.set(path, `${resource.body.trim()}\n`);
    resourceEntries.set(resource.cfg.uri, {
      uri: resource.cfg.uri, name: resource.cfg.name, description: compact(resource.cfg.description),
      mimeType: 'text/markdown', path,
    });
  }
  const names = new Set();
  const add = (entry, title, body) => {
    requireValue(!names.has(entry.name), `Duplicate skill name: ${entry.name}`);
    names.add(entry.name);
    entries.push(entry);
    files.set(entry.path, markdown(entry, title, body));
  };
  for (const workflow of workflows) {
    const { cfg, name, args, server } = workflow;
    const entry = entryFor(name, `${compact(cfg.description)} ${compact(cfg.skill.when_to_use)}`, {
      when_to_use: cfg.skill.when_to_use, tags: cfg.skill.tags, providers: cfg.skill.providers, examples: cfg.skill.examples,
      aliases: [...new Set([cfg.name, name.slice(5), ...cfg.skill.aliases])], uses: cfg.uses, arguments: args, kind: 'workflow',
    });
    const attached = resources.filter((resource) => resource.server === server || cfg.uses.some((id) => operations.get(id).servers.includes(resource.server)) || cfg.template.includes(resource.cfg.uri));
    const links = attached.map((resource) => {
      const path = `references/${resource.filename}`;
      files.set(`skills/${name}/${path}`, `${resource.body.trim()}\n`);
      return `- [${resource.cfg.title || resource.cfg.name}](${path}) — ${compact(resource.cfg.description)}`;
    });
    let body = replaceWorkflowNames(workflow.body, workflows);
    for (const uri of body.match(/aisa:\/\/[^\s`<>"')]+/g) ?? []) {
      const resource = attached.find((item) => item.cfg.uri === uri);
      requireValue(resource, `${name}: unresolved resource ${uri}`);
      body = body.replaceAll(uri, `references/${resource.filename}`);
    }
    const inputs = args.map((arg) => `- \`${arg.name}\` (${arg.required ? 'required' : `optional; default ${JSON.stringify(arg.default ?? '')}`}): ${compact(arg.description)}`).join('\n');
    add(entry, cfg.title || name, `## Inputs\n\nExtract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.\n\n${inputs || 'No template inputs.'}\n\n## Tool access\n\n${toolAccess}\n\n${cfg.uses.map((id) => `- \`${id}\``).join('\n')}\n\n${links.length ? `## Supporting resources\n\nRead when relevant to interpreting the returned data:\n\n${links.join('\n')}\n\n` : ''}## Workflow\n\n${body}`);
  }
  const groups = [...Object.entries(modules.categories), ...Object.entries(modules.modules ?? {}).filter(([, group]) => group.prompt === true)];
  for (const [slug, group] of groups) {
    const name = skillName(slug);
    requireValue(nonempty(group.name) && nonempty(group.description) && strings(group.servers), `${name}: invalid category metadata`);
    for (const field of ['tools', 'default_tools']) {
      if (group[field] === undefined) continue;
      requireValue(Array.isArray(group[field]) && group[field].every(nonempty), `${name}: invalid ${field}`);
      for (const id of group[field]) requireValue(operations.has(id), `${name}: unknown ${field} operation ${id}`);
    }
    const uses = catalog.operations.filter((op) => op.servers.some((server) => group.servers.includes(server)) || (group.tools ?? []).includes(op.name)).map((op) => op.name).sort();
    requireValue(uses.length > 0, `${name}: no operations in category`);
    for (const id of group.default_tools ?? []) requireValue(uses.includes(id), `${name}: default operation outside category: ${id}`);
    const entry = entryFor(name, compact(group.description), { aliases: [slug, group.name], tags: [slug], providers: group.servers, uses, kind: 'category', arguments: [{ name: 'task', description: 'What you want to find out.', required: false, default: '' }] });
    const reference = `skills/${name}/references/operations.md`;
    files.set(reference, `# ${group.name} operations\n\n${group.default_tools?.length ? `## Curated operations\n\n${operationList(group.default_tools, operations)}\n\n` : ''}## Full coverage\n\n${operationList(uses, operations)}\n`);
    const related = entries.filter((item) => item.kind === 'workflow' && item.uses.some((id) => uses.includes(id)));
    add(entry, group.name, `${compact(group.description)}\n\nOptional input: \`task\` (default \`""\`) — what you want to find out.\n\n${uses.length} operations across these servers: ${group.servers.map((server) => `\`${server}\``).join(', ')}. Read [operation coverage](references/operations.md) to select an operation, then read its schema.\n\n${toolAccess}\n\nPlan the minimal call set; use a tool's list input instead of looping when available. Label unavailable sources and any substitutes.\n\n${related.length ? `Relevant workflow names for search_skills:\n\n${related.map((item) => `- \`${item.name}\` — ${item.when_to_use}`).join('\n')}` : ''}`);
  }
  const rootEntry = entryFor('aisa-api', 'Discover AIsa API operations and packaged workflows when the user asks to use AIsa or explore its data coverage.', { aliases: ['aisa'], tags: ['aisa', 'discovery'], kind: 'entry' });
  add(rootEntry, 'AIsa API', `Use this entry point for AIsa discovery or a task explicitly using AIsa. Select the specific workflow or category that matches the request.\n\nThe npm package supplies portable SKILL.md folders for Codex, Claude and Hermes. Tools are supplied by the local \`aisa-api\` MCP server.\n\n${toolAccess}\n\n## Coverage\n\n${entries.filter((item) => item.kind === 'category').map((item) => `- \`${item.name}\` — ${item.description}`).join('\n')}\n\n${workflows.length} task workflows and ${groups.length} category skills cover ${operations.size} catalog operations. Search with the user's task description or an original workflow alias, then read the returned skill URI. Choose only the relevant skill; coverage does not imply that every task needs an API call.`);
  if (resourceEntries.size) files.set(rootEntry.path, files.get(rootEntry.path) + `\n## Supporting references\n\nRead the relevant reference when interpreting its provider's data:\n\n${[...resourceEntries.values()].map((resource) => `- [${resource.name}](${resource.path.slice('skills/aisa-api/'.length)}) — ${resource.description}`).join('\n')}\n`);
  files.set(rootEntry.path, files.get(rootEntry.path) + '\n## Credentials\n\nIf credentials are missing, configure them locally through the client’s MCP environment or credential settings using the package setup instructions. Do not ask the user to paste API keys into the conversation.\n');
  entries.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  const previous = await previousManagedFiles(root);
  for (const path of [...files.keys(), 'catalog/skills.json']) {
    requireValue(await unlinkedPath(root, path), `Refusing linked output: ${path}`);
  }
  const generatedFiles = Object.fromEntries([...files].sort(([a], [b]) => a.localeCompare(b, 'en')).map(([path, content]) => [path, digest(content)]));
  for (const [path, content] of files) {
    await mkdir(dirname(join(root, path)), { recursive: true });
    await writeFile(join(root, path), content);
  }
  const preservedStaleFiles = await cleanStaleFiles(root, previous, files);
  await writeFile(join(root, 'catalog/skills.json'), `${JSON.stringify({ version: 1, skills: entries, resources: [...resourceEntries.values()], generatedFiles }, null, 2)}\n`);
  return { workflows: workflows.length, categories: groups.length, skills: entries.length, resources: resources.length, operations: operations.size,
    ...(preservedStaleFiles.length ? { preservedStaleFiles } : {}) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  generateSkills().then((counts) => console.log(`Generated skills: ${JSON.stringify(counts)}`)).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
