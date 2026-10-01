import { existsSync, readFileSync } from 'node:fs';
import { selectChecks } from './verify.mjs';

const required = [
  'AGENTS.md', 'README.md', 'docs/DEVELOPMENT.md', 'docs/ROADMAP.md',
  'docs/GDD.md', 'docs/ARCHITECTURE.md', 'specs/S01-engine-spike.md',
  'docs/templates/evidence.md', 'tools/setup.mjs', 'tools/verification.json',
  '.github/workflows/verify.yml', '.github/pull_request_template.md', '.nvmrc',
];
for (const path of required) if (!existsSync(path)) throw new Error('Missing ' + path);
for (const name of ['game-spec', 'game-review', 'release-gate']) {
  const path = '.agents/skills/' + name;
  const skill = readFileSync(path + '/SKILL.md', 'utf8');
  if (!skill.startsWith('---\nname: ' + name + '\ndescription: ') || !skill.includes('\n---\n'))
    throw new Error('Invalid skill frontmatter: ' + name);
  if (/\bTODO\b/.test(skill)) throw new Error('Unfinished skill: ' + name);
  const ui = readFileSync(path + '/agents/openai.yaml', 'utf8');
  if (!ui.includes('$' + name)) throw new Error('Skill UI prompt does not invoke ' + name);
}
const config = JSON.parse(readFileSync('tools/verification.json', 'utf8'));
selectChecks(config, 'foundation');
if (['apps', 'packages', 'spikes'].some(path => existsSync(path)) && !existsSync('package.json'))
  throw new Error('Runtime directories require a root npm workspace; foundation alone is insufficient.');
if (Number(process.versions.node.split('.')[0]) !== 24) throw new Error('Use Node 24 LTS');
if (existsSync('package.json') && !existsSync('package-lock.json'))
  throw new Error('Runtime dependencies need a root npm lockfile.');
console.log('Foundation contract is valid; runtime behavior is not checked here.');
