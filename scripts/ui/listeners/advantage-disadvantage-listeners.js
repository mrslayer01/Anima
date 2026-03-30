import { ABF_ADVANTAGES } from "../../config/advantages.js";
import { ABF_DISADVANTAGES } from "../../config/disadvantages.js";
import { toNum } from "../../utils/numbers.js";
import { AddTraitWindow } from "../windows/add-trait.js"; // NEW unified browser
import { openJournalFromName } from "../../utils/helpers.js";

export function AdvantageDisadvantageListeners(sheet, html) {
  TraitAddButtons(sheet, html);
  AdvantageDelete(sheet, html);
  DisadvantageDelete(sheet, html);
  AdvantageInfo(sheet, html);
  DisadvantageInfo(sheet, html);
}

/* -------------------------------------------- */
/*  OPEN UNIFIED TRAIT BROWSER                  */
/* -------------------------------------------- */

function TraitAddButtons(sheet, html) {
  html.find(".add-advantage").off("click");
  html.find(".add-disadvantage").off("click");

  html.find(".add-advantage").on("click", () => {
    new AddTraitWindow({
      actorId: sheet.actor.id,
      initialFilter: "Advantage"
    }).render(true);
  });

  html.find(".add-disadvantage").on("click", () => {
    new AddTraitWindow({
      actorId: sheet.actor.id,
      initialFilter: "Disadvantage"
    }).render(true);
  });
}

/* -------------------------------------------- */
/*  DELETE ADVANTAGE                            */
/* -------------------------------------------- */

function AdvantageDelete(sheet, html) {
  html.find(".delete-advantage").off("click");
  html.find(".delete-advantage").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this advantage?</p>"
      },
      { classes: ["abf-character-sheet"] }
    );

    if (!confirmed) return;

    const advantages = foundry.utils.duplicate(sheet.actor.system.advantages);
    const deletedName = advantages[index]?.name;

    advantages.splice(index, 1);
    await sheet.actor.update({ "system.advantages": advantages });

    if (deletedName && ABF_ADVANTAGES[deletedName]) {
      ABF_ADVANTAGES[deletedName].level = 1;
    }
  });
}

/* -------------------------------------------- */
/*  DELETE DISADVANTAGE                         */
/* -------------------------------------------- */

function DisadvantageDelete(sheet, html) {
  html.find(".delete-disadvantage").off("click");
  html.find(".delete-disadvantage").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this disadvantage?</p>"
      },
      { classes: ["abf-character-sheet"] }
    );

    if (!confirmed) return;

    const disadvantages = foundry.utils.duplicate(sheet.actor.system.disadvantages);
    const deletedName = disadvantages[index]?.name;

    disadvantages.splice(index, 1);
    await sheet.actor.update({ "system.disadvantages": disadvantages });

    if (deletedName && ABF_DISADVANTAGES[deletedName]) {
      ABF_DISADVANTAGES[deletedName].level = 1;
    }
  });
}

/* -------------------------------------------- */
/*  CLICK FOR JOURNAL INFO                      */
/* -------------------------------------------- */

function AdvantageInfo(sheet, html) {
  html.find(".clickable-advantage").off("click");
  html.find(".clickable-advantage").on("click", (ev) => {
    ev.preventDefault();

    const name = ev.currentTarget.dataset.advantage;
    const data = sheet.actor.system.advantages.find((a) => a.name === name);

    if (!data) return ui.notifications.error("Advantage data not found");

    openJournalFromName(name);
  });
}

function DisadvantageInfo(sheet, html) {
  html.find(".clickable-disadvantage").off("click");
  html.find(".clickable-disadvantage").on("click", (ev) => {
    ev.preventDefault();

    const name = ev.currentTarget.dataset.disadvantage;
    const data = sheet.actor.system.disadvantages.find((d) => d.name === name);

    if (!data) return ui.notifications.error("Disadvantage data not found");

    openJournalFromName(name);
  });
}
