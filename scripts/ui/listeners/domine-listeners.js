import { openJournalFromName } from "../../utils/helpers.js";

export function DomineListeners(sheet, html) {
  html.find(".ki-toggle-ability").off("click");
  html.find(".ki-toggle-ability").on("click", async (ev) => {
    const item = sheet.object;
    const key = ev.currentTarget.closest(".ki-ability-row").dataset.key;

    const abilities = foundry.utils.duplicate(item.system.abilities.primary.Combat.Ki.abilities);
    abilities[key].purchased = !abilities[key].purchased;

    await item.update({
      "system.abilities.primary.Combat.Ki.abilities": abilities
    });

    sheet.render(false);
  });

  html.find(".technique-active").off("click");
  html.find(".technique-active").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;
    const itemId = ev.currentTarget.dataset.itemId;
    const tech = actor.items.get(itemId);
    if (!tech) return;

    const isActive = tech.system.active === true;

    await actor.updateEmbeddedDocuments("Item", [
      {
        _id: itemId,
        "system.active": !isActive
      }
    ]);
  });

  html.find(".ki-ability-name").click((ev) => {
    ev.preventDefault();

    const name = ev.currentTarget.dataset.name;

    openJournalFromName(name);
  });
}
