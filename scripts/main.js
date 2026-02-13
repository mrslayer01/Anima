import { AbfActor } from "./documents/abf-actor.js";
import { AbfItem } from "./documents/abf-item.js";
import { AbfActorSheet } from "./ui/abf-actor-sheet.js";
import { AbfItemSheet } from "./ui/abf-item-sheet.js";
import { InitalizeAllActorPartials } from "./templates/initialize-actor-partials.js";
import { loadAllActorHandlerbarsHelpers } from "./ui/handlebars-helpers.js";
import { InitalizeAllItemPartials } from "./templates/initialize-item-partials.js";
import { CLASS_RULE, FINAL_RULES, INIT_RULES } from "./data/rules/rules.js";

Hooks.once("init", function () {
  console.log("ABF | Initializing Anima Beyond Fantasy system");
  CONFIG.debug.compatibility = false;

  CONFIG.Actor.documentClass = AbfActor;
  CONFIG.Item.documentClass = AbfItem;

  loadAllActorHandlerbarsHelpers();
  InitalizeAllActorPartials();
  InitalizeAllItemPartials();

  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet("abf-system", AbfActorSheet, {
    makeDefault: true
  });

  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet("abf-system", AbfItemSheet, {
    makeDefault: true
  });
});

Hooks.on("updateItem", (item, updateData) => {
  const actor = item.actor;
  if (!actor) return;

  const oldSystem = foundry.utils.duplicate(actor.system);

  // Run rules directly
  for (const rule of INIT_RULES) rule.Update(updateData, oldSystem, actor.system);
  for (const rule of CLASS_RULE) rule.Update(updateData, oldSystem, actor.system);
  for (const rule of FINAL_RULES) rule.Update(updateData, oldSystem, actor.system);

  actor.update({ system: actor.system });
});
