import { MODULE_ID, SETTINGS } from "./constants.js";

const prefix = `${MODULE_ID} |`;

/**
 * Small logging helper. `debug` only prints when the module's Debug setting
 * is on, so you can leave debug calls in the code.
 */
export const log = {
  /** @param {...unknown} args */
  info: (...args) => console.log(prefix, ...args),

  /** @param {...unknown} args */
  warn: (...args) => console.warn(prefix, ...args),

  /** @param {...unknown} args */
  error: (...args) => console.error(prefix, ...args),

  /** @param {...unknown} args */
  debug: (...args) => {
    // Settings are not readable before "init" finishes, so guard the lookup.
    let enabled = false;
    try {
      enabled = game.settings.get(MODULE_ID, SETTINGS.DEBUG);
    } catch {
      enabled = false;
    }
    if (enabled) console.debug(prefix, ...args);
  },
};
