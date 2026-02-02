export function calculateCharacterSize(system) {
    const strCon = Number(system.characteristics.Strength.base + system.characteristics.Constitution.base) || 0;
    system.aspects.size.final = strCon;
}