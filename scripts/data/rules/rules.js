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
import { ExperienceRule } from "./experience.js";
import { DevelopmentPointsRule } from "./development-points.js";
import { ElanRule } from "./elan.js";
import { GlobalModsRule } from "./global-modifiers.js";

export const INIT_RULES = [
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
  new ExperienceRule(),
  new DevelopmentPointsRule(),
  new ElanRule()
];

export const MOD_RULES = [new ClassesRule(), new GlobalModsRule()];

export const FINAL_RULES = [
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
  new PsychicPointsRule(),
  new ExperienceRule(),
  new DevelopmentPointsRule(),
  new ElanRule()
];
