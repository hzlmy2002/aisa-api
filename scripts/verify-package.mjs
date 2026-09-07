// Verify an npm-installed package in isolation. No login, network API, or real client writes.
import {mkdtemp, realpath, readFile, readdir, rm, writeFile, mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js';
const packageRoot = resolve(process.argv[2] ?? '/private/tmp/aisa-api-package-check/node_modules/@hzlmy2002/aisa-api');
const cli = join(packageRoot, 'dist/cli.js');
const home = await realpath(await mkdtemp(join(tmpdir(), 'aisa-package-home-')));
const env = {...process.env, HOME: home, USERPROFILE: home, AISA_API_KEY: 'fixture-install-only'};
delete env.AISA_AUTH_FILE;
const report = {node: process.version, package_root: packageRoot, skills_installed: 0, default_tool_count: 0, all_tool_count: 0, resource_read: false, uninstall_clean: false};
try {
  execFileSync(process.execPath, [cli, 'setup', '--client', 'codex', '--home', home, '--auth', 'key'], {env, stdio: 'pipe'});
  const config = await readFile(join(home, '.codex/config.toml'), 'utf8');
  const pkg = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8'));
  assert.ok(config.includes(`aisa-api@${pkg.version}`));
  assert.match(config, /npx/);
  report.skills_installed = (await readdir(join(home, '.agents/skills'))).length;
  assert.equal(report.skills_installed, 27);
  delete env.AISA_API_KEY;
  for (const all of [false, true]) {
    const transport = new StdioClientTransport({command: process.execPath, args: [cli, 'serve', ...(all ? ['--all-tools'] : [])], env, stderr: 'pipe'});
    const client = new Client({name: 'package-verification', version: '1.0.0'});
    try {
      await client.connect(transport);
      const {tools} = await client.listTools();
      if (all) {report.all_tool_count = tools.length; assert.equal(tools.length, 579);}
      else {
        report.default_tool_count = tools.length; assert.equal(tools.length, 4);
        const entry = await client.readResource({uri: 'skill://aisa-api/SKILL.md'});
        assert.ok(Buffer.byteLength(entry.contents[0].text) < 8192);
        const resource = await client.readResource({uri: 'skill://aisa-api/references/directory.md'});
        const rows = [...resource.contents[0].text.matchAll(/^\| `([^`]+)` \|/gm)];
        assert.equal(rows.length, 575);
        const local = await client.readResource({uri: 'skill://aisa-api/references/operations/get_agentmail_thread.md'});
        assert.ok(local.contents[0].text.includes('arguments_schema'));
        for (const [name, ref] of [['aisa-creator-outreach-list', 'discovery.md'], ['aisa-recent-topic-research', 'sources.md']]) {
          const installed = await readFile(join(home, '.agents/skills', name, 'references', ref), 'utf8');
          const served = await client.readResource({uri: `skill://${name}/references/${ref}`});
          assert.equal(served.contents[0].text, installed);
        }
        report.resource_read = true;
        const details = await client.callTool({name: 'get_details', arguments: {operation_id: 'get_agentmail_thread'}});
        assert.equal(JSON.parse(details.content[0].text).arguments_schema.properties.Authorization, undefined);
      }
    } finally {await client.close(); await transport.close();}
  }
  execFileSync(process.execPath, [cli, 'uninstall', '--client', 'codex', '--home', home], {env, stdio: 'pipe'});
  assert.deepEqual(await readdir(home), []);
  report.uninstall_clean = true;
  await mkdir('verification', {recursive: true});
  await writeFile('verification/package.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report));
} finally {await rm(home, {recursive: true, force: true});}
