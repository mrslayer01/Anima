import { toNum } from "../helpers/lookup.js";

//The base number of life points is always 20.
//lifePoints.final = 20 + (characteristics.Constitution.base * 10)  + (classes[x].lifePointsPerLevel * classes[x].level).
export function calculateFinalLifePoints(system) {
  const totalCon = toNum(system.characteristics.Constitution.base) * 10;
  const totalConModifier = toNum(system.characteristics.Constitution.final);
  const baseLP = 20 + totalCon + totalConModifier;
  const lpBonus = toNum(system.core.lifePoints.bonus);
  const classLP = toNum(system.core.lifePoints.class);

  system.core.lifePoints.final = baseLP + classLP + lpBonus;
}
