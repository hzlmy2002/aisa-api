// Tests and their subprocesses must never use the developer's real credentials.
import {mkdtempSync, realpathSync, rmSync, mkdirSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
const home = realpathSync(mkdtempSync(path.join(tmpdir(), 'aisa-test-home-')));
process.env.HOME = home;
process.env.USERPROFILE = home;
delete process.env.AISA_API_KEY;
delete process.env.AISA_AUTH_FILE;
process.on('exit', () => rmSync(home, {recursive: true, force: true}));

// A small package fixture exercises multiple skills without relying on generated catalog assets.
export const testPackageRoot = path.join(home, 'package');
for (const name of ['aisa-api', 'second-skill']) {
  mkdirSync(path.join(testPackageRoot, 'skills', name), {recursive: true});
  writeFileSync(path.join(testPackageRoot, 'skills', name, 'SKILL.md'), `# ${name}\n`);
}
writeFileSync(path.join(testPackageRoot, 'skills', 'second-skill', 'asset.bin'), Buffer.from([0, 255, 128, 10]));
