import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import YAML from 'yaml';
import { generateSkills, renderTemplate } from '../scripts/generate-skills.mjs';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const json = async (path) => JSON.parse(await readFile(path, 'utf8'));
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'aisa-skills-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'catalog'));
  await cp(join(project, 'catalog/operations.json'), join(root, 'catalog/operations.json'));
  for (const path of ['prompts', 'resources', 'modules.yaml']) {
    await cp(join(project, 'upstream', path), join(root, 'upstream', path), { recursive: true });
  }
  return root;
}
async function workflows(root) {
  const result = [];
  const base = join(root, 'upstream/prompts');
  for (const server of await readdir(base, { withFileTypes: true })) {
    if (!server.isDirectory()) continue;
    for (const filename of await readdir(join(base, server.name))) {
      if (!/\.ya?ml$/.test(filename)) continue;
      const path = join(base, server.name, filename);
      result.push({ path, cfg: YAML.parse(await readFile(path, 'utf8')) });
    }
  }
  return result;
}
async function mutateWorkflow(root, change, name = 'creator_profile_snapshot') {
  const item = (await workflows(root)).find(({ cfg }) => cfg.name === name);
  assert.ok(item);
  change(item.cfg);
  await writeFile(item.path, YAML.stringify(item.cfg));
}

test('all original workflows retain instructions, input defaults, metadata and exact operations', async (t) => {
  const root = await fixture(t);
  const original = await workflows(root);
  const counts = await generateSkills({ root });
  assert.equal(counts.workflows, original.length);
  assert.equal(counts.workflows, 17);
  assert.equal(counts.categories, 7);
  assert.equal(counts.skills, 25);
  const { skills, resources } = await json(join(root, 'catalog/skills.json'));
  const operations = new Set((await json(join(root, 'catalog/operations.json'))).operations.map((op) => op.name));
  const skillNames = new Set(skills.map((skill) => skill.name));
  for (const { cfg } of original) {
    const entry = skills.find((skill) => skill.aliases.includes(cfg.name));
    assert.ok(entry, cfg.name);
    assert.deepEqual(entry.uses, cfg.uses);
    assert.deepEqual(entry.arguments, cfg.arguments ?? []);
    for (const key of ['providers', 'tags', 'examples', 'when_to_use']) assert.deepEqual(entry[key], cfg.skill[key]);
    assert.ok(cfg.skill.aliases.every((alias) => entry.aliases.includes(alias)));
    const text = await readFile(join(root, entry.path), 'utf8');
    const front = YAML.parse(text.split('---\n')[1]);
    assert.equal(front.name, entry.name);
    assert.equal(front.description, entry.description);
    // Independent expected conversion of the originals: only inputs, escaped
    // braces and references to another original workflow may change.
    let expected = cfg.template.replace(/\{\{|\}\}|\{([A-Za-z_][A-Za-z0-9_]*)\}/g,
      (match, key) => key ? `<input: ${key}>` : match[0]);
    expected = expected.replace(/\b[A-Za-z][A-Za-z0-9_]*\b/g, (word) => {
      const workflow = original.find(({ cfg: source }) => source.name === word);
      return workflow ? `aisa-${word.replaceAll('_', '-')}` : word;
    });
    assert.equal(text.slice(text.indexOf('## Workflow\n\n') + '## Workflow\n\n'.length).trimEnd(), expected.trimEnd(), cfg.name);
  }
  for (const entry of skills) {
    assert.ok(entry.uses.every((id) => operations.has(id)), entry.name);
    assert.equal(entry.uri, `skill://${entry.name}/SKILL.md`);
    const text = await readFile(join(root, entry.path), 'utf8');
    for (const [, target] of text.matchAll(/\]\(([^)]+)\)/g)) {
      if (/^https?:/.test(target)) continue;
      await readFile(resolve(root, dirname(entry.path), target));
    }
    for (const [, name] of text.matchAll(/`(aisa-[a-z0-9-]+)`/g)) assert.ok(skillNames.has(name), `${entry.name} -> ${name}`);
  }
  assert.equal(resources.length, 3);
  for (const resource of resources) {
    assert.ok(resource.uri.startsWith('aisa://'));
    const text = await readFile(join(root, resource.path), 'utf8');
    assert.ok(text.trim());
  }
  const composed = skills.find((entry) => entry.name === 'aisa-stock-chatter-workflow');
  assert.ok(composed.uses.includes('twitter_stock_pulse'));
});

