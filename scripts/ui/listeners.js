import { AdvantageDisadvantageListeners } from "./listeners/advantage-disadvantage-listeners.js";
import { ClassListeners } from "./listeners/class-listeners.js";
import { ElanListeners } from "./listeners/elan-listeners.js";
import { InventoryListeners } from "./listeners/inventory-listeners.js";
import { ItemListeners } from "./listeners/item-listeners.js";
import { LanguageContactTitlesListeners } from "./listeners/lang-contact-titles-listeners.js";
import { ModuelsListeners } from "./listeners/modules-listeners.js";
import { RollListeners } from "./listeners/roll-listeners.js";

export function registerSheetListeners(sheet, html) {
  for (const key of sheet._expandedSecondaries) {
    const [category, ability] = key.split(".");

    const extra = html.find(
      `.secondary-extra[data-category="${category}"][data-ability="${ability}"]`
    );
    const icon = html.find(
      `.expand-secondary[data-category="${category}"][data-ability="${ability}"] .expand-icon`
    );

    extra.removeClass("hidden");
    icon.removeClass("fa-plus-circle").addClass("fa-minus-circle");
  }

  html.find(".toggle-lock").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".toggle-lock").on("click", (ev) => {
    const actor = sheet.actor;
    const locked = actor.system.lockUi;

    actor.update({
      "system.lockUi": !locked
    });

    sheet.render(); // refresh UI
  });

  // Click class name for information
  html.find(".clickable-ability").click((ev) => {
    ev.preventDefault();
    const categoryName = ev.currentTarget.dataset.category;
    const abilityName = ev.currentTarget.dataset.ability;

    const primaries = sheet.actor.system?.abilities?.primary;
    const secondaries = sheet.actor.system?.abilities?.secondary;

    const primaryAbility = primaries?.[categoryName]?.[abilityName];

    const secondaryAbility = secondaries?.[categoryName]?.[abilityName];

    if (primaryAbility) openJournalFromUUID(primaryAbility.journal);
    if (secondaryAbility) openJournalFromUUID(secondaryAbility.journal);
  });

  //Primary ability focus.
  html.find(".passive-icon.clickable.primary-focus").off("click");
  html.find(".passive-icon.clickable.primary-focus").on("click", async (ev) => {
    const ability = ev.currentTarget.dataset.ability;
    const actor = sheet.actor;

    const prim = actor.system.abilities.primary.Combat;
    const isFocused = prim[ability]?.focus === true;

    const update = {
      "system.abilities.primary.Combat.Attack.focus": false,
      "system.abilities.primary.Combat.Block.focus": false,
      "system.abilities.primary.Combat.Dodge.focus": false
    };

    if (!isFocused) {
      update[`system.abilities.primary.Combat.${ability}.focus`] = true;
    }

    await actor.update(update);
    sheet.render();
  });

  RollListeners(sheet, html);
  ClassListeners(sheet, html);
  AdvantageDisadvantageListeners(sheet, html);
  ModuelsListeners(sheet, html);
  ElanListeners(sheet, html);
  LanguageContactTitlesListeners(sheet, html);
  InventoryListeners(sheet, html);
}

//#region Item Registers

export function registerItemSheetListeners(sheet, html) {
  ItemListeners(sheet, html);
}

//#endregion

export async function openJournalFromUUID(rawUuid) {
  const [uuid, anchor] = rawUuid.split("#");

  // Load the page document
  const page = await fromUuid(uuid);
  if (!page) return ui.notifications.warn("Journal entry not found.");

  const entry = page.parent;

  // Render the JournalEntry in VIEW mode
  entry.sheet.render(true, {
    editable: false,
    pageId: page.id
  });

  if (!anchor) return;

  // Auto-scroll after the page sheet renders
  Hooks.once("renderJournalPageSheet", (sheet, html) => {
    setTimeout(() => {
      const el = html[0].querySelector(`#${anchor}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  });
}
