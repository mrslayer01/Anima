import { openJournalFromName } from "../../utils/helpers.js";
import { toNum } from "../../utils/numbers.js";
import { DisciplineBrowser } from "../windows/psychic-discipline-browser.js";
import { MentalPowerPurchaseWindow } from "../windows/psychic-powers-browser.js";

export function PsychicListeners(sheet, html) {
  html.find(".discipline-name").off("click");
  html.find(".discipline-name").click((ev) => {
    ev.preventDefault();

    const name = ev.currentTarget.dataset.name;

    console.log(name);

    openJournalFromName(name);
  });

  html.find(".add-psychic-discipline").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".add-psychic-discipline").on("click", (ev) => {
    new DisciplineBrowser({ actorId: sheet.actor.id }).render(true);
  });

  html.find(".add-psychic-power").on("click", (ev) => {
    new MentalPowerPurchaseWindow({
      actorId: sheet.actor.id
    }).render(true);
  });

  html.find(".delete-psychic-discipline").on("click", async (ev) => {
    const index = Number(ev.currentTarget.dataset.index);
    const actor = sheet.actor;

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content:
          "<p>Are you sure you want to remove this discipline and all powers belonging to it?</p>"
      },
      { classes: ["abf-character-sheet"] }
    );

    if (!confirmed) return;

    // Clone the list
    const disciplines = foundry.utils.duplicate(actor.system.psychic.disciplines);

    // Safety check
    if (!disciplines[index]) {
      ui.notifications.error("Discipline not found.");
      return;
    }

    const removed = disciplines.splice(index, 1)[0];
    const removedName = removed.name;

    // Remove mental powers belonging to this discipline
    const powers = foundry.utils
      .duplicate(actor.system.psychic.mentalPowers)
      .filter((p) => p.discipline !== removedName);

    // Update actor in one atomic update
    await actor.update({
      "system.psychic.disciplines": disciplines,
      "system.psychic.mentalPowers": powers
    });

    ui.notifications.info(`Removed Discipline: ${removedName} and all associated Mental Powers.`);
  });

  html.find(".delete-mental-power").on("click", async (ev) => {
    const index = Number(ev.currentTarget.dataset.index);
    const actor = sheet.actor;

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this power?</p>"
      },
      { classes: ["abf-character-sheet"] }
    );

    if (!confirmed) return;

    const powers = foundry.utils.duplicate(actor.system.psychic.mentalPowers);
    const removed = powers.splice(index, 1)[0];

    await actor.update({ "system.psychic.mentalPowers": powers });

    ui.notifications.info(`Removed Mental Power: ${removed.name}`);
  });

  // CHEVRON CLICK — stop it from bubbling into the header
  html.find(".toggle-power").on("click", (ev) => {
    ev.stopPropagation(); // <-- this is the key
    const item = $(ev.currentTarget).closest(".power-item");
    item.toggleClass("open");
  });

  // HEADER CLICK — normal toggle
  html.find(".power-header").on("click", (ev) => {
    const item = $(ev.currentTarget).closest(".power-item");
    item.toggleClass("open");
  });
}
