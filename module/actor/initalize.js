import { initializeAllResistances } from "./classes/resistances.js";
import { initalizePresence } from "./classes/presence.js";
import { initializeAllCharacteristics } from "./classes/characteristics.js";
import { initializeAllAbilities } from "./classes/abilities.js";

export function initializeActor(actor) {
  const system = actor.system;

  // Characteristics
  initializeAllCharacteristics(system);

  // Presence
  initalizePresence(system);

  // Resistances
  initializeAllResistances(system);

  // Abilities
  initializeAllAbilities(system);

  // Clear the flag
  delete actor._initialize;
}