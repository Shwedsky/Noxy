---
name: game-review
description: Independently review a Noxy spec or branch for defects, regressions and missing acceptance evidence. Use for review requests, not feature implementation.
---

1. Read AGENTS.md, docs/DEVELOPMENT.md, the active spec, exact base/head diff and
   raw evidence. Default to read-only; do not implement fixes or edit acceptance.
2. Trace changed behavior through its real entry point, state, renderer and reset
   path. Look for stale visuals, input/timing mistakes, duplicate listeners,
   unbounded objects, impossible track patterns, and state leaking across runs.
   Review auth, idempotency and account boundaries only when relevant.
3. Check every AC against its evidence. A unit test of a numeric value does not
   prove that its onscreen indicator changes. Screenshot existence alone is not
   proof. Confirm evidence revision and distinguish desktop, emulation and device.
4. Reproduce suspected defects with the smallest useful check where possible.
   Separate confirmed defects from plausible risks and unavailable validation.
   Never invent a defect to fill a quota or demand tests for unchanged low-risk code.
5. Report findings first: priority P0–P3, file/line, trigger, player impact, evidence
   and smallest fix direction. List missing AC evidence separately with its impact.
   If no defects are found, say so and state the limits of the review.
6. Give READY_FOR_MERGE, CHANGES_REQUIRED or REVIEW_INCOMPLETE. READY requires
   satisfied in-scope ACs and checks, not merely no obvious code issues. Report
   unavailable runtime/device checks explicitly. Review is not permission to merge
   or release, and a self-review is never an independent verdict.
