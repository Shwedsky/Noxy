# AGENTS.md

## Purpose
This repository is developed incrementally with AI assistance. ChatGPT owns planning/review/repository coordination by default. Codex is used selectively for implementation-heavy work that benefits from a real checkout, build tools and local runtime execution.

Agents must optimize for a working, reviewable game rather than maximum code volume.

## Source of truth
Read before implementation:
1. README.md
2. docs/GDD.md
3. docs/ARCHITECTURE.md
4. docs/ROADMAP.md
5. docs/TOOLING.md
6. docs/DELIVERY_OWNERSHIP.md
7. the active spec in specs/

If a spec conflicts with an older general document, report the conflict unless the spec explicitly supersedes that decision.

## Scope discipline
- Implement only the active spec and required enabling changes.
- Do not silently implement future roadmap features.
- Do not redesign unrelated systems.
- Avoid speculative abstractions.
- Keep commits focused.

## Product rules
- Portrait 9:16.
- Browser-first and mobile-first.
- Telegram is a later integration target using the same web build.
- Swipe input.
- No stamina.
- No ads.
- No monetization in v1.
- RU first, localization-ready.
- Noxygen branding noticeable but game quality comes first.
- Do not invent medical claims from game power-up behavior.

## Architecture rules
- Final engine is NOT selected until S01 is complete.
- No backend, database, auth or Docker stack unless an approved spec explicitly introduces them.
- v1 persistence is local-first behind `ISaveProvider`.
- Prefer IndexedDB for game state; localStorage only for tiny non-critical settings.
- Keep browser/Telegram differences behind platform adapters.
- Core gameplay must not directly depend on Telegram APIs.
- Keep mode-specific rules separable enough for future non-Endless modes.
- Favor data-driven gameplay content where it clearly reduces iteration cost.

## Quality rules
For every implementation spec:
- state what changed;
- state what was not implemented;
- list tests/checks actually run;
- list known limitations;
- include exact commands needed to reproduce checks.

Do not claim a check was run if the environment did not support it.

## Visual/gameplay work
Automated tests do not replace manual playtesting.

For visual changes, provide:
- exact launch steps;
- expected visible result;
- device/browser assumptions;
- known visual placeholders.

## Performance
Treat mobile performance as a functional requirement.

Avoid:
- unbounded allocations in gameplay loops;
- spawning/destroying large numbers of objects when pooling/recycling is appropriate;
- heavy assets without explicit justification;
- desktop-only assumptions.

## Dependencies
Before adding a major dependency:
- explain why it is needed;
- prefer maintained libraries;
- avoid overlapping libraries for the same concern.

## Git
Preferred branch pattern:
- `feature/sXX-short-name`
- `fix/short-name`
- `docs/short-name`

Commit messages should identify the spec where practical.

Do not force-push main.
Do not merge a PR until checks and review for that task are complete.

## Definition of done
A spec is done only when:
- acceptance criteria are met;
- documented checks pass or unsupported checks are explicitly reported;
- no known blocker contradicts the acceptance criteria;
- documentation is updated when implementation changes a recorded decision;
- owner-visible gameplay changes have concrete manual verification steps.
