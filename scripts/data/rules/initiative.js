import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";

export class InitiativeRule extends BaseRule {
  Initialize(system) {
    //Init class, final, armorPenalty, weaponPenalty, special
    if (system.initiative.class === undefined) system.initiative.class = 0;
    if (system.initiative.armorPenalty === undefined) system.initiative.armorPenalty = 0;
    if (system.initiative.weaponPenalty === undefined) system.initiative.weaponPenalty = 0;
    if (system.initiative.special === undefined) system.initiative.special = 0;
    if (system.initiative.final === undefined) system.initiative.final = 0;
  }

  Derived(system) {
    this.Initialize(system);
    const baseIni = 20;
    const agilFinal = toNum(system.characteristics.Agility.final);
    const dexFinal = toNum(system.characteristics.Dexterity.final);
    const weaponMod = toNum(system.initiative.weaponPenalty);
    const armorMod = toNum(system.initiative.armorPenalty);
    const iniBonus = toNum(system.initiative.bonus);
    const specBonus = toNum(system.initiative.special);
    const classBonus = toNum(system.initiative.class);

    system.initiative.final =
      baseIni + agilFinal + dexFinal + weaponMod + armorMod + classBonus + iniBonus + specBonus;
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    // check for characteristic change Agility Dexterity
    const newAgil = foundry.utils.getProperty(updateData, "system.characteristics.Agility.base");
    const newAgilBonus = foundry.utils.getProperty(
      updateData,
      "system.characteristics.Agility.bonus"
    );

    const newDex = foundry.utils.getProperty(updateData, "system.characteristics.Dexterity.base");
    const newDexBonus = foundry.utils.getProperty(
      updateData,
      "system.characteristics.Dexterity.bonus"
    );

    if (newAgil !== undefined && newAgil !== oldSystem.characteristics.Agility.base) {
      changed.push("Constitution");
    }
    if (newDex !== undefined && newDex !== oldSystem.characteristics.Dexterity.base) {
      changed.push("Dexterity");
    }

    if (newAgilBonus !== undefined && newAgilBonus !== oldSystem.characteristics.Agility.bonus) {
      changed.push("Constitution");
    }
    if (newDexBonus !== undefined && newDexBonus !== oldSystem.characteristics.Dexterity.bonus) {
      changed.push("Dexterity");
    }

    // check for class, armorPenalty, weaponPenalty, special
    const newWep = foundry.utils.getProperty(updateData, "system.initiative.weaponPenalty");
    const newArm = foundry.utils.getProperty(updateData, "system.initiative.armorPenalty");
    const newBon = foundry.utils.getProperty(updateData, "system.initiative.bonus");
    const newSpec = foundry.utils.getProperty(updateData, "system.initiative.special");
    const newClass = foundry.utils.getProperty(updateData, "system.initiative.class");

    if (newWep !== undefined && newWep !== oldSystem.initiative.weaponPenalty)
      changed.push("weaponPenalty");
    if (newArm !== undefined && newArm !== oldSystem.initiative.armorPenalty)
      changed.push("armorPenalty");
    if (newBon !== undefined && newBon !== oldSystem.initiative.bonus) changed.push("bonus");
    if (newSpec !== undefined && newSpec !== oldSystem.initiative.special) changed.push("special");
    if (newClass !== undefined && newClass !== oldSystem.initiative.class) changed.push("class");

    for (const [index, cls] of Object.entries(oldSystem.classes)) {
      const lvlPath = `system.classes.${index}.level`;
      const perPath = `system.classes.${index}.initiativePerLevel`;

      const newLvl = foundry.utils.getProperty(updateData, lvlPath);
      const newPer = foundry.utils.getProperty(updateData, perPath);

      if (newLvl !== undefined && newLvl !== cls.level) changed.push("class");

      if (newPer !== undefined && newPer !== cls.initiativePerLevel) changed.push("class");
    }

    return changed;
  }

  RecalcUpdated(system, name) {
    const baseIni = 20;
    const agilFinal = toNum(system.characteristics.Agility.final);
    const dexFinal = toNum(system.characteristics.Dexterity.final);
    const weaponMod = toNum(system.initiative.weaponPenalty);
    const armorMod = toNum(system.initiative.armorPenalty);
    const iniBonus = toNum(system.initiative.bonus);
    const specBonus = toNum(system.initiative.special);
    const classBonus = toNum(system.initiative.class);

    system.initiative.final =
      baseIni + agilFinal + dexFinal + weaponMod + armorMod + classBonus + iniBonus + specBonus;
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
