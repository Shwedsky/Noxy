# S01 — Browser 3D Engine Spike

## Goal
Select the production client engine for a portrait mobile browser game using equivalent prototypes and measured evidence.

Telegram Mini App compatibility is a later integration concern and a secondary compatibility check, not a reason to complicate the spike.

## Why this spec exists
The target is a stylized 3D mobile runner that first ships as a normal web game and later runs inside Telegram using the same build.

Main risks:
- startup payload;
- mobile FPS/frame stability;
- swipe input feel;
- asset/animation workflow;
- static deployment simplicity;
- maintainability for AI-assisted development.

## Mandatory candidates
1. Babylon.js.
2. Three.js plus only the minimal supporting tooling required.

Unity WebGL is out of scope for this spike unless both web-native candidates fail a concrete requirement.

## Equivalent prototype requirements
Each candidate must implement the same minimum scene.

### Scene
- portrait 9:16;
- simple runner placeholder;
- third-person follow camera;
- 3 lanes;
- repeating/recycled road;
- at least 20 visible/recycled environment or obstacle objects;
- basic lighting/materials;
- simple placeholder background/environment.

### Input
- swipe left/right -> lane change;
- swipe up -> jump;
- swipe down -> slide/crouch placeholder.

Desktop keyboard controls may exist only as a development convenience.

### Runtime
- automatic forward movement;
- lane interpolation;
- jump state;
- simple collision-ready obstacles;
- several minutes of continuous play;
- no unbounded object creation.

### Build
Each candidate must:
- run locally with a simple documented command;
- produce a production static build;
- be deployable without an application server.

## Measurements
Record for each candidate:
- production JS/WASM bundle size;
- total initial transfer size with spike assets;
- cold load to first rendered frame;
- time to interactive;
- steady FPS;
- notable frame spikes;
- approximate memory behavior where tooling permits;
- swipe correctness/latency;
- resize/portrait behavior;
- development ergonomics;
- asset pipeline friction;
- debugging/profiling quality;
- testability;
- static deployment friction;
- expected later Telegram WebView friction.

## Test matrix
Minimum:
- desktop Chrome;
- responsive/device emulation;
- one real Android/mobile browser if accessible to the owner.

Optional:
- iOS/Safari class test if available;
- Telegram WebView smoke test only if it is trivial to exercise.

Unavailable physical platforms must be reported as untested.

## Initial quality bar
- 60 FPS preferred on capable hardware;
- stable 30 FPS minimum on representative weaker hardware;
- no progressive memory growth during a several-minute run;
- no obvious input latency;
- production output suitable for static HTTPS hosting.

## Evaluation dimensions
- mobile performance;
- startup/payload;
- 3D ergonomics;
- animation support;
- asset pipeline;
- input handling;
- profiling/debugging;
- testability;
- Codex maintainability;
- ecosystem maturity;
- static hosting simplicity;
- later Telegram integration risk.

## Required deliverables
1. Source for both mandatory candidates.
2. Reproducible install/dev/build commands.
3. Measurement notes.
4. Comparison document.
5. ADR with:
   - chosen engine;
   - rejected alternative;
   - evidence;
   - known risks;
   - revisit conditions.
6. Proposed `apps/game` structure for S02.
7. Exact owner mobile-test instructions.

## Non-goals
- polished art;
- real Noxygen assets;
- backend/API/database;
- Telegram authentication;
- cloud persistence;
- economy;
- full procedural generation;
- Laziness AI;
- production animation system.

## Acceptance criteria
- [ ] Babylon.js prototype completed.
- [ ] Three.js prototype completed.
- [ ] Functionally equivalent scenes/input.
- [ ] Production builds measured.
- [ ] Static build confirmed.
- [ ] Mobile test instructions supplied.
- [ ] At least one real mobile test completed if owner environment is available.
- [ ] Performance differences documented.
- [ ] Engine choice recorded in ADR.
- [ ] S02 recommendation documented.

## Stop conditions
Stop and report if:
- a candidate cannot produce a normal static production build;
- toolchain is unsupported in the available environment;
- mobile performance remains below the minimum quality bar after basic sane optimization.

A failed candidate is valid spike evidence.
