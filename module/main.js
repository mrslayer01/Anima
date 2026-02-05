import { AbfActor } from "./actor/abf-actor.js";
import { AbfActorSheet } from "./actor/abf-actor-sheet.js";
import { AbfItem } from "./item/abf-item.js";
import { AbfItemSheet } from "./item/abf-item-sheet.js";
import { loadAllPartials } from "./actor/partials/load-all-partials.js";
import { loadAllHandlerbarsHelpers } from "./helpers/handlebars-helpers.js";

Hooks.once("init", function () {
  console.log("ABF | Initializing Anima Beyond Fantasy system");
  CONFIG.debug.compatibility = false;
  
  loadAllHandlerbarsHelpers();

  loadAllPartials();

  CONFIG.Actor.documentClass = AbfActor;
  CONFIG.Item.documentClass = AbfItem;

  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet("abf-system", AbfActorSheet, { makeDefault: true });

  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet("abf-system", AbfItemSheet, { makeDefault: true });
});