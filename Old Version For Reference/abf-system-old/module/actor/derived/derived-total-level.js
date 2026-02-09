import { toNum } from "../helpers/lookup.js";

export function calculateTotalLevel(system) {
  system.level = (system.classes || []).reduce((total, cls) => total + (toNum(cls.level) || 0), 0);
}
