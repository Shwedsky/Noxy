# Architecture Baseline — v0.2

## 1. Status
The project is browser-first and local-first.

The production engine is still selected only after S01 using measured evidence on mobile browsers. Telegram is a later integration layer, not the foundation of the client architecture. Backend services are deferred until they provide clear product value.

## 2. High-level shape

Phase 1 / local-first:

Browser
  |
  v
NOXY Web Game
  |
  +-- gameplay
  +-- UI/audio/VFX
  +-- IndexedDB/local persistence
  +-- platform adapters

Later Telegram integration:

Telegram Bot -> Telegram Mini App WebView -> same NOXY Web Game

Later online services, only when justified:

NOXY Web Game -> optional API -> cloud save / leaderboard / social / payments

## 3. Core principles
1. Browser-first, mobile-first.
2. The game must run as a normal HTTPS web application without Telegram.
3. Telegram-specific code lives behind a platform adapter.
4. Local persistence is sufficient for the first playable/release candidate unless requirements change.
5. No backend, database, auth or anti-cheat is created before a feature requires it.
6. The runner core must not depend on persistence or platform APIs.
7. Do not hard-wire the runner to only Endless mode.
8. Keep content data-driven where practical: obstacles, power-ups, cosmetics, missions, localization and tuning.
9. Avoid speculative infrastructure and premature microservices.
10. Mobile performance and startup size are functional requirements.

## 4. Platform abstraction
The client should expose small interfaces such as:
- `IPlatform`
- `ISaveProvider`
- `IShareProvider`
- `IHapticsProvider`

Initial implementations:
- BrowserPlatform
- BrowserSaveProvider

Later implementations may include:
- TelegramPlatform
- TelegramShareProvider
- ServerSaveProvider

Gameplay code must not directly depend on `window.Telegram` or a future API.

## 5. Persistence v1
Primary persistence: IndexedDB.

Use localStorage only for tiny non-critical settings when appropriate.

Persist at minimum when systems exist:
- currencies;
- unlocked cosmetics;
- equipped cosmetics;
- progression;
- achievements;
- mission state;
- hub state;
- local records;
- settings.

Requirements:
- versioned save schema;
- safe migration path;
- corruption fallback/reset path;
- writes centralized through SaveProvider;
- no gameplay module writes directly to IndexedDB.

Local saves are intentionally user-controlled and are not cheat-resistant. That is acceptable before competitive/real-value systems exist.

## 6. Deferred online services
Backend becomes justified when one or more of these become real requirements:
- cross-device cloud saves;
- global or trusted leaderboards;
- friend challenges requiring server validation;
- real-world rewards;
- paid items / Telegram Stars;
- abuse-resistant economy;
- analytics that cannot be handled client-side.

Until then, backend work is out of scope.

## 7. Modes
Introduce a mode abstraction early.

Conceptual responsibilities:
- mode id;
- start conditions;
- completion/failure conditions;
- scoring policy;
- reward policy;
- track/event policy.

Initial implementation: Endless.

Future candidates:
- Sprint / Race;
- Time Attack;
- Challenge Run;
- Boss Hunt.

## 8. Data-driven content
Prefer structured definitions instead of scattered constants.

Candidate config domains:
- obstacle catalog;
- spawn weights;
- biome segments;
- power-ups;
- perks;
- cosmetics;
- missions;
- localization;
- economy;
- progression thresholds.

Exact representation depends on the chosen engine/tooling.

## 9. Localization
Initial locale: `ru-RU`.

User-facing text should use localization keys. English and other locales can be added without rewriting gameplay code.

## 10. Engine decision
Mandatory S01 comparison:
- Babylon.js;
- Three.js with only minimal supporting tooling.

Unity WebGL is no longer a required candidate. It may be investigated later only if web-native engines fail a concrete requirement.

Selection criteria:
- mobile browser performance;
- startup payload;
- 3D/gameplay ergonomics;
- animation/asset pipeline;
- swipe/input behavior;
- profiling/debugging;
- testability;
- Codex maintainability;
- deployability to static hosting;
- later Telegram WebView compatibility.

## 11. Performance baseline
S01 establishes measured budgets.

At minimum measure:
- production bundle/initial transfer size;
- cold load to first rendered frame;
- time to interactive;
- steady FPS;
- frame spikes;
- memory behavior where practical;
- touch input correctness;
- resize/safe-area behavior.

Initial quality target:
- 60 FPS preferred on capable devices;
- stable 30 FPS minimum on representative weaker hardware;
- no progressive memory growth during a several-minute run;
- no obvious swipe/input latency.

## 12. Repository direction
Target after S01:

/
  AGENTS.md
  README.md
  docs/
  specs/
  apps/
    game/
  tools/

Do not create `api/`, `infra/`, database or container scaffolding until an approved spec requires it.

## 13. Hosting
The client must produce a static production build deployable to ordinary HTTPS static hosting such as GitHub Pages, Cloudflare Pages, Vercel or equivalent.

Hosting vendor is not a hard architectural dependency.

## 14. Security baseline
For the local-first phase:
- never commit secrets;
- no bot token in client code;
- no future API secrets in client code;
- treat browser saves as editable by the user;
- do not promise competitive integrity without backend validation.

Telegram identity validation becomes relevant only when a backend is introduced.

## 15. Testing direction
Automate stable logic:
- gameplay math/rules;
- config validation;
- save serialization/migrations;
- mode rules;
- deterministic utility code.

Manual testing remains mandatory for:
- game feel;
- mobile performance;
- swipe behavior;
- visual readability;
- Telegram WebView integration later.
