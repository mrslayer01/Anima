import { toNum } from "../../utils/numbers.js";
import { BaseRule } from "./base-rule.js";

export class MovementRule extends BaseRule {
  Initialize(system) {
    //Init final, movePerTurn
    if (system.movement.final === undefined) system.movement.final = 0;
    if (system.movement.armorPenalty === undefined) system.movement.armorPenalty = 0;
    if (system.movement.movePerTurn === undefined) system.movement.movePerTurn = "";
  }

  Derived(system) {
    this.Initialize(system);
    const agility = toNum(system.characteristics.Agility.base);
    const moveBonus = toNum(system.movement.bonus);
    const armorPenalty = toNum(system.globalModifiers.Natural.movement);

    let movement = agility + moveBonus - armorPenalty;

    if (movement < 0) movement = 1;
    const hasInhuman = system.movement.inhuman;
    const hasZen = system.movement.zen;

    const cap = movementCap(hasInhuman, hasZen);
    system.movement.final = Math.min(movement, cap);
    system.movement.movePerTurn = MOVEMENT_DISTANCES[system.movement.final];
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    //watches Agility.base, movement.bonus and Athleticism.final
    const newAgil = foundry.utils.getProperty(updateData, "system.characteristics.Agility.base");
    const newBonus = foundry.utils.getProperty(updateData, "system.movement.bonus");
    const newNaturalPen = foundry.utils.getProperty(
      updateData,
      "system.globalModifiers.Natural.movement"
    );

    if (newAgil !== undefined && newAgil !== oldSystem.characteristics.Agility.base) {
      changed.push("Agility");
    }
    if (newBonus !== undefined && newBonus !== oldSystem.movement.bonus) {
      changed.push("bonus");
    }
    if (newNaturalPen !== undefined && newNaturalPen !== system.globalModifiers.Natural.movement) {
      changed.push("bonus");
    }

    for (const [index, cls] of Object.entries(oldSystem.classes)) {
      const lvlPath = `system.classes.${index}.level`;

      const newLvl = foundry.utils.getProperty(updateData, lvlPath);

      if (newLvl !== undefined && newLvl !== cls.level) changed.push("class");
    }

    return changed;
  }

  RecalcUpdated(system, name) {
    const agility = toNum(system.characteristics.Agility.base);
    const moveBonus = toNum(system.movement.bonus);
    const armorPenalty = toNum(system.globalModifiers.Natural.movement);

    let movement = agility + moveBonus - armorPenalty;

    if (movement < 0) movement = 1;
    const hasInhuman = system.movement.inhuman;
    const hasZen = system.movement.zen;

    const cap = movementCap(hasInhuman, hasZen);
    system.movement.final = Math.min(movement, cap);
    system.movement.movePerTurn = MOVEMENT_DISTANCES[system.movement.final];
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}

function movementCap(hasInhuman, hasZen) {
  if (hasZen) return 20;
  if (hasInhuman) return 13;
  return 10;
}

const MOVEMENT_DISTANCES = {
  1: "<3 ft",
  2: "15 ft",
  3: "25 ft",
  4: "50 ft",
  5: "65 ft",
  6: "70 ft",
  7: "80 ft",
  8: "90 ft",
  9: "105 ft",
  10: "115 ft",
  11: "130 ft",
  12: "160 ft",
  13: "250 ft",
  14: "500 ft",
  15: "800 ft",
  16: "1500 ft",
  17: "3000 ft",
  18: "3 miles",
  19: "15 miles",
  20: "Special"
};
