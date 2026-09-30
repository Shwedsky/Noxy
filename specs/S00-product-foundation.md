# S00 — Product Foundation

## Goal
Establish the repository and product contract before implementation begins.

## Status
Baseline prepared.

## Inputs
- README.md
- docs/GDD.md
- docs/ARCHITECTURE.md
- docs/ROADMAP.md
- AGENTS.md

## Required outcomes
1. The product has one unambiguous identity: NOXY: Победи Лень.
2. Subway Surfers is treated only as a mechanic reference, not a cloning target.
3. Core product decisions are documented.
4. Deferred decisions are explicitly marked instead of guessed.
5. Development rules for Codex/AI agents are documented.
6. S01 is ready to run without prematurely selecting the engine.

## Fixed decisions
- Telegram Mini App.
- Existing Noxygen bot is the intended launch point.
- Portrait 9:16.
- Stylized 3D.
- Male and female characters from first playable release.
- Swipe controls.
- Endless first.
- Typical session 2–5 minutes.
- Arcade Laziness pursuit instead of HP.
- Two currencies.
- No monetization in v1.
- No ads.
- No stamina.
- In-game rewards only at launch.
- RU first.
- Online account/sync.
- Temporary network loss during a run must be survivable.
- Server authoritative for valuable progression.
- Client-side gameplay simulation accepted for v1.
- Humorous/absurd tone allowed.

## Explicit non-goals for S00
- no game engine project;
- no backend;
- no assets;
- no gameplay prototype;
- no economy balancing;
- no final product-to-power-up mapping;
- no final art bible.

## Acceptance criteria
- [x] README exists.
- [x] GDD exists.
- [x] Architecture baseline exists.
- [x] Roadmap exists.
- [x] AGENTS.md exists.
- [x] S01 defines measurable engine selection.
- [ ] Owner review confirms the baseline.

## Owner review checklist
Review only for incorrect product direction, not wording perfection:
- Does the game fantasy match the intended idea?
- Is Noxygen branding present at the desired level?
- Is anything important accidentally excluded from the roadmap?
- Are any fixed decisions actually still uncertain?

When approved, mark S00 complete and proceed to S01.
