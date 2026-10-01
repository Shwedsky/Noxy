# Noxy development contract

Optimize for a working, reviewable game and short feedback loops.

## Read and scope
Read README.md, docs/ROADMAP.md, the active spec, and relevant sections of
docs/GDD.md and docs/ARCHITECTURE.md. Read docs/DEVELOPMENT.md for the workflow.
Implement the requested spec or explicitly named batch of at most 2–3 adjacent
specs, including necessary enabling changes. Do not expand scope to the roadmap.
If requirements conflict, report the exact conflict; continue independent work.
Keep commits focused and avoid speculative abstractions or unrelated redesigns.

## Product and architecture
- Portrait 9:16, mobile-first Telegram Mini App, stylized 3D, swipe controls.
- RU first with localization keys; male/female from the first playable release.
- Two currencies; no ads, stamina or monetization in v1; in-game rewards only.
- Noxygen branding must not invent medical claims from power-up effects.
- Select the final engine only after S01 evidence; compare both mandatory candidates.
- Keep valuable persistent state server-authoritative. Never trust client identity,
  prices or reward amounts. Never ship bot tokens or backend secrets in the client.
- Keep gameplay separate from account state and future mode rules; prefer useful
  data-driven content, not empty architecture. Avoid unbounded runtime allocation.
- Explain major dependencies and avoid overlapping libraries for the same concern.

## Workflows
Use repo skills in .agents/skills; read the SKILL.md directly if discovery is absent:
- game-spec: implement a scoped feature/fix and its relevant verification.
- game-review: independently review spec, diff and evidence; default read-only.
- release-gate: verify a named milestone or release candidate.

Before editing, identify branch/base, scope, ACs and the smallest useful checks.
For implementation, use one author. After the patch stabilizes, request one fresh
read-only reviewer/subagent with spec, base/head and raw evidence. Do not feed it
the author's verdict. If subagents are unavailable, record REVIEW_PENDING and
provide a separate review task; do not call self-review independent review.
Fix findings and rerun only affected checks; review relevant changed code again.
Do not spawn parallel writers on shared files. Do not run endless reviewer loops.

## Commands and gates
From repository root, Node 24 LTS on Linux/WSL/macOS:
- node tools/setup.mjs — install locked dependencies when present.
- node tools/verify.mjs foundation — workflow structure and tooling tests only.
- node tools/verify.mjs prototype — configured targeted automated checks.
- node tools/verify.mjs milestone — broader integration/browser checks.
- node tools/verify.mjs release — full configured automated suite.

Runtime profiles deliberately start unconfigured. S01 must register real commands
in tools/verification.json and add a root npm workspace/lockfile before CI can
verify runtime code. Missing commands fail closed; never use --if-present or
placeholder success scripts to turn a required check green. Every code-changing
PR runs prototype checks once a root package.json exists; milestones/releases add
their own checks. Pure docs changes use foundation. Full device testing is for
milestones, release candidates and platform-sensitive fixes, not every small edit.

## Evidence and completion
No acceptance criterion may be marked PASS without evidence. Code existence is
not runtime evidence. Use PASS / FAIL / UNVERIFIED / NOT_APPLICABLE with reasons.
For logic use meaningful assertions; for visible behavior use rendered before/after
states or a recording; for performance use measurements with device/build details.
A static screenshot cannot prove an animation or restart; mobile emulation cannot
prove phone FPS or Telegram compatibility. Human playtesting checks game feel.
Keep exact commands, tested revision, environment and durable artifact links in
docs/evidence/ using docs/templates/evidence.md. Do not commit generated bulky logs.
Required missing evidence means partial/unverified, even when CI passes. An owner
may defer a check to continue work; retain the open item and never relabel it PASS.

## Git and handoff
Use feature/sXX-short-name or fix/short-name; tooling may use chore/short-name.
Batch adjacent specs only when requested; one spec need not mean a separate PR.
Never force-push main, merge or deploy without authorization for that action.
Report outcome, AC evidence, checks, limitations and the single next step in Russian.
Stop after the authorized slice; only detail the next 2–3 specs when requested.
