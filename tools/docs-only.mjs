import { readFileSync } from 'node:fs';
// Used only after the runtime workspace exists; tool/config/skill changes run prototype.
const paths = readFileSync(0, 'utf8').trim().split('\n').filter(Boolean);
const docsOnly = paths.length > 0 && paths.every(path =>
  path === 'README.md' || ((path.startsWith('docs/') || path.startsWith('specs/')) && path.endsWith('.md')));
process.exitCode = docsOnly ? 0 : 1;
