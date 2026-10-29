import { MODULE_ID, I18N } from "../constants.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * A minimal ApplicationV2 window. It proves the template, styles and
 * localization are wired up, and is the pattern to copy for real tools.
 *
 * Open it from a macro or the browser console:
 *   game.modules.get("wayfinder-dice-lab").api.openHello()
 */
export class HelloApp extends HandlebarsApplicationMixin(ApplicationV2) {
  /** Window-level options. Merged with the parent class's defaults. */
  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-hello`,
    classes: ["wayfinder"],
    tag: "section",
    window: {
      title: `${I18N}.Hello.Title`,
      icon: "fa-solid fa-compass",
      resizable: true,
    },
    position: { width: 400, height: "auto" },
    actions: {
      // Bound to buttons with data-action="ping" in the template.
      ping: HelloApp.#onPing,
    },
  };

  /** Template parts. Each part renders one .hbs file. */
  static PARTS = {
    body: { template: `modules/${MODULE_ID}/templates/hello.hbs` },
  };

  /**
   * Data passed to the template.
   * @returns {Promise<object>}
   */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    return {
      ...context,
      userName: game.user.name,
      systemId: game.system.id,
      systemVersion: game.system.version,
      foundryVersion: game.version,
    };
  }

  /**
   * Handler for data-action="ping". `this` is the app instance.
   * @this {HelloApp}
   * @param {PointerEvent} _event
   * @param {HTMLElement} _target
   */
  static #onPing(_event, _target) {
    ui.notifications.info(game.i18n.localize(`${I18N}.Hello.Pong`));
  }
}
