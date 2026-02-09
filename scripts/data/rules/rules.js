import { CharactersiticsRule } from "./characterstics.js";
import { PresenceRule } from "./presence.js";
import { ResistancesRule } from "./resistances.js";
import { TotalLevelRule } from "./total-level.js";

export const RULES = [
  new CharactersiticsRule(),
  new TotalLevelRule(),
  new PresenceRule(),
  new ResistancesRule()
];
