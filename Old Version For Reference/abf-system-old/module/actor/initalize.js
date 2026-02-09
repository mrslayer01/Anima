import { initializeAllResistances } from "./classes/resistances.js";
import { initializeAllAbilities } from "./classes/abilities.js";
import { initalizePresence } from "./classes/presence.js";

export function initializeActor(actor) {
  const system = actor.system;

  initializeAllAbilities(system);
  initializeAllResistances(system);
  initalizePresence(system);

  // Clear the flag
  delete actor._initialize;

  console.log("initalize");
}
