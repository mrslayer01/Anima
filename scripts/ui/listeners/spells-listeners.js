import { applyRelativeInput } from "../../utils/helpers.js";
import { toNum } from "../../utils/numbers.js";
import { AddFASpellsWindow } from "../windows/add-fa-spells.js";
import { AddSpellsWindow } from "../windows/add-spells.js";

export function SpellsListeners(sheet, html) {
  // OPEN THE SELECT SPELL WINDOW
  html.find(".add-spell").click(() => {
    const win = new AddSpellsWindow({ actorId: sheet.actor.id });
    const data = win.getData();

    // Count how many spells are available across all paths
    const totalAvailable = Object.values(data.groupedSpells).reduce(
      (sum, arr) => sum + arr.length,
      0
    );

    if (totalAvailable === 0) {
      ui.notifications.warn("No spells are available to learn at your current Path levels.");
      return;
    }

    win.render(true);
  });

  // OPEN INDIVIDUAL SPELL SHEET
  html.find(".spell-entry").off("click");
  html.find(".spell-entry").click((ev) => {
    const id = ev.currentTarget.dataset.itemId;
    const item = sheet.actor.items.get(id);
    item.sheet.render(true);
  });

  // DELETE SPELL
  html.find(".delete-spell").off("click");
  html.find(".delete-spell").on("click", async (event) => {
    event.preventDefault();

    const index = Number(event.currentTarget.dataset.index);
    const itemId = event.currentTarget.dataset.itemId;
    const actor = sheet.actor;

    // Confirm dialog (same style as your other delete dialogs)
    const confirmed = await Dialog.confirm({
      title: "Delete Spell",
      content: "<p>Are you sure you want to remove this spell?</p>"
    });

    if (!confirmed) return;

    // 1. Remove from system.mystic.spells[] and system.mystic.activeSpells
    let spells = foundry.utils.duplicate(actor.system.mystic.spells ?? []);
    spells.splice(index, 1);

    await actor.update({ "system.mystic.spells": spells });

    spells = foundry.utils.duplicate(actor.system.mystic.activeSpells ?? []);
    spells.splice(index, 1);

    await actor.update({ "system.mystic.activeSpells": spells });

    // 2. Remove the embedded Item
    if (itemId) {
      await actor.deleteEmbeddedDocuments("Item", [itemId]);
    }
  });

  // TOGGLE ACTIVE FLAG ON A SINGLE SPELL
  html.find(".passive-icon.clickable.spell-active").off("click");
  html.find(".passive-icon.clickable.spell-active").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;
    const itemId = ev.currentTarget.dataset.itemId;
    const spell = actor.items.get(itemId);
    if (!spell) return;

    const isActive = spell.system.active === true;

    await actor.updateEmbeddedDocuments("Item", [
      {
        _id: itemId,
        "system.active": !isActive
      }
    ]);
  });

  // UPDATE SHIELD VALUES ON THE SPELL ITEM ITSELF
  html.find(".spell-shield-input").off("change");
  html.find(".spell-shield-input").on("change", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;
    const input = ev.currentTarget;

    const itemId = input.dataset.itemId;
    const field = input.dataset.field; // "current" or "maximum"

    const relativeField = applyRelativeInput(input);
    const value = toNum(relativeField) || 0;

    const spell = actor.items.get(itemId);
    if (!spell) return;

    await actor.updateEmbeddedDocuments("Item", [
      {
        _id: itemId,
        [`system.spellShield`]: value
      }
    ]);
  });

  // UPDATE DAMAGE VALUES ON THE SPELL ITEM ITSELF
  html.find(".spell-weapon-input").off("change");
  html.find(".spell-weapon-input").on("change", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const actor = sheet.actor;
    const input = ev.currentTarget;

    const itemId = input.dataset.itemId;

    const relativeField = applyRelativeInput(input);
    const value = toNum(relativeField) || 0;

    const spell = actor.items.get(itemId);
    if (!spell) return;

    await actor.updateEmbeddedDocuments("Item", [
      {
        _id: itemId,
        [`system.spellDamage`]: value
      }
    ]);
  });

  // Free Access Spells

  // OPEN THE SELECT SPELL WINDOW
  html.find(".add-fa-spell").click(() => {
    const win = new AddFASpellsWindow({ actorId: sheet.actor.id });
    const data = win.getData();

    // Count how many spells are actually available
    const totalAvailable = Object.values(data.groupedSpells).reduce(
      (sum, arr) => sum + arr.length,
      0
    );

    if (totalAvailable === 0) {
      ui.notifications.warn("No Free Access spells are available to learn.");
      return;
    }

    win.render(true);
  });

  // DELETE SPELL
  html.find(".delete-fa-spell").off("click");
  html.find(".delete-fa-spell").on("click", async (event) => {
    event.preventDefault();

    const itemId = event.currentTarget.dataset.itemId;
    const actor = sheet.actor;

    const confirmed = await Dialog.confirm({
      title: "Delete Spell",
      content: "<p>Are you sure you want to remove this spell?</p>"
    });

    if (!confirmed) return;

    // 1. Get the spell BEFORE deleting it
    const spell = actor.items.get(itemId);
    const band = Number(spell.system.maxLevel);

    // 2. Decrement slot usage
    const slots = foundry.utils.duplicate(actor.system.mystic.freeAccessSpellSlots);
    if (slots[band]) {
      slots[band].current = Math.max(0, (slots[band].current ?? 0) - 1);
    }

    // 3. Remove from freeAccessSpells[] by ID (NOT index!)
    let fa = foundry.utils.duplicate(actor.system.mystic.freeAccessSpells ?? []);
    fa = fa.filter((id) => id !== itemId);

    // 4. Remove from activeSpells[] by ID
    let active = foundry.utils.duplicate(actor.system.mystic.activeSpells ?? []);
    active = active.filter((id) => id !== itemId);

    // 5. Update actor
    await actor.update({
      "system.mystic.freeAccessSpells": fa,
      "system.mystic.activeSpells": active,
      "system.mystic.freeAccessSpellSlots": slots
    });

    // 6. Delete the embedded Item
    await actor.deleteEmbeddedDocuments("Item", [itemId]);
  });

  // Magic Accumulation
  html.find(".magic-accumulation").off("click");
  html.find(".magic-accumulation").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const actor = sheet.actor;
    const zeonPath = actor.system.abilities.primary.Supernatural.Zeon;
    const maFinal = actor.system.abilities.primary.Supernatural.MagicAccumulation.final;

    let baseZeonAccumulated = zeonPath.temp;
    let baseZeonReserve = zeonPath.reserve;

    if (baseZeonReserve === 0)
      return ui.notifications.error("Not enough left in Zeon Reserve to pull from!");

    let finalZeonAccumulated = 0;
    let finalZeonReserve = 0;

    let hasEnoughReserve = true;

    //Get if doing full or half accumulation.
    const result = await promptMagicAccumulationMode();
    if (!result) return;

    let isHalfMA = result.mode === "half" ?? false;

    const finalMA = maFinal + toNum(result.modifier);

    if (isHalfMA) {
      // Add half of the total MA to the zeon temp field, while subtracting from reserve.
      // First make sure reserve has enough, if it does not, remove the remaining and add that to the temp field.
      if (halfMA(finalMA) > baseZeonReserve) {
        // Trying to pull more than the reserve has. Pull what it can since it can't go negative.
        hasEnoughReserve = false;

        finalZeonAccumulated = baseZeonAccumulated + baseZeonReserve;
        finalZeonReserve = 0;

        ui.notifications.info(`Accumulated ${baseZeonReserve} Zeon.`);
      } else {
        // Has enough in reserve to pull.
        finalZeonAccumulated = baseZeonAccumulated + halfMA(finalMA);
        finalZeonReserve = baseZeonReserve - halfMA(finalMA);

        ui.notifications.info(`Accumulated ${halfMA(finalMA)} Zeon.`);
      }
    } else {
      // Add the total MA to the zeon temp field, while subtracting from reserve.
      // First make sure reserve has enough, if it does not, remove the remaining and add that to the temp field.
      if (finalMA > baseZeonReserve) {
        // Trying to pull more than the reserve has. Pull what it can since it can't go negative.
        hasEnoughReserve = false;
        finalZeonAccumulated = baseZeonAccumulated + baseZeonReserve;
        finalZeonReserve = 0;
        ui.notifications.info(`Accumulated ${baseZeonReserve} Zeon.`);
      } else {
        // Has enough in reserve to pull.
        finalZeonAccumulated = baseZeonAccumulated + finalMA;
        finalZeonReserve = baseZeonReserve - finalMA;
        ui.notifications.info(`Accumulated ${finalMA} Zeon.`);
      }
    }

    await actor.update({
      "system.abilities.primary.Supernatural.Zeon.temp": finalZeonAccumulated,
      "system.abilities.primary.Supernatural.Zeon.reserve": finalZeonReserve
    });

    if (!hasEnoughReserve)
      return ui.notifications.warn(
        `Did not have enough left in Zeon Reserve! Withdrew what was left.`
      );
  });

  html.find(".reserve-manual").off("click");
  html.find(".reserve-manual").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const actor = sheet.actor;
    // Allow the user to manually set their Zeon Reserve
    const value = await promptManualEdit();
    if (value === null) return;

    await actor.update({
      "system.abilities.primary.Supernatural.Zeon.reserve": value
    });
  });

  html.find(".accumulated-manual").off("click");
  html.find(".accumulated-manual").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const actor = sheet.actor;
    // Allow the user to manually set their Zeon Accumulated
    const value = await promptManualEdit();
    if (value === null) return;

    await actor.update({
      "system.abilities.primary.Supernatural.Zeon.temp": value
    });
  });
}

