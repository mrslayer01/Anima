import { AddClassWindow } from "./apps/add-class-window.js";
import { ClassInfoWindow } from "./apps/class-info.js";
import { AddAdvantageWindow } from "./apps/add-advantage-window.js";
import { AdvantageInfoWindow } from "./apps/advantage-info.js";
import { AddDisadvantageWindow } from "./apps/add-disadvantage-window.js";
import { AddElanWindow } from "./apps/add-elan-window.js";
import { ElanInfoWindow } from "./apps/elan-info.js";
import { DisadvantageInfoWindow } from "./apps/disadvantage-info.js";
import { characteristicCheck, animaOpenRoll, resistanceCheck } from "./apps/rolls.js";
import { difficultyMap, toNum } from "./helpers/lookup.js";
import { updateDP } from "./classes/development-points.js";

import { ABF_CLASSES } from "./config/classes.js";
import { validateDP } from "./helpers/validate-dp-left.js";
import { ABF_LORDS } from "./config/elans.js";
import { COMBAT_TABLE } from "./helpers/combat.js";

export function registerSheetListeners(sheet, html) {
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
  html.find(".ability-roll").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".ability-roll").on("click", (ev) => {
    const categoryName = ev.currentTarget.dataset.category;
    const abilityName = ev.currentTarget.dataset.ability;
    const ability = sheet.actor.system.abilities.Secondaries[categoryName][abilityName];

    //don't allow the rolling of Knoweldge skills that are undeveloped
    if (ability.undeveloped && ability.knowledge) {
      return ui.notifications.error("Unable to roll for an undeveloped knowledge ability.");
    }

    animaOpenRoll({
      value: ability.final,
      label: `${abilityName} Open Roll`,
      actor: sheet.actor,
      undeveloped: ability.undeveloped,
      mastery: ability.mastery
    });
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
                      title="${value} — ${label}"
                      ${value === "80" ? "selected" : ""}
                    >
                      ${value} – ${label}
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

  //#endregion

  //#region Advanatage

  // -----------------------------
  // ADD ADVANTAGE
  // -----------------------------
  html.find(".add-advantage").off("click");
  html.find(".add-advantage").on("click", () => {
    new AddAdvantageWindow({ actorId: sheet.actor.id }).render(true);
  });

  // -----------------------------
  // DELETE ADVANTAGE
  // -----------------------------
  html.find(".delete-advantage").off("click");
  html.find(".delete-advantage").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this advantage?</p>"
    });

    if (!confirmed) return;

    const advantages = foundry.utils.duplicate(sheet.actor.system.advantages);

    advantages.splice(index, 1);

    await sheet.actor.update({ "system.advantages": advantages });
  });

  // -----------------------------
  // CLICK ADVANTAGE NAME FOR INFO
  // -----------------------------
  html.find(".clickable-advantage").off("click");
  html.find(".clickable-advantage").on("click", (ev) => {
    ev.preventDefault();

    const advName = ev.currentTarget.dataset.advantage;
    const advData = sheet.actor.system.advantages.find((a) => a.name === advName);

    if (!advData) return ui.notifications.error("Advantage data not found");

    new AdvantageInfoWindow(advName, advData).render(true);
  });
  //#endregion

  //#region Disadvantage

  // -----------------------------
  // ADD DISADVANTAGE
  // -----------------------------
  html.find(".add-disadvantage").off("click");
  html.find(".add-disadvantage").on("click", () => {
    new AddDisadvantageWindow({ actorId: sheet.actor.id }).render(true);
  });

  // -----------------------------
  // DELETE DISADVANTAGE
  // -----------------------------
  html.find(".delete-disadvantage").off("click");
  html.find(".delete-disadvantage").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this disadvantage?</p>"
    });

    if (!confirmed) return;

    const disadvantages = foundry.utils.duplicate(sheet.actor.system.disadvantages);

    disadvantages.splice(index, 1);

    await sheet.actor.update({ "system.disadvantages": disadvantages });
  });

  // -----------------------------
  // CLICK DISADVANTAGE NAME FOR INFO
  // -----------------------------
  html.find(".clickable-disadvantage").off("click");
  html.find(".clickable-disadvantage").on("click", (ev) => {
    ev.preventDefault();

    const disName = ev.currentTarget.dataset.disadvantage;
    const disData = sheet.actor.system.disadvantages.find((d) => d.name === disName);

    if (!disData) return ui.notifications.error("Disadvantage data not found");

    new DisadvantageInfoWindow(disName, disData).render(true);
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
  html.find(".elan-current-input").off("change");
  html.find(".elan-current-input").on("change", async (event) => {
    const index = Number(event.currentTarget.dataset.index);
    const newLevel = Number(event.currentTarget.value) || 1;

    const elans = foundry.utils.duplicate(sheet.actor.system.elans);
    elans[index].elan.current = newLevel;

    await sheet.actor.update({ "system.elans": elans });
  });

  // Change elan bonus value
  html.find(".elan-bonus-input").off("change");
  html.find(".elan-bonus-input").on("change", async (event) => {
    const index = Number(event.currentTarget.dataset.index);
    const newLevel = Number(event.currentTarget.value) || 0;

    const elans = foundry.utils.duplicate(sheet.actor.system.elans);
    elans[index].elan.bonus = newLevel;

    await sheet.actor.update({ "system.elans": elans });
  });

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

  //#region Development Points
  //Abilities

  //Secondaries

  //capture the previous value incase of not being able to afford the increase.
  html.find(".secondary-input").on("focus", (event) => {
    const el = event.currentTarget;
    el.dataset.previous = el.value;
  });

  html.find(".secondary-input").on("change", async (event) => {
    const actor = sheet.actor;
    const el = event.currentTarget;

    const name = el.dataset.name;
    const costPer = toNum(el.dataset.cost);
    const amount = toNum(el.value);

    // 1. Validate BEFORE updating the actor
    const canAfford = await validateDP(actor, { name, amount, costPer });

    if (!canAfford) {
      ui.notifications.error("Not enough Development Points.");
      el.value = el.dataset.previous || 0; // revert UI
      return;
    }

    // 2. If valid, update DP
    await updateDP(actor, { name, amount, costPer });
  });

  //#endregion
  //#region Item Tables
  // Edit item
  html.find(".item-edit").click((ev) => {
    const actor = sheet.actor;
    const itemId = $(ev.currentTarget).closest(".item-row").data("item-id");
    actor.items.get(itemId).sheet.render(true);
  });

  // Delete item
  html.find(".item-delete").click(async (ev) => {
    const actor = sheet.actor;
    const itemId = $(ev.currentTarget).closest(".item-row").data("item-id");

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this item?</p>"
    });

    if (!confirmed) return;

    actor.deleteEmbeddedDocuments("Item", [itemId]);
  });

  //#endregion

  //#region Items

  html.find(".weapon-equip-toggle").on("click", async (ev) => {
    const itemId = ev.currentTarget.dataset.itemId;
    const item = sheet.actor.items.get(itemId);

    const current = item.system.weapon.equipped ?? false;

    await item.update({
      "system.weapon.equipped": !current
    });

    sheet.render(false);
  });

  //#endregion

  html.find(".combat").off("click");
  html.find(".combat").on("click", async (event) => {
    // === Prompt for values ===
    new Dialog({
      title: "Combat Table Lookup",
      content: `
    <div style="margin-bottom:10px;">
      <label>Attack Result:</label>
      <input id="attackResult" type="number" style="width:100%;" />
    </div>
    <div>
      <label>Armor Type (AT 0–10):</label>
      <input id="armorType" type="number" min="0" max="10" style="width:100%;" />
    </div>
  `,
      buttons: {
        ok: {
          label: "Resolve",
          callback: (html) => {
            const attackResult = Number(html.find("#attackResult").val());
            const armorType = Number(html.find("#armorType").val());

            const outcome = resolveCombat(attackResult, armorType, COMBAT_TABLE);

            let title = "";
            let body = "";

            if (outcome.type === "damage") {
              title = `<span style="color:#0a0; font-weight:bold;">Hit! Damage Dealt</span>`;
              body = `
            <b>Attack Result:</b> ${attackResult}<br>
            <b>AT:</b> ${armorType}<br>
            <b>Damage %:</b> ${outcome.percent}%<br>
          `;
            } else if (outcome.type === "counter") {
              title = `<span style="color:#c00; font-weight:bold;">Counterattack!</span>`;
              body = `
            <b>Attack Result:</b> ${attackResult}<br>
            <b>AT:</b> ${armorType}<br>
            <b>Counter Bonus:</b> +${outcome.bonus}<br>
          `;
            } else if (outcome.type === "nodamage") {
              title = `<span style="color:#666; font-weight:bold;">Hit, No Damage</span>`;
              body = `
            <b>Attack Result:</b> ${attackResult}<br>
            <b>AT:</b> ${armorType}<br>
            <b>Effect:</b> Defender loses Active Action<br>
          `;
            } else {
              title = `<span style="color:#c00; font-weight:bold;">Error</span>`;
              body = outcome.error;
            }

            const card = `
          <div class="anima-card" style="border:1px solid #444; padding:8px; border-radius:6px;">
            <div style="font-size:1.1em; margin-bottom:4px;">${title}</div>
            <hr>
            <div>${body}</div>
          </div>
        `;

            ChatMessage.create({
              user: game.user.id,
              content: card
            });
          }
        },
        cancel: { label: "Cancel" }
      }
    }).render(true);

    // === Resolver (uses your generated table) ===
    function resolveCombat(attackResult, armorType, table) {
      const column = table[armorType];
      if (!column) return { error: "Invalid AT" };

      for (const row of column) {
        if (attackResult >= row.min && attackResult <= row.max) {
          return row.value;
        }
      }

      return { error: "No matching range" };
    }
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
