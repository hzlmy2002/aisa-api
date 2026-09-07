import test from 'node:test';
import {testPackageRoot} from './isolate-env.mjs';
const install = (client, options = {}) => installPackage(client, {packageRoot: testPackageRoot, ...options});
import assert from 'node:assert/strict';
import {promises as fs} from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {install as installPackage} from '../dist/install.js';
import TOML from '@iarna/toml';
import YAML from 'yaml';
for(const client of ['codex','claude-code','hermes']) test(`${client}: install, idempotent update, preserve other config, uninstall`,async()=>{
 const home=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'aisa-install-')));
 try{
 const cfg=client==='codex'?'.codex/config.toml':client==='hermes'?'.hermes/config.yaml':'.claude.json';
 const file=path.join(home,cfg);await fs.mkdir(path.dirname(file),{recursive:true});
 const other={unrelated:'keep',...(client==='claude-code'?{mcpServers:{other:{command:'other'}}}:{mcp_servers:{other:{command:'other'}}})};
 const encode=client==='codex'?TOML.stringify:client==='hermes'?YAML.stringify:JSON.stringify;
 const decode=client==='codex'?TOML.parse:client==='hermes'?YAML.parse:JSON.parse;
 await fs.writeFile(file,encode(other));
 const result=await install(client,{home});await install(client,{home});
 assert.equal(decode(await fs.readFile(file,'utf8')).unrelated,'keep');
 assert.ok((await fs.readFile(path.join(result.skill,'aisa-api/SKILL.md'),'utf8')).includes('aisa-api'));
 await install(client,{home,remove:true});
 assert.deepEqual(JSON.parse(JSON.stringify(decode(await fs.readFile(file,'utf8')))),other);
 }finally{await fs.rm(home,{recursive:true,force:true});}
});
test('new empty client config installs and modified skills are never overwritten',async()=>{
 const home=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'aisa-install-')));
 try{const r=await install('claude-code',{home});const skill=path.join(r.skill,'aisa-api/SKILL.md');await fs.writeFile(skill,'user edit');await assert.rejects(install('claude-code',{home}),/Preserving/);await assert.rejects(install('claude-code',{home,remove:true}),/Preserving/);assert.equal(await fs.readFile(skill,'utf8'),'user edit');}finally{await fs.rm(home,{recursive:true,force:true});}
});
test('symlink destination is refused',async()=>{
 const home=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'aisa-install-')));
 try{await fs.mkdir(path.join(home,'elsewhere'));await fs.symlink(path.join(home,'elsewhere'),path.join(home,'.agents'));await assert.rejects(install('codex',{home}),/symbolic link/);}finally{await fs.rm(home,{recursive:true,force:true});}
});
test('an identical but unowned skill is not adopted and later deleted',async()=>{
 const home=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'aisa-install-')));
 try{const target=path.join(home,'.agents/skills/aisa-api');await fs.mkdir(target,{recursive:true});await fs.copyFile(path.join(testPackageRoot,'skills/aisa-api/SKILL.md'),path.join(target,'SKILL.md'));await assert.rejects(install('codex',{home}),/unowned/);}finally{await fs.rm(home,{recursive:true,force:true});}
});
test('npm/npx installs persist a pinned command rather than disposable cache paths',async()=>{
 const {launchEntry}=await import('../dist/install.js');
 for(const client of ['codex','claude-code','hermes']){
 const entry=launchEntry(client,path.join('/temporary','npm-cache','_npx','hash','node_modules','@aisa','web-market'));
 assert.equal(entry.command,process.platform==='win32'?'npx.cmd':'npx');
 assert.deepEqual(entry.args,['-y','@hzlmy2002/aisa-api@0.1.0','serve']);
 assert.ok(!JSON.stringify(entry).includes('npm-cache'));
 }
});
for(const client of ['codex','claude-code','hermes']) test(`${client}: saved key survives setup and is absent from installer state`,async()=>{
 const home=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'aisa-key-')));
 try{
 const fake='test-only-credential';
 const result=await install(client,{home,resolveKey:async saved=>{assert.equal(saved,undefined);return fake;}});
 const decode=client==='codex'?TOML.parse:client==='hermes'?YAML.parse:JSON.parse;
 const config=decode(await fs.readFile(result.config,'utf8'));
 const entry=(config.mcp_servers??config.mcpServers)['aisa-api'];
 assert.deepEqual(entry.env,{AISA_API_KEY:fake});assert.equal(entry.env_vars,undefined);
 assert.ok(!(await fs.readFile(path.join(home,'.aisa/aisa-api',`${client}.json`),'utf8')).includes(fake));
 await install(client,{home,resolveKey:async saved=>{assert.equal(saved,fake);return saved;}});
 await install(client,{home});
 await install(client,{home,remove:true});
 await assert.rejects(fs.access(result.config), {code:'ENOENT'});
 }finally{await fs.rm(home,{recursive:true,force:true});}
});
test('cancelled credential prompt does not install skills or config',async()=>{
 const home=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'aisa-cancel-')));
 try{
 await assert.rejects(install('codex',{home,resolveKey:async()=>{throw Error('Setup cancelled.');}}),/cancelled/);
 await assert.rejects(fs.access(path.join(home,'.codex/config.toml')));
 await assert.rejects(fs.access(path.join(home,'.agents/skills/aisa-api/SKILL.md')));
 }finally{await fs.rm(home,{recursive:true,force:true});}
});
test('CLI fails promptly without a terminal/key and supports environment-based setup',async()=>{
 const {spawnSync}=await import('node:child_process');
 const home=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'aisa-cli-key-')));
 const env={...process.env};delete env.AISA_API_KEY;
 try{
 const args=['dist/cli.js','setup','--client','codex','--home',home];
 const missing=spawnSync(process.execPath,args,{env,encoding:'utf8',timeout:5000});
 assert.equal(missing.status,1);assert.match(missing.stderr,/interactive terminal/);
 const configured=spawnSync(process.execPath,args,{env:{...env,AISA_API_KEY:'environment-test-key'},encoding:'utf8',timeout:5000});
 assert.equal(configured.status,0,configured.stderr);
 const content=await fs.readFile(path.join(home,'.codex/config.toml'),'utf8');
 assert.ok(!content.includes('environment-test-key'));assert.match(content,/env_vars/);
 }finally{await fs.rm(home,{recursive:true,force:true});}
});

