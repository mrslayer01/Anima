//The base number of life points is always 20.
//lifePoints.final = 20 + (characteristics.Constitution.base * 10)  + (classes[x].lifePointsPerLevel * classes[x].level).
export function calculateFinalLifePoints(system) {
    const lvl = system.level || 0;
    const totalCon = system.characteristics.Constitution.base * 10;
    const baseLP = 20;
    const lpBonus = system.lifePoints.bonus;
    const totalLifePointsForallClasses = (system.classes || [])
    .reduce((total, cls) => {
        const lvl = Number(cls.level) || 0;
        const lppl = Number(cls.lifePointsPerLevel) || 0;
        return total + lvl * lppl;
    }, 0);

    system.lifePoints.final = baseLP + totalCon + totalLifePointsForallClasses + lpBonus;
}