# NOXY: Победи Лень

Browser-first 3D runner for Noxygen, designed to be embedded into Telegram later as the same web build.

## Product
NOXY: Победи Лень is a portrait 3D endless runner with meta-progression, cosmetics, missions and a humorous core fantasy: at first the player runs away from Laziness, but during special events and boss sequences Laziness has to run away from the player.

Subway Surfers is only a mechanical reference for readable mobile lane-running. The project is not intended to be a clone.

## Current status
Pre-production / technical foundation.

## Fixed baseline
- Runtime: browser-first web game.
- Telegram: later container/integration target, not a dependency for core development.
- Orientation: portrait 9:16.
- Visual direction: stylized 3D.
- Audience: existing Noxygen customers + new audience.
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
- Persistence v1: local-first browser persistence behind a SaveProvider abstraction.
- Backend: explicitly deferred until cloud sync/social/real rewards/monetization justify it.
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

## Documentation
- `docs/GDD.md` — product/game design baseline.
- `docs/ARCHITECTURE.md` — browser-first/local-first technical baseline.
- `docs/ROADMAP.md` — staged delivery plan.
- `docs/TOOLING.md` — required and optional developer tools.
- `docs/DELIVERY_OWNERSHIP.md` — who does what and when.
- `specs/S00-product-foundation.md` — approved product foundation.
- `specs/S01-engine-spike.md` — browser/mobile engine spike.
- `AGENTS.md` — working rules for Codex/AI agents.

## Development principle
Do not build the whole game at once. Preserve a playable vertical slice, keep the first architecture local-only, and add Telegram/backend capabilities only when the product actually needs them.
