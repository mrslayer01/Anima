// Used when needing to re calculate all items, characterstic change that affects all, etc.

import { CaclulateArmorDetails } from "./armor-calculations.js";
import { CalculateWeaponDetails } from "./weapon-calculations.js";

export function CalculateAllItems(actor) {
  CalculateWeaponDetails();
  CaclulateArmorDetails();
}
