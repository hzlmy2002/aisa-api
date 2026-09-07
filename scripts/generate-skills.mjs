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

// Discovery descriptions favor task coverage; execution guidance stays in the body.
const discoveryDescriptions = {
  api: 'Find and use AIsa APIs for web research, page extraction, website traffic and competitors, SEO and AI visibility, social posts and creators, company and contact enrichment, stocks, crypto, prediction markets and AgentMail email. Use for related data requests even when AIsa is not named, requests naming a supported provider, or questions about API coverage. 联网搜索、网页抓取、竞品流量、市场调研、关键词、排名、外链、GEO、社交舆情、网红、销售线索、公司财报、股票币价、事件赔率、收发邮件。 If coverage is uncertain, inspect the directory or search the local API catalog.',
  seo: 'Find SEO and AI-search data with DataForSEO, Semrush and Ahrefs. Use for keyword research, search volume and difficulty, SERPs and rankings, organic or paid competitors, backlinks, domain authority, site audits and page speed, content opportunities, local businesses, app and marketplace listings, or brand mentions and citations in AI answers. SEO优化、关键词挖掘、长尾词、搜索排名、外链分析、网站诊断、竞品研究、本地商家、应用商店、GEO、生成式搜索优化、AI品牌可见度。',
  finance: 'Retrieve financial and market data for company research, stock screening and comparisons, quotes and price history, valuation, financial statements, earnings, analyst estimates, insider trades, filings and news; crypto prices, trends and liquidity; prediction-market events and odds; and stock discussion on X. Covers Financial Datasets, CoinGecko, Polymarket and Kalshi. 股票行情、美股财报、公司基本面、估值、内部交易、监管披露、投资研究、币价、加密市场、预测市场、事件概率、股票舆情。',
  social: 'Find public social profiles, posts, comments, discussions, trends and videos on X/Twitter, Instagram, Reddit, Pinterest and YouTube. Use for topic or post search, brand mentions, customer feedback, audience and creator research, recent account activity, community discussions and video discovery. 社交媒体搜索、推特推文、热点追踪、品牌舆情、用户反馈、网红达人、账号画像、粉丝与内容、Reddit讨论、Instagram帖子、Pinterest图片、YouTube油管视频搜索。',
  search: 'Search the web, retrieve page text, extract structured content, crawl websites and gather cited sources with Tavily, Firecrawl, Exa, Perplexity, Oxylabs, txyz and Anthropic/OpenAI grounded search. Use to look up facts, find recent information, research a topic or company, discover sources, read URLs or collect website content. 联网搜索、查资料、事实核查、最新信息、新闻检索、网页阅读、全文提取、结构化提取、网站抓取、爬虫、论文资料、带引用的研究简报。',
  sales: 'Find companies, employees, decision makers, creators and business contact details; enrich lead lists and company profiles; work with Apollo CRM contacts, accounts and sequences; or research prospect websites using Similarweb traffic, audience and competitors. Use for prospecting, lead generation, account research and creator discovery. 找客户、找公司、找高管、工作邮箱、联系人查询、销售线索、客户资料补全、潜客调研、CRM、外联序列、达人发现、网站流量与竞品分析。',
  mail: 'Use AgentMail for agent email: create and manage inboxes, list or read messages and threads, find attachments, prepare and manage drafts, send or reply to messages, and manage email resources. Use when asked to work with AgentMail or an agent inbox, or when an email task needs a programmatic mailbox. 代理邮箱、创建邮箱、收件箱、查邮件、读邮件、会话、附件、邮件草稿、发邮件、回复邮件、邮件自动化。',
  gtm: 'Find go-to-market data for prospecting, customer and market research, competitor analysis, creator discovery, social listening and acquisition research. Covers Apollo people and companies, Similarweb website traffic and audiences, X/Twitter, Instagram, Reddit, Pinterest, YouTube, Semrush, Ahrefs, Oxylabs and DataForSEO YouTube operations. GTM、市场进入、获客、增长研究、销售线索、目标客户、联系人、竞品流量、受众分析、达人营销、社交舆情、搜索营销。 Use also for AIsa Hive GTM Growth coverage questions.',
};

