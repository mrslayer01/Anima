import { ABF_ADVANTAGES } from "../../config/advantages.js";
import { ABF_DISADVANTAGES } from "../../config/disadvantages.js";
import { normalizeName, openJournalFromUUID } from "../../utils/helpers.js";
import { toNum } from "../../utils/numbers.js";

export function AdvantageDisadvantageListeners(sheet, html) {
  Advanatges(sheet, html);
  Disadvantages(sheet, html);
}

function Advanatges(sheet, html) {
  html.find(".add-advantage").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".add-advantage").on("click", () => {
    const advOptions = Object.keys(ABF_ADVANTAGES).sort();

    new Dialog({
      title: "Add Advantage",
      content: `
        <div style="display: flex; flex-direction: column; gap: 8px;">
  
          <label><b>Select Advantage:</b></label>
  
          <div style="display: flex; gap: 6px; align-items: center;">
  
            <!-- Shrunk info button -->
            <button type="button" id="adv-info"
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
  
            <select id="adv-select" style="flex: 1;">
              ${advOptions
                .map((cls) => `<option value="${cls}">${normalizeName(cls)}</option>`)
                .join("")}
            </select>
          </div>
        </div>
  
      `,
      buttons: {
        add: {
          label: "Add",
          callback: async (html) => {
            const selected = html.find("#adv-select").val();
            const advData = ABF_ADVANTAGES[selected];

            if (!advData) {
              return ui.notifications.error("Advantage data missing.");
            }

            const actor = sheet.actor;
            const advantages = foundry.utils.duplicate(actor.system.advantages ?? []);

            advantages.push(advData);

            await actor.update({ "system.advantages": advantages });
          }
        }
      },
      render: (html) => {
        // Info button click handler
        html.find("#adv-info").on("click", () => {
          const selected = html.find("#adv-select").val();
          const advData = ABF_ADVANTAGES[selected];

          if (!advData?.journal) {
            return ui.notifications.warn("No journal entry linked for this class.");
          }

          openJournalFromUUID(advData.journal);
        });
      },
      default: "Add"
    }).render(true);
  });

  html.find(".delete-advantage").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".delete-advantage").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this advantage?</p>"
      },
      {
        classes: ["abf-character-sheet"]
      }
    );

    if (!confirmed) return;

    const advantages = foundry.utils.duplicate(sheet.actor.system.advantages);

    // Grab the advantage name BEFORE deleting it
    const deletedAdvantageName = advantages[index]?.name;

    // Remove from actor
    advantages.splice(index, 1);
    await sheet.actor.update({ "system.advantages": advantages });

    // Reset the class level in the registry (so re-adding starts at level 1)
    if (deletedAdvantageName && ABF_ADVANTAGES[deletedAdvantageName]) {
      ABF_ADVANTAGES[deletedAdvantageName].level = 1;
    }
  });

  // Click class name for information
  html.find(".clickable-advantage").click((ev) => {
    ev.preventDefault();

    const advName = ev.currentTarget.dataset.advantage;
    const advData = sheet.actor.system.advantages.find((c) => c.name === advName);

    if (!advData) return ui.notifications.error("Adavantage data not found");

    openJournalFromUUID(advData.journal);
  });
}

function Disadvantages(sheet, html) {
  html.find(".add-disadvantage").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".add-disadvantage").on("click", () => {
    const advOptions = Object.keys(ABF_DISADVANTAGES).sort();

    new Dialog({
      title: "Add Disadvantage",
      content: `
        <div style="display: flex; flex-direction: column; gap: 8px;">
  
          <label><b>Select Disadvantage:</b></label>
  
          <div style="display: flex; gap: 6px; align-items: center;">
  
            <!-- Shrunk info button -->
            <button type="button" id="adv-info"
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
  
            <select id="adv-select" style="flex: 1;">
              ${advOptions
                .map((cls) => `<option value="${cls}">${normalizeName(cls)}</option>`)
                .join("")}
            </select>
          </div>
        </div>
  
      `,
      buttons: {
        add: {
          label: "Add",
          callback: async (html) => {
            const selected = html.find("#adv-select").val();
            const advData = ABF_DISADVANTAGES[selected];

            if (!advData) {
              return ui.notifications.error("Disadvantage data missing.");
            }

            const actor = sheet.actor;
            const disadvantages = foundry.utils.duplicate(actor.system.disadvantages ?? []);

            disadvantages.push(advData);

            await actor.update({ "system.disadvantages": disadvantages });
          }
        }
      },
      render: (html) => {
        // Info button click handler
        html.find("#adv-info").on("click", () => {
          const selected = html.find("#adv-select").val();
          const advData = ABF_DISADVANTAGES[selected];

          if (!advData?.journal) {
            return ui.notifications.warn("No journal entry linked for this class.");
          }

          openJournalFromUUID(advData.journal);
        });
      },
      default: "Add"
    }).render(true);
  });

  html.find(".delete-disadvantage").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".delete-disadvantage").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this disadvantage?</p>"
      },
      {
        classes: ["abf-character-sheet"]
      }
    );

    if (!confirmed) return;

    const disadvantages = foundry.utils.duplicate(sheet.actor.system.disadvantages);

    // Grab the disadvantage name BEFORE deleting it
    const deletedDisadvantageName = disadvantages[index]?.name;

    // Remove from actor
    disadvantages.splice(index, 1);
    await sheet.actor.update({ "system.disadvantages": disadvantages });

    // Reset the class level in the registry (so re-adding starts at level 1)
    if (deletedDisadvantageName && ABF_DISADVANTAGES[deletedDisadvantageName]) {
      ABF_DISADVANTAGES[deletedDisadvantageName].level = 1;
    }
  });

  // Click class name for information
  html.find(".clickable-disadvantage").click((ev) => {
    ev.preventDefault();

    const advName = ev.currentTarget.dataset.disadvantage;
    const advData = sheet.actor.system.disadvantages.find((c) => c.name === advName);

    if (!advData) return ui.notifications.error("Disdisadvantage data not found");

    openJournalFromUUID(advData.journal);
  });
}
