import { normalizeName, openJournalFromUUID } from "../../utils/helpers.js";
import { toNum } from "../../utils/numbers.js";
import { ABF_CLASSES } from "../../config/classes.js";

export function ClassListeners(sheet, html) {
  html.find(".add-class").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".add-class").on("click", () => {
    const classOptions = Object.keys(ABF_CLASSES).sort();

    new Dialog({
      title: "Add Class",
      content: `
            <div style="display: flex; flex-direction: column; gap: 8px;">
      
              <label><b>Select Class:</b></label>
      
              <div style="display: flex; gap: 6px; align-items: center;">
      
                <!-- Shrunk info button -->
                <button type="button" id="class-info"
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
      
                <select id="class-select" style="flex: 1;">
                  ${classOptions
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
            const selected = html.find("#class-select").val();
            const classData = ABF_CLASSES[selected];

            if (!classData) {
              return ui.notifications.error("Class data missing.");
            }

            const actor = sheet.actor;
            const classes = foundry.utils.duplicate(actor.system.classes ?? []);

            classes.push(classData);

            await actor.update({ "system.classes": classes });
          }
        }
      },
      render: (html) => {
        // Info button click handler
        html.find("#class-info").on("click", () => {
          const selected = html.find("#class-select").val();
          const classData = ABF_CLASSES[selected];

          if (!classData?.journalEntry) {
            return ui.notifications.warn("No journal entry linked for this class.");
          }

          openJournalFromUUID(classData.journalEntry);
        });
      },
      default: "Add"
    }).render(true);
  });

  html.find(".delete-class").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".delete-class").on("click", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this class?</p>"
      },
      {
        classes: ["abf-character-sheet"]
      }
    );

    if (!confirmed) return;

    const classes = foundry.utils.duplicate(sheet.actor.system.classes);

    // Grab the class name BEFORE deleting it
    const deletedClassName = classes[index]?.name;

    // Remove from actor
    classes.splice(index, 1);
    await sheet.actor.update({ "system.classes": classes });

    // Reset the class level in the registry (so re-adding starts at level 1)
    if (deletedClassName && ABF_CLASSES[deletedClassName]) {
      ABF_CLASSES[deletedClassName].level = 1;
    }
  });

  // Change class level
  html.find(".class-level-input").off("change");
  html.find(".class-level-input").on("change", async (event) => {
    const index = toNum(event.currentTarget.dataset.index);
    const newLevel = toNum(event.currentTarget.value) || 1;

    const classes = foundry.utils.duplicate(sheet.actor.system.classes);
    classes[index].level = newLevel;

    await sheet.actor.update({ "system.classes": classes });
  });

  // Click class name for information
  html.find(".clickable-class").click((ev) => {
    ev.preventDefault();

    const className = ev.currentTarget.dataset.class;
    const classData = sheet.actor.system.classes.find((c) => c.name === className);

    if (!classData) return ui.notifications.error("Class data not found");

    openJournalFromUUID(classData.journalEntry);
  });

  // Add natural bonuses to secondaries.

  html.find(".expand-secondary").off("click");
  html.find(".expand-secondary").on("click", (event) => {
    const category = event.currentTarget.dataset.category;
    const ability = event.currentTarget.dataset.ability;
    const key = `${category}.${ability}`;

    const extra = html.find(
      `.secondary-extra[data-category="${category}"][data-ability="${ability}"]`
    );

    const icon = $(event.currentTarget).find(".expand-icon");

    const isHidden = extra.hasClass("hidden");

    if (isHidden) {
      extra.removeClass("hidden");
      icon.removeClass("fa-plus-circle").addClass("fa-minus-circle");
      sheet._expandedSecondaries.add(key);
    } else {
      extra.addClass("hidden");
      icon.removeClass("fa-minus-circle").addClass("fa-plus-circle");
      sheet._expandedSecondaries.delete(key);
    }
  });

  html.find(".add-natural-bonus").off("click");
  html.find(".add-natural-bonus").on("click", async (event) => {
    const category = event.currentTarget.dataset.category;
    const ability = event.currentTarget.dataset.ability;

    const actor = sheet.actor;

    // Get the ability data
    const abil = foundry.utils.getProperty(
      actor,
      `system.abilities.secondary.${category}.${ability}`
    );

    // The characteristic this secondary uses
    const characteristic = abil.characteristic;

    const path = `system.abilities.secondary.${category}.${ability}.naturalBonuses`;

    // Load existing bonuses
    const bonuses = foundry.utils.duplicate(foundry.utils.getProperty(actor, path) || []);

    // Add another instance of the same characteristic
    bonuses.push({
      characteristic,
      enabled: true
    });

    await actor.update({ [path]: bonuses });

    // Keep row expanded
    sheet._expandedSecondaries.add(`${category}.${ability}`);
  });

  html.find(".delete-natural-bonus").off("click");
  html.find(".delete-natural-bonus").on("click", async (event) => {
    const category = event.currentTarget.dataset.category;
    const ability = event.currentTarget.dataset.ability;
    const index = toNum(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Remove this natural bonus?</p>"
    });

    if (!confirmed) return;

    const actor = sheet.actor;
    const path = `system.abilities.secondary.${category}.${ability}.naturalBonuses`;

    // FIXED: correctly duplicate the array
    // FIXED: correct way to load the array
    const bonuses = foundry.utils.duplicate(foundry.utils.getProperty(actor, path) || []);

    bonuses.splice(index, 1);

    await actor.update({ [path]: bonuses });

    sheet._expandedSecondaries.add(`${category}.${ability}`);
  });
}
