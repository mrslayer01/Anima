import { header } from "./header.js";
import { navMain } from "./nav-main.js";
import { navSecondaries } from "./secondaries.js";

export function loadAllPartials() {
  //header
  header();

  //nav
  navMain();
  navSecondaries();

}
