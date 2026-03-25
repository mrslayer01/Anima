import { AbilitiesPrimaryRule } from "./actor/abilities-primary.js";
import { AbilitiesSecondaryRule } from "./actor/abilities-secondary.js";
import { ArmorRule } from "./actor/armor.js";
import { CharactersiticsRule } from "./actor/characterstics.js";
import { FatigueRule } from "./actor/fatigue.js";
import { InitiativeRule } from "./actor/initiative.js";
import { KiRule } from "./actor/ki.js";
import { MysticRule } from "./actor/mystic.js";
import { LifePointsRule } from "./actor/life-points.js";
import { MovementRule } from "./actor/movement.js";
import { PresenceRule } from "./actor/presence.js";
import { ResistancesRule } from "./actor/resistances.js";
import { TotalLevelRule } from "./actor/total-level.js";
import { PsychicPointsRule } from "./actor/psychic-points.js";
import { ClassesRule } from "./actor/classes.js";
import { ExperienceRule } from "./actor/experience.js";
import { DevelopmentPointsRule } from "./actor/development-points.js";
import { ElanRule } from "./actor/elan.js";
import { GlobalModsRule } from "./actor/global-modifiers.js";
import { AdvantageRule } from "./actor/advantage-rule.js";
import { martialKnowledgeRule } from "./actor/martial-knowledge.js";

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
  new MysticRule(),
  new ArmorRule(),
  new PsychicPointsRule(),
  new ExperienceRule(),
  new DevelopmentPointsRule(),
  new martialKnowledgeRule(),
  new ElanRule()
];

export const MOD_RULES = [new ClassesRule(), new GlobalModsRule(), new AdvantageRule()];

export const FINAL_RULES = [
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
  new MysticRule(),
  new PsychicPointsRule(),
  new ExperienceRule(),
  new DevelopmentPointsRule(),
  new martialKnowledgeRule(),
  new ElanRule()
];
