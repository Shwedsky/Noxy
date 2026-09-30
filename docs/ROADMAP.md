# Development Roadmap

## Working model
The roadmap is stable at the phase level.

Detailed specifications are written only a few steps ahead.

Do not fully specify S00-S37 in implementation detail up front.

Preferred cycle:
1. prepare 2-3 upcoming specs;
2. implement;
3. test;
4. review architecture/game feel;
5. adjust later specs;
6. continue.

## Phase 0 — Pre-production
### S00 — Product Foundation
Lock product baseline, non-goals, quality bar, technical constraints and project working rules.

### S01 — Engine Spike
Build equivalent minimum 3D Telegram/mobile prototypes and select the production engine using measurements.

Exit: written ADR/decision with evidence.

## Phase 1 — Playable Core
### S02 — Endless Track
Track segmentation, recycling/object pooling, initial procedural generation.

### S03 — Player Controller
Swipe input, lane changes, jump, slide, camera integration.

### S04 — Laziness Pursuit
Visible pursuer, pursuit states, mistake reactions, caught/game-over flow.

### S05 — Obstacles
Obstacle taxonomy, spawn rules, collision rules, fairness constraints.

### S06 — Score Run
Distance, score, speed progression, run state, restart loop.

Exit: game exists and is repeatedly playable.

## Phase 2 — Fun Layer
### S07 — NX Collectibles
Common currency pickups and run collection feedback.

### S08 — Power-ups
Turbo, Shield, Magnet, Super Jump, Focus, Rage.

### S09 — Near Miss / Combo
Risk/reward proximity scoring and combo chain.

### S10 — Random Events
Initial event framework and selected events.

### S11 — Boss Run
Chase reversal sequence and boss reward flow.

Exit: gameplay should feel meaningfully differentiated from a generic runner.

## Phase 3 — Player Account
### S12 — Telegram Identity
Mini App launch/auth validation and application session.

### S13 — Backend Foundation
Player/profile/run APIs and PostgreSQL base schema.

### S14 — Persistence
Authoritative progression state, run result idempotency, basic plausibility checks.

Exit: player can close and return without losing account progression.

## Phase 4 — Progression
### S15 — Hub
First visual hub and upgrade states.

### S16 — Levels / Progression
Player/account progression model.

### S17 — Perks
Unlock/equip/use behavior-changing perks.

### S18 — Cosmetics
Catalog, ownership and equip flow.

### S19 — Inventory
Unified inventory/profile presentation as needed.

Exit: there is a long-term reason to return beyond score chasing.

## Phase 5 — Retention / Social
### S20 — Daily Missions
### S21 — Weekly Missions
### S22 — Achievements
### S23 — Daily Reward
### S24 — Leaderboards
### S25 — Friend Challenge

Exit: recurring goals and social loops exist.

## Phase 6 — Content
### S26 — Moscow / First Full Biome
Production-quality primary environment.

### S27 — Night Variant
Lighting/content variant without requiring a wholly new game.

### S28 — Additional Biome Candidate
Gym / office / other environment based on playtest value.

Further content is not pre-committed.

## Phase 7 — Release Quality
### S30 — Sound
### S31 — VFX / Juice
### S32 — Performance
### S33 — Mobile Compatibility
### S34 — Analytics
### S35 — Telegram Production Integration
### S36 — Closed Beta
### S37 — Release Candidate

## Backlog beyond initial roadmap
- Sprint / Race mode;
- Time Attack;
- Challenge Run;
- dedicated Boss Hunt mode;
- real-world rewards;
- monetization;
- premium season;
- Telegram Stars;
- EN locale;
- seasons;
- white-label architecture;
- more biomes;
- special campaigns.

## Quality gates
### Gate A — Technical viability
After S01:
- engine selected;
- Telegram launch proven;
- mobile performance acceptable;
- payload/loading risks understood.

### Gate B — Core fun
After S06:
- control feels reliable;
- failure is readable;
- procedural generation is fair;
- repeated short sessions are tolerable.

### Gate C — Differentiation
After S11:
- Laziness pursuit is memorable;
- reversal/Boss concept works;
- power-ups/events reduce monotony;
- game does not feel like a reskinned clone.

### Gate D — Persistence
After S14:
- Telegram user returns to saved state;
- run rewards cannot be duplicated through simple retries;
- valuable state is server-side.

### Gate E — Retention
After S25:
- at least one meaningful reason exists to return daily/weekly;
- social loop works without spammy UX.

### Gate F — Release
After S37:
- supported device matrix passes;
- startup/performance acceptable;
- no progression-loss blockers;
- Telegram production flow proven.
