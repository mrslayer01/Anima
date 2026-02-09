import { AbfActor } from "./documents/abf-actor.js";
import { AbfItem } from "./documents/abf-item.js";
import { AbfActorSheet } from "./ui/abf-actor-sheet.js";
import { AbfItemSheet } from "./ui/abf-item-sheet.js";
import { InitalizeAllActorPartials } from "./templates/initialize-actor-partials.js";

Hooks.once("init", function () {
  console.log("ABF | Initializing Anima Beyond Fantasy system");
  CONFIG.debug.compatibility = false;

  CONFIG.Actor.documentClass = AbfActor;
  CONFIG.Item.documentClass = AbfItem;

  InitalizeAllActorPartials();

  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet("abf-system", AbfActorSheet, {
    makeDefault: true
  });

  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet("abf-system", AbfItemSheet, {
    makeDefault: true
  });
});
