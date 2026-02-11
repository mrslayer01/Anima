import { ABF_CLASSES } from "../../Old Version For Reference/abf-system-old/module/actor/config/classes.js";
import { difficultyMap } from "../utils/lookup.js";
import { characteristicCheck, animaOpenRoll, resistanceCheck } from "../utils/rolls.js";

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

  html.find(".char-roll").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".toggle-lock").on("click", (ev) => {
    const actor = sheet.actor;
    const locked = actor.system.lockUi;

    actor.update({
      "system.lockUi": !locked
    });

    sheet.render(); // refresh UI
  });

  //#region ROLLS
  //Characteristic Roll
  html.find(".char-roll").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".char-roll").on("click", (ev) => {
    const char = ev.currentTarget.dataset.char;
    // Pull the base from the actor to be used as the target.
    const value = sheet.actor.system.characteristics[char].base;
    characteristicCheck({
      value,
      label: `${char} Check`,
      actor: sheet.actor
    });
  });

  //Characteristic Open Roll
  html.find(".open-roll").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".open-roll").on("click", (ev) => {
    const char = ev.currentTarget.dataset.char;

    animaOpenRoll({
      value: sheet.actor.system.characteristics[char].final,
      label: `${char} Open Roll`,
      actor: sheet.actor
    });
  });

  //Ability Open Roll
  html.find(".ability-roll").off("click");
  html.find(".ability-roll").on("click", (ev) => {
    const categoryName = ev.currentTarget.dataset.category;
    const abilityName = ev.currentTarget.dataset.ability;

    const primaries = sheet.actor.system?.abilities?.Primaries;
    const secondaries = sheet.actor.system?.abilities?.Secondaries;

    const primaryAbility = primaries?.[categoryName]?.[abilityName];

    const secondaryAbility = secondaries?.[categoryName]?.[abilityName];

    // Primary ability roll
    if (primaryAbility) {
      animaOpenRoll({
        value: primaryAbility.final,
        label: `${abilityName} Open Roll`,
        actor: sheet.actor,
        undeveloped: false,
        mastery: primaryAbility.mastery
      });
      return;
    }

    // Secondary ability roll
    if (secondaryAbility) {
      if (secondaryAbility.undeveloped && secondaryAbility.knowledge) {
        return ui.notifications.error("Unable to roll for an undeveloped knowledge ability.");
      }

      animaOpenRoll({
        value: secondaryAbility.final,
        label: `${abilityName} Open Roll`,
        actor: sheet.actor,
        undeveloped: secondaryAbility.undeveloped,
        mastery: secondaryAbility.mastery
      });
      return;
    }

    // If neither exists, silently ignore
  });

  //Resistance Roll
  html.find(".res-roll").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".res-roll").on("click", (ev) => {
    const char = ev.currentTarget.dataset.char;

    new Dialog({
      title: "Resistance Check",
      content: `
            <div>
              <label><b>Difficulty:</b></label>
              <select id="diff" style="width: 100%;">
                ${Object.entries(difficultyMap)
                  .map(([value, label]) => {
                    return `
                      <option 
                        value="${value}" 
                        title="${label}"
                        ${value === "80" ? "selected" : ""}
                      >
                        ${label}
                      </option>
                    `;
                  })
                  .join("")}
              </select>
            </div>
          `,
      buttons: {
        roll: {
          label: "Roll",
          callback: (html) => {
            const value = sheet.actor.system.resistances[char].final;
            const difficulty = Number(html.find("#diff").val());

            resistanceCheck({
              value,
              difficulty,
              label: `${char} Resistance Check`,
              actor: sheet.actor
            });
          }
        }
      }
    }).render(true);
  });

  //#endregion

  //#region CLASS

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
                .map((cls) => `<option value="${cls}">${normalizeClassName(cls)}</option>`)
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
      }
    }).render(true);
  });

  html.find(".delete-class").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".delete-class").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);

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
    const index = Number(event.currentTarget.dataset.index);
    const newLevel = Number(event.currentTarget.value) || 1;

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

  function normalizeClassName(name) {
    return name
      .trim()
      .replace(/([A-Z])/g, " $1") // split CamelCase
      .replace(/\s+/g, " ") // collapse spaces
      .trim()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

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
    const index = Number(event.currentTarget.dataset.index);

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

  //#endregion

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
}

async function openJournalFromUUID(rawUuid) {
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
