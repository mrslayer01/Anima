import { InitializeAbilitiesPartials } from "./actor-partials/abilities-partials.js";
import { InitializeCombatPartials } from "./actor-partials/combat-partials.js";
import { InitializeHeaderPartials } from "./actor-partials/header-partials.js";
import { InitializeMysticPartials } from "./actor-partials/mystic-partials.js";
import { InitializeNavMainPartials } from "./actor-partials/nav-main-partials.js";

export function InitalizeAllActorPartials() {
  InitializeHeaderPartials();
  InitializeAbilitiesPartials();
  InitializeNavMainPartials();
  InitializeCombatPartials();
  InitializeMysticPartials();
}
