# Architecture Baseline — v0.1

## 1. Status
This document defines target principles, not a final technology lock.

The engine must be selected after S01 Engine Spike using measured evidence on Telegram/mobile.

## 2. High-level shape

Existing Telegram Bot
    |
    +-- menu button / Mini App launch
            |
            v
    Telegram Mini App
            |
            +-- Game client
            |
            +-- API
                    |
                    +-- player/profile
                    +-- run submission
                    +-- inventory/economy
                    +-- progression
                    +-- missions
                    +-- leaderboard
                    |
                    v
                PostgreSQL

Optional supporting services may be introduced only when justified.

## 3. Core architecture principles
1. Mobile-first and Telegram-first.
2. Keep launch payload small enough for acceptable mobile startup.
3. Separate gameplay simulation from account/progression state.
4. Server is authoritative for valuable persistent state.
5. Client may remain authoritative for moment-to-moment runner simulation in v1.
6. Do not hard-wire the runner to only Endless mode.
7. Keep content data-driven where practical:
   - obstacles;
   - power-ups;
   - cosmetics;
   - missions;
   - localization;
   - economy tuning.
8. Avoid premature microservices.
9. Preserve deterministic-enough gameplay rules for testing, but do not require full lockstep simulation.
10. Performance budgets are product requirements, not late optimization tasks.

## 4. Client responsibilities
- rendering;
- input;
- runner simulation;
- camera;
- local effects/audio;
- procedural track presentation;
- temporary run state;
- local settings;
- retry buffering if network briefly disappears;
- localization rendering;
- UI.

## 5. Server responsibilities
- Telegram identity verification;
- player profile;
- authoritative wallet balances;
- inventory;
- cosmetics ownership;
- hub/progression state;
- mission progression;
- achievements;
- leaderboard;
- run acceptance/rejection;
- suspicious-result checks;
- version compatibility rules.

## 6. Telegram identity
Never trust client-provided Telegram identity fields directly.

Expected flow:
1. Mini App receives Telegram init data.
2. Client sends raw init data to backend.
3. Backend validates Telegram signature/hash using the official validation algorithm.
4. Backend establishes application session for the validated Telegram user.

Do not persist or trust identity based solely on initDataUnsafe.

## 7. Persistence split
### Server authoritative
- currencies;
- owned cosmetics;
- progression;
- achievements;
- mission state;
- leaderboard records;
- rewarded unlocks.

### Local/device
- graphics settings;
- sound/vibration settings;
- cached config;
- tutorial presentation flags where non-critical;
- temporary run recovery buffer.

## 8. Networking
A run should not depend on a continuous network connection after it starts.

Suggested lifecycle:
1. client requests/creates run_id;
2. run proceeds locally;
3. telemetry/run summary accumulates;
4. if network is available, optional light heartbeats may be sent;
5. run result is submitted at completion;
6. server validates plausibility and applies rewards atomically;
7. duplicate submission with same run_id is idempotent.

## 9. Run result validation
Initial validation can include:
- duration >= minimum plausible duration;
- distance <= speed envelope;
- currency <= plausible pickup/reward envelope;
- event/power-up combinations valid for game version;
- run_id not already rewarded;
- timestamps sane;
- client version supported.

Do not over-engineer anti-cheat before the game has abuse worth protecting.

## 10. Modes
Introduce a mode abstraction early.

Example conceptual interface:
- mode id;
- start conditions;
- completion/failure conditions;
- scoring policy;
- reward policy;
- track/event policy.

Initial implementation only needs Endless.

Future modes:
- Sprint;
- Race;
- Time Attack;
- Challenge Run;
- Boss Hunt.

## 11. Data-driven content
Prefer structured content definitions instead of scattered constants.

Candidate config domains:
- obstacle catalog;
- spawn weights;
- biome segments;
- power-ups;
- perk definitions;
- cosmetic catalog;
- missions;
- localization;
- economy;
- progression thresholds.

Exact format depends on chosen engine/tooling.

## 12. Localization
All user-facing strings should be keyed.

Initial locale:
- ru-RU.

Architecture must allow later locale bundles without rewriting gameplay code.

## 13. Engine decision
Do not choose by preference alone.

Candidates may include:
- Babylon.js;
- Three.js + game framework;
- other web-native 3D engines;
- Unity WebGL only if Telegram/mobile measurements justify its payload and runtime cost.

The final choice is made in S01.

## 14. Performance baseline
S01 must establish measurable budgets.

At minimum test:
- launch time;
- first interactive time;
- memory use;
- steady FPS;
- frame-time spikes;
- thermal behavior where observable;
- payload size;
- asset streaming/loading behavior.

Target classes:
- modern iPhone;
- modern mid-range Android;
- weaker Android representative of the intended audience.

Exact numerical acceptance limits may be adjusted after the spike, but stable 30 FPS is the minimum acceptable gameplay target and 60 FPS is preferred on capable devices.

## 15. Repository direction
Target monorepo shape after engine selection:

/
  AGENTS.md
  README.md
  docs/
  specs/
  apps/
    game/
    api/
  packages/
    shared/
    config/
  infra/
  tools/

Do not create empty architecture for its own sake. S01 may revise this layout.

## 16. Security baseline
- no bot secrets in client bundle;
- no database credentials in client;
- validate Telegram init data server-side;
- rate-limit relevant API endpoints;
- server-side authorization on every account mutation;
- idempotent reward writes;
- do not trust client-provided prices/reward amounts;
- environment-specific secrets excluded from git.

## 17. Observability
Not needed in full during S01, but production architecture should support:
- structured API logs;
- client error reporting;
- run acceptance/rejection reason metrics;
- startup/performance telemetry;
- crash/error counters.

## 18. Testing direction
Automate what is stable:
- pure gameplay rules;
- config validation;
- backend reward logic;
- Telegram auth verification;
- idempotency;
- API contracts.

Do not fake confidence with brittle screenshot-only tests for fast-changing 3D visuals.

Manual device playtesting remains mandatory for feel and performance.
