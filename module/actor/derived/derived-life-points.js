import { toNum } from "../helpers/lookup.js";

//The base number of life points is always 20.
//lifePoints.final = 20 + (characteristics.Constitution.base * 10)  + (classes[x].lifePointsPerLevel * classes[x].level).
export function calculateFinalLifePoints(system) {
  const totalCon = toNum(system.characteristics.Constitution.base) * 10;
  const baseLP = 20;
  const lpBonus = toNum(system.core.lifePoints.bonus);
  const totalLifePointsForallClasses = (system.classes || []).reduce((total, cls) => {
    const lvl = toNum(cls.level) || 0;
    const lppl = toNum(cls.lifePointsPerLevel) || 0;
    return total + lvl * lppl;
  }, 0);

  system.core.lifePoints.final = baseLP + totalCon + totalLifePointsForallClasses + lpBonus;
}
