import { toNum } from "../helpers/lookup.js";

export function calculateGlobalModifiers(system) {
  const faitguePenalty = calculateFatiguePenalties(system);

  //calculate final values
  const actionSpecial = toNum(system.globalModifier.actions.special);
  system.globalModifier.actions.final = faitguePenalty + actionSpecial;

  //Apply penalties
  //#region Actions
  //Primary abilities
  for (const [name, data] of Object.entries(system.abilities.Primaries.Combat || {})) {
    if (name === "WearArmor") continue;
    data.special = toNum(system.globalModifier.actions.final);
  }
  //#endregion
}

function calculateFatiguePenalties(system) {
  return toNum(system.fatigue.actionPenalty);
}
