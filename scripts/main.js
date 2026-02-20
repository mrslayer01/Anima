import { AbfActor } from "./documents/abf-actor.js";
import { AbfItem } from "./documents/abf-item.js";
import { AbfActorSheet } from "./ui/abf-actor-sheet.js";
import { AbfItemSheet } from "./ui/abf-item-sheet.js";
import { InitalizeAllActorPartials } from "./templates/initialize-actor-partials.js";
import { loadAllActorHandlerbarsHelpers } from "./ui/handlebars-helpers.js";
import { InitalizeAllItemPartials } from "./templates/initialize-item-partials.js";
import { WeaponBaseCalculations } from "./data/rules/items/weapon-calculations.js";
import { ArmorCalculation, UpdateArmor } from "./data/rules/items/armor-calculations.js";
import { AnimaCombat } from "./utils/combat.js";

Hooks.once("init", function () {
  console.log("ABF | Initializing Anima Beyond Fantasy system");
  CONFIG.debug.compatibility = false;

  CONFIG.Actor.documentClass = AbfActor;
  CONFIG.Item.documentClass = AbfItem;
  CONFIG.Combat.documentClass = AnimaCombat;

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

Hooks.on("updateActor", (actor, updateData, options, userId) => {
  // Only recompute if Strength changed
  if (foundry.utils.hasProperty(updateData, "system.characteristics.Strength")) {
    WeaponBaseCalculations(actor);
  }
  // Only recomputer if WearArmor Changed
  if (foundry.utils.hasProperty(updateData, "system.abilities.primary.Combat.WearArmor.base")) {
    UpdateArmor(actor);
  }
});

Hooks.on("updateItem", (item) => {
  const actor = item.parent;
  if (!actor) return;

  if (item.type === "weapon") {
    // If the equipped armor values are changed, prompt sheet to re calculate.
    WeaponBaseCalculations(actor);
  }

  if (item.type === "armor") {
    if (item.system.equipped) {
      // If the equipped armor values are changed, prompt sheet to re calculate.
      ArmorCalculation(actor, item);
    } else {
      UpdateArmor(actor);
    }
  }
});

Hooks.on("updateCombat", async (combat, changes) => {
  if (!("round" in changes)) return; // only on new round

  // Roll initiative for everyone
  await combat.rollInitiative(
    combat.combatants.map((c) => c.id),
    { updateTurn: true }
  );
});