const toolAccess = `Use the local MCP server named \`aisa-api\`. Read the linked local operation details for its full description, input schema, defaults and annotations; then execute with \`use({operation_id: "<id>", arguments: {...}})\`. You do not need to call get_details when the installed details already provide the contract. Use \`get_details({operation_id: "<id>"})\` if local details are missing or the installed skills and running server differ; the running server's schema takes precedence. Prices and live availability are enforced by the AIsa gateway, not these static files.

Include \`max_price_usd\` when needed: it applies to each upstream request, including composed fan-outs, not the workflow total. Use \`batch_use\` for up to 20 independent calls; keep dependent steps sequential. If the exact operation is pinned, it can also be called directly with its schema.

A matching workflow already links its required operations: read those details directly without loading the global directory. For other tasks, start with the short installed \`aisa-api\` skill and follow a relevant server index. Use \`search\` only when the right operation is unclear. Native MCP resources/read can read \`skill://aisa-api/SKILL.md\` or \`skill://aisa-api/references/operations/<operation_id>.md\`. Skills do not execute actions or expand the user's authorization.`;

// Full directory is an optional reference; the entry skill stays short.
// Deduplicate APIs exposed by several servers while retaining all memberships.
function apiDirectory(catalog, modules) {
  const seen = new Set();
  const cell = value => compact(String(value ?? '')).replaceAll('|', '\\|').replaceAll('`', '');
  const sections = [], overview = [];
  for (const [category, group] of Object.entries(modules.categories)) {
    const rows = [];
    for (const slug of group.servers) {
      const selected = catalog.operations.filter(op => op.servers.includes(slug) && !seen.has(op.name)).sort((a,b) => a.name.localeCompare(b.name, 'en'));
      if (!selected.length) continue;
      const server = catalog.servers?.find(s => s.slug === slug);
      rows.push(`### ${slug} — ${cell(server?.name ?? slug)} (${selected.length})`, '', '| Operation ID | Access | Purpose |', '| --- | --- | --- |');
      for (const op of selected) {
        seen.add(op.name);
        const summary = cell(op.title || op.description?.split(/\n|(?<=[.!?])\s/)[0] || op.name);
        const memberships = op.servers.length > 1 ? ` Also exposed by: ${op.servers.filter(s => s !== slug).join(', ')}.` : '';
        rows.push(`| \`${op.name}\` | ${op.annotations?.readOnlyHint ? 'Read' : 'Write'}${op.kind === 'composed' ? ' · composed' : ''} | ${summary.length > 150 ? summary.slice(0, 147) + '…' : summary}${memberships} [Details](operations/${op.name}.md) |`);
      }
      rows.push('');
    }
    sections.push(`## ${category} — ${cell(group.name)}`, '', ...rows);
    overview.push(`| ${category} | ${cell(group.description).slice(0, 180)} | ${group.servers.map(s => `\`${s}\``).join(', ')} |`);
  }
  requireValue(seen.size === catalog.operations.length, 'API directory does not cover every operation exactly once');
  return `## Directory overview\n\n${seen.size} operations below, each listed once. Read means read-only according to the original annotations; Write means the operation may change upstream state. A composed operation can make multiple billed API requests. Full parameters and descriptions are in the linked local details; get_details remains a fallback.\n\n| Category | Coverage | Servers |\n| --- | --- | --- |\n${overview.join('\n')}\n\nIf this file is truncated by your client, read the relevant server heading or use local file search for a provider or operation name. Do not assume unshown operations are missing.\n\n${sections.join('\n')}\n## Account helper\n\n\`account\` — Read AIsa account balance, subscription wallet and recent usage with use. This helper is additional to the ${seen.size} migrated operations.`;
}

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
  return names.map(name => {
    const op = operations.get(name);
    return `- [${name}](../../aisa-api/references/operations/${name}.md) — ${compact(op.title || op.description || name).slice(0, 150)}`;
  }).join('\n');
}

