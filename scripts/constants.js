/**
 * Shared constants. Import from here instead of hard-coding the module id,
 * so a rename only touches this file and module.json.
 */

/** Must match "id" in module.json exactly. */
export const MODULE_ID = "wayfinder-dice-lab";

/** Prefix for keys in lang/en.json. */
export const I18N = "WAYFINDER";

/** Setting keys, registered in settings.js. */
export const SETTINGS = Object.freeze({
  DEBUG: "debug",
});