test('short entry routes to server indexes and complete per-operation local contracts', async t => {
  const root = await fixture(t);
  await generateSkills({root});
  const {operations, servers} = await json(join(root, 'catalog/operations.json'));
  const {skills, referenceResources} = await json(join(root, 'catalog/skills.json'));
  const entry = await readFile(join(root, 'skills/aisa-api/SKILL.md'), 'utf8');
  assert.ok(Buffer.byteLength(entry) < 8192, 'entry must remain a routing brief');
  const body = await readFile(join(root, 'skills/aisa-api/references/directory.md'), 'utf8');
  const rows = [...body.matchAll(/^\| `([^`]+)` \| (Read|Write)(?: · composed)? \| (.+) \|$/gm)];
  assert.deepEqual(rows.map(r => r[1]).sort(), operations.map(o => o.name).sort());
  for (const server of servers) {
    assert.ok(entry.includes(`](references/servers/${server.slug}.md)`));
    const index = await readFile(join(root, `skills/aisa-api/references/servers/${server.slug}.md`), 'utf8');
    const ids = [...index.matchAll(/^- \[([^\]]+)\]\(\.\.\/operations\//gm)].map(r => r[1]);
    assert.deepEqual(ids.sort(), operations.filter(o => o.servers.includes(server.slug)).map(o => o.name).sort());
  }
  for (const op of operations) {
    const resource = referenceResources.find(r => r.uri === `skill://aisa-api/references/operations/${op.name}.md`);
    assert.ok(resource, op.name);
    const text = await readFile(join(root, resource.path), 'utf8');
    const contract = JSON.parse(text.match(/```json\n([\s\S]*?)\n```/)[1]);
    assert.equal(contract.operation_id, op.name);
    assert.equal(contract.description, op.description);
    assert.deepEqual(contract.arguments_schema, op.inputSchema);
    assert.deepEqual(contract.response_schema, op.outputSchema ?? {});
    assert.deepEqual(contract.annotations, op.annotations);
    assert.equal(contract.price.amount, null);
    assert.equal(contract.availability, 'unknown');
  }
  for (const workflow of skills.filter(s => s.kind === 'workflow')) {
    const text = await readFile(join(root, workflow.path), 'utf8');
    for (const id of workflow.uses) assert.ok(text.includes(`](../aisa-api/references/operations/${id}.md)`), workflow.name);
  }
  for (const resource of referenceResources) {
    const text = await readFile(join(root, resource.path), 'utf8');
    // JSON descriptions may contain provider-authored links. Validate only authored index links.
    if (resource.path.includes('/operations/')) continue;
    for (const [, target] of text.matchAll(/\]\(([^)]+)\)/g)) {
      if (/^https?:/.test(target)) continue;
      await readFile(resolve(root, dirname(resource.path), target));
    }
  }
});

test('category coverage includes whole servers and explicit cross-category tools', async (t) => {
  const root = await fixture(t);
  await generateSkills({ root });
  const { skills } = await json(join(root, 'catalog/skills.json'));
  const modules = YAML.parse(await readFile(join(root, 'upstream/modules.yaml'), 'utf8'));
  const { operations } = await json(join(root, 'catalog/operations.json'));
  for (const [slug, group] of [...Object.entries(modules.categories), ['gtm', modules.modules.gtm]]) {
    const entry = skills.find((skill) => skill.name === `aisa-${slug}`);
    assert.deepEqual(new Set(entry.uses), new Set(operations.filter((op) => op.servers.some((server) => group.servers.includes(server)) || (group.tools ?? []).includes(op.name)).map((op) => op.name)));
  }
  assert.ok(skills.find((entry) => entry.name === 'aisa-gtm').uses.includes('get_semrush_domain_overview'));
});

