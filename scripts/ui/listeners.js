import { openJournalFromName } from "../utils/helpers.js";
import { AdvantageDisadvantageListeners } from "./listeners/advantage-disadvantage-listeners.js";
import { ClassListeners } from "./listeners/class-listeners.js";
import { DomineListeners } from "./listeners/domine-listeners.js";
import { ElanListeners } from "./listeners/elan-listeners.js";
import { InventoryListeners } from "./listeners/inventory-listeners.js";
import { ItemListeners } from "./listeners/item-listeners.js";
import { LanguageContactTitlesListeners } from "./listeners/lang-contact-titles-listeners.js";
import { ModuelsListeners } from "./listeners/modules-listeners.js";
import { NpcListeners } from "./listeners/npc-listeners.js";
import { RollListeners } from "./listeners/roll-listeners.js";
import { SettingsListeners } from "./listeners/settings-listeners.js";
import { SpellsListeners } from "./listeners/spells-listeners.js";
import { ActiveEffectsViewer } from "./windows/active-effects-viewer.js";

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

  html.find(".open-effects").on("click", (ev) => {
    ev.preventDefault();
    const actor = sheet.actor;
    new ActiveEffectsViewer(actor).render(true);
  });

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

    //if (primaryAbility) openJournalFromUUID(abilityName);
    if (secondaryAbility) openJournalFromName(abilityName);
  });

  html.find('[data-action="toggleKi"]').click((ev) => {
    const header = $(ev.currentTarget);
    const body = header.next(".ki-section-body");
    const icon = header.find(".ki-toggle-icon");

    const isHidden = body.is(":hidden");
    body.toggle(!isHidden);

    icon.toggleClass("fa-chevron-down", isHidden);
    icon.toggleClass("fa-chevron-up", !isHidden);
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

  // UNIVERSAL RELATIVE INPUT HANDLER
  html.find(".relative-input").off("change");
  html.find(".relative-input").on("change", (ev) => {
    const input = ev.currentTarget;

    const minValue = input.dataset.min !== undefined ? Number(input.dataset.min) : -Infinity;
    const maxValue = input.dataset.max !== undefined ? Number(input.dataset.max) : Infinity;

    const raw = String(input.value).trim();
    const previous = Number(input.dataset.current ?? input.value) || 0;

    let newValue = previous;

    // Detect relative (+50, -10)
    const isRelative = raw.startsWith("+") || raw.startsWith("-");

    // Parse number
    const numeric = Number(raw);
    if (Number.isNaN(numeric)) {
      input.value = previous;
      return;
    }

    // Compute new value
    newValue = isRelative ? previous + numeric : numeric;

    // Clamp
    newValue = Math.max(minValue, Math.min(maxValue, newValue));

    // Write back
    input.value = newValue;
    input.dataset.current = newValue;
  });

  RollListeners(sheet, html);
  ClassListeners(sheet, html);
  AdvantageDisadvantageListeners(sheet, html);
  ModuelsListeners(sheet, html);
  ElanListeners(sheet, html);
  LanguageContactTitlesListeners(sheet, html);
  InventoryListeners(sheet, html);
  SpellsListeners(sheet, html);
  SettingsListeners(sheet, html);
  NpcListeners(sheet, html);
  DomineListeners(sheet, html);
}

//#region Item Registers

export function registerItemSheetListeners(sheet, html) {
  // UNIVERSAL RELATIVE INPUT HANDLER
  html.find(".relative-input").off("change");
  html.find(".relative-input").on("change", (ev) => {
    const input = ev.currentTarget;

    const minValue = input.dataset.min !== undefined ? Number(input.dataset.min) : -Infinity;
    const maxValue = input.dataset.max !== undefined ? Number(input.dataset.max) : Infinity;

    const raw = String(input.value).trim();
    const previous = Number(input.dataset.current ?? input.value) || 0;

    let newValue = previous;

    // Detect relative (+50, -10)
    const isRelative = raw.startsWith("+") || raw.startsWith("-");

    // Parse number
    const numeric = Number(raw);
    if (Number.isNaN(numeric)) {
      input.value = previous;
      return;
    }

    // Compute new value
    newValue = isRelative ? previous + numeric : numeric;

    // Clamp
    newValue = Math.max(minValue, Math.min(maxValue, newValue));

    // Write back
    input.value = newValue;
    input.dataset.current = newValue;
  });
  ItemListeners(sheet, html);
}

//#endregion
