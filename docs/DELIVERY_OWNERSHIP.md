# Delivery Ownership

## Principle
Use Codex only where a real development checkout, build/runtime execution or substantial code implementation makes it materially more efficient.

ChatGPT handles project coordination and as much repository work as possible so Codex stays focused on implementation rather than planning/admin.

## Roles
### ChatGPT
Default owner of:
- product decomposition;
- technical planning;
- specifications;
- architecture decisions before implementation;
- GitHub documentation/issues;
- branch/PR review;
- diff review;
- acceptance criteria;
- small text/config/code changes possible through repository tools;
- merge decisions and merges after checks;
- backlog/roadmap maintenance;
- Codex prompts only when Codex is actually needed.

ChatGPT should not delegate repository administration to Codex when it can be done directly.

### Codex
Use for:
- local project scaffolding that requires package installation/build execution;
- engine spikes;
- implementation-heavy TypeScript/gameplay work;
- refactors spanning many source files;
- local automated tests/build/typecheck/lint;
- browser/runtime debugging where source modification and execution are iterative;
- asset-import/tooling code where repository checkout is necessary.

Codex should receive narrow specs with explicit non-goals and acceptance criteria.

### Owner
Owner intervention should be limited to actions that require human/device/account judgment:
- install/verify local tools;
- run the game on the real phone when requested;
- judge controls, visual quality and fun;
- provide screenshots/video/observations from physical-device tests;
- approve product decisions that materially change scope;
- provide private credentials/tokens through appropriate local/secret mechanisms if ever required;
- obtain/licence external art/audio assets when needed.

The owner should not be expected to manually administer branches, commits or PRs unless repository tooling is unavailable.

## Delivery workflow per spec
### 1. Prepare — ChatGPT
- inspect current `main`;
- review previous accepted state;
- create/update spec;
- decide whether Codex is needed;
- if no, implement directly where possible;
- if yes, create the branch/issue/PR framework when practical and prepare a focused Codex prompt.

### 2. Implement — ChatGPT or Codex
Use the least expensive capable executor.

Examples:
- docs/config/small repository change -> ChatGPT;
- working 3D runtime feature + build/test loop -> Codex.

### 3. Automated verification — primarily Codex for code tasks
Expected where applicable:
- install succeeds;
- typecheck;
- lint;
- unit tests;
- production build;
- smoke launch;
- performance measurements requested by the spec.

### 4. Repository review — ChatGPT
- inspect commit/PR state;
- review changed files/diff;
- compare against spec;
- check test evidence;
- request or directly apply small corrections where appropriate.

### 5. Human gameplay/device review — Owner
Only when the task affects runtime feel/visuals/device behavior.

ChatGPT provides a short concrete checklist rather than asking the owner to explore randomly.

### 6. Merge — ChatGPT
When acceptance criteria and required human checks pass:
- merge PR;
- verify `main` advanced;
- update roadmap/spec status if required;
- define next task.

## When Codex is NOT needed
Prefer ChatGPT-only work for:
- GDD/spec edits;
- roadmap changes;
- architecture documentation;
- GitHub issue/PR administration;
- small static configuration updates;
- review and acceptance decisions;
- prompt preparation;
- simple fixes that can be safely applied and reviewed without a local runtime.

## When Codex IS needed
Strong candidates:
- S01 engine spike;
- initial game scaffold after engine choice;
- player controller/gameplay loops;
- procedural track/runtime pooling;
- animation/asset loading implementation;
- complex IndexedDB persistence/migrations once production code exists;
- performance investigations requiring profiling and repeated local runs.

## Current next sequence
1. ChatGPT: update browser-first baseline and tooling docs — current task.
2. Owner: verify required local tools; install only missing required items.
3. ChatGPT: inspect environment results and finalize S01 execution plan.
4. ChatGPT: prepare S01 branch/task/prompt.
5. Codex: execute only the engine spike and local measurements it can perform.
6. Owner: perform one real-phone comparison using exact instructions.
7. ChatGPT: review evidence, select engine, merge accepted S01.
8. ChatGPT: author S02 Browser Project Foundation spec.
9. Codex: scaffold production game project and build pipeline.
10. ChatGPT + Owner: verify, review and merge.

After S02, repeat the same narrow-spec cycle for gameplay stages.
