// Base for normal sized creatures is 20.
// Initiative is affected by mutlple factors, such as wearing armor or certain weapons etc. initiative.final will the the total after all penalties are applied. 
// Penalties are split between initiative.armorPenalty and initiative.weaponPenalty
// initiative.final = 20 + (characteristics.Agility.final + characteristics.Dexterity.final) + (initiative.armorPenalty + initiative.weaponPenalty) + (class[x].initiativePerLevel * classes[x].level) + initiative.bonus + special
export function calculateFinalInitiative(system) {
    const baseIni = 20;
    const agilAndDex = system.characteristics.Agility.final + system.characteristics.Dexterity.final;
    const weaponMod = system.initiative.weaponPenalty;
    const armorMod = system.initiative.armorPenalty;
    const totalInitiativeBonusForallClasses = (system.classes || [])
    .reduce((total, cls) => {
        const lvl = Number(cls.level) || 0;
        const lppl = Number(cls.lifePointsPerLevel) || 0;
        return total + lvl * lppl;
    }, 0);

    system.initiative.final = baseIni + agilAndDex + weaponMod + armorMod + totalInitiativeBonusForallClasses + system.initiative.bonus + system.initiative.special;
}