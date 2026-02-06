import { header } from "./header.js";
import { navMain } from "./nav-main.js";
import { navSecondaries } from "./secondaries.js";

export function loadAllActorPartials() {
  //header
  header();

  //nav
  navMain();
  navSecondaries();

}
