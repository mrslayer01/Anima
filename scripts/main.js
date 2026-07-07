import { AbfActor } from "./documents/abf-actor.js";
import { AbfItem } from "./documents/abf-item.js";
import { AbfActorSheet } from "./ui/abf-actor-sheet.js";
import { AbfItemSheet } from "./ui/abf-item-sheet.js";
import { InitalizeAllActorPartials } from "./templates/initialize-actor-partials.js";
import { loadAllActorHandlerbarsHelpers } from "./ui/handlebars-helpers.js";
import { InitalizeAllItemPartials } from "./templates/initialize-item-partials.js";
import { WeaponBaseCalculations, WeaponEquipped } from "./data/rules/items/weapon-calculations.js";
import { ArmorCalculate, UpdateArmor } from "./data/rules/items/armor-calculations.js";
import { AnimaCombat } from "./utils/combat.js";
import { ABF_FREE_ACCESS_SPELLS, ABF_SPELLS } from "./config/spells.js";
import { promptDefenseChoice } from "./ui/listeners/roll-listeners.js";
import { DefendWindow } from "./ui/windows/defend-window.js";
import { DEFAULT_ACTOR_DATA } from "./config/default-actor-data.js";
import { INIT_RULES, MOD_RULES, FINAL_RULES } from "./data/rules/rules.js";

Hooks.once("init", function () {
  console.log("ABF | Initializing Anima Beyond Fantasy system");
  CONFIG.debug.compatibility = false;

  CONFIG.Actor.documentClass = AbfActor;
  CONFIG.Item.documentClass = AbfItem;
  CONFIG.Combat.documentClass = AnimaCombat;

  // Exposed values.
  game.ABF_RULE_INIT = INIT_RULES;
  game.ABF_RULE_MOD = MOD_RULES;
  game.ABF_RULE_FINAL = FINAL_RULES;
  game.ABF_DEFAULT_ACTOR_DATA = DEFAULT_ACTOR_DATA;
  game.ABF_SPELLS = ABF_SPELLS;
  game.ABF_FREE_ACCESS_SPELLS = ABF_FREE_ACCESS_SPELLS;

  loadAllActorHandlerbarsHelpers();
  InitalizeAllActorPartials();
  InitalizeAllItemPartials();

  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet("abf-system", AbfActorSheet, {
    makeDefault: true
  });

  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet("abf-system", AbfItemSheet, {
    makeDefault: true
  });
});

Hooks.on("updateActor", (actor, updateData, options, userId) => {
  if (foundry.utils.hasProperty(updateData, "system.characteristics.Strength")) {
    WeaponBaseCalculations(actor);
  }
});

Hooks.on("updateItem", (item, updateData, options, userId) => {
  const actor = item.parent;
  if (!actor) return;

  if (item.type === "weapon") {
    WeaponEquipped(actor, item);
  }

  if (item.type === "armor") {
    UpdateArmor(actor);
  }
});

Hooks.on("updateCombat", async (combat, changes) => {
  if (!("round" in changes)) return;
  if (!game.user.isGM) return;

  // Reset initiative to null for all combatants
  const updates = combat.combatants.map((c) => ({
    _id: c.id,
    initiative: null
  }));

  await combat.updateEmbeddedDocuments("Combatant", updates);
});

let abfSocketHandler;

Hooks.once("ready", async () => {
  // Remove only OUR handler, not all handlers
  if (abfSocketHandler) {
    game.socket.off("system.abf-system", abfSocketHandler);
  }

  // Define handler ONCE

  abfSocketHandler = (msg) => {
    // Only the intended user opens the window
    if (msg.userId !== game.user.id) return;

    const actor = game.actors.get(msg.targetId);
    if (!actor) return;

    // Compute stats LOCALLY on the defender's client
    const block = actor.system.abilities.primary.Combat.Block.final;
    const dodge = actor.system.abilities.primary.Combat.Dodge.final;
    const projection = actor.system.abilities.primary.Supernatural.MagicProjection.defensiveFinal;
    const psyProjection = actor.system.abilities.primary.Psychic.PsychicProjection.final;

    // Single-target
    if (msg.type === "defense:prompt") {
      new DefendWindow(
        (defense) => {
          game.socket.emit("system.abf-system", {
            type: "defense:response",
            attackerId: msg.attackerId,
            defense
          });
        },
        {
          attackData: msg.attackData,
          block,
          dodge,
          projection,
          psyProjection
        }
      ).render(true);
    }

    // Multi-target
    if (msg.type === "defense:prompt-multi") {
      new DefendWindow(
        (defense) => {
          game.socket.emit("system.abf-system", {
            type: "defense:response-multi",
            requestId: msg.requestId,
            defense
          });
        },
        {
          attackData: msg.attackData,
          requestId: msg.requestId,
          block,
          dodge,
          projection,
          psyProjection
        }
      ).render(true);
    }
  };

  // Register OUR handler
  game.socket.on("system.abf-system", abfSocketHandler);

  if (!game.user.isGM) return;
  await migrateActors();
});