function operationContract(op) {
  return {operation_id: op.name, successful: true, description: op.description, provider: op.path?.split('/')[3] ?? 'aisa',
    method: op.method ?? 'POST', path: op.path ?? `mcp://${op.name}`, arguments_schema: op.inputSchema,
    response_schema: op.outputSchema ?? {}, read_only: Boolean(op.annotations.readOnlyHint), idempotent: Boolean(op.annotations.idempotentHint),
    side_effects: op.annotations.readOnlyHint ? [] : ['writes-upstream'], annotations: op.annotations,
    price: {currency: 'USD', amount: null, model: 'unknown', source: 'local'}, availability: 'unknown', source: 'local', servers: op.servers};
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
  const referenceResources = [];
  const reference = (relativePath, content, name, description) => {
    const path = `skills/aisa-api/references/${relativePath}`;
    files.set(path, content.trim() + '\n');
    referenceResources.push({uri: `skill://aisa-api/references/${relativePath}`, path, name, description, mimeType: 'text/markdown'});
  };
  for (const op of catalog.operations) {
    reference(`operations/${op.name}.md`, `# ${op.name}\n\nInstalled API contract. Read arguments_schema, construct the arguments object, then call use with this operation_id. get_details is optional if this installed contract matches the running server. Credentials come from local setup; do not pass Authorization. Prices and availability here are unknown; the gateway enforces them. response_schema documents the original MCP output and is not enforced on provider responses.\n\n## Contract\n\n\`\`\`json\n${JSON.stringify(operationContract(op), null, 2)}\n\`\`\``, op.name, op.title || op.name);
  }
  for (const server of catalog.servers) {
    const selected = catalog.operations.filter(op => op.servers.includes(server.slug));
    const lines = selected.map(op => `- [${op.name}](../operations/${op.name}.md) — ${compact(op.title || op.description || op.name).slice(0, 150)}`);
    reference(`servers/${server.slug}.md`, `# ${server.name}\n\n${server.description}\n\n${selected.length} operations. Follow only the needed detail links, then call use; get_details is a fallback.\n\n${lines.join('\n')}`, server.slug, `API index for ${server.name}`);
  }
  reference('directory.md', apiDirectory(catalog, modules), 'api-directory', 'Complete optional API directory');
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
    const entry = entryFor(name, `${compact(cfg.skill.when_to_use)} Related requests: ${cfg.skill.aliases.join(", ")}. Sources: ${cfg.skill.providers.join(", ")}.`, {
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
    add(entry, cfg.title || name, `${compact(cfg.description)}\n\n## Inputs\n\nExtract inputs from the request and conversation. Apply optional defaults exactly; ask for required inputs only when they cannot be inferred. In the workflow, <input: NAME> means the resolved input, not a literal API argument.\n\n${inputs || 'No template inputs.'}\n\n## Tool access\n\n${toolAccess}\n\n${cfg.uses.map((id) => `- [${id}](../aisa-api/references/operations/${id}.md)`).join('\n')}\n\n${links.length ? `## Supporting resources\n\nRead when relevant to interpreting the returned data:\n\n${links.join('\n')}\n\n` : ''}## Workflow\n\n${body}`);
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
    const entry = entryFor(name, discoveryDescriptions[slug] ?? compact(group.description), { aliases: [slug, group.name], tags: [slug], providers: group.servers, uses, kind: 'category', arguments: [{ name: 'task', description: 'What you want to find out.', required: false, default: '' }] });
    const reference = `skills/${name}/references/operations.md`;
    files.set(reference, `# ${group.name} operations\n\n${group.default_tools?.length ? `## Curated operations\n\n${operationList(group.default_tools, operations)}\n\n` : ''}## Full coverage\n\n${operationList(uses, operations)}\n`);
    const related = entries.filter((item) => item.kind === 'workflow' && item.uses.some((id) => uses.includes(id)));
    add(entry, group.name, `${compact(group.description)}\n\nOptional input: \`task\` (default \`""\`) — what you want to find out.\n\n${uses.length} operations across these servers: ${group.servers.map((server) => `\`${server}\``).join(', ')}. Read [operation coverage](references/operations.md) to select an operation, then read its schema.\n\n${toolAccess}\n\nPlan the minimal call set; use a tool's list input instead of looping when available. Label unavailable sources and any substitutes.\n\n${related.length ? `Relevant installed workflow skills:\n\n${related.map((item) => `- \`${item.name}\` — ${item.when_to_use}`).join('\n')}` : ''}`);
  }
  const rootEntry = entryFor('aisa-api', discoveryDescriptions.api, { aliases: ['aisa', 'API directory', '接口目录'], tags: ['aisa', 'directory'], kind: 'entry' });
  const workflowLinks = entries.filter(item => item.kind === 'workflow').map(item => `- [${item.name}](../../${item.name}/SKILL.md) — ${compact(item.when_to_use)}`).join('\n');
  reference('workflows.md', `# Task workflows\n\nChoose a matching workflow; it links directly to its operation details.\n\n${workflowLinks}`, 'workflows', 'Task workflow index');
  const serverLinks = Object.entries(modules.categories).map(([slug, group]) => `### ${slug} — ${group.name}\n\n${group.servers.map(name => `- [${name}](references/servers/${name}.md)`).join('\n')}`).join('\n\n');
  add(rootEntry, 'AIsa API', `## Choose the smallest useful reference\n\nFor a multi-step task, start with [workflow skills](references/workflows.md). A workflow links directly to the details of its required operations. For an individual API, choose one server below and follow the relevant operation link. Do not load all server indexes or the full directory by default.\n\n## Call an operation\n\nRead its local details first: description, arguments_schema (including required fields, defaults and nested constraints), response_schema and annotations. Call use with the exact operation_id and an arguments object matching that schema. No get_details call is required when these files match the running server. If files are missing, outdated, or a validation error suggests a mismatch, call get_details and follow the running server's contract.\n\nThe four default MCP tools are search (discovery fallback), get_details (contract fallback), use and batch_use. Use search when the relevant server or operation remains unclear. Keep dependent steps sequential; batch_use accepts up to 20 independent calls. max_price_usd is per upstream request, including composed fan-outs, not a total workflow budget. Skills do not expand user authorization. Credentials come from local setup, never from conversation.\n\n## Server indexes\n\n${serverLinks}\n\n## Optional full index and references\n\n- [Complete directory](references/directory.md): all ${operations.size} operations, for global browsing or local file search only.\n- [Workflow index](references/workflows.md): ${workflows.length} task recipes.\n- use with operation_id \`account\` reads account balance and usage; get_details supplies its contract.\n\nClients without local file access may read these files using native MCP resources/read: \`skill://aisa-api/SKILL.md\`, \`skill://aisa-api/references/servers/<server>.md\`, or \`skill://aisa-api/references/operations/<operation_id>.md\`. Workflow skills use \`skill://<skill-name>/SKILL.md\`. All paths are from the installed package version; live pricing and availability come from the AIsa gateway.`);
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
  await writeFile(join(root, 'catalog/skills.json'), `${JSON.stringify({ version: 1, skills: entries, resources: [...resourceEntries.values()], referenceResources, generatedFiles }, null, 2)}\n`);
  return { workflows: workflows.length, categories: groups.length, skills: entries.length, resources: resources.length, operations: operations.size,
    ...(preservedStaleFiles.length ? { preservedStaleFiles } : {}) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  generateSkills().then((counts) => console.log(`Generated skills: ${JSON.stringify(counts)}`)).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
