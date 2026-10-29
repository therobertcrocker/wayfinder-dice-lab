# Wayfinder Dice Lab

A Foundry VTT module for Pathfinder 2e GMs: dice probability calculations, in the spirit of [AnyDice](https://anydice.com), for balancing encounters.

- **Module id:** `wayfinder-dice-lab`
- **Foundry:** v13 – v14
- **System:** PF2e

> **Status:** starter scaffold. The calculator isn't built yet; the module currently opens an example window to prove the wiring works.

## What it's for

These are the questions the module should answer. They're use cases, not a UI design.

- **Degree-of-success odds:** for a given attack or effect, what are the chances it critically succeeds, succeeds, fails or critically fails against each member of the party?
- **Expected damage:** how much damage per turn should the party expect to take from this creature?

## Layout

```
wayfinder-dice-lab/
├── module.json            # Manifest: what Foundry reads to load the module
├── scripts/
│   ├── main.js            # Entry point: hooks (init, ready) and public API
│   ├── constants.js       # MODULE_ID, i18n prefix, setting keys
│   ├── logger.js          # Prefixed console logging + debug toggle
│   ├── settings.js        # game.settings registrations
│   └── apps/
│       └── hello-app.js   # Example ApplicationV2 window
├── templates/hello.hbs    # Handlebars template for the example window
├── styles/wayfinder.css   # Styles, scoped under .wayfinder
├── lang/en.json           # Localized strings
├── docs/
│   ├── architecture/overview.md   # Module shape + Key Decisions
│   ├── planned-work.md            # Initiative tracker
│   └── process/                   # Session modes, style guide, templates
├── CLAUDE.md              # Instructions for Claude Code sessions
├── .claude/settings.json  # Claude Code permissions, plugins, hooks
├── .devcontainer/         # Dev container: editor + local Foundry server
└── .github/workflows/release.yml
```

## How it loads

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
   Hooks "ready" ──► logs Foundry + PF2e versions
```

## Development (dev container)

Development runs in a VS Code dev container with two parts: a `dev` container where you edit and run tools, and a `foundry` container running a real Foundry v14 server. This repo is mounted into Foundry's modules folder, so saving a file is all it takes for Foundry to see the change.

```
 VS Code ──attaches──► dev container            foundry container (felddy/foundryvtt:14)
                       ┌────────────────┐       ┌───────────────────────────────────────┐
                       │ /workspaces/   │ bind  │ /data/Data/modules/wayfinder-dice-lab │
                       │ wayfinder-     ├──────►│        (same files, read-only)        │
                       │ dice-lab       │ mount │ /data  ← named volume: PF2e, test     │
                       │ node, git      │       │          world, settings persist      │
                       └────────────────┘       └──────────────┬────────────────────────┘
                                                               │ port 30000
                                              browser: http://localhost:30000
```

### First-time setup

1. Copy `.devcontainer/.env.example` to `.devcontainer/.env` and fill in your foundryvtt.com username and password, plus an admin key of your choice. `.env` is gitignored.
2. In VS Code, run **Dev Containers: Reopen in Container**.
3. Wait for Foundry to download on first start. Watch progress with `docker logs -f wayfinder-dice-lab-foundry-1` on your host.
4. Open http://localhost:30000 and log in with your admin key.
5. In Foundry's Setup screen, install the **Pathfinder Second Edition** system and create a test world.
6. Launch the world, then enable **Wayfinder Dice Lab** in **Manage Modules**.
7. Check it works: open the browser console (F12). You should see `wayfinder-dice-lab | Ready ...`. Then run:
   ```js
   game.modules.get("wayfinder-dice-lab").api.openHello()
   ```

Foundry's data (systems, worlds, settings and the downloaded Foundry zip) lives in a Docker volume, so all of this survives container rebuilds. To start completely fresh, remove the `wayfinder-dice-lab_foundry-data` volume.

### Claude Code

The dev container installs Claude Code, both the `claude` CLI and the VS Code extension panel.

1. Before the first start, make sure the folder `%USERPROFILE%\.claude-devcontainer` exists on Windows. The container doesn't start without it.
2. Your sign-in, settings, history and Claude's memories live in that folder, shared with your other dev containers (gm-toolkit, gestalt). You sign in once for all of them, and it survives rebuilds.
3. If you aren't signed in yet, run `claude` in a VS Code terminal inside the container and sign in through the browser. If the browser finishes but the terminal keeps waiting, copy the code shown in the browser and paste it at the terminal's prompt.

Claude runs inside the container, so its commands can't touch your host. File edits still land in your repo, because the repo is bind-mounted.

### Day to day

- **CSS, templates and lang files** reload automatically (hot reload is on).
- **JavaScript** changes need a browser refresh (F5).
- **`module.json`** changes need a return to Setup and a relaunch of the world.

The module folder is mounted **read-only** inside Foundry, so uninstalling or updating the module from Foundry's UI can't touch your code. If Foundry ever shows an error about writing to the module, that's why.

## Installing on a game server

Your real game server (for example a hosted Foundry) installs the module from a GitHub release, the same way as any other module. Don't copy development files onto it.

1. Push your changes to `main`.
2. On GitHub, publish a release with a tag like `v0.2.0`. The release workflow stamps that version into `module.json`, builds `module.zip`, and attaches both.
3. In the server's Foundry, go to **Add-on Modules → Install Module** and paste the manifest URL:
   ```
   https://github.com/therobertcrocker/wayfinder-dice-lab/releases/latest/download/module.json
   ```
4. For later versions, publish a new release and click **Update** in Foundry.

## Conventions

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/).
- **Process:** Discovery → Plan → Execution sessions, described in [`docs/process/session-modes.md`](docs/process/session-modes.md). Work is tracked in [`docs/planned-work.md`](docs/planned-work.md).
- **Decisions:** durable ones live in `Key Decisions` in [`docs/architecture/overview.md`](docs/architecture/overview.md); the rest live in each initiative's plan.

## References

- [Module development intro](https://foundryvtt.com/article/module-development/)
- [Foundry API docs](https://foundryvtt.com/api/)
- [ApplicationV2](https://foundryvtt.com/api/classes/foundry.applications.api.ApplicationV2.html)
- [Hooks](https://foundryvtt.com/api/classes/foundry.helpers.Hooks.html)
- [PF2e system repo](https://github.com/foundryvtt/pf2e)

## License

[MIT](LICENSE)