test('only prompt-enabled extra modules become category skills', async (t) => {
  const root = await fixture(t);
  const path = join(root, 'upstream/modules.yaml');
  const modules = YAML.parse(await readFile(path, 'utf8'));
  modules.modules.gtm.prompt = false;
  await writeFile(path, YAML.stringify(modules));
  assert.equal((await generateSkills({ root })).categories, 6);
  const { skills } = await json(join(root, 'catalog/skills.json'));
  assert.ok(!skills.some((entry) => entry.name === 'aisa-gtm'));
});

test('supporting text is preserved and generated field reference uses catalog schemas', async (t) => {
  const root = await fixture(t);
  await generateSkills({ root });
  const { resources } = await json(join(root, 'catalog/skills.json'));
  for (const [server, filename] of [['stock-pulse', 'reading-the-bundle'], ['twitter-api', 'topic-report-template']]) {
    const source = YAML.parse(await readFile(join(root, `upstream/resources/${server}/${filename}.yaml`), 'utf8'));
    const entry = resources.find((resource) => resource.uri === source.uri);
    assert.equal((await readFile(join(root, entry.path), 'utf8')).trim(), source.text.trim());
  }
  const fieldMap = resources.find((entry) => entry.uri.endsWith('/venue-field-map'));
  const text = await readFile(join(root, fieldMap.path), 'utf8');
  const { operations } = await json(join(root, 'catalog/operations.json'));
  for (const op of operations.filter((op) => op.servers.includes('prediction-market-data'))) {
    assert.ok(text.includes(JSON.stringify(op.inputSchema, null, 2)), op.name);
  }
});

test('invalid uses, composed operations, metadata and template inputs fail before output', async (t) => {
  const cases = [
    ['unknown operation', (cfg) => { cfg.uses.push('invented_composed_operation'); }, /unknown operation/],
    ['undeclared composed operation', (cfg) => { cfg.uses = cfg.uses.filter((id) => id !== 'instagram_profile_digest'); }, /missing from uses/],
    ['missing metadata', (cfg) => { delete cfg.skill.examples; }, /skill.examples/],
    ['undeclared input', (cfg) => { cfg.template += '\n{missing_input}'; }, /undeclared template input/],
    ['unused input', (cfg) => { cfg.arguments.push({ name: 'unused', description: 'Unused' }); }, /Unused template input/],
    ['bad braces', (cfg) => { cfg.template += '\n{"not": "escaped"}'; }, /template input/],
    ['duplicate argument', (cfg) => { cfg.arguments.push(cfg.arguments[0]); }, /duplicate argument/],
    ['unknown body tool', (cfg) => { cfg.template += '\nCall `get_nonexistent_aisa_api`.'; }, /unknown operation in template/],
  ];
  for (const [name, change, error] of cases) {
    await t.test(name, async (child) => {
      const root = await fixture(child);
      await mutateWorkflow(root, change);
      await assert.rejects(generateSkills({ root }), error);
      await assert.rejects(readFile(join(root, 'catalog/skills.json')), { code: 'ENOENT' });
    });
  }
});

test('invalid category tools and colliding workflow names fail', async (t) => {
  const root = await fixture(t);
  const path = join(root, 'upstream/modules.yaml');
  const modules = YAML.parse(await readFile(path, 'utf8'));
  modules.modules.gtm.tools.push('invented_tool');
  await writeFile(path, YAML.stringify(modules));
  await assert.rejects(generateSkills({ root }), /unknown tools operation/);
  modules.modules.gtm.tools.pop();
  await writeFile(path, YAML.stringify(modules));
  await mutateWorkflow(root, (cfg) => { cfg.name = 'research-brief'; });
  await assert.rejects(generateSkills({ root }), /Duplicate skill name/);
});

