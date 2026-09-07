import test from 'node:test';
import assert from 'node:assert/strict';
import {promises as fs} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {detectClients} from '../dist/install.js';
import {sharedSetupKeyResolver} from '../dist/credentials.js';
import {catalog} from '../dist/catalog.js';
async function profile(run) {
 const home=await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(),'aisa-auto-')));
 try {await run(home);} finally {await fs.rm(home,{recursive:true,force:true});}
}
function setup(home,extra=[]) {
 return spawnSync(process.execPath,['dist/cli.js','setup','--home',home,...extra],{encoding:'utf8',timeout:5000,env:{...process.env,AISA_API_KEY:'test-environment-key'}});
}
test('detects none, single, multiple and all clients; ignores shared skills and wrong marker types',()=>profile(async home=>{
 await fs.mkdir(path.join(home,'.agents'));
 await fs.writeFile(path.join(home,'.codex'),'not a directory');
 assert.deepEqual(await detectClients(home),[]);
 await fs.writeFile(path.join(home,'.claude.json'),'{}');
 assert.deepEqual(await detectClients(home),['claude-code']);
 await fs.mkdir(path.join(home,'.claude'));
 await fs.mkdir(path.join(home,'.hermes'));
 assert.deepEqual(await detectClients(home),['claude-code','hermes']);
 await fs.rm(path.join(home,'.codex'));await fs.mkdir(path.join(home,'.codex'));
 assert.deepEqual(await detectClients(home),['codex','claude-code','hermes']);
}));
test('automatic CLI installs all detected clients and reruns successfully',()=>profile(async home=>{
 for(const dir of ['.codex','.claude','.hermes']) await fs.mkdir(path.join(home,dir));
 for(let i=0;i<2;i++){
 const result=setup(home);assert.equal(result.status,0,result.stderr);
 const lines=result.stdout.split('\n').filter(line=>line.startsWith('{')).map(JSON.parse);
 assert.deepEqual(lines.map(x=>x.client),['codex','claude-code','hermes']);
 for(const item of lines){await fs.access(item.config);assert.ok((await fs.readdir(item.skill)).length > 0);}
 }
}));
test('no detection leaves home untouched; explicit client works without detection',()=>profile(async home=>{
 const result=setup(home);assert.equal(result.status,1);assert.match(result.stderr,/No supported clients detected/);
 assert.deepEqual(await fs.readdir(home),[]);
 assert.equal(setup(home,['--client','hermes']).status,0);
 await assert.rejects(fs.access(path.join(home,'.codex')));
}));
test('one client failure does not block other detected clients',()=>profile(async home=>{
 await fs.mkdir(path.join(home,'.codex'));await fs.mkdir(path.join(home,'.hermes'));
 await fs.writeFile(path.join(home,'.codex/config.toml'),'invalid = [');
 const result=setup(home);assert.equal(result.status,1);assert.match(result.stderr,/codex:.*parsed/);
 assert.match(result.stdout,/"client":"hermes"/);
 assert.equal(await fs.readFile(path.join(home,'.codex/config.toml'),'utf8'),'invalid = [');
}));
test('credential prompt is shared once while existing client keys are preserved',async()=>{
 let prompts=0;const resolve=sharedSetupKeyResolver(async()=>{prompts++;return 'new-test-key';});
 assert.equal(await resolve('saved-test-key'),'saved-test-key');
 assert.equal(await resolve(),'new-test-key');assert.equal(await resolve(),'new-test-key');
 assert.equal(await resolve('different-saved-key'),'different-saved-key');assert.equal(prompts,1);
 const cancelled=sharedSetupKeyResolver(async()=>{throw Error('cancelled');});
 await assert.rejects(cancelled(),/cancelled/);await assert.rejects(cancelled(),/cancelled/);
});

test('CLI setup persists explicit surface options and rejects empty pins',()=>profile(async home=>{
 const module=Object.keys(catalog.modules.categories)[0];
 const server=catalog.servers[0].slug;
 const modules=`${module},${module}-all,account`;
 const result=setup(home,['--client','claude-code','--modules',modules,'--server',server,'--all-tools','--discovery-tools']);
 assert.equal(result.status,0,result.stderr);
 const cfg=JSON.parse(await fs.readFile(path.join(home,'.claude.json'),'utf8'));
 assert.deepEqual(cfg.mcpServers['aisa-api'].args.slice(-6),['--modules',modules,'--server',server,'--all-tools','--discovery-tools']);
 const before=await fs.readFile(path.join(home,'.claude.json'),'utf8');
 assert.equal(setup(home,['--client','claude-code','--modules','search,,finance']).status,1);
 assert.equal(await fs.readFile(path.join(home,'.claude.json'),'utf8'),before);
}));

for (const option of ['modules','server']) test(`invalid CLI --${option} fails before authentication or writes`,()=>profile(async home=>{
 const env={...process.env};delete env.AISA_API_KEY;delete env.AISA_AUTH_FILE;
 const run=()=>spawnSync(process.execPath,['dist/cli.js','setup','--home',home,'--client','claude-code','--auth','oauth',`--${option}`,'not-a-real-catalog-pin'],{encoding:'utf8',timeout:5000,env});
 const fresh=run();
 assert.equal(fresh.status,1);
 assert.match(fresh.stderr,new RegExp(`Unknown ${option === 'modules' ? 'module' : 'server'}:`));
 assert.deepEqual(await fs.readdir(home),[]);
 const config=path.join(home,'.claude.json');
 const auth=path.join(home,'.aisa/aisa-api/oauth.json');
 await fs.mkdir(path.dirname(auth),{recursive:true});
 await fs.writeFile(config,'{"mcpServers":{"other":{"command":"keep"}}}\n');
 await fs.writeFile(auth,'untouched auth sentinel');
 const beforeConfig=await fs.readFile(config,'utf8');
 const existing=run();
 assert.equal(existing.status,1);
 assert.match(existing.stderr,new RegExp(`Unknown ${option === 'modules' ? 'module' : 'server'}:`));
 assert.equal(await fs.readFile(config,'utf8'),beforeConfig);
 assert.equal(await fs.readFile(auth,'utf8'),'untouched auth sentinel');
 assert.deepEqual(await fs.readdir(path.dirname(auth)),['oauth.json']);
 assert.deepEqual((await fs.readdir(home)).sort(),['.aisa','.claude.json']);
}));
