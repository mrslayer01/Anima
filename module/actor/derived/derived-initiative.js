import { toNum } from "../helpers/lookup.js";

// Base for normal sized creatures is 20.
// Initiative is affected by mutlple factors, such as wearing armor or certain weapons etc. initiative.final will the the total after all penalties are applied. 
// Penalties are split between initiative.armorPenalty and initiative.weaponPenalty
// initiative.final = 20 + (characteristics.Agility.final + characteristics.Dexterity.final) + (initiative.armorPenalty + initiative.weaponPenalty) + (class[x].initiativePerLevel * classes[x].level) + initiative.bonus + special
export function calculateFinalInitiative(system) {
    const baseIni = 20;
    const agilFinal = toNum(system.characteristics.Agility.final);
    const dexFinal = toNum(system.characteristics.Dexterity.final);
    const weaponMod = toNum(system.initiative.weaponPenalty);
    const armorMod = toNum(system.initiative.armorPenalty);
    const iniBonus = toNum(system.initiative.bonus);
    const specBonus = toNum(system.initiative.special);
    const totalInitiativeBonusForallClasses = (system.classes || [])
    .reduce((total, cls) => {
        const lvl = toNum(cls.level) || 0;
        const lppl = toNum(cls.initiativePerLevel) || 0;
        return total + lvl * lppl;
    }, 0);

    system.initiative.final = baseIni + agilFinal + dexFinal + weaponMod + armorMod + totalInitiativeBonusForallClasses + iniBonus + specBonus;
}