test('template conversion preserves literal JSON, empty defaults, and rejects malformed fields', () => {
  assert.equal(renderTemplate('Input {value}; JSON {{"a": {{"b": 1}}}}', [{ name: 'value' }]), 'Input <input: value>; JSON {"a": {"b": 1}}');
  for (const template of ['{value!r}', '{value.name}', '{value', '}']) {
    assert.throws(() => renderTemplate(template, [{ name: 'value' }]));
  }
});

test('generation is deterministic and failed regeneration preserves the previous output', async (t) => {
  const root = await fixture(t);
  await generateSkills({ root });
  const before = await readFile(join(root, 'catalog/skills.json'), 'utf8');
  const entry = JSON.parse(before).skills.find((skill) => skill.kind === 'workflow');
  const content = await readFile(join(root, entry.path), 'utf8');
  await generateSkills({ root });
  assert.equal(await readFile(join(root, 'catalog/skills.json'), 'utf8'), before);
  assert.equal(await readFile(join(root, entry.path), 'utf8'), content);
  await mutateWorkflow(root, (cfg) => { cfg.uses.push('unknown_operation'); });
  await assert.rejects(generateSkills({ root }));
  assert.equal(await readFile(join(root, 'catalog/skills.json'), 'utf8'), before);
});

test('regeneration removes deleted workflows, disabled categories and obsolete resource copies', async (t) => {
  const root = await fixture(t);
  await generateSkills({ root });
  const oldCatalog = await json(join(root, 'catalog/skills.json'));
  const removed = (await workflows(root)).find(({ cfg }) => cfg.name === 'creator_profile_snapshot');
  await rm(removed.path);
  const modulePath = join(root, 'upstream/modules.yaml');
  const modules = YAML.parse(await readFile(modulePath, 'utf8'));
  modules.modules.gtm.prompt = false;
  await writeFile(modulePath, YAML.stringify(modules));
  await rm(join(root, 'upstream/resources/twitter-api/topic-report-template.yaml'));
  await generateSkills({ root });
  const current = await json(join(root, 'catalog/skills.json'));
  const removedPaths = Object.keys(oldCatalog.generatedFiles).filter((path) => !(path in current.generatedFiles));
  assert.ok(removedPaths.some((path) => path.startsWith('skills/aisa-creator-profile-snapshot/')));
  assert.ok(removedPaths.includes('skills/aisa-gtm/references/operations.md'));
  assert.ok(removedPaths.some((path) => path.includes('aisa-topic-report-template.md')));
  for (const path of removedPaths) await assert.rejects(readFile(join(root, path)), { code: 'ENOENT' });
  await assert.rejects(readdir(join(root, 'skills/aisa-gtm')), { code: 'ENOENT' });
  for (const entry of [...current.skills, ...current.resources]) await readFile(join(root, entry.path));
});

test('cleanup preserves custom files, edited stale output and unrelated skill directories', async (t) => {
  const root = await fixture(t);
  await generateSkills({ root });
  const custom = 'skills/aisa-creator-profile-snapshot/my-notes.md';
  const edited = 'skills/aisa-creator-profile-snapshot/SKILL.md';
  await writeFile(join(root, custom), 'User notes');
  await writeFile(join(root, edited), 'User-edited skill');
  await mkdir(join(root, 'skills/aisa-custom'));
  await writeFile(join(root, 'skills/aisa-custom/SKILL.md'), 'Independent skill');
  const removed = (await workflows(root)).find(({ cfg }) => cfg.name === 'creator_profile_snapshot');
  await rm(removed.path);
  const result = await generateSkills({ root });
  assert.deepEqual(result.preservedStaleFiles, [edited]);
  assert.equal(await readFile(join(root, custom), 'utf8'), 'User notes');
  assert.equal(await readFile(join(root, edited), 'utf8'), 'User-edited skill');
  assert.equal(await readFile(join(root, 'skills/aisa-custom/SKILL.md'), 'utf8'), 'Independent skill');
  // Preserved files are no longer claimed by the generator on later runs.
  await generateSkills({ root });
  assert.equal(await readFile(join(root, edited), 'utf8'), 'User-edited skill');
});

