import { registerSheetListeners } from "./listeners.js";

export class AbfActorSheet extends foundry.appv1.sheets.ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["abf-character-sheet", "abf-system", "sheet", "actor"],
      template: "systems/abf-system/templates/actors/character-sheet.hbs",
      width: 1530,
      height: 1180,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "main"
        },
        {
          navSelector: ".sub-tabs",
          contentSelector: ".tab.main",
          initial: "character"
        },
        {
          navSelector: ".sub-tabs[data-group='main-sub']",
          contentSelector: ".tab.main",
          initial: "character"
        },
        {
          navSelector: ".sub-tabs[data-group='mystic-sub']",
          contentSelector: ".tab.mystic",
          initial: "mysticMain"
        },
        {
          navSelector: ".sub-tabs[data-group='psychic-sub']",
          contentSelector: ".tab.psychic",
          initial: "psychicMain"
        },
        {
          navSelector: ".sub-tabs[data-group='ability-sub']",
          contentSelector: ".tab.abilities",
          initial: "primaries"
        }
      ]
    });
  }

  activateListeners(html) {
    super.activateListeners(html);
    registerSheetListeners(this, html);
  }

  getData(options) {
    const data = super.getData(options);
    data.system = this.actor.system;
    return data;
  }

  async _onChangeInput(event) {
    const input = event.target;
    const name = input.name;

    // TEXT FIELDS (aspects, notes, etc.)
    if (input.type === "text") {
      const value = input.value;
      await this.actor.update({ [name]: value });
      return;
    }

    // NUMBER FIELDS
    let value = Number(input.value);

    // Only validate characteristics
    const isCharacteristic = name.startsWith("system.characteristics.");
    const isResistance = name.startsWith("system.resistances.");
    const isAbility = name.startsWith("system.abilities.Secondaries.");
    const isCurrency = name.startsWith("system.currency.");
    const isCore = name.startsWith("system.core.");

    const bonusFields = name.startsWith("system.");

    if (isCharacteristic) {
      // Characteristic can't go above 20 or below 0
      if (name.endsWith(".base") && value < 1) {
        value = 1;
        input.value = 1;
      }

      // if (name.endsWith(".bonus") && value < 0) {
      //   value = 0;
      //   input.value = 0;
      // }

      if (value > 20) {
        value = 20;
        input.value = 20;
      }
    }

    if (isAbility) {
      // Base cannot go below 1
      if (value < 0) {
        value = 0;
        input.value = 0;
      }
    }

    if (isCurrency) {
      // Currency cannot go below 0
      if (value < 0) {
        value = 0;
        input.value = 0;
      }
    }

    if (isCore) {
      // Fatigue cannot go below 0
      if (value < 0) {
        value = 0;
        input.value = 0;
      }
    }

    if (isResistance) {
      // resistance cannot go below 0
      if (value < 0) {
        value = 0;
        input.value = 0;
      }
    }

    if (bonusFields) {
      // resistance cannot go below 0
      if (name.endsWith(".bonus") && value < 0) {
        value = 0;
        input.value = 0;
      }
    }

    //DP Validation
    // PRIMARY ABILITY DP VALIDATION
    // PRIMARY ABILITY VALIDATION (DP + Category Limit + Attack/Defense)
    if (name.startsWith("system.abilities.primary.")) {
      const parts = name.split(".");
      const category = parts[3]; // Combat / Psychic / Supernatural
      const ability = parts[4]; // Attack, Block, Dodge, etc.

      const abil = this.actor.system.abilities.primary[category][ability];
      const oldBase = Number(abil.base) || 0;
      const newBase = value;
      const cost = Number(abil.cost) || 0;

      const delta = newBase - oldBase;
      const dpCost = delta * cost;

      // Only validate increases
      if (dpCost > 0) {
        const dp = this.actor.system.developmentPoints;

        // --- 1. DP REMAINING CHECK ---
        if (dpCost > dp.remaining) {
          ui.notifications.error("Not enough Development Points.");
          input.value = oldBase;
          return;
        }

        // --- 2. CATEGORY LIMIT CHECK ---
        const limits = this.actor.system.abilities.primary.abilityLimits;
        const percent = Number(limits[category].percent) || 0;

        let limit = (dp.final * percent) / 100;

        // Focus halves the limit
        if (abil.focus === true) {
          limit = limit / 2;
        }

        const currentSpent = dp.spentRecords
          .filter((r) => r.category === category)
          .reduce((sum, r) => sum + Number(r.amount) * Number(r.cost), 0);

        const newTotal = currentSpent + dpCost;

        if (newTotal > limit) {
          ui.notifications.error("Outside of allowed limit for this ability.");
          input.value = oldBase;
          return;
        }

        // --- 3. ATTACK / BLOCK / DODGE RULE ---
        if (category === "Combat" && ["Attack", "Block", "Dodge"].includes(ability)) {
          const prim = this.actor.system.abilities.primary.Combat;

          const attack = prim.Attack;
          const block = prim.Block;
          const dodge = prim.Dodge;

          const focused = attack.focus
            ? "Attack"
            : block.focus
              ? "Block"
              : dodge.focus
                ? "Dodge"
                : null;

          // If one is focused, the others cannot increase
          if (focused && ability !== focused) {
            if (newBase > oldBase) {
              ui.notifications.error("Only the focused combat ability may be increased.");
              input.value = oldBase;
              return;
            }
          }

          // If editing the focused one, skip the 50‑point rule
          if (!focused || focused !== ability) {
            let attackBase = Number(attack.base) || 0;
            let blockBase = Number(block.base) || 0;
            let dodgeBase = Number(dodge.base) || 0;

            if (ability === "Attack") attackBase = newBase;
            if (ability === "Block") blockBase = newBase;
            if (ability === "Dodge") dodgeBase = newBase;

            const diffBlock = Math.abs(attackBase - blockBase);
            const diffDodge = Math.abs(attackBase - dodgeBase);

            if (diffBlock > 50 || diffDodge > 50) {
              ui.notifications.error(
                "Attack, Block, and Dodge must remain within 50 points of each other."
              );
              input.value = oldBase;
              return;
            }
          }
        }
      }
    }

    // Apply update
    await this.actor.update({ [name]: value });
    this.render(false);
  }
}
