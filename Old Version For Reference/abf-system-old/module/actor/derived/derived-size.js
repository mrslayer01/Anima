import { toNum } from "../helpers/lookup.js";

export function calculateCharacterSize(system) {
    const strCon = toNum(system.characteristics.Strength.base) + toNum(system.characteristics.Constitution.base) || 0;
    system.aspects.size.final = strCon;
}