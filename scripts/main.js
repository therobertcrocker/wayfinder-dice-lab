/**
 * Entry point. Listed under "esmodules" in module.json.
 *
 * Foundry loads this file once per client, then fires hooks in order:
 *   init  -> settings, config, class registration (no game data yet)
 *   setup -> after init, before the world's documents are ready
 *   ready -> game data is loaded; safe to read actors, scenes, users
 */
import { MODULE_ID } from "./constants.js";
import { log } from "./logger.js";
import { registerSettings } from "./settings.js";
import { HelloApp } from "./apps/hello-app.js";

Hooks.once("init", () => {
  log.info("Initializing");
  registerSettings();

  // Public API, reachable from macros and other modules:
  //   game.modules.get("wayfinder-dice-lab").api
  game.modules.get(MODULE_ID).api = {
    openHello: () => new HelloApp().render({ force: true }),
  };
});

Hooks.once("ready", () => {
  log.info(`Ready (Foundry ${game.version}, ${game.system.id} ${game.system.version})`);
  log.debug("Debug logging is on");
});
