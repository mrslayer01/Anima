import { ABF_ADVANTAGES } from "../../config/advantages.js";
import { ABF_DISADVANTAGES } from "../../config/disadvantages.js";
import { normalizeName, openJournalFromUUID } from "../../utils/helpers.js";
import { toNum } from "../../utils/numbers.js";
import { AddADisadvantageWindow } from "../windows/add-disadvantage.js";
import { AddAdvantageWindow } from "../windows/add-advantage.js";

export function AdvantageDisadvantageListeners(sheet, html) {
  Advanatges(sheet, html);
  Disadvantages(sheet, html);
}

function Advanatges(sheet, html) {
  html.find(".add-advantage").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".add-advantage").on("click", () => {
    new AddAdvantageWindow({ actorId: sheet.actor.id }).render(true);
  });

  html.find(".delete-advantage").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".delete-advantage").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this advantage?</p>"
      },
      {
        classes: ["abf-character-sheet"]
      }
    );

    if (!confirmed) return;

    const advantages = foundry.utils.duplicate(sheet.actor.system.advantages);

    // Grab the advantage name BEFORE deleting it
    const deletedAdvantageName = advantages[index]?.name;

    // Remove from actor
    advantages.splice(index, 1);
    await sheet.actor.update({ "system.advantages": advantages });

    // Reset the class level in the registry (so re-adding starts at level 1)
    if (deletedAdvantageName && ABF_ADVANTAGES[deletedAdvantageName]) {
      ABF_ADVANTAGES[deletedAdvantageName].level = 1;
    }
  });

  // Click class name for information
  html.find(".clickable-advantage").click((ev) => {
    ev.preventDefault();

    const advName = ev.currentTarget.dataset.advantage;
    const advData = sheet.actor.system.advantages.find((c) => c.name === advName);

    if (!advData) return ui.notifications.error("Adavantage data not found");

    openJournalFromUUID(advData.journal);
  });
}

function Disadvantages(sheet, html) {
  html.find(".add-disadvantage").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".add-disadvantage").on("click", () => {
    new AddADisadvantageWindow({ actorId: sheet.actor.id }).render(true);
  });

  html.find(".delete-disadvantage").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".delete-disadvantage").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this disadvantage?</p>"
      },
      {
        classes: ["abf-character-sheet"]
      }
    );

    if (!confirmed) return;

    const disadvantages = foundry.utils.duplicate(sheet.actor.system.disadvantages);

    // Grab the disadvantage name BEFORE deleting it
    const deletedDisadvantageName = disadvantages[index]?.name;

    // Remove from actor
    disadvantages.splice(index, 1);
    await sheet.actor.update({ "system.disadvantages": disadvantages });

    // Reset the class level in the registry (so re-adding starts at level 1)
    if (deletedDisadvantageName && ABF_DISADVANTAGES[deletedDisadvantageName]) {
      ABF_DISADVANTAGES[deletedDisadvantageName].level = 1;
    }
  });

  // Click class name for information
  html.find(".clickable-disadvantage").click((ev) => {
    ev.preventDefault();

    const advName = ev.currentTarget.dataset.disadvantage;
    const advData = sheet.actor.system.disadvantages.find((c) => c.name === advName);

    if (!advData) return ui.notifications.error("Disdisadvantage data not found");

    openJournalFromUUID(advData.journal);
  });
}
