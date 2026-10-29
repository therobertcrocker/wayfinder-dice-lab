import { MODULE_ID, I18N, SETTINGS } from "./constants.js";

/**
 * Register module settings. Called from the "init" hook.
 * Settings show up under Game Settings > Configure Settings > Wayfinder Dice Lab.
 */
export function registerSettings() {
  game.settings.register(MODULE_ID, SETTINGS.DEBUG, {
    name: `${I18N}.Settings.Debug.Name`,
    hint: `${I18N}.Settings.Debug.Hint`,
    scope: "client", // per-browser; use "world" for GM-controlled settings
    config: true,
    type: Boolean,
    default: false,
  });
}
