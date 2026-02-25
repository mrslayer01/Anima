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
    //Check if the advantage Natural Armor Exsists.
    const hasNaturalArmor = system.advantages.some((adv) => adv.name === "Natural Armor");
    const hasMysticalArmor = system.advantages.some((adv) => adv.name === "Mystical Armor");
    for (const type of DAMAGE_TYPES) {
      system.armor.total[type] = ARMOR_SECTIONS.reduce((sum, section) => {
        return sum + toNum(system.armor[section]?.[type]);
      }, 0);
      if (hasNaturalArmor) {
        //Gets +2 natural bonus to all types except energy
        if (type != "ene") {
          system.armor.total[type] += 2;
        }
      }
      if (hasMysticalArmor) {
        //Gets +4 natural energy bonus.
        if (type === "ene") {
          system.armor.total[type] += 4;
        }
      }
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

    return changed;
  }

  RecalcUpdated(system, name) {
    //Check if the advantage Natural Armor Exsists.
    const hasNaturalArmor = system.advantages.some((adv) => adv.name === "Natural Armor");
    const hasMysticalArmor = system.advantages.some((adv) => adv.name === "Mystical Armor");
    for (const type of DAMAGE_TYPES) {
      system.armor.total[type] = ARMOR_SECTIONS.reduce((sum, section) => {
        return sum + toNum(system.armor[section]?.[type]);
      }, 0);
      if (hasNaturalArmor) {
        //Gets +2 natural bonus to all types except energy
        if (type != "ene") {
          system.armor.total[type] += 2;
        }
      }
      if (hasMysticalArmor) {
        //Gets +4 natural energy bonus.
        if (type === "ene") {
          system.armor.total[type] += 4;
        }
      }
    }
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