async function migrateActors() {
  // Only GMs should run migrations
  if (!game.user.isGM) return;

  console.log("ABF | Running automatic actor migration…");

  const TEMPLATE = game.ABF_DEFAULT_ACTOR_DATA;
  if (!TEMPLATE) {
    ui.notifications.error("ABF migration failed: DEFAULT_ACTOR_DATA missing.");
    return;
  }

  // === Step 1: Build a clean actor to auto-detect derived fields ===
  const tempActor = await Actor.create({
    name: "_DERIVED_FIELD_PROBE_",
    type: "character",
    system: TEMPLATE
  });

  await tempActor.prepareData();
  await tempActor.prepareDerivedData();

  const finalSystem = tempActor.system;
  await tempActor.delete();

  // === Diff helper ===
  function diffKeys(objA, objB, basePath = "") {
    const diffs = [];

    for (const key of Object.keys(objA)) {
      const path = basePath ? `${basePath}.${key}` : key;

      if (!(key in objB)) {
        diffs.push(path);
        continue;
      }

      const aVal = objA[key];
      const bVal = objB[key];

      if (aVal && typeof aVal === "object" && !Array.isArray(aVal) && typeof bVal === "object") {
        diffs.push(...diffKeys(aVal, bVal, path));
      }
    }

    return diffs;
  }

  // === Step 2: Build derived-field list ===
  const DERIVED_FIELDS = new Set(diffKeys(finalSystem, TEMPLATE, "system"));

  // console.group("ABF | AUTO-DETECTED DERIVED FIELDS");
  // DERIVED_FIELDS.forEach((f) => console.log(" + " + f));
  // console.groupEnd();

  // === Step 3: Scan actors for extra fields ===
  function findExtraFields(actorObj, templateObj, basePath = "system") {
    const extra = [];

    for (const key of Object.keys(actorObj)) {
      const actorVal = actorObj[key];
      const templateVal = templateObj[key];
      const fullPath = `${basePath}.${key}`;

      // Skip derived fields
      if (DERIVED_FIELDS.has(fullPath)) continue;

      // Key missing in template → extra field
      if (templateVal === undefined) {
        extra.push(fullPath);
        continue;
      }

      // Recurse into objects
      if (
        actorVal &&
        typeof actorVal === "object" &&
        !Array.isArray(actorVal) &&
        typeof templateVal === "object"
      ) {
        extra.push(...findExtraFields(actorVal, templateVal, fullPath));
      }
    }

    return extra;
  }

  const actors = game.actors.filter((a) => a.type === "character");

  console.log(`ABF | Scanning ${actors.length} actors for obsolete fields…`);

  // === Step 4: Per-actor cleanup with GM confirmation ===
  for (const actor of actors) {
    const extra = findExtraFields(actor.system, TEMPLATE);

    if (extra.length === 0) continue;

    const listHtml = extra.map((e) => `<li>${e}</li>`).join("");

    await Dialog.prompt({
      title: `ABF Migration: ${actor.name}`,
      content: `
        <p>The following fields are obsolete and can be safely removed:</p>
        <ul>${listHtml}</ul>
        <p>Remove these fields?</p>
      `,
      label: "Remove Fields",
      callback: async () => {
        // Clone actor data
        const data = actor.toObject();

        // Remove extra fields from the clone
        for (const path of extra) {
          const cleanPath = path.replace(/^system\./, "");
          foundry.utils.setProperty(data.system, cleanPath, undefined);
        }

        // Preserve folder, ownership, prototype token
        const folder = actor.folder?.id ?? null;
        const ownership = actor.ownership;
        const prototypeToken = actor.prototypeToken;

        // Delete old actor
        await actor.delete();

        // Create new actor with cleaned data
        const newActor = await Actor.create({
          ...data,
          folder,
          ownership,
          prototypeToken
        });

        console.log(`ABF | Recreated actor ${actor.name} without extra fields:`, extra);
        ui.notifications.info(`ABF cleaned & recreated: ${actor.name}`);

        // Open the new sheet
        //newActor.sheet.render(true);
      },
      rejectClose: false
    });
  }

  console.log("ABF | Actor migration complete.");
  ui.notifications.info("ABF actor migration complete.");
}
