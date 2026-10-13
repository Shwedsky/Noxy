# Developer Tooling Baseline

## Goal
Keep the local environment minimal. Do not install backend/database/container tooling for NOXY until an approved phase requires it.

## Required before S01
### 1. Git
Required for repository work.

Verify:
```powershell
git --version
```

### 2. Node.js LTS
Use Node.js 24 LTS for the project baseline unless S01 discovers a concrete incompatibility.

Verify:
```powershell
node --version
npm --version
```

### 3. pnpm
Use pnpm 12 as the package manager.

After Node is installed:
```powershell
npx get-pnpm
pnpm --version
```

The repository should later pin the package manager in `package.json` so developers/agents use the same major version.

### 4. VS Code
Recommended editor for local inspection and manual fixes.

Useful extensions once the web project exists:
- ESLint;
- Prettier;
- GitLens (optional);
- glTF/3D viewer extension only if it actually helps the asset workflow.

Do not install large extension packs without a need.

### 5. Google Chrome
Primary development browser for S01/S02 because DevTools provides performance, memory, network and mobile emulation tooling.

Keep normal auto-update enabled.

## Required for real Android testing
No Android Studio is required initially.

On the Android phone:
1. enable Developer options;
2. enable USB debugging;
3. connect by USB;
4. authorize the development PC.

Chrome remote debugging can then be used for the hosted/local web build when network/USB setup allows it.

If this becomes painful, Android Studio/ADB can be added later; do not install it preemptively just for S01.

## Optional later tools
### Blender
Install only when we begin editing/creating production 3D assets rather than using placeholders/imported models.

Expected use:
- low-poly/stylized asset edits;
- rig/animation inspection;
- material cleanup;
- glTF/GLB export.

### glTF optimization tooling
Add only after the engine is chosen and real assets arrive. Candidate tooling may include glTF Transform or engine-specific asset optimization tools.

### Image editor
Any existing tool is sufficient initially. Add a dedicated texture workflow only when art production requires it.

### Audio editor
Not needed during S01/core movement. Add later for the sound production phase.

### GitHub CLI
Optional. Repository operations can be done through GitHub UI/ChatGPT integration. Install `gh` only if local Codex/workflows benefit from it.

## Explicitly NOT required now
Do not install for the initial browser-first development path:
- Docker for NOXY runtime;
- PostgreSQL;
- Redis;
- backend framework/runtime;
- Kubernetes;
- Unity;
- Android Studio;
- Telegram Bot API SDK;
- database GUI tools.

Existing installations may remain, but NOXY should not depend on them.

## Environment rule
Prefer one development environment consistently.

Recommended on Windows:
- keep the repository and Node toolchain either fully in Windows or fully in WSL2;
- avoid mixing `node_modules` produced by Windows and Linux in the same working tree.

For the simplest browser/device workflow, native Windows Node + VS Code + Chrome is acceptable and likely easiest. WSL2 remains available if local Codex tooling prefers it.

## Pre-S01 verification checklist
Run and save the output:
```powershell
git --version
node --version
npm --version
pnpm --version
```

Also confirm:
- VS Code opens the repository;
- Chrome DevTools opens normally;
- a phone is available for a later real-device browser check.
