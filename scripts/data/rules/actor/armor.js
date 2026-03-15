import { BaseRule } from "../base-rule.js";
import { toNum } from "../../../utils/numbers.js";
import { ARMOR_SECTIONS, DAMAGE_TYPES } from "../../../utils/lookup.js";
import { AddModifier } from "../../../utils/helpers.js";

export class ArmorRule extends BaseRule {
  Initialize(system) {
    // Ensure armor exists
    system.armor ??= {};

    // Initialize each armor section
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

    for (const type of DAMAGE_TYPES) {
      const naturalAT = toNum(system.armor.natural?.[type] ?? 0);

      // Find worn AT from any worn section
      let wornAT = 0;
      for (const section of ARMOR_SECTIONS) {
        if (section === "natural" && section === "helm") continue;
        const val = toNum(system.armor[section]?.[type]);
        if (val > 0) {
          wornAT = val;
          break;
        }
      }

      // Final total = worn + natural
      system.armor.total[type] = wornAT + naturalAT;
    }

    // Apply combined penalties (computed in ArmorCalculate)
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
    // Recompute totals when a section changes
    for (const type of DAMAGE_TYPES) {
      const naturalAT = toNum(system.armor.natural?.[type] ?? 0);

      // Find worn AT from any worn section
      let wornAT = 0;
      for (const section of ARMOR_SECTIONS) {
        if (section === "natural" && section === "helm") continue;
        const val = toNum(system.armor[section]?.[type]);
        if (val > 0) {
          wornAT = val;
          break;
        }
      }

      // Final total = worn + natural
      system.armor.total[type] = wornAT + naturalAT;
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
    // Clear old armor modifiers
    for (const mod of Object.values(system.globalModifiers)) {
      mod.currentMods = mod.currentMods.filter((m) => m.source !== "Armor");
    }

    // Read combined penalties stored by ArmorCalculate
    const p = system.armor.combinedPenalties;
    if (!p) return;

    AddModifier(system.globalModifiers.Physical, {
      id: "combined-physical",
      source: "Armor",
      value: -p.physical,
      type: "armor"
    });

    AddModifier(system.globalModifiers.Natural, {
      id: "combined-natural",
      source: "Armor",
      value: -p.natural,
      type: "armor"
    });

    AddModifier(system.globalModifiers.Movement, {
      id: "combined-movement",
      source: "Armor",
      value: -p.movement,
      type: "armor"
    });

    AddModifier(system.globalModifiers.Perception, {
      id: "combined-perception",
      source: "Armor",
      value: -p.perception,
      type: "armor"
    });
  }
}
