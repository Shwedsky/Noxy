import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (args.some(arg => !['--browser', '--browser-with-deps'].includes(arg)) || args.length > 1)
  throw new Error('Usage: node tools/setup.mjs [--browser|--browser-with-deps]');
if (Number(process.versions.node.split('.')[0]) !== 24)
  throw new Error('Use Node 24 LTS (.nvmrc).');
if (process.platform === 'win32')
  throw new Error('Run setup in WSL2; this repo uses the same Linux toolchain as CI.');
function run(command, argv) {
  const result = spawnSync(command, argv, { cwd: root, stdio: 'inherit' });
  if (result.error || result.status !== 0)
    throw new Error(command + ' failed: ' + (result.error?.message ?? result.status));
}
if (!existsSync(join(root, 'package.json'))) {
  if (args.length) throw new Error('Browser install unavailable: S01 has not added locked Playwright dependencies.');
  console.log('Foundation only: no runtime dependencies yet. No game or browser was installed.');
} else {
  if (!existsSync(join(root, 'package-lock.json')))
    throw new Error('Missing root package-lock.json. Commit a reproducible npm workspace lockfile.');
  run('npm', ['ci', '--no-audit', '--no-fund']);
  if (args.length) {
    const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
    if (!pkg.devDependencies?.['@playwright/test'] && !pkg.devDependencies?.playwright)
      throw new Error('Declare Playwright in root devDependencies and lock it before browser setup.');
    const cli = join(root, 'node_modules', '.bin', 'playwright');
    if (!existsSync(cli)) throw new Error('Locked local Playwright CLI not found.');
    run(cli, ['install', ...(args[0] === '--browser-with-deps' ? ['--with-deps'] : []), 'chromium']);
  }
}
run(process.execPath, ['tools/verify.mjs', 'foundation']);