test('failed validation does not clean obsolete artifacts', async (t) => {
  const root = await fixture(t);
  await generateSkills({ root });
  const removed = (await workflows(root)).find(({ cfg }) => cfg.name === 'enrich_lead_list');
  await rm(removed.path);
  await mutateWorkflow(root, (cfg) => { cfg.uses.push('invalid_tool'); });
  await assert.rejects(generateSkills({ root }));
  await readFile(join(root, 'skills/aisa-enrich-lead-list/SKILL.md'));
});

test('cleanup rejects traversal in the manifest and never follows linked stale directories', async (t) => {
  const root = await fixture(t);
  await generateSkills({ root });
  const path = join(root, 'catalog/skills.json');
  const catalog = await json(path);
  const original = JSON.stringify(catalog);
  catalog.generatedFiles['skills/aisa-api/../../outside.md'] = '0'.repeat(64);
  await writeFile(path, JSON.stringify(catalog));
  await writeFile(join(root, 'outside.md'), 'Keep outside');
  await assert.rejects(generateSkills({ root }), /Invalid managed output/);
  assert.equal(await readFile(join(root, 'outside.md'), 'utf8'), 'Keep outside');
  await writeFile(path, original);
  const removed = (await workflows(root)).find(({ cfg }) => cfg.name === 'enrich_lead_list');
  await rm(removed.path);
  const folder = join(root, 'skills/aisa-enrich-lead-list');
  const external = await mkdtemp(join(tmpdir(), 'aisa-skills-outside-'));
  t.after(() => rm(external, { recursive: true, force: true }));
  await cp(folder, external, { recursive: true });
  const before = await readFile(join(external, 'SKILL.md'), 'utf8');
  await rm(folder, { recursive: true });
  await symlink(external, folder, 'dir');
  const result = await generateSkills({ root });
  assert.ok(result.preservedStaleFiles.includes('skills/aisa-enrich-lead-list/SKILL.md'));
  assert.equal(await readFile(join(external, 'SKILL.md'), 'utf8'), before);
});

test('generation refuses linked output directories before writing any files', async (t) => {
  const root = await fixture(t);
  await generateSkills({ root });
  const before = await readFile(join(root, 'catalog/skills.json'), 'utf8');
  const folder = join(root, 'skills/aisa-api');
  const external = await mkdtemp(join(tmpdir(), 'aisa-skills-write-outside-'));
  t.after(() => rm(external, { recursive: true, force: true }));
  await writeFile(join(external, 'SKILL.md'), 'External skill');
  await rm(folder, { recursive: true });
  await symlink(external, folder, 'dir');
  await assert.rejects(generateSkills({ root }), /Refusing linked output/);
  assert.equal(await readFile(join(external, 'SKILL.md'), 'utf8'), 'External skill');
  assert.equal(await readFile(join(root, 'catalog/skills.json'), 'utf8'), before);
});

test('legacy catalogs adopt current outputs without deleting untracked files', async (t) => {
  const root = await fixture(t);
  await generateSkills({ root });
  const path = join(root, 'catalog/skills.json');
  const legacy = await json(path);
  delete legacy.generatedFiles;
  await writeFile(path, JSON.stringify(legacy));
  await mkdir(join(root, 'skills/aisa-old'));
  await writeFile(join(root, 'skills/aisa-old/SKILL.md'), 'Untracked legacy file');
  await generateSkills({ root });
  assert.ok(Object.keys((await json(path)).generatedFiles).length > 25);
  assert.equal(await readFile(join(root, 'skills/aisa-old/SKILL.md'), 'utf8'), 'Untracked legacy file');
});
