import { openJournalFromUUID } from "../../utils/helpers.js";
import { toNum } from "../../utils/numbers.js";
import { AddModuleWindow } from "../windows/add-Module.js";

export function ModuelsListeners(sheet, html) {
  html.find(".add-module-weapon").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".add-module-weapon").on("click", (ev) => {
    new AddModuleWindow({ actorId: sheet.actor.id }).render(true);
  });

  html.find(".delete-module").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".delete-module").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this module?</p>"
      },
      {
        classes: ["abf-character-sheet"]
      }
    );

    if (!confirmed) return;
    let modType = event.currentTarget.dataset.type;

    if (modType === "Archetypical Weapons" || modType === "General Weapon")
      modType = "WeaponModules";
    if (modType === "Style") modType = "StyleModules";
    if (modType === "Mystical") modType = "MysticalModules";
    if (modType === "Psychic") modType = "PsychicModules";
    if (modType === "Martial Arts") modType = "MartialArts";

    const modules = foundry.utils.duplicate(sheet.actor.system.modules[modType]);

    // Remove from actor
    modules.splice(index, 1);
    await sheet.actor.update({
      [`system.modules.${modType}`]: modules
    });
  });

  // Click class name for information
  html.find(".clickable-module").click((ev) => {
    ev.preventDefault();

    const modName = ev.currentTarget.dataset.module;
    let modType = ev.currentTarget.dataset.type;

    if (modType === "Archetypical Weapons" || modType === "General Weapon")
      modType = "WeaponModules";
    if (modType === "Style") modType = "StyleModules";
    if (modType === "Mystical") modType = "MysticalModules";
    if (modType === "Psychic") modType = "PsychicModules";
    if (modType === "Martial Arts") modType = "MartialArts";

    const advData = sheet.actor.system.modules[modType].find((c) => c.name === modName);

    if (!advData) return ui.notifications.error("Module data not found");

    openJournalFromUUID(advData.journal);
  });
}
