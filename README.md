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
├── docs/decisions.md      # Decisions log
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

## Local development

Foundry loads modules from `{userData}/Data/modules/<id>/`, and the folder name must match `"id"` in `module.json`. Clone the repo wherever you keep code, then symlink it into Foundry's data folder so edits show up immediately.

Find `<userData>` in Foundry under **Setup → Configuration → User Data Path**.

**macOS / Linux** (from the repo root)
```sh
ln -s "$(pwd)" "<userData>/Data/modules/wayfinder-dice-lab"
```

**Windows** (PowerShell as admin, from the repo root)
```powershell
New-Item -ItemType SymbolicLink -Path "<userData>\Data\modules\wayfinder-dice-lab" -Target (Get-Location)
```

Then:
1. Launch a PF2e world and enable **Wayfinder Dice Lab** in **Manage Modules**.
2. Open the browser console (F12). You should see `wayfinder-dice-lab | Ready ...`.
3. Run this in the console or a script macro to open the example window:
   ```js
   game.modules.get("wayfinder-dice-lab").api.openHello()
   ```

**Reloading:** JS, CSS, template and lang changes need a browser refresh (F5). Changes to `module.json` need a return to Setup and a relaunch of the world.

## Releasing

1. Push your changes to `main`.
2. On GitHub, publish a release with a tag like `v0.2.0`.
3. The release workflow stamps that version into `module.json`, builds `module.zip`, and attaches both.

Install URL for Foundry (**Install Module → Manifest URL**):
```
https://github.com/therobertcrocker/wayfinder-dice-lab/releases/latest/download/module.json
```

## Conventions

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/).
- **Decisions:** recorded in [`docs/decisions.md`](docs/decisions.md).

## References

- [Module development intro](https://foundryvtt.com/article/module-development/)
- [Foundry API docs](https://foundryvtt.com/api/)
- [ApplicationV2](https://foundryvtt.com/api/classes/foundry.applications.api.ApplicationV2.html)
- [Hooks](https://foundryvtt.com/api/classes/foundry.helpers.Hooks.html)
- [PF2e system repo](https://github.com/foundryvtt/pf2e)

## License

[MIT](LICENSE)
