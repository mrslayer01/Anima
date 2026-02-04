import { detectChangedCharacteristics } from "../derived/derived-characteristics.js";
import { detectChangedAbilities } from "../derived/derived-abilities.js";
import { updateDP } from "./update-dp.js";

import { DEPENDENCIES } from "./dependency-map.js";
import { detectChangedResistances } from "./detect-changed-resistances.js";
import { updateResistances } from "./update-resistances.js";
import { updatePresence } from "./update-presence.js";


export async function updateCalculations(data, oldSystem, actor) {
  const expanded = foundry.utils.expandObject(data);
    //Presence
  const presenceChanged =
    expanded.system?.level !== undefined ||
    expanded.system?.presence?.bonus !== undefined;

  if (presenceChanged) {
    await updatePresence(actor);
  }

  
  //Resistances
  const changedRes = detectChangedResistances(data, oldSystem);

  // Store direct changes
  actor._changedResistances = changedRes;

  // Dependency propagation
  for (const trigger of DEPENDENCIES.resistances.triggers) {
    if (pathChanged(data, trigger)) {
      actor._changedResistances = DEPENDENCIES.resistances.recalc(actor);
    }
  }

  // Perform persistent update
  if (actor._changedResistances?.length) {
    await updateResistances(actor, actor._changedResistances);
  }



  //Chacteristics
  const changedChars = detectChangedCharacteristics(data, oldSystem);
  actor._changedCharacteristics = changedChars;

  //Abilities
  const changedAbility = detectChangedAbilities(data, oldSystem);
  actor._changedAbilities = changedAbility;

  return {
    characteristics: changedChars,
    resistances: actor._changedResistances,
    abilities: changedAbility
  };
}

function pathChanged(data, path) {
  const expanded = foundry.utils.expandObject(data);
  return foundry.utils.getProperty(expanded, path) !== undefined;
}
