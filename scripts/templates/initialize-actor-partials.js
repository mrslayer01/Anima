import { InitializeAbilitiesPartials } from "./actor-partials/abilities-partials.js";
import { InitializeHeaderPartials } from "./actor-partials/header-partials.js";
import { InitializeNavMainPartials } from "./actor-partials/nav-main-partials.js";

export function InitalizeAllActorPartials() {
  InitializeHeaderPartials();
  InitializeAbilitiesPartials();
  InitializeNavMainPartials();
}
