---
name: release-gate
description: Verify a named Noxy milestone or release candidate with integration, browser, device and performance evidence. Do not use for routine small feature edits.
---

1. Read AGENTS.md, docs/DEVELOPMENT.md, the named roadmap gate and its specs.
   Identify the exact candidate revision, build, device matrix and deferred checks.
   Do not apply the full future product scope to an internal prototype milestone.
2. Run node tools/verify.mjs milestone or release, as appropriate. Check that the
   configured commands cover the actual scope; a green empty suite is invalid.
3. Inspect the production build: launch, swipe input, pause/resume, game over,
   repeated restart, resize/safe areas and no serious console errors. Exercise only
   implemented features; test persistence/retry/idempotency when in gate scope.
4. Measure startup, transferred payload, FPS/frame spikes and resource growth
   against the budgets recorded by S01. Use a several-minute repeatable run.
   Label headless software rendering, desktop emulation and physical devices.
   Never extrapolate an emulated FPS result into a phone/Telegram PASS.
5. Obtain actual device/Telegram evidence where required. If unavailable, finish
   all feasible checks, provide exact device steps and retain UNVERIFIED. Never
   ask the user to rerun automated checks you can run yourself.
6. Check independent review and unresolved findings on the candidate revision.
   Record a report from docs/templates/evidence.md with RELEASE_READY,
   MILESTONE_READY, CHANGES_REQUIRED or GATE_INCOMPLETE and supporting evidence.
   Missing required evidence blocks a ready verdict. Do not merge, publish, alter
   production bot settings or deploy without the user's authorization.
