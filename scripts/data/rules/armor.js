import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";
import { ARMOR_SECTIONS, DAMAGE_TYPES } from "../../utils/lookup.js";
import { AddModifier } from "../../utils/helpers.js";

export class ArmorRule extends BaseRule {
  Initialize(system) {
    // Ensure armor exists
    system.armor ??= {};

    // Initialize normal sections
    for (const section of ARMOR_SECTIONS) {
      const target = (system.armor[section] ??= {});
      for (const type of DAMAGE_TYPES) {
        target[type] ??= 0;
      }
    }

    // Initialize total section
    const total = (system.armor.total ??= {});
    for (const type of DAMAGE_TYPES) {
      total[type] ??= 0;
    }
  }

  Derived(system, actor) {
    this.Initialize(system);
    //Check if the advantage Natural Armor Exsists.
    for (const type of DAMAGE_TYPES) {
      system.armor.total[type] = ARMOR_SECTIONS.reduce((sum, section) => {
        return sum + toNum(system.armor[section]?.[type]);
      }, 0);
    }

    this.ApplyArmorPenalties(system, actor);
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];

    for (const section of ARMOR_SECTIONS) {
      for (const type of DAMAGE_TYPES) {
        const flatPath = `system.armor.${section}.${type}`;

        if (flatPath in updateData) {
          const newVal = updateData[flatPath];
          const oldVal = oldSystem.armor[section]?.[type];

          if (newVal !== oldVal) {
            changed.push(type);
          }
        }
      }
    }

    return changed;
  }

  RecalcUpdated(system, name) {
    //Check if the advantage Natural Armor Exsists.
    for (const type of DAMAGE_TYPES) {
      system.armor.total[type] = ARMOR_SECTIONS.reduce((sum, section) => {
        return sum + toNum(system.armor[section]?.[type]);
      }, 0);
    }
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }

  ApplyArmorPenalties(system, actor) {
    // clear old armor modifiers
    for (const mod of Object.values(system.globalModifiers)) {
      mod.currentMods = mod.currentMods.filter((m) => m.source !== "Armor");
    }

    // reapply penalties from equipped armor
    for (const armor of actor.items) {
      if (armor.type !== "armor") continue;
      if (!armor.system.equipped) continue;

      AddModifier(system.globalModifiers.Physical, {
        id: `${armor.id}-physical`,
        source: "Armor",
        value: -armor.system.physicalPenalty,
        type: "armor"
      });

      AddModifier(system.globalModifiers.Natural, {
        id: `${armor.id}-natural`,
        source: "Armor",
        value: -armor.system.naturalPenalty.final,
        type: "armor"
      });

      AddModifier(system.globalModifiers.Movement, {
        id: `${armor.id}-movement`,
        source: "Armor",
        value: -armor.system.moveRestriction.final,
        type: "armor"
      });

      AddModifier(system.globalModifiers.Perception, {
        id: `${armor.id}-perception`,
        source: "Armor",
        value: -armor.system.perceptionPenalty,
        type: "armor"
      });
    }
  }
}
