import { ABF_NPC_POWERS } from "../../config/npcs.js";
import { toNum } from "../../utils/numbers.js";
import { NpcPowerBrowser } from "../windows/npc-power-browser.js";
import { NpcAbilitiesWindow } from "../windows/nps-abilities.js";

export function NpcListeners(sheet, html) {
  // NPC Abilities
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

    const classes = foundry.utils.duplicate(sheet.actor.system.npc.abilities);

    // Grab the class name BEFORE deleting it
    const deletedPowerName = classes[index]?.name;

    // Remove from actor
    classes.splice(index, 1);
    await sheet.actor.update({ "system.npc.abilities": classes });

    // Reset the ability, clearing out any purchased abilities.
    if (deletedPowerName && ABF_NPC_POWERS[deletedPowerName]) {
      ABF_NPC_POWERS[deletedPowerName].purchased = false;
      ABF_NPC_POWERS[deletedPowerName].purchasedabilities = [];
    }
  });
}
