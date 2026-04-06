import { toNum } from "../../utils/numbers.js";
import { DisciplineBrowser } from "../windows/psychic-discipline-browser.js";
import { MentalPowerPurchaseWindow } from "../windows/psychic-powers-browser.js";

export function PsychicListeners(sheet, html) {
  html.find(".add-psychic-discipline").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".add-psychic-discipline").on("click", (ev) => {
    new DisciplineBrowser({ actorId: sheet.actor.id }).render(true);
  });

  html.find(".open-discipline").on("click", (ev) => {
    const index = toNum(ev.currentTarget.dataset.index);

    new MentalPowerPurchaseWindow({
      actorId: sheet.actor.id,
      disciplineKey: index
    }).render(true);
  });

  html.find(".delete-psychic-discipline").on("click", async (ev) => {
    const index = Number(ev.currentTarget.dataset.index);

    const actor = sheet.actor; // or game.actors.get(this.actorId)

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this discipline?</p>"
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

    // Update actor
    await actor.update({
      "system.psychic.disciplines": disciplines
    });

    ui.notifications.info(`Removed Discipline: ${removed.name}`);
  });
}
