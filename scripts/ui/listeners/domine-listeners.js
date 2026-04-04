import { openJournalFromName } from "../../utils/helpers.js";
import { toNum } from "../../utils/numbers.js";

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

  html.find(".ki-reserve-manual").off("click");
  html.find(".ki-reserve-manual").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const actor = sheet.actor;
    // Allow the user to manually set their Ki Reserve
    const value = await promptManualEdit();
    if (value === null) return;

    await actor.update({
      "system.abilities.primary.Combat.Ki.reserve": value
    });
  });

  html.find(".ki-accumulated-manual").off("click");
  html.find(".ki-accumulated-manual").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const actor = sheet.actor;
    // Allow the user to manually set their Ki Accumulated
    const value = await promptManualEdit();
    if (value === null) return;

    await actor.update({
      "system.abilities.primary.Combat.Ki.current": value
    });
  });

  html.find(".ki-accumulation").off("click");
  html.find(".ki-accumulation").on("click", async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const actor = sheet.actor;
    const kiPath = actor.system.abilities.primary.Combat.Ki;
    const maFinal = kiPath.totalKiAccumulation;

    let baseKiAccumulated = kiPath.current;
    let baseKiReserve = kiPath.reserve;

    if (baseKiReserve === 0)
      return ui.notifications.error("Not enough left in Ki Reserve to pull from!");

    let finalKiAccumulated = 0;
    let finalKiReserve = 0;

    let hasEnoughReserve = true;

    //Get if doing full or half accumulation.
    const result = await promptKiAccumulationMode();
    if (!result) return;

    let isHalfMA = result.mode === "half" ?? false;

    const finalMA = maFinal + toNum(result.modifier);

    if (isHalfMA) {
      // Add half of the total MA to the ki current field, while subtracting from reserve.
      // First make sure reserve has enough, if it does not, remove the remaining and add that to the temp field.
      if (halfMA(finalMA) > baseKiReserve) {
        // Trying to pull more than the reserve has. Pull what it can since it can't go negative.
        hasEnoughReserve = false;

        finalKiAccumulated = baseKiAccumulated + baseKiReserve;
        finalKiReserve = 0;

        ui.notifications.info(`Accumulated ${baseKiReserve} Ki.`);
      } else {
        // Has enough in reserve to pull.
        finalKiAccumulated = baseKiAccumulated + halfMA(finalMA);
        finalKiReserve = baseKiReserve - halfMA(finalMA);

        ui.notifications.info(`Accumulated ${halfMA(finalMA)} Ki.`);
      }
    } else {
      // Add the total MA to the ki current field, while subtracting from reserve.
      // First make sure reserve has enough, if it does not, remove the remaining and add that to the temp field.
      if (finalMA > baseKiReserve) {
        // Trying to pull more than the reserve has. Pull what it can since it can't go negative.
        hasEnoughReserve = false;
        finalKiAccumulated = baseKiAccumulated + baseKiReserve;
        finalKiReserve = 0;
        ui.notifications.info(`Accumulated ${baseKiReserve} Ki.`);
      } else {
        // Has enough in reserve to pull.
        finalKiAccumulated = baseKiAccumulated + finalMA;
        finalKiReserve = baseKiReserve - finalMA;
        ui.notifications.info(`Accumulated ${finalMA} Ki.`);
      }
    }

    await actor.update({
      "system.abilities.primary.Combat.Ki.current": finalKiAccumulated,
      "system.abilities.primary.Combat.Ki.reserve": finalKiReserve
    });

    if (!hasEnoughReserve)
      return ui.notifications.warn(
        `Did not have enough left in Ki Reserve! Withdrew what was left.`
      );
  });
}

function halfMA(ma) {
  return Math.max(ma / 2);
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
    setTimeout(() => {
      const input = document.getElementById("manualValue");
      if (input) {
        input.focus();
        input.select();
      }
    }, 10);
  });
}

function promptKiAccumulationMode() {
  return new Promise((resolve) => {
    new Dialog({
      title: "Magic Accumulation",
      content: `
        <div style="margin-bottom: 0.75em;">
          <p><b>Choose Accumulation Mode:</b></p>
          <label style="display:block; margin-bottom:0.25em;">
            <input type="radio" name="maMode" value="full" checked />
            Full KI (normal accumulation)
          </label>
          <label style="display:block;">
            <input type="radio" name="maMode" value="half" />
            Half KI (while performing other actions)
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
