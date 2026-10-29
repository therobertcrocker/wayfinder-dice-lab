# Decisions Log

Short records of choices that shape this repo. Newest at the bottom. When a decision is replaced, mark it **Superseded** and link the one that replaces it rather than deleting it.

## D-001: One module per repo; monorepo deferred
- **Date:** 2026-10-28
- **Decision:** This repo holds a single Foundry module at the repo root.
- **Considered:** A `wayfinder-vtt` monorepo with `modules/` and `tools/` folders.
- **Why not yet:** Only one tool is planned. A monorepo needs prefixed tags, hand-edited versions and a manifest URL on `main`, all to avoid collisions between modules that don't exist. Converting later is a file move and a workflow change. Go tools that work with Foundry may belong in `gm-toolkit` instead; decide that when one exists.

## D-002: Repo and module id are `wayfinder-dice-lab`
- **Date:** 2026-10-28
- **Why:** Foundry requires the module id to match its folder name, so the repo, folder and id share one name. "Wayfinder" is the family name; "dice-lab" names the tool.

## D-003: PF2e only
- **Date:** 2026-10-28
- **Decision:** Declare `pf2e` under `relationships.systems` in `module.json`.
- **Why:** The calculations are PF2e-specific (four degrees of success, the ±10 rule, natural 20/1 adjustments). Being PF2e-only lets code read PF2e actor and item data directly.

## D-004: Plain JavaScript ES modules with JSDoc, no build step
- **Date:** 2026-10-28
- **Why:** Edit a file, reload Foundry, see the change. JSDoc gives editor type hints without a compiler. Revisit if the codebase grows enough to want TypeScript.

## D-005: Support Foundry v13 minimum, v14 verified
- **Date:** 2026-10-28
- **Why:** v14 is current stable and v13 is still common. UI uses `ApplicationV2`, which exists in both.

## D-006: Releases built by GitHub Actions from the tag
- **Date:** 2026-10-28
- **Decision:** Publishing a GitHub Release tagged `vX.Y.Z` stamps the version and URLs into `module.json` and attaches `module.json` and `module.zip`.
- **Why:** The version lives in one place (the tag), and the `releases/latest` manifest URL stays stable for Foundry's update checks.

## D-007: Develop in a dev container with Foundry running alongside
- **Date:** 2026-10-28
- **Decision:** `.devcontainer/` defines two Compose services: `dev` (Node 22, where VS Code attaches) and `foundry` (`ghcr.io/felddy/foundryvtt:14`). The repo is bind-mounted read-only into Foundry's `Data/modules/wayfinder-dice-lab`. Foundry's data lives in a named volume. Credentials live in a gitignored `.devcontainer/.env`.
- **Why:** Development already happens in dev containers. Running Foundry next to the editor gives a save-and-refresh loop without symlinks or keeping code inside Foundry's data folder, and keeps experiments away from the live game server, which installs from releases only.
- **Notes:** The Foundry container's hostname is pinned (`wayfinder-dev`) because Foundry ties license verification to it. The port is bound to `127.0.0.1` only. Node-only for now; add Go only if a shared-code need appears.
