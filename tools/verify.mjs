import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const profileOrder = ['foundation', 'prototype', 'milestone', 'release'];

export function selectChecks(config, profile) {
  const index = profileOrder.indexOf(profile);
  if (index < 0) throw new Error('Unknown profile: ' + profile);
  if (config.version !== 1 || !config.profiles) throw new Error('Invalid verification config');
  const checks = [];
  const ids = new Set();
  for (const name of profileOrder.slice(0, index + 1)) {
    const entries = config.profiles[name];
    if (!Array.isArray(entries) || entries.length === 0)
      throw new Error('UNVERIFIED: ' + name + ' has no commands. Register real checks in tools/verification.json.');
    for (const check of entries) {
      if (!/^[a-z0-9-]+$/.test(check.id ?? '') || ids.has(check.id))
        throw new Error('Invalid or duplicate check id: ' + check.id);
      if (!Array.isArray(check.command) || check.command.length === 0 ||
          check.command.some(arg => typeof arg !== 'string' || !arg.length))
        throw new Error('Invalid command: ' + check.id);
      if (!Number.isInteger(check.timeoutSeconds) || check.timeoutSeconds < 1 || check.timeoutSeconds > 1800)
        throw new Error('timeoutSeconds must be 1..1800: ' + check.id);
      ids.add(check.id);
      checks.push(check);
    }
  }
  return checks;
}

function execute(check, cwd) {
  return new Promise(resolveResult => {
    const child = spawn(check.command[0], check.command.slice(1), {
      cwd, detached: true, shell: false,
      env: { ...process.env, CI: process.env.CI ?? '1' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '', stderr = '', error = null, bytes = 0;
    const killGroup = () => {
      if (!child.pid) return;
      try { process.kill(-child.pid, 'SIGKILL'); }
      catch (problem) { if (problem.code !== 'ESRCH') error ??= problem; }
    };
    const timer = setTimeout(() => {
      error = new Error('ETIMEDOUT: check exceeded ' + check.timeoutSeconds + ' seconds');
      killGroup();
    }, check.timeoutSeconds * 1000);
    const collect = (chunk, isError) => {
      bytes += Buffer.byteLength(chunk);
      if (bytes > 32 * 1024 * 1024) {
        error ??= new Error('ENOBUFS: check output exceeded 32 MiB');
        killGroup();
      } else if (isError) stderr += chunk;
      else stdout += chunk;
    };
    child.stdout.setEncoding('utf8').on('data', chunk => collect(chunk, false));
    child.stderr.setEncoding('utf8').on('data', chunk => collect(chunk, true));
    child.on('error', problem => { error ??= problem; });
    // A check must own its server/browser lifecycle; do not leave background
    // grandchildren alive even when its top-level process exits successfully.
    child.on('exit', killGroup);
    child.on('close', (status, signal) => {
      clearTimeout(timer);
      resolveResult({ status, signal, error, stdout, stderr });
    });
  });
}

export async function runChecks(checks, cwd, outputDir) {
  if (process.platform === 'win32') throw new Error('Use WSL2 for process-group cleanup.');
  mkdirSync(outputDir, { recursive: true });
  const results = [];
  for (const check of checks) {
    const started = Date.now();
    const result = await execute(check, cwd);
    const passed = result.status === 0 && !result.error && !result.signal;
    const log = join(outputDir, check.id + '.log');
    writeFileSync(log, (result.stdout ?? '') + (result.stderr ?? '') +
      (result.error ? '\n' + result.error.message : ''));
    const item = { id: check.id, command: check.command, status: passed ? 'PASS' : 'FAIL',
      exitCode: result.status, signal: result.signal, error: result.error?.message ?? null,
      durationMs: Date.now() - started, log };
    results.push(item);
    console.log(item.status + ' ' + item.id + ' (' + item.durationMs + 'ms)');
    if (!passed) {
      console.error((result.stderr || result.stdout || result.error?.message || 'Process failed').slice(-6000));
      break;
    }
  }
  return { status: results.length === checks.length && results.every(r => r.status === 'PASS') ? 'PASS' : 'FAIL',
    checks: results, notRun: checks.slice(results.length).map(c => c.id) };
}

export async function main(args = process.argv.slice(2)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  if (args.length !== 1 || !profileOrder.includes(args[0])) {
    console.error('Usage: node tools/verify.mjs foundation|prototype|milestone|release');
    return 2;
  }
  const profile = args[0];
  const outputDir = join(root, 'artifacts', 'verification', profile + '-' + Date.now());
  mkdirSync(outputDir, { recursive: true });
  const git = (...argv) => spawnSync('git', argv, { cwd: root, encoding: 'utf8' });
  const head = git('rev-parse', 'HEAD');
  const status = git('status', '--porcelain');
  const report = { profile, timestamp: new Date().toISOString(),
    revision: head.status === 0 ? head.stdout.trim() : null,
    dirty: status.status === 0 ? Boolean(status.stdout.trim()) : null,
    environment: { node: process.version, platform: process.platform, arch: process.arch } };
  let code;
  try {
    const config = JSON.parse(readFileSync(join(root, 'tools/verification.json'), 'utf8'));
    const checks = selectChecks(config, profile);
    Object.assign(report, await runChecks(checks, root, outputDir));
    code = report.status === 'PASS' ? 0 : 1;
  } catch (error) {
    report.status = 'UNVERIFIED';
    report.error = error.message;
    console.error(error.message);
    code = 2;
  }
  writeFileSync(join(outputDir, 'summary.json'), JSON.stringify(report, null, 2) + '\n');
  console.log('Report: ' + join(outputDir, 'summary.json'));
  if (code === 0) console.log('Configured automation passed. AC/device/review acceptance is a separate decision.');
  return code;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href)
  process.exitCode = await main();
