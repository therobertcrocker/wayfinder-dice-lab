# Architecture Overview

> **Code:** `module.json`, `scripts/`, `templates/`, `styles/`, `lang/`

## Purpose

Wayfinder Dice Lab is a Foundry VTT module for Pathfinder 2e GMs. It calculates dice probabilities, such as degree-of-success odds and expected damage, to help balance encounters. This page is the front door to the architecture docs: it describes the module's shape and holds the durable decisions behind it.

## Shape

**Loading.** Foundry reads `module.json`, then loads `scripts/main.js` as an ES module. `main.js` registers settings on the `init` hook and exposes a public API at `game.modules.get("wayfinder-dice-lab").api`. On `ready`, game data (actors, items) is available.

```
module.json ──► esmodules: scripts/main.js
                   │
   Hooks "init" ───┼─► registerSettings()          (settings.js)
                   └─► game.modules.get(id).api    (public API)
                                 │
                                 └─ openHello() ─► HelloApp   (ApplicationV2)
                                                   ├─ templates/hello.hbs
                                                   ├─ styles/wayfinder.css
                                                   └─ lang/en.json strings
   Hooks "ready" ──► game data available
```

**Current contents.** The module is a scaffold. `HelloApp` is an example window that proves the template, style, localization and action wiring. No dice math exists yet (see `F.001` and `F.002` in `docs/planned-work.md`).

**Development and release.** Development runs in a dev container with a local Foundry server beside it (`.devcontainer/`). The live game server installs the module only from GitHub Releases, through the manifest URL.

```
 dev container ──edit──► repo ──push──► GitHub ──release vX.Y.Z──► module.zip
      │                   │                                            │
      │      bind mount (read-only)                       manifest URL │
      ▼                   ▼                                            ▼
  Claude Code      local Foundry (dev)                    game server (Molten)
```

## Key Decisions

### Repository

- **One module per repo; monorepo deferred** — only one tool is planned. A monorepo needs prefixed tags, hand-edited versions and a manifest URL on `main`, only to avoid collisions between modules that do not exist. Converting later is a file move and a workflow change. Go tools that work with Foundry may belong in `gm-toolkit` instead; decide when one exists.
- **Repo, folder and module id are all `wayfinder-dice-lab`** — Foundry requires the module id to match its folder name. "Wayfinder" is the family name; "dice-lab" names the tool.

### Module

- **PF2e only** — `module.json` declares `pf2e` under `relationships.systems`. The calculations are PF2e-specific (four degrees of success, the ±10 rule, natural 20/1 adjustments), and code can read PF2e actor and item data directly.
- **Foundry v13 minimum, v14 verified** — v14 is current stable and v13 is still common. UI uses `ApplicationV2`, which exists in both.
- **Plain JavaScript ES modules, no build step** — edit a file, reload Foundry, see the change. Revisit if the codebase grows enough to want TypeScript. (The JSDoc and comment policy is open: `C.001`.)

### Release

- **Releases are built by GitHub Actions from the tag** — publishing a GitHub Release tagged `vX.Y.Z` stamps the version and URLs into `module.json` and attaches `module.json` and `module.zip`. The version lives in one place (the tag), and the `releases/latest` manifest URL stays stable for Foundry's update checks.
- **The game server installs from releases only** — it never receives development files. A published release reaches the live game as an update, so Robert publishes releases.

### Development environment

- **Dev container with Foundry alongside** — two Compose services: `dev` (Node 22, where VS Code attaches) and `foundry` (`ghcr.io/felddy/foundryvtt:14`). This gives a save-and-refresh loop without symlinks, and keeps experiments away from the live game.
- **The repo is mounted read-only inside Foundry** — uninstalling or updating the module from Foundry's UI cannot delete or change the code.
- **The Foundry container hostname is pinned (`wayfinder-dev`)** — Foundry ties license verification to the hostname.
- **Foundry's port is bound to `127.0.0.1` only** — the dev server is reachable only from Robert's machine.
- **Credentials live in a gitignored `.devcontainer/.env`** — the container fails to start without it, which is clearer than a silent Foundry failure.
- **Node-only dev container** — add Go only if a need to share code with `gm-toolkit` appears.
- **Claude Code through the official dev container feature** — it also adds the VS Code extension. `~/.claude` is a bind mount of `%USERPROFILE%\.claude-devcontainer`, the host folder every project container shares, with `CLAUDE_CONFIG_DIR` pointing at it. Sign-in, settings and memories survive rebuilds and carry across projects. (It replaced a per-repo named volume, which survived rebuilds but shared nothing and sat where Windows backup can't reach.) No egress firewall and no `--dangerously-skip-permissions` for now.
- **Shell comes from the dotfiles repo** — zsh and Starship pastel powerline, installed into every dev container by VS Code's dotfiles setting ([`therobertcrocker/dotfiles`](https://github.com/therobertcrocker/dotfiles)), the same as `gm-toolkit`. `postcreate.sh` doesn't touch the prompt, so it can't overwrite the dotfiles config.

### Process

- **Lean port of gm-toolkit's process** — `CLAUDE.md` and `docs/process/` carry the Feature, Bugfix and Docs/Chore flows. Arc, Refactor and Effort flows are ported only when needed. When the two copies start to drift, extract the shared process into a Claude Code plugin.
- **No central decisions log** — decisions are written in discovery docs and plan Decision Records, and durable ones are promoted here at pre-merge (push, not pull).

## Dependencies

**Depends on:** Foundry VTT core (v13–v14) and the PF2e game system.

**Depended on by:** nothing yet.
