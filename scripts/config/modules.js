export function createModule(modInput) {
  const { name = "", type = "", effects = "", cost = 0, description = "", journal = "" } = modInput;

  return {
    name,
    type,
    effects,
    cost,
    description,
    journal
  };
}

export const ABF_MODULES = {
  similarWeapon: createModule({
    name: "Similar Weapon",
    type: "General Weapon",
    effects:
      "Gives the character the ability to use an additional weapon of the same class as one the character already knows.",
    cost: 10,
    description: "The character knows how to use two similar weapons.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.7KMCjs2SY1gmd6Nb"
  }),

  mixedClassWeapon: createModule({
    name: "Mixed-Class Weapon",
    type: "General Weapon",
    effects:
      "Allows the character to use an additional weapon that shares at least one class with a weapon they already know.",
    cost: 15,
    description: "The character is trained in two weapons that share at least one class.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.CYmKnQL9My7KgLIx"
  }),

  differentTypeWeapon: createModule({
    name: "Different Type / Unarmed",
    type: "General Weapon",
    effects: "Allows the character to use a weapon of a class with which they are not familiar.",
    cost: 20,
    description: "The character can use two very different weapons, including unfamiliar classes.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.Mn2N7O3OoFc77Ctc"
  }),

  wholeClassWeapons: createModule({
    name: "Whole-Class Weapons",
    type: "General Weapon",
    effects:
      "Allows the character to use any weapon of a chosen class without applying penalties to Combat Abilities.",
    cost: 50,
    description:
      "The character masters all weapons of a chosen class (pure or mixed). For example, mastery of Swords includes all swords but not mixed-class weapons like the Bastard Sword.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.Mn2N7O3OoFc77Ctc"
  }),

  projectileWeapons: createModule({
    name: "Projectile Weapons",
    type: "General Weapon",
    effects: "Allows the character to use any projectile weapon using the same Attack Ability.",
    cost: 50,
    description:
      "The character is trained in all projectile weapons, using a unified Attack Ability.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.i5flSSSJNie2kjhH"
  }),

  throwing: createModule({
    name: "Throwing",
    type: "General Weapon",
    effects: "Allows the character to throw any object or weapon using the same Attack Ability.",
    cost: 50,
    description:
      "The character gains skill at throwing all sorts of items. This does not grant the ability to use weapons with the Throwable rule — only to throw them effectively.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.TfcWf0AswKymjcFK"
  }),

  improvisedWeapons: createModule({
    name: "Improvised Weapons",
    type: "General Weapon",
    effects: "Allows the character to use any type of object as an improvised weapon.",
    cost: 50,
    description:
      "The character is adept at turning everyday objects into effective improvised weapons.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.puc5tTBsHm02zKl3"
  }),
  // Archetypes
  barbarianModule: createModule({
    name: "Barbarian Weapons",
    type: "Archetypical Weapons",
    effects:
      "Awards skill in War Axe, Battle Axe, Two‑handed Sword, Bastard Sword, and Heavy Battle Mace.",
    cost: 50,
    description:
      "These big, powerful weapons are often used by individuals with fierce and barbaric fighting styles.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.Vd4WlMqXFc7dPg4N"
  }),

  ninjaModule: createModule({
    name: "Ninja Weapons",
    type: "Archetypical Weapons",
    effects: "Awards skill in Katana, Tanto, Claws, Shuriken, and Kusari‑gama.",
    cost: 50,
    description: "These exotic weapons were used by oriental assassins.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.l4DvrX0wpU8dkDTb"
  }),

  duelModule: createModule({
    name: "Duelist Weapons",
    type: "Archetypical Weapons",
    effects: "Awards skill in Rapier, Foil, Parrying Dagger, Saber, and Long Sword.",
    cost: 50,
    description: "These weapons are used by swordsmen and fencing masters.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.bSiixELu5ZwVOG3l"
  }),

  pirateModule: createModule({
    name: "Pirate Weapons",
    type: "Archetypical Weapons",
    effects: "Awards skill in Harpoon, Gladiator’s Net, Hook, Saber, and Handaxe.",
    cost: 50,
    description: "These are the weapons most used by sailors.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.nom9rr6wz5RMdKl1"
  }),

  nomadModule: createModule({
    name: "Nomad Weapons",
    type: "Archetypical Weapons",
    effects: "Awards skill in Dagger, Chakram, Long Bow, Scimitar, and Lance.",
    cost: 50,
    description: "These weapons were used by warriors raised in the desert.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.5PtCus071w3wyKQX"
  }),

  huntModule: createModule({
    name: "Hunter Weapons",
    type: "Archetypical Weapons",
    effects: "Awards skill in Javelin, Bow, Short Sword, Lance, and Bolos.",
    cost: 50,
    description:
      "These weapons are used by fighters expert in subterfuge who rely on light, often projectile weapons.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.C7Ze3fY9anktfOfO"
  }),

  knightModule: createModule({
    name: "Knight Weapons",
    type: "Archetypical Weapons",
    effects: "Awards skill in Long Sword, Cavalry Lance, Mace, Bastard Sword, and Shield.",
    cost: 50,
    description: "These weapons are used by orthodox warriors who fight on foot or from horseback.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.X1U7quETE2wmDicf"
  }),

  gladiatorModule: createModule({
    name: "Gladiator Weapons",
    type: "Archetypical Weapons",
    effects: "Awards skill in Short Sword, Gladiator’s Net, Buckler, Trident, and Whip.",
    cost: 50,
    description: "These exotic and showy weapons are used by fighters in circuses and arenas.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.S4dq1LDlj8awERjp"
  }),

  assassinModule: createModule({
    name: "Assassin Weapons",
    type: "Archetypical Weapons",
    effects: "Awards skill in Short Sword, Miniature Crossbow, Club, Blowgun, and Stiletto.",
    cost: 50,
    description:
      "These precise, deadly, and easy‑to‑hide weapons were often used by dark fighters.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.VkMyujQZD9R1AyjP"
  }),

  soldierModule: createModule({
    name: "Soldier Weapons",
    type: "Archetypical Weapons",
    effects: "Awards skill in Crossbow, Long Sword, Halberd, Lance, and Shield.",
    cost: 50,
    description: "These are the weapons traditionally taught to regular soldiers in most armies.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.uOG45OMHIhTHHsbp"
  }),

  indigenousModule: createModule({
    name: "Indigenous Weapons",
    type: "Archetypical Weapons",
    effects: "Awards skill in Javelin, Lance, Full Shield, Bow, and Blowgun.",
    cost: 50,
    description:
      "This is the combat equipment traditionally used by indigenous tribes of little sophistication.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.On9yUV4dZy4caXZm"
  }),

  banditModule: createModule({
    name: "Bandit Weapons",
    type: "Archetypical Weapons",
    effects: "Awards skill in Dagger, Crossbow, Short Sword, Mace, and Club.",
    cost: 50,
    description:
      "These simple but menacing weapons are used by warriors who specialize in theft and robbery.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.4R1Cf8bFmxrb3h2f"
  }),
  //Style
  battojutsu: createModule({
    name: "Battojutsu / Iaijutsu",
    type: "Style",
    effects:
      "The character can unsheathe his weapon without applying the –25 penalty to Attack or Block. This ability has no effect when using two‑handed weapons.",
    cost: 30,
    description: "This skill permits a character to unsheathe his weapon with perfect ease.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.XJPYIpYR9T48FE2f"
  }),

  areaAttack: createModule({
    name: "Area Attack",
    type: "Style",
    effects:
      "Reduces the penalty for an Area Attack maneuver by half, resulting in a –25 penalty to Attack when performing an Area Attack.",
    cost: 40,
    description:
      "The character specializes in broad maneuvers capable of striking multiple enemies more effectively.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.Tff5O3YzyzSsfIFj"
  }),

  precisionAttack: createModule({
    name: "Precision Attack",
    type: "Style",
    effects:
      "Reduces the penalty for a Put at Weapon’s Point maneuver by half, resulting in a –50 penalty to Attack when performing this maneuver.",
    cost: 50,
    description:
      "The character has a marked ability to place an adversary in a Menace Position with great accuracy.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.fQyi2nhHfvel1Z7h"
  }),

  disarmingAttack: createModule({
    name: "Disarming Attack",
    type: "Style",
    effects: "Reduces the penalty for a Disarm maneuver to –20.",
    cost: 40,
    description:
      "A character with this ability has specialized in disarming opponents with practiced efficiency.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.g58iSzRQSwrIfLQd"
  }),

  // Mystical
  magicProjectionAttack: createModule({
    name: "Magic Projection as an Attack",
    type: "Mystical",
    effects:
      "Allows the character to use their Attack ability when performing offensive Magic Projection. Only the base Attack ability is used, not innate improvements from combat classes. Cannot be used to launch passive or defensive spells.",
    cost: 75,
    description:
      "This represents a character’s fusion of combat knowledge with the ability to direct spells offensively, treating them like true martial weapons.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.eVoyd5s00XLkdsKw"
  }),

  magicProjectionDefense: createModule({
    name: "Magic Projection as a Defense",
    type: "Mystical",
    effects:
      "Allows the character to use their Defense ability as defensive Magic Projection. Only the base Defense ability is used, not innate improvements from class bonuses. Cannot be used to direct offensive spells.",
    cost: 75,
    description:
      "The character uses defensive knowledge to project passive and shielding spells as though they were weapons or armor intercepting enemy attacks.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.T85hkSjYsDJGPyLf"
  }),
  // Psychic
  psychicProjectionModule: createModule({
    name: "Psychic Projection Module",
    type: "Psychic",
    effects:
      "Allows the character to use their Combat Abilities as Psychic Projection. Offensive Combat Ability is used to attack, and Defensive Combat Ability is used to raise psychic shields. Only the base ability is used, not innate improvements granted by classes.",
    cost: 100,
    description:
      "The character uses their Combat Abilities to project mental powers as if they were actual weapons.",
    journal:
      "Compendium.abf-system.abf-journals.JournalEntry.Y9yqs1iaiNlTSfOO.JournalEntryPage.uCBnvaE0E62wxvOt"
  })
};
