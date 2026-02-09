import { header } from "./header.js";
import { navMain } from "./nav-main.js";
import { navAbilities } from "./abilities.js";

export function loadAllActorPartials() {
  //header
  header();

  //nav
  navMain();
  navAbilities();
}
