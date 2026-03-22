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

Hooks.once("init", function () {
  console.log("ABF | Initializing Anima Beyond Fantasy system");
  CONFIG.debug.compatibility = false;

  CONFIG.Actor.documentClass = AbfActor;
  CONFIG.Item.documentClass = AbfItem;
  CONFIG.Combat.documentClass = AnimaCombat;

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

Hooks.once("ready", () => {
  // Remove only OUR handler, not all handlers
  if (abfSocketHandler) {
    game.socket.off("system.abf-system", abfSocketHandler);
  }

  // Define handler ONCE
  abfSocketHandler = (msg) => {
    if (msg.type === "defense:prompt" && msg.userId === game.user.id) {
      new DefendWindow(
        (defense) => {
          game.socket.emit("system.abf-system", {
            type: "defense:response",
            attackerId: msg.attackerId,
            defense
          });
        },
        {
          targetActor: game.actors.get(msg.targetId),
          attackData: msg.attackData
        }
      ).render(true);
    }

    if (msg.type === "defense:prompt-multi" && msg.userId === game.user.id) {
      new DefendWindow(
        (defense) => {
          game.socket.emit("system.abf-system", {
            type: "defense:response-multi",
            requestId: msg.requestId,
            defense
          });
        },
        {
          targetActor: game.actors.get(msg.targetId),
          attackData: msg.attackData,
          requestId: msg.requestId
        }
      ).render(true);
    }
  };

  // Register OUR handler
  game.socket.on("system.abf-system", abfSocketHandler);

  // SHIFT + Right‑Click targeting...
  canvas.stage.on("rightdown", (event) => {
    const ev = event.data.originalEvent;
    if (!ev.shiftKey || ev.button !== 2) return;

    const { x, y } = event.data.getLocalPosition(canvas.tokens);
    const token = canvas.tokens.placeables.find((t) => t.bounds.contains(x, y));
    if (!token) return;

    event.stopPropagation();
    event.preventDefault();

    token.setTarget(!token.isTargeted, { releaseOthers: false });
  });
});
