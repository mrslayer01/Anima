import { toNum } from "../actor/lookup.js";
import { initializeAllResistances } from "./derived/derived-resistance.js";

export function initializeActor(actor) {
  const system = actor.system;

  // Presence
  const lvl = toNum(system.level) || 0;
  const bonus = toNum(system.presence.bonus);

  system.presence.final =
    lvl === 0 ? 20 + bonus : 25 + (lvl * 5) + bonus;

  // Characteristics
 // initializeAllCharacteristicFinals(system);

  // Resistances
  initializeAllResistances(system);

  // Abilities
  //initializeAllAbilities(system);

  // Clear the flag
  delete actor._initialize;
}