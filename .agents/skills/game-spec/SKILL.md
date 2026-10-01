---
name: game-spec
description: Implement a scoped Noxy spec or gameplay fix with targeted checks and runtime evidence. Use for implementation, not standalone review or release approval.
---

1. Read root AGENTS.md, docs/DEVELOPMENT.md, the active spec and relevant design
   sections. Check current branch, dirty files and base revision before editing.
2. Extract every acceptance criterion; identify the observation that would prove
   it and the smallest relevant test. State the bounded scope and selected gate.
   Preserve unavailable device checks as UNVERIFIED; work on everything feasible.
3. Implement a playable thin slice. For S01 compare both required engines with
   equivalent scenes, record measurements and an ADR; do not build the backend.
   Wire real commands into tools/verification.json when introducing runtime code.
4. Run prototype checks and inspect changed visible behavior in a browser if
   available. Use real swipe/pointer input, inspect console errors, and verify
   rendered changes as well as internal values. For regressions test the failure
   path (caught, retry, pause/resume or restart) affected by the patch.
5. Repair demonstrated failures, then rerun affected checks. Do not repeatedly run
   full builds for unrelated reversible edits or write tests that mirror the code.
6. Follow the independent-review procedure in AGENTS.md using game-review. Give
   the reviewer raw spec/diff/evidence, not your conclusion. Fix material findings.
   Without a fresh reviewer, report REVIEW_PENDING and a separate review prompt.
7. Add a concise report from docs/templates/evidence.md; tie results to the tested
   revision and identify any later edits. Update only decisions/docs you changed.
   Do not mark a spec done with required unverified ACs or unresolved blockers.
8. Return a short Russian handoff with results, evidence and the next action.
   Do not merge, deploy, or start the next spec unless the user authorized it.
