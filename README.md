# NOXY: Победи Лень

Telegram Mini App game for Noxygen.

## Product
NOXY: Победи Лень is a portrait 3D endless runner with meta-progression, cosmetics, missions, social competition and a humorous core fantasy: at first the player runs away from Laziness, but during special events and boss sequences Laziness has to run away from the player.

Subway Surfers is only a mechanical reference for readable mobile lane-running. The project is not intended to be a clone.

## Current status
Pre-production / foundation.

## Fixed baseline
- Platform: Telegram Mini App launched from the existing Noxygen bot.
- Orientation: portrait 9:16.
- Visual direction: stylized 3D.
- Audience: existing Noxygen customers + new audience; launch priority is the current Telegram audience.
- Characters: male and female from the first playable release.
- Input: swipe controls.
- Main mode: Endless.
- Typical session: 2–5 minutes.
- Failure model: arcade pursuit; no HP bar.
- Economy: common NX + rare currency.
- Monetization: none in the first release.
- Ads: none; brand integration inside the game is the advertising layer.
- Energy/stamina: none.
- Rewards: in-game only at launch.
- Language: RU first; localization-ready architecture.
- Connectivity: online account/sync required; short connection loss during a run must not destroy the run.
- Progress: server authoritative for valuable account state.
- Tone: humorous, self-ironic, deliberately absurd where it improves memorability.

## Core loop
Run -> earn -> upgrade/unlock -> customize -> complete missions -> run again.

## Core game hooks
- Laziness physically pursues the player and gets closer after mistakes.
- Near Miss / Combo rewards risky skilled play.
- Power-ups change short-term run behavior.
- Random events break repetition.
- Boss Run reverses the chase: the player hunts Laziness.
- Hub progression visually evolves from a lazy starting space toward an advanced NOXY training/lab space.
- Cosmetics and perks provide long-term collection and build variety.
- Daily/weekly missions, achievements, leaderboards and friend challenges create retention.

## Documentation
- `docs/GDD.md` — product/game design baseline.
- `docs/ARCHITECTURE.md` — technical principles and target architecture.
- `docs/ROADMAP.md` — staged delivery plan.
- `specs/S00-product-foundation.md` — pre-production specification.
- `specs/S01-engine-spike.md` — engine/Telegram technical spike.
- `AGENTS.md` — working rules for Codex/AI agents.

## Codex development setup
Read [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for setup, skills, verification and the S01 starting prompt.

Use Node 24 LTS and run `node tools/setup.mjs` from the repository root.
The foundation gate works now; runtime gates become available with S01.

## Development principle
Do not build the whole game at once. Work in narrow specifications and preserve a playable vertical slice. Architecture may evolve after evidence from the engine spike and device tests.
