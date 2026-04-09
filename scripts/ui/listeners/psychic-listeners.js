import { openJournalFromName, promptManualEdit } from "../../utils/helpers.js";
import { toNum } from "../../utils/numbers.js";
import { DisciplineBrowser } from "../windows/psychic-discipline-browser.js";
import { MentalPowerPurchaseWindow } from "../windows/psychic-powers-browser.js";
import { PsychicPPSpendWindow } from "../windows/purchase-windows/psychic-points-purchase.js";

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

  html.find(".spend-psychic-points").on("click", (ev) => {
    new PsychicPPSpendWindow(sheet.actor).render(true);
  });

  html.find(".delete-psychic-discipline").on("click", async (ev) => {
    const index = toNum(ev.currentTarget.dataset.index);
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
    const index = toNum(ev.currentTarget.dataset.index);
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

  html.find(".toggle-power").on("click", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const item = $(ev.currentTarget).closest(".power-item");
    item.toggleClass("open");
  });

  html.find(".pp-current-manual").off("click");
  html.find(".pp-current-manual").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const actor = sheet.actor;
    // Allow the user to manually set their temporary pp used
    const value = await promptManualEdit();
    if (value === null) return;

    await actor.update({
      "system.abilities.primary.Psychic.PsychicPoints.current": value
    });
  });

  html.find(".innate-slot-manual").off("click");
  html.find(".innate-slot-manual").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const actor = sheet.actor;
    // Allow the user to manually set their Innate power slots
    const value = await promptManualEdit();
    if (value === null) return;

    await actor.update({
      "system.abilities.primary.Psychic.PsychicPoints.innateSlots": value
    });
  });

  html.find(".mental-power-active").off("click");
  html.find(".mental-power-active").on("click", async (ev) => {
    ev.preventDefault();

    const index = toNum(ev.currentTarget.dataset.index);
    const actor = sheet.actor;

    // Clone array
    const powers = foundry.utils.duplicate(actor.system.psychic.mentalPowers);

    const power = powers[index];
    if (!power) return;

    // Toggle
    power.isActive = !power.isActive;

    // Update actor
    await actor.update({
      "system.psychic.mentalPowers": powers
    });
  });

  html.find(".mental-power-innate").off("click");
  html.find(".mental-power-innate").on("click", async (ev) => {
    ev.preventDefault();

    const index = toNum(ev.currentTarget.dataset.index);
    const actor = sheet.actor;

    // Clone array
    const powers = foundry.utils.duplicate(actor.system.psychic.mentalPowers);

    const power = powers[index];
    if (!power) return;

    // Toggle
    power.innate = !power.innate;

    // Update actor
    await actor.update({
      "system.psychic.mentalPowers": powers
    });
  });
}
