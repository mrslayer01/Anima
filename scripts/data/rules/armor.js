import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";
import { ARMOR_SECTIONS, DAMAGE_TYPES } from "../../utils/lookup.js";

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

  Derived(system) {
    this.Initialize(system);
    for (const type of DAMAGE_TYPES) {
      system.armor.total[type] = ARMOR_SECTIONS.reduce((sum, section) => {
        return sum + toNum(system.armor[section]?.[type]);
      }, 0);
    }
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

    if (updateData.system.equipped !== undefined) {
      for (const armor of oldSystem.items.armor) {
        if (armor._id === updateData._id) {
          const newEquip = updateData.system.equipped;
          const oldEquip = armor.system.equipped;
          if (newEquip != oldEquip) {
            changed.push(updateData);
          }
        }
      }
    }

    return changed;
  }

  RecalcUpdated(system, name) {
    let armorBonus = {};

    if (name?.system?.equipped) {
      console.log("New Item Equipped.");
      //Add the item's values to their respective location values
      const armor = system.items.armor.find((i) => i._id === name._id);
      const armorTypeValues = armor.system.armorType;
      const sectionToAddTo = armor.system.location;
      for (const [name, value] of Object.entries(armorTypeValues)) {
        system.armor[sectionToAddTo][name] += value;
      }
    } else if (!name?.system?.equipped) {
      console.log("Item Unequipped.");
      //Remove the item's values to their respective location values
      const armor = system.items.armor.find((i) => i._id === name._id);
      const armorTypeValues = armor.system.armorType;
      const sectionToRemoveFrom = armor.system.location;

      for (const [name, value] of Object.entries(armorTypeValues)) {
        system.armor[sectionToRemoveFrom][name] -= value;
      }
    }

    for (const type of DAMAGE_TYPES) {
      system.armor.total[type] = ARMOR_SECTIONS.reduce((sum, section) => {
        return sum + toNum(system.armor[section]?.[type]);
      }, 0);
    }
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      console.log(name);
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
