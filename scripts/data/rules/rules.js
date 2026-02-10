import { AbilitiesPrimaryRule } from "./abilities-primary.js";
import { AbilitiesSecondaryRule } from "./abilities-secondary.js";
import { ArmorRule } from "./armor.js";
import { CharactersiticsRule } from "./characterstics.js";
import { FatigueRule } from "./fatigue.js";
import { InitiativeRule } from "./initiative.js";
import { KiRule } from "./ki.js";
import { ZeonRule } from "./zeon.js";
import { LifePointsRule } from "./life-points.js";
import { MovementRule } from "./movement.js";
import { PresenceRule } from "./presence.js";
import { ResistancesRule } from "./resistances.js";
import { TotalLevelRule } from "./total-level.js";
import { PsychicPointsRule } from "./psychic-points.js";
import { ClassesRule } from "./classes.js";

export const RULES = [
  new CharactersiticsRule(),
  new TotalLevelRule(),
  new PresenceRule(),
  new ResistancesRule(),
  new AbilitiesPrimaryRule(),
  new AbilitiesSecondaryRule(),
  new LifePointsRule(),
  new FatigueRule(),
  new InitiativeRule(),
  new MovementRule(),
  new KiRule(),
  new ZeonRule(),
  new ArmorRule(),
  new PsychicPointsRule(),
  new ClassesRule()
];
