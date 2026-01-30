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

  CONFIG.Actor.documentClass = AbfActor;
  CONFIG.Item.documentClass = AbfItem;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("abf-system", AbfActorSheet, { makeDefault: true });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("abf-system", AbfItemSheet, { makeDefault: true });
});