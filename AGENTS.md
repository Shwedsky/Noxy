# AGENTS.md

## Purpose
This repository is developed incrementally with AI coding agents, primarily Codex.

Agents must optimize for a working, reviewable game rather than maximum code volume.

## Source of truth
Read before implementation:
1. README.md
2. docs/GDD.md
3. docs/ARCHITECTURE.md
4. docs/ROADMAP.md
5. the active spec in specs/

If a spec conflicts with an older general document, stop and report the conflict unless the spec explicitly says it supersedes that decision.

## Scope discipline
- Implement only the active spec and required enabling changes.
- Do not silently implement future roadmap features.
- Do not redesign unrelated systems.
- Avoid speculative abstractions.
- Keep commits focused.

## Product rules
- Portrait 9:16.
- Mobile-first.
- Telegram Mini App target.
- Swipe input.
- No stamina.
- No ads.
- No monetization in v1.
- RU first, localization-ready.
- Noxygen branding noticeable but game quality comes first.
- Real medical claims must not be invented from game power-up behavior.

## Architecture rules
- Final engine is NOT selected until S01 is complete.
- Valuable persistent state is server-authoritative.
- Do not put Telegram bot secrets or backend credentials in client code.
- Do not trust client identity or reward amounts.
- Keep mode-specific rules separable enough to support future non-Endless modes.
- Favor data-driven gameplay content where it clearly reduces iteration cost.

## Quality rules
For every implementation spec:
- state what changed;
- state what was not implemented;
- list tests/checks run;
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
- avoid adding overlapping libraries for the same concern.

## Git
Preferred branch pattern:
- feature/sXX-short-name
- fix/short-name

Commit messages should identify the spec where practical.

Do not force-push main.

## Definition of done
A spec is not done merely because code exists.

It is done only when:
- acceptance criteria are met;
- documented checks pass or unsupported checks are explicitly reported;
- no known blocker contradicts the acceptance criteria;
- documentation is updated when the implementation changes a recorded decision.