function promptMagicAccumulationMode() {
  return new Promise((resolve) => {
    new Dialog({
      title: "Magic Accumulation",
      content: `
        <div style="margin-bottom: 0.75em;">
          <p><b>Choose Accumulation Mode:</b></p>
          <label style="display:block; margin-bottom:0.25em;">
            <input type="radio" name="maMode" value="full" checked />
            Full MA (normal accumulation)
          </label>
          <label style="display:block;">
            <input type="radio" name="maMode" value="half" />
            Half MA (while performing other actions)
          </label>
          <label style="display:block;">
            Modifier
            <input type="number" name="maMod" value="0" />
          </label>
        </div>
      `,
      buttons: {
        ok: {
          label: "Confirm",
          callback: (html) => {
            const mode = html.find('input[name="maMode"]:checked').val();
            const modifier = html.find('input[name="maMod"]').val();
            resolve({ mode, modifier }); // "full" or "half"
          }
        },
        cancel: {
          label: "Cancel",
          callback: () => resolve(null)
        }
      },
      default: "ok"
    }).render(true);
  });
}

function halfMA(ma) {
  return Math.ceil(ma / 2 / 5) * 5;
}

function promptManualEdit() {
  return new Promise((resolve) => {
    new Dialog({
      title: "Manual Edit",
      content: `
        <div style="margin-bottom: 0.75em;">
          <label><b>Enter new value:</b></label>
          <input type="number" id="manualValue" value="0" style="width: 100%; margin-top: 0.25em;" />
        </div>
      `,
      buttons: {
        ok: {
          label: "Confirm",
          callback: (html) => {
            const value = Number(html.find("#manualValue").val());
            resolve(value);
          }
        },
        cancel: {
          label: "Cancel",
          callback: () => resolve(null)
        }
      },
      default: "ok"
    }).render(true);
  });
}