test('all bundled folders and binary assets install; unrelated skills coexist',async()=>{
 const home=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'aisa-multi-')));
 try {
  const other=path.join(home,'.agents/skills/aisa-web-market');
  await fs.mkdir(other,{recursive:true});await fs.writeFile(path.join(other,'SKILL.md'),'scene-agent skill');
  await install('codex',{home});
  assert.deepEqual(await fs.readFile(path.join(home,'.agents/skills/second-skill/asset.bin')),Buffer.from([0,255,128,10]));
  await install('codex',{home,remove:true,packageRoot:'/missing-package'});
  assert.equal(await fs.readFile(path.join(other,'SKILL.md'),'utf8'),'scene-agent skill');
  await assert.rejects(fs.access(path.join(home,'.agents/skills/second-skill')));
 } finally {await fs.rm(home,{recursive:true,force:true});}
});
for(const client of ['codex','claude-code','hermes']) test(`${client}: launch options and existing scene-agent entry survive setup`,async()=>{
 const home=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'aisa-options-')));
 try {
  const cfg=client==='codex'?'.codex/config.toml':client==='hermes'?'.hermes/config.yaml':'.claude.json';
  const encode=client==='codex'?TOML.stringify:client==='hermes'?YAML.stringify:JSON.stringify;
  const decode=client==='codex'?TOML.parse:client==='hermes'?YAML.parse:JSON.parse;
  const section=client==='claude-code'?'mcpServers':'mcp_servers';
  const old={command:'scene-agent',args:['serve']};
  await fs.mkdir(path.dirname(path.join(home,cfg)),{recursive:true});
  await fs.writeFile(path.join(home,cfg),encode({[section]:{'aisa-web-market':old}}));
  const options={home,modules:['search','finance'],server:'example',allTools:true,resolveKey:async()=>({oauthFile:path.join(home,'.aisa/aisa-api/oauth.json')})};
  await install(client,options);
  await install(client,{...options,resolveKey:undefined});
  const entries=decode(await fs.readFile(path.join(home,cfg),'utf8'))[section];
  assert.deepEqual(entries['aisa-web-market'],old);
  assert.deepEqual(entries['aisa-api'].args.slice(-5),['--modules','search,finance','--server','example','--all-tools']);
  assert.deepEqual(entries['aisa-api'].env,{AISA_AUTH_FILE:path.join(home,'.aisa/aisa-api/oauth.json')});
  await install(client,{home,remove:true});
  assert.deepEqual(decode(await fs.readFile(path.join(home,cfg),'utf8'))[section],{'aisa-web-market':old});
 } finally {await fs.rm(home,{recursive:true,force:true});}
});
test('late write failure rolls back skills and leaves no ownership record',async()=>{
 const home=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'aisa-rollback-')));
 try {
  await assert.rejects(install('codex',{home,resolveKey:async()=>{
   await fs.mkdir(path.join(home,'.codex/config.toml'),{recursive:true});return 'test-key';
  }}));
  await assert.rejects(fs.access(path.join(home,'.agents/skills/aisa-api/SKILL.md')));
  await assert.rejects(fs.access(path.join(home,'.aisa/aisa-api/codex.json')));
  await assert.rejects(fs.access(path.join(home,'.aisa/aisa-api/install.lock')));
 } finally {await fs.rm(home,{recursive:true,force:true});}
});
test('modified MCP entry blocks uninstall without removing owned skills',async()=>{
 const home=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'aisa-modified-')));
 try {
  await install('claude-code',{home});
  const file=path.join(home,'.claude.json');const cfg=JSON.parse(await fs.readFile(file,'utf8'));
  cfg.mcpServers['aisa-api'].args.push('--all-tools');await fs.writeFile(file,JSON.stringify(cfg));
  await assert.rejects(install('claude-code',{home,remove:true}),/modified/);
  await fs.access(path.join(home,'.claude/skills/aisa-api/SKILL.md'));
 } finally {await fs.rm(home,{recursive:true,force:true});}
});
