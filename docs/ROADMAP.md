# Development Roadmap — browser-first v0.2

## Working model
The roadmap is stable at phase level. Detailed specs are prepared only a few steps ahead.

Default ownership:
- ChatGPT: planning, specs, repository/docs changes, reviews, small/config changes, Git workflow and merge decisions.
- Codex: implementation-heavy coding, engine/runtime changes, repetitive code changes, local build/test work that requires a development checkout.
- Owner: installs tools, launches builds on real devices, judges game feel/visual quality, supplies credentials/assets only when required.

## Phase 0 — Foundation
### S00 — Product Foundation
Complete.

### S01 — Browser 3D Engine Spike
Compare Babylon.js vs Three.js using equivalent portrait mobile browser prototypes. Telegram compatibility is a secondary check, not a blocker for core browser development.

Exit: evidence-backed engine ADR and proposed game folder structure.

### S02 — Browser Project Foundation
Create the chosen engine project, static production build, local dev workflow, basic test/lint/typecheck and platform/save abstractions.

Exit: `pnpm dev` launches the game shell; `pnpm build` produces static deployable output.

## Phase 1 — Playable Core
### S03 — Player Controller
Swipe input, lane changes, jump, slide, camera.

### S04 — Endless Track
Track segmentation, recycling/pooling and initial procedural generation.

### S05 — Obstacles & Fairness
Obstacle taxonomy, collision rules and solvable spawn constraints.

### S06 — Laziness Pursuit
Visible pursuer, pursuit states, mistake reactions, caught/game-over flow.

### S07 — Run Loop
Distance, score, speed progression, restart and local run records.

Exit: repeatedly playable browser game on desktop and real mobile.

## Phase 2 — Fun Layer
### S08 — NX Collectibles
### S09 — Power-ups
Turbo, Shield, Magnet, Super Jump, Focus, Rage.
### S10 — Near Miss / Combo
### S11 — Random Events
### S12 — Boss Run

Exit: game has a distinctive NOXY/Laziness identity rather than feeling like a reskin.

## Phase 3 — Local Progression
### S13 — Local Persistence
Versioned IndexedDB SaveProvider, migrations and reset/recovery path.
### S14 — Player Progression
### S15 — Hub
### S16 — Perks
### S17 — Cosmetics
### S18 — Inventory/Profile UI

Exit: local browser progress survives reload/restart and creates a reason to return.

## Phase 4 — Retention Without Backend
### S19 — Daily/Weekly Local Missions
### S20 — Achievements
### S21 — Daily Reward
### S22 — Local Records / Shareable Result Card

No trusted global leaderboard is promised in this phase.

## Phase 5 — Production Content
### S23 — First Full Moscow Biome
### S24 — Character M/F Production Pass
### S25 — Noxygen Brand/Power-up Art Pass
### S26 — Night/Environment Variant
### S27 — Sound / VFX / Juice

## Phase 6 — Browser Release Quality
### S28 — Performance Hardening
### S29 — Mobile Compatibility
### S30 — PWA/Installability Review if useful
### S31 — Static Hosting / Preview Deployment
### S32 — Closed Browser Beta
### S33 — Browser Release Candidate

Exit: a standalone web game can be shared by URL and played on supported phones.

## Phase 7 — Telegram Integration
Only after the browser build is worth distributing.

### S34 — Telegram Platform Adapter
Fullscreen, safe areas, back behavior, haptics and user context where useful.
### S35 — Existing Bot Launch Integration
Menu button -> same hosted web build.
### S36 — Telegram Device Compatibility
### S37 — Telegram Release Candidate

## Deferred Online Services Phase
This is not part of the initial implementation path.

Trigger only when product value justifies it:
- cloud saves / cross-device sync;
- trusted global/friend leaderboards;
- validated competitions;
- real-world rewards;
- payments / Telegram Stars;
- server analytics or abuse controls.

Possible later work:
- backend/API;
- database;
- Telegram identity validation;
- cloud SaveProvider;
- leaderboard service;
- anti-cheat/plausibility validation;
- monetization.

## Backlog
- Sprint / Race mode;
- Time Attack;
- Challenge Run;
- dedicated Boss Hunt mode;
- real-world rewards;
- EN locale;
- seasons;
- more biomes;
- white-label/licensing model.

## Quality gates
### Gate A — Technical viability (after S01)
- engine selected from evidence;
- static browser build proven;
- mobile performance acceptable;
- startup/payload risks known.

### Gate B — Core fun (after S07)
- swipe controls reliable;
- generation fair;
- Laziness pursuit readable;
- repeated short sessions feel acceptable.

### Gate C — Differentiation (after S12)
- pursuit/reversal is memorable;
- power-ups/events reduce monotony;
- game does not feel like a generic reskin.

### Gate D — Local progression (after S18)
- browser reload does not lose normal progress;
- save schema can evolve;
- reset/recovery path exists.

### Gate E — Browser release (after S33)
- URL launch works;
- supported mobile matrix passes;
- performance/startup acceptable;
- no progress-loss blockers.

### Gate F — Telegram release (after S37)
- same build runs correctly inside Telegram WebView;
- safe areas/back/fullscreen behavior verified;
- existing bot launch flow proven.
