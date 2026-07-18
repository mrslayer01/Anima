import { ABF_NPC_POWERS, ABF_NPC_ADVANTAGES, ABF_NPC_DISADVANTAGES } from "../../config/npcs.js";
import { toNum } from "../../utils/numbers.js";
import { AddNPCTraitWindow } from "../windows/npc-add-essential-ability.js";
import { NpcPowerBrowser } from "../windows/npc-power-browser.js";
import { NpcAbilitiesWindow } from "../windows/nps-abilities.js";

export function NpcListeners(sheet, html) {
  // NPC Abilities
  //#region Abilities
  html.find(".clickable-npc-power").on("click", (event) => {
    const index = toNum(event.currentTarget.dataset.index);
    const powerName = event.currentTarget.dataset.power;

    const ability = sheet.actor.system.npc.abilities[index];

    new NpcAbilitiesWindow(powerName, ability, {
      actorId: sheet.actor.id
    }).render(true);
  });

  html.find(".add-npc-power").on("click", () => {
    // Open a dialog to choose from ABF_NPC_POWERS
    new NpcPowerBrowser({
      actorId: sheet.actor.id
    }).render(true);
  });

  html.find(".delete-power").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".delete-power").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this power?</p>"
      },
      {
        classes: ["abf-character-sheet"]
      }
    );

    if (!confirmed) return;

    const abilities = foundry.utils.duplicate(sheet.actor.system.npc.abilities);

    // Grab the class name BEFORE deleting it
    const deletedPowerName = abilities[index]?.name;

    // Remove from actor
    abilities.splice(index, 1);
    await sheet.actor.update({ "system.npc.abilities": abilities });

    // Reset the ability, clearing out any purchased abilities.
    if (deletedPowerName && ABF_NPC_POWERS[deletedPowerName]) {
      ABF_NPC_POWERS[deletedPowerName].purchased = false;
      ABF_NPC_POWERS[deletedPowerName].purchasedabilities = [];
    }
  });
  //#endregion

  //#region Essential Abilities
  html.find(".add-npc-advantage").off("click");
  html.find(".add-npc-advantage").on("click", () => {
    new AddNPCTraitWindow({
      actorId: sheet.actor.id,
      traitCategory: "Advantage"
    }).render(true);
  });

  html.find(".delete-npc-advantage").off("click");
  html.find(".delete-npc-advantage").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this advantage?</p>"
      },
      { classes: ["abf-character-sheet"] }
    );

    if (!confirmed) return;

    const advantages = foundry.utils.duplicate(sheet.actor.system.npc.advantages);
    const deletedName = advantages[index]?.name;

    advantages.splice(index, 1);
    await sheet.actor.update({ "system.npc.advantages": advantages });
  });

  html.find(".add-npc-disadvantage").off("click");
  html.find(".add-npc-disadvantage").on("click", () => {
    new AddNPCTraitWindow({
      actorId: sheet.actor.id,
      traitCategory: "Disadvantage"
    }).render(true);
  });

  html.find(".delete-npc-disadvantage").off("click");
  html.find(".delete-npc-disadvantage").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this Disadvantage?</p>"
      },
      { classes: ["abf-character-sheet"] }
    );

    if (!confirmed) return;

    const disadvantages = foundry.utils.duplicate(sheet.actor.system.npc.disadvantages);
    const deletedName = disadvantages[index]?.name;

    disadvantages.splice(index, 1);
    await sheet.actor.update({ "system.npc.disadvantages": disadvantages });
  });
  //#endregion
}
