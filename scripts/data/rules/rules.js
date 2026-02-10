import { AbilitiesPrimaryRule } from "./abilities-primary.js";
import { AbilitiesSecondaryRule } from "./abilities-secondary.js";
import { CharactersiticsRule } from "./characterstics.js";
import { LifePointsRule } from "./life-points.js";
import { PresenceRule } from "./presence.js";
import { ResistancesRule } from "./resistances.js";
import { TotalLevelRule } from "./total-level.js";

export const RULES = [
  new CharactersiticsRule(),
  new TotalLevelRule(),
  new PresenceRule(),
  new ResistancesRule(),
  new AbilitiesPrimaryRule(),
  new AbilitiesSecondaryRule(),
  new LifePointsRule()
];
