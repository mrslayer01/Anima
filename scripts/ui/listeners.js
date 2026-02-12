import { ABF_CLASSES } from "../../Old Version For Reference/abf-system-old/module/actor/config/classes.js";
import { ABF_ADVANTAGES } from "../config/advantages.js";
import { ABF_DISADVANTAGES } from "../config/disadvantages.js";
import { ABF_LORDS } from "../config/elans.js";
import { difficultyMap } from "../utils/lookup.js";
import { characteristicCheck, animaOpenRoll, resistanceCheck } from "../utils/rolls.js";
import { ElanInfoWindow } from "./windows/elan-info.js";

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

    const primaries = sheet.actor.system?.abilities?.primary;
    const secondaries = sheet.actor.system?.abilities?.secondary;

    const primaryAbility = primaries?.[categoryName]?.[abilityName];

    const secondaryAbility = secondaries?.[categoryName]?.[abilityName];

    new Dialog({
      title: "Open Roll Modifier",
      content: `
                <div style="margin-bottom: 1em;">
                  <label><b>Modifier:</b></label>
                  <input type="number" id="mod" value="0" style="width: 100%;" />
                </div>
              `,
      buttons: {
        roll: {
          label: "Roll",
          callback: (html) => {
            const modifier = Number(html.find("#mod").val());

            // Primary ability roll
            if (primaryAbility) {
              animaOpenRoll({
                value: primaryAbility.final + modifier,
                label: `${abilityName} Open Roll`,
                actor: sheet.actor,
                undeveloped: false,
                mastery: primaryAbility.mastery
              });
            }
            // Secondary ability roll
            if (secondaryAbility) {
              if (secondaryAbility.undeveloped && secondaryAbility.knowledge) {
                return ui.notifications.error(
                  "Unable to roll for an undeveloped knowledge ability."
                );
              }

              animaOpenRoll({
                value: secondaryAbility.final + modifier,
                label: `${abilityName} Open Roll`,
                actor: sheet.actor,
                undeveloped: secondaryAbility.undeveloped,
                mastery: secondaryAbility.mastery
              });
              return;
            }
          }
        }
      },
      default: "roll"
    }).render(true);
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
      },
      default: "roll"
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
      },
      default: "Add"
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

  //#region Advantages/Disadvantages

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
    const index = Number(event.currentTarget.dataset.index);

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

  // Disadvantages
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

  //#endregion

  //#region Elan
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
    const index = Number(event.currentTarget.dataset.index);

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

  //ELAN fix broken values when adding/removing
  // Change elan current value
  // html.find(".elan-current-input").off("change");
  // html.find(".elan-current-input").on("change", async (event) => {
  //   const index = Number(event.currentTarget.dataset.index);
  //   const newLevel = Number(event.currentTarget.value) || 1;

  //   const elans = foundry.utils.duplicate(sheet.actor.system.elans);
  //   elans[index].elan.current = newLevel;

  //   await sheet.actor.update({ "system.elans": elans });
  // });

  // // Change elan bonus value
  // html.find(".elan-bonus-input").off("change");
  // html.find(".elan-bonus-input").on("change", async (event) => {
  //   const index = Number(event.currentTarget.dataset.index);
  //   const newLevel = Number(event.currentTarget.value) || 0;

  //   const elans = foundry.utils.duplicate(sheet.actor.system.elans);
  //   elans[index].elan.bonus = newLevel;

  //   await sheet.actor.update({ "system.elans": elans });
  // });

  //#endregion

  //#region Languages

  html.find(".add-language").on("click", async (event) => {
    const actor = sheet.actor;
    const languages = foundry.utils.duplicate(actor.system.languages);

    // Add a new blank language entry
    languages.push({ name: "", level: 0 });

    await actor.update({ "system.languages": languages });
  });

  html.find(".languages-name-input").on("change", async (event) => {
    const actor = sheet.actor;
    const index = Number(event.currentTarget.dataset.index);
    const value = event.currentTarget.value;

    const languages = foundry.utils.duplicate(actor.system.languages);
    languages[index].name = value;

    await actor.update({ "system.languages": languages });
  });

  html.find(".languages-level-input").on("change", async (event) => {
    const actor = sheet.actor;
    const index = Number(event.currentTarget.dataset.index);
    const value = Number(event.currentTarget.value) || 0;

    const languages = foundry.utils.duplicate(actor.system.languages);
    languages[index].level = value;

    await actor.update({ "system.languages": languages });
  });

  html.find(".delete-languages").off("click");
  html.find(".delete-languages").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this language?</p>"
    });

    if (!confirmed) return;

    const lang = foundry.utils.duplicate(sheet.actor.system.languages);

    lang.splice(index, 1);

    await sheet.actor.update({ "system.languages": lang });
  });

  //#endregion

  //#region Contacts

  html.find(".add-contacts").on("click", async (event) => {
    const actor = sheet.actor;
    const contacts = foundry.utils.duplicate(actor.system.contacts);

    // Add a new blank contacts entry
    contacts.push({ name: "", description: "" });

    await actor.update({ "system.contacts": contacts });
  });

  html.find(".contacts-name-input").on("change", async (event) => {
    const actor = sheet.actor;
    const index = Number(event.currentTarget.dataset.index);
    const value = event.currentTarget.value;

    const contacts = foundry.utils.duplicate(actor.system.contacts);
    contacts[index].name = value;

    await actor.update({ "system.contacts": contacts });
  });

  html.find(".contacts-description-input").on("change", async (event) => {
    const actor = sheet.actor;
    const index = Number(event.currentTarget.dataset.index);
    const value = event.currentTarget.value;

    const contacts = foundry.utils.duplicate(actor.system.contacts);
    contacts[index].description = value;

    await actor.update({ "system.contacts": contacts });
  });

  html.find(".delete-contacts").off("click");
  html.find(".delete-contacts").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this contact?</p>"
    });

    if (!confirmed) return;

    const contacts = foundry.utils.duplicate(sheet.actor.system.contacts);

    contacts.splice(index, 1);

    await sheet.actor.update({ "system.contacts": contacts });
  });

  //#endregion

  //#region Titles

  html.find(".add-titles").on("click", async (event) => {
    const actor = sheet.actor;
    const titles = foundry.utils.duplicate(actor.system.titles);

    // Add a new blank language entry
    titles.push({ name: "" });

    await actor.update({ "system.titles": titles });
  });

  html.find(".titles-name-input").on("change", async (event) => {
    const actor = sheet.actor;
    const index = Number(event.currentTarget.dataset.index);
    const value = event.currentTarget.value;

    const titles = foundry.utils.duplicate(actor.system.titles);
    titles[index].name = value;

    await actor.update({ "system.titles": titles });
  });

  html.find(".delete-titles").off("click");
  html.find(".delete-titles").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this title?</p>"
    });

    if (!confirmed) return;

    const titles = foundry.utils.duplicate(sheet.actor.system.titles);

    const deletedName = titles[index]?.name;

    titles.splice(index, 1);

    await sheet.actor.update({ "system.titles": titles });
  });

  //#endregion
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
