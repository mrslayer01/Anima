import { AbfActor } from "./actor/abf-actor.js";
import { AbfActorSheet } from "./actor/abf-actor-sheet.js";
import { AbfItem } from "./item/abf-item.js";
import { AbfItemSheet } from "./item/abf-item-sheet.js";

Hooks.once("init", function () {
  console.log("ABF | Initializing Anima Beyond Fantasy system");
  CONFIG.debug.compatibility = false;
  Handlebars.registerHelper("ifEquals", function(a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
  });
  Handlebars.registerHelper("percent", function (current, max) {
  if (!max || max === 0) return 0;
  return Math.min(100, Math.floor((current / max) * 100));
  });

  CONFIG.Actor.documentClass = AbfActor;
  CONFIG.Item.documentClass = AbfItem;

    const mainPartials = [
    "aspect",
    "description",
  ];

  const headerPartials = [
    "header",
    "portrait",
    "characteristics",
    "resistances",
    "life-fatigue-turn",
    "modifiers",
    "final-armor",
    "header-top",
    "movement",
    "character"
  ];

  for (const p of mainPartials) {
    loadTemplates([
      `systems/abf-system/templates/actors/partials/${p}.hbs`
    ]);
  }

  for (const p of headerPartials) {
    loadTemplates([
      `systems/abf-system/templates/actors/partials/header/${p}.hbs`
    ]);
  }

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("abf-system", AbfActorSheet, { makeDefault: true });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("abf-system", AbfItemSheet, { makeDefault: true });
});