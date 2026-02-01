import { detectChangedCharacteristics } from "../derived/derived-characteristics.js";
import { detectChangedResistances } from "../derived/derived-resistance.js";
import { detectChangedAbilities } from "../derived/derived-abilities.js";

export function updateCalculations(data, oldSystem, actor) {
  //Chacteristics
  const changedChars = detectChangedCharacteristics(data, oldSystem);
  actor._changedCharacteristics = changedChars;

  //Resistances
  const changedRes = detectChangedResistances(data, oldSystem);
  actor._changedResistances = changedRes;

  //Abilities
  const changedAbility = detectChangedAbilities(data, oldSystem);
  actor._changedAbilities = changedAbility;

  return {
    characteristics: changedChars,
    resistances: changedRes,
    abilities: changedAbility
  };
}
