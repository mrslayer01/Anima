import { ABF_LORDS } from "../../config/elans.js";
import { openJournalFromUUID } from "../../utils/helpers.js";
import { toNum } from "../../utils/numbers.js";
import { ElanInfoWindow } from "../windows/elan-info.js";

export function ElanListeners(sheet, html) {
  // -----------------------------
  // ADD ELAN
  // -----------------------------
  html.find(".add-elan").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".add-elan").on("click", () => {
    const elanOptions = Object.keys(ABF_LORDS).sort();

    new Dialog({
      title: "Add Elan",
      content: `
        <div style="display: flex; flex-direction: column; gap: 8px;">
  
          <label><b>Select Elan:</b></label>
  
          <div style="display: flex; gap: 6px; align-items: center;">
  
            <!-- Shrunk info button -->
            <button type="button" id="elan-info"
              style="
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                width: 18px;
                height: 18px;
                flex: 0 0 18px; /* prevents stretching */
                display: flex;
                align-items: center;
                justify-content: center;
              ">
              <i class="fas fa-question-circle" style="color: black; font-size: 0.9rem;"></i>
            </button>
  
            <select id="elan-select" style="flex: 1;">
              ${elanOptions.map((elan) => `<option value="${elan}">${elan}</option>`).join("")}
            </select>
  
          </div>
        </div>
  
      `,
      buttons: {
        add: {
          label: "Add",
          callback: async (html) => {
            const selected = html.find("#elan-select").val();
            const elanData = ABF_LORDS[selected];

            if (!elanData) {
              return ui.notifications.error("Elan data missing.");
            }

            const actor = sheet.actor;
            const elans = foundry.utils.duplicate(actor.system.elans ?? []);

            elans.push(elanData);

            await actor.update({ "system.elans": elans });
          }
        }
      },
      render: (html) => {
        // Info button click handler
        html.find("#elan-info").on("click", () => {
          const selected = html.find("#elan-select").val();
          const elanData = ABF_LORDS[selected];

          if (!elanData?.journalEntry) {
            return ui.notifications.warn("No journal entry linked for this elan.");
          }

          openJournalFromUUID(elanData.journalEntry);
        });
      }
    }).render(true);
  });

  // -----------------------------
  // DELETE ELAN
  // -----------------------------
  html.find(".delete-elan").off("click");
  html.find(".delete-elan").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this elan?</p>"
    });

    if (!confirmed) return;

    const elans = foundry.utils.duplicate(sheet.actor.system.elans);

    elans.splice(index, 1);

    await sheet.actor.update({ "system.elans": elans });
  });

  // -----------------------------
  // CLICK ELAN NAME FOR INFO
  // -----------------------------
  html.find(".clickable-elan").off("click");
  html.find(".clickable-elan").on("click", (ev) => {
    ev.preventDefault();

    const elanName = ev.currentTarget.dataset.elans;
    const elanData = sheet.actor.system.elans.find((d) => d.name === elanName);

    if (!elanData) return ui.notifications.error("Elan data not found");
    //openJournalFromUUID(elanData.journalEntry);

    new ElanInfoWindow(elanName, elanData, { actorId: sheet.actor.id }).render(true);
  });

  // Change elan current value
  html.find(".elan-current-input").off("change");
  html.find(".elan-current-input").on("change", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);
    const newLevel = toNum(event.currentTarget.value) || 1;

    const elans = foundry.utils.duplicate(sheet.actor.system.elans);
    elans[index].elan.current = newLevel;

    await sheet.actor.update({ "system.elans": elans });
  });

  // // Change elan bonus value
  html.find(".elan-bonus-input").off("change");
  html.find(".elan-bonus-input").on("change", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);
    const newLevel = toNum(event.currentTarget.value) || 0;

    const elans = foundry.utils.duplicate(sheet.actor.system.elans);
    elans[index].elan.bonus = newLevel;

    await sheet.actor.update({ "system.elans": elans });
  });
}
