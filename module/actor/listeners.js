import { AddClassWindow } from "../apps/add-class-window.js";
import { ClassInfoWindow } from "../apps/class-info.js";
import { AddAdvantageWindow } from "../apps/add-advantage-window.js";
import { AdvantageInfoWindow } from "../apps/advantage-info.js";
import { AddDisadvantageWindow } from "../apps/add-disadvantage-window.js";
import { AddElanWindow } from "../apps/add-elan-window.js";
import { ElanInfoWindow } from "../apps/elan-info.js";
import { DisadvantageInfoWindow } from "../apps/disadvantage-info.js";
import {
  characteristicCheck,
  animaOpenRoll,
  resistanceCheck,
} from "../apps/rolls.js";
import { difficultyMap, toNum } from "./lookup.js";
import { updateDP } from "./classes/development-points.js";

import { ABF_CLASSES } from "../config/classes.js";
import { validateDP } from "./helpers/validate-dp-left.js";

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
      actor: sheet.actor,
    });
  });

  //Characteristic Open Roll
  html.find(".open-roll").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".open-roll").on("click", (ev) => {
    const char = ev.currentTarget.dataset.char;

    animaOpenRoll({
      value: sheet.actor.system.characteristics[char].final,
      label: `${char} Open Roll`,
      actor: sheet.actor,
    });
  });

  //Ability Open Roll
  html.find(".ability-roll").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".ability-roll").on("click", (ev) => {
    const categoryName = ev.currentTarget.dataset.category;
    const abilityName = ev.currentTarget.dataset.ability;
    const ability = sheet.actor.system.abilities[categoryName][abilityName];

    console.log(abilityName, ability);

    //don't allow the rolling of Knoweldge skills that are undeveloped
    if (ability.undeveloped && ability.knowledge) {
      return ui.notifications.error(
        "Unable to roll for an undeveloped knowledge ability.",
      );
    }

    animaOpenRoll({
      value: ability.final,
      label: `${abilityName} Open Roll`,
      actor: sheet.actor,
      undeveloped: ability.undeveloped,
      mastery: ability.mastery,
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
              actor: sheet.actor,
            });
          },
        },
      },
    }).render(true);
  });

  //#endregion

  //#region CLASS

  html.find(".add-class").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".add-class").on("click", () => {
    new AddClassWindow({ actorId: sheet.actor.id }).render(true);
  });

  html.find(".delete-class").off("click"); //before adding new listener, remove old to avoid duplicates
  html.find(".delete-class").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm(
      {
        title: "Confirm Delete",
        content: "<p>Are you sure you want to remove this class?</p>",
      },
      {
        classes: ["abf-character-sheet"],
      },
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
    const classData = sheet.actor.system.classes.find(
      (c) => c.name === className,
    );

    if (!classData) return ui.notifications.error("Class data not found");

    new ClassInfoWindow(className, { classData }).render(true);
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
      content: "<p>Are you sure you want to remove this advantage?</p>",
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
    const advData = sheet.actor.system.advantages.find(
      (a) => a.name === advName,
    );

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
      content: "<p>Are you sure you want to remove this disadvantage?</p>",
    });

    if (!confirmed) return;

    const disadvantages = foundry.utils.duplicate(
      sheet.actor.system.disadvantages,
    );

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
    const disData = sheet.actor.system.disadvantages.find(
      (d) => d.name === disName,
    );

    if (!disData) return ui.notifications.error("Disadvantage data not found");

    new DisadvantageInfoWindow(disName, disData).render(true);
  });
  //#endregion

  //#region Elan
  // -----------------------------
  // ADD ELAN
  // -----------------------------
  html.find(".add-elan").off("click");
  html.find(".add-elan").on("click", () => {
    new AddElanWindow({ actorId: sheet.actor.id }).render(true);
  });

  // -----------------------------
  // DELETE ELAN
  // -----------------------------
  html.find(".delete-elan").off("click");
  html.find(".delete-elan").on("click", async (event) => {
    const index = Number(event.currentTarget.dataset.index);

    const confirmed = await Dialog.confirm({
      title: "Confirm Delete",
      content: "<p>Are you sure you want to remove this elan?</p>",
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

    new ElanInfoWindow(elanName, elanData, { actorId: sheet.actor.id }).render(
      true,
    );
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
      content: "<p>Are you sure you want to remove this language?</p>",
    });

    if (!confirmed) return;

    const lang = foundry.utils.duplicate(sheet.actor.system.languages);

    lang.splice(index, 1);

    await sheet.actor.update({ "system.languages": lang });
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
      content: "<p>Are you sure you want to remove this title?</p>",
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
}
