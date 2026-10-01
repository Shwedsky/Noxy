# S01 — Telegram 3D Engine Spike

## Goal
Select the production client engine using a real portrait mobile Telegram/web prototype and measured evidence.

Do not choose the engine based on familiarity or preference alone.

## Why this spec exists
The target is a stylized 3D mobile runner inside Telegram Mini Apps.

The main technical risk is not whether a browser can render 3D. It is whether the complete experience can:
- launch quickly enough;
- sustain acceptable FPS;
- handle touch input reliably;
- fit Telegram WebView constraints;
- avoid an excessive bundle;
- support fast content iteration.

## Candidate set
At minimum evaluate:
1. Babylon.js.
2. Three.js plus only the minimum gameplay/application tooling required.

Unity WebGL may be included only as an optional comparison if the local environment can produce a representative build without disproportionate setup effort.

Do not delay the mandatory web-native comparison because Unity tooling is unavailable.

## Equivalent prototype requirements
Each mandatory candidate must implement the same minimal scene.

### Scene
- portrait 9:16 layout;
- one simple stylized runner placeholder;
- third-person follow camera;
- 3 lanes;
- repeating/recycled road;
- at least 20 visible/recycled environment or obstacle objects during representative play;
- basic light/material setup;
- placeholder background/environment.

### Input
- swipe left/right changes lane;
- swipe up jumps;
- swipe down performs slide/crouch placeholder behavior.

### Runtime
- automatic forward motion;
- lane interpolation;
- jump state;
- collision-ready simple obstacles;
- continuous play for at least several minutes;
- no unbounded object creation.

### Telegram shell
If practical in the local environment:
- launch inside a minimal Telegram Mini App integration page;
- call Telegram WebApp readiness APIs;
- handle portrait/safe-area sizing.

If an actual Telegram bot launch cannot be exercised locally, document exact production validation steps and test the same build in an equivalent mobile WebView/browser.

## Measurements
Record for each candidate:
- production JS/WASM bundle size;
- total initial transfer size with the spike assets;
- cold load to first rendered frame;
- time to interactive;
- steady FPS;
- notable frame spikes;
- approximate memory use where tooling permits;
- mobile input correctness;
- resize/orientation behavior;
- dev experience;
- asset pipeline friction;
- debugging quality;
- Telegram integration friction.

## Device/browser matrix
Test as much as locally available.

Minimum evidence:
- desktop Chrome dev run;
- one real Android device OR clearly documented remote/device result;
- one iOS/Safari class test if available.

If a required physical platform is unavailable, state that limitation and do not pretend it passed.

## Performance quality bar
Initial target:
- 60 FPS preferred on capable devices;
- stable 30 FPS minimum on representative weaker hardware;
- no progressive memory growth during a several-minute run;
- no visible input latency that makes lane changes feel unreliable.

S01 may propose more specific budgets after measurement.

## Evaluation dimensions
Score each candidate in written analysis, but do not pick a winner before measurement.

Evaluate:
- mobile performance;
- startup/payload;
- Telegram compatibility;
- 3D ergonomics;
- animation support;
- asset pipeline;
- input handling;
- profiling/debugging;
- testability;
- AI/Codex maintainability;
- community/library maturity;
- complexity added to the repository.

## Required deliverables
1. Spike source for mandatory candidates.
2. Reproducible build/run commands.
3. Measurement notes.
4. Comparison document.
5. Architecture Decision Record:
   - chosen engine;
   - rejected alternatives;
   - evidence;
   - known risks;
   - revisit conditions.
6. Proposed final apps/game folder structure.

## Non-goals
- polished art;
- real Noxygen assets;
- backend;
- auth;
- account persistence;
- full procedural generation;
- Laziness AI;
- economy;
- production animation system;
- complete obstacle design.

## Acceptance criteria
- [ ] Babylon.js prototype completed.
- [ ] Three.js prototype completed.
- [ ] Both use functionally equivalent scenes/input.
- [ ] Production builds measured.
- [ ] At least one real mobile environment tested, if accessible.
- [ ] Telegram/WebView constraints documented.
- [ ] Performance differences documented.
- [ ] Engine choice recorded in an ADR.
- [ ] No final engine choice is made without evidence.
- [ ] S02 recommendations updated based on the result.

## Stop conditions
Stop and report instead of papering over the problem if:
- candidate cannot produce a working mobile build;
- dependency/toolchain is unsupported in the environment;
- Telegram integration exposes a major incompatibility;
- performance is below the minimum quality bar after basic sane optimization.

A failed candidate is valid spike evidence.

## Development tooling deliverables
Follow docs/DEVELOPMENT.md and use the repo game-spec workflow.
- Add a root npm workspace/package-lock.json covering both spike candidates.
- Pin browser test tooling and implement production-preview smoke scenarios for both.
- Register real prototype and milestone commands in tools/verification.json.
- Record AC evidence in docs/evidence/S01-engine-spike.md, including build/device
  metadata, exact commands, comparison measurements and independent review.
- Desktop/emulated evidence must not be labelled as a physical phone test.
- With no real mobile/Telegram access, record a provisional recommendation and
  the missing evidence; Gate A remains unverified. Do not claim final selection
  or proceed into S02 without an explicit owner decision to accept that risk.
