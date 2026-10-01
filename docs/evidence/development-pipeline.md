# Development pipeline preparation — 2026-10-01

- Scope: repository instructions, three skills, setup, verification runner and CI.
- Source baseline: Shwedsky/Noxy main d929d5c66b595ca44be624d65889ff4ad2a2965a.
- Tested: local working-tree changes for chore/codex-development-pipeline, including
  new files. GitHub Actions records the published candidate revision separately.
- Environment: Linux, Node v24.19.0, Python 3.12 (skill/YAML validation only).
- Game implementation / S01 measurements: outside this change.

## Observed evidence
- PASS: node tools/setup.mjs — foundation-only path, no fake dependency install.
- PASS: node tools/verify.mjs foundation — repository contract and 8 runner tests.
- PASS: each skill passed skill-creator quick_validate.py; YAML workflow parsed.
- PASS: git diff --check.
- PASS: prototype, milestone and release each return exit 2 / UNVERIFIED when
  their real commands are absent; this verifies the guard, not runtime gameplay.
- PASS: browser setup before S01 refuses to pretend a browser was installed.
- PASS: five CI docs-only classifications (docs, tooling, game, empty, mixed).

The runner tests cover command output/log capture, nonzero exit and later checks
not run, unavailable executable, timeout, invalid config, cumulative gates, and
grandchild termination. The final case starts an actual heartbeat-writing child
and verifies that it stops after timeout.

## Independent review
Fresh read-only reviewer used the game-review skill on the full diff/new files.
Initial finding: P2, timeout killed a command but could leave its child processes
alive. Replaced synchronous execution with a process group and bounded async
execution; added a regression test. Targeted fresh re-review: READY_FOR_MERGE
for the setup scope. Reviewer reran all 8 tests and independently verified child
cleanup after a successful top-level exit. No further defects found.

## Limits and next step
- UNVERIFIED here: GitHub-hosted execution; consult this PR's Actions result.
- UNVERIFIED: npm ci / Playwright installation against the future S01 workspace.
- UNVERIFIED: all gameplay, real mobile and Telegram checks; no game exists yet.
- Branch protection and the user's Codex environment settings were not modified.
- Next: select this branch (or merge PR), set Node 24 and run tools/setup.mjs;
  start S01 using docs/DEVELOPMENT.md when ready.
