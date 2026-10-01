# Evidence — SPEC / milestone

Copy to docs/evidence/<spec-or-milestone>.md and replace placeholders.
Keep it short; record observations, not confidence or a long task diary.

- Scope / source spec:
- Gate: foundation / prototype / milestone / release
- Tested commit/build:
- Working tree clean? If not, describe the tested diff and later edits:
- Environment: OS, runtime, browser, device, Telegram version where relevant
- Summary: complete / partial / blocked

## Acceptance criteria
Repeat for every AC, preserving the spec's wording:
- AC:
- Status: PASS / FAIL / UNVERIFIED / NOT_APPLICABLE
- Evidence: exact test/assertion or observed behavior plus file/artifact URL
- Limitation or next verification step:

Use NOT_APPLICABLE only for a genuinely out-of-scope criterion and explain why.
An unavailable phone or browser is UNVERIFIED, not NOT_APPLICABLE.

## Commands and observed results
- Command, exit code, result, log URL:
- Screenshots/recording with before/after or action sequence:
- Measurements: build, device, duration, sample count, observed values and budget:

CI artifacts expire; preserve decisive evidence at durable URLs.
A screenshot must show the claim; do not infer motion/performance from one frame.

## Independent review
- Reviewer/thread and reviewed base/head:
- Verdict and findings:
- Fixes and targeted recheck:
- Missing independent reviewer: REVIEW_PENDING

## Open items
- Required missing checks and whether owner explicitly deferred them:
- Known placeholders / risks:
- Minimal manual game-feel or device check still needed:
- Next step:
