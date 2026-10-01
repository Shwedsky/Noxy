import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { selectChecks, runChecks } from '../verify.mjs';

const command = (id, source, timeoutSeconds = 5) => ({ id, command: [process.execPath, '-e', source], timeoutSeconds });
const check = command('valid', 'console.log("actual output")');
const config = { version: 1, profiles: { foundation: [check], prototype: [], milestone: [], release: [] } };

test('runtime gates reject empty profiles and never treat foundation as gameplay proof', () => {
  assert.throws(() => selectChecks(config, 'prototype'), /UNVERIFIED/);
  assert.throws(() => selectChecks(config, 'release'), /UNVERIFIED/);
  assert.throws(() => selectChecks(config, 'typo'), /Unknown/);
});
test('milestone includes lower gates exactly once and rejects duplicate IDs', () => {
  const ready = structuredClone(config);
  ready.profiles.prototype = [command('runtime', 'void 0')];
  ready.profiles.milestone = [command('browser', 'void 0')];
  assert.deepEqual(selectChecks(ready, 'milestone').map(c => c.id), ['valid', 'runtime', 'browser']);
  ready.profiles.milestone = [check];
  assert.throws(() => selectChecks(ready, 'milestone'), /duplicate/);
});
test('rejects malformed command and timeout instead of skipping the check', () => {
  for (const invalid of [{ ...check, command: [] }, { ...check, timeoutSeconds: 0 }]) {
    assert.throws(() => selectChecks({ version: 1, profiles: { foundation: [invalid] } }, 'foundation'));
  }
});
async function withOutput(fn) {
  const dir = mkdtempSync(join(tmpdir(), 'noxy-verify-'));
  try { await fn(dir); } finally { rmSync(dir, { recursive: true, force: true }); }
}
test('executes checks and saves their actual output', () => withOutput(async dir => {
  const result = await runChecks([check], process.cwd(), dir);
  assert.equal(result.status, 'PASS');
  assert.match(readFileSync(result.checks[0].log, 'utf8'), /actual output/);
}));
test('nonzero exit fails and later checks are explicitly not run', () => withOutput(async dir => {
  const result = await runChecks([command('bad', 'process.exit(7)'), check], process.cwd(), dir);
  assert.equal(result.status, 'FAIL');
  assert.equal(result.checks[0].exitCode, 7);
  assert.deepEqual(result.notRun, ['valid']);
}));
test('unavailable executable fails', () => withOutput(async dir => {
  const result = await runChecks([{ ...check, command: ['noxy-command-that-does-not-exist'] }], process.cwd(), dir);
  assert.equal(result.status, 'FAIL');
  assert.match(result.checks[0].error, /ENOENT/);
}));
test('hung check times out and fails', () => withOutput(async dir => {
  const result = await runChecks([command('hung', 'setInterval(() => {}, 1000)', 1)], process.cwd(), dir);
  assert.equal(result.status, 'FAIL');
  assert.match(result.checks[0].error, /ETIMEDOUT/);
}));

test('timeout stops grandchildren that would otherwise keep a preview port open', () => withOutput(async dir => {
  const heartbeat = join(dir, 'heartbeat');
  const source = `const {spawn}=require('node:child_process');
    const childSource = ${JSON.stringify("const fs=require('node:fs'); setInterval(()=>fs.appendFileSync(process.argv[1], '.'), 20)")};
    spawn(process.execPath, ['-e', childSource, ${JSON.stringify(heartbeat)}], {stdio:'ignore'});
    setInterval(()=>{},1000);`;
  const result = await runChecks([command('tree', source, 1)], process.cwd(), dir);
  assert.equal(result.status, 'FAIL');
  const before = readFileSync(heartbeat, 'utf8');
  assert.ok(before.length > 0, 'grandchild actually ran');
  await new Promise(resolve => setTimeout(resolve, 150));
  assert.equal(readFileSync(heartbeat, 'utf8'), before, 'grandchild must stop writing after timeout');
}));
