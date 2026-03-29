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

export function createMartialArt(modInput) {
  const {
    name = "",
    type = "",
    advantages = "",
    requirements = "",
    mk = 0,
    bonuses = "",
    cost = 0,
    description = "",
    journal = ""
  } = modInput;

  return {
    name,
    type,
    advantages,
    requirements,
    mk,
    bonuses,
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

export const ABF_MARTIAL_ARTS = {
  kempo: createMartialArt({
    name: "Kempo",
    type: "Martial Art",
    advantages:
      "The rapid flurry of blows allows a Kempo master to carry out additional attacks with a penalty of –10 to his ability instead of the usual –25. It has a Base Damage of 20, plus the character’s Strength bonus. Kempo uses the Blunt Table.",
    requirements: "None",
    mk: 10,
    bonuses: "None",
    cost: 50,
    description:
      "This is a freewheeling style of combat that uses combinations of strikes. The style uses rapid multiple attacks to try and find gaps in an opponent’s defenses."
  }),
  capoeira: createMartialArt({
    name: "Capoeira",
    type: "Martial Art",
    advantages:
      "When making an Area Attack, the user is treated as using a large weapon and can affect up to five opponents. Base Damage 20 + Strength bonus. Uses the Blunt Table.",
    requirements: "Dance 40",
    mk: 10,
    bonuses: "+10 to Dodge",
    cost: 50,
    description:
      "Capoeira appears chaotic and acrobatic, resembling a dance. Its sweeping leg movements allow wide, fluid attacks."
  }),

  taiChi: createMartialArt({
    name: "Tai Chi",
    type: "Martial Art",
    advantages:
      "Base Damage 20 + double the Power bonus. Attacks use the Blunt Table rather than the Energy Table.",
    requirements: "Use of Ki",
    mk: 30,
    bonuses: "None",
    cost: 50,
    description:
      "Tai Chi uses fluid, elegant movements and channels internal energy as a force multiplier."
  }),

  shotokan: createMartialArt({
    name: "Shotokan",
    type: "Martial Art",
    advantages: "Base Damage 30 + Strength bonus. Uses the Blunt Table.",
    requirements: "None",
    mk: 10,
    bonuses: "+10 to Attack (Unarmed)",
    cost: 50,
    description:
      "Shotokan focuses on powerful strikes aimed at weak points, designed to end fights with a single decisive blow."
  }),

  sambo: createMartialArt({
    name: "Sambo",
    type: "Martial Art",
    advantages:
      "Reduces penalties for Trapping, Area Attack, Take-Down, and Disarm by half. Base Damage 20 + Strength bonus. Uses the Blunt Table.",
    requirements: "None",
    mk: 10,
    bonuses: "+10 to Block (Unarmed)",
    cost: 50,
    description:
      "A precise, defensive style developed for military training, emphasizing control and disabling techniques."
  }),

  kungFu: createMartialArt({
    name: "Kung Fu",
    type: "Martial Art",
    advantages:
      "Each turn, choose +10 to Attack, Block, Dodge, Damage, or Initiative. Base Damage 20 + Strength bonus. Uses the Blunt Table.",
    requirements: "Acrobatics 40, Sleight of Hand 40, Style 20",
    mk: 10,
    bonuses: "Variable +10",
    cost: 50,
    description:
      "A versatile art inspired by animal movements, allowing practitioners to adapt fluidly to any combat situation."
  }),

  taekwondo: createMartialArt({
    name: "Taekwondo",
    type: "Martial Art",
    advantages:
      "Base Damage 20 + Strength bonus. Grants an extra leg attack at –20 after all other attacks. Uses the Blunt Table.",
    requirements: "None",
    mk: 10,
    bonuses: "None",
    cost: 50,
    description:
      "A leg-focused martial art ideal for combining with weapons, emphasizing powerful, precise kicks."
  }),

  aikido: createMartialArt({
    name: "Aikido",
    type: "Martial Art",
    advantages:
      "Damage 10 + Strength bonus. Counterattacks add twice the opponent’s Strength bonus (min +5). No penalties to Trapping during counterattacks.",
    requirements: "Sleight of Hand 40",
    mk: 10,
    bonuses: "+10 to Dodge or Block (Unarmed)",
    cost: 50,
    description:
      "A defensive art using an attacker’s strength against them, enabling effortless redirection and joint control."
  }),

  muayThai: createMartialArt({
    name: "Muay Thai",
    type: "Martial Art",
    advantages: "Base Damage 20 + triple Strength bonus. Uses the Blunt Table.",
    requirements: "Feats of Strength 40",
    mk: 10,
    bonuses: "None",
    cost: 50,
    description: "A brutal striking art using elbows, knees, and targeted blows to joints and ribs."
  }),

  grappling: createMartialArt({
    name: "Grappling",
    type: "Martial Art",
    advantages:
      "No penalties for Trapping or Take-Down. Base Damage 20 + Strength bonus. Uses the Blunt Table.",
    requirements: "Feats of Strength 40",
    mk: 10,
    bonuses: "None",
    cost: 50,
    description: "A close-quarters style focused on holds, throws, and ground control."
  }),

  melkaiah: createMartialArt({
    name: "Melkaiah",
    type: "Martial Art",
    advantages: "+3 to Strength or Dexterity checks for Take-Down or Trapping maneuvers.",
    requirements: "Grappling or Sambo, Inhumanity, 160+ Attack & Defense (Unarmed)",
    mk: 10,
    bonuses: "+10 to Attack (Unarmed)",
    cost: 50,
    description:
      "A superhuman grappling art said to make its practitioners unbeatable as long as they remain grounded."
  }),

  seraphite: createMartialArt({
    name: "Seraphite",
    type: "Martial Art",
    advantages:
      "+10 Final Damage to the base martial art. May gain +20 Attack in exchange for –30 Defense (declared before Initiative).",
    requirements: "Shotokan or Kempo, Presence Extrusion, 180+ Attack (Unarmed)",
    mk: 10,
    bonuses: "+20 to Attack (Unarmed)",
    cost: 50,
    description:
      "A dangerous demon-hunting style used by certain Church factions, trading safety for overwhelming offense."
  }),

  dumah: createMartialArt({
    name: "Dumah",
    type: "Martial Art",
    advantages:
      "+10 Final Damage. May use Thrust or Cut Tables. Reduces opponent’s AT by 2 and adds +10 Breakage.",
    requirements: "Kempo or Capoeira, Presence Extrusion",
    mk: 10,
    bonuses: "+20 to Attack (Unarmed)",
    cost: 50,
    description:
      "A tribal art teaching practitioners to strike like blades, cutting through armor and defenses."
  }),

  emp: createMartialArt({
    name: "Emp",
    type: "Martial Art",
    advantages: "No penalty to Disarm. +3 to Characteristic in Contested Checks.",
    requirements: "Kempo or Taekwondo, Mastery of Attack (Unarmed)",
    mk: 10,
    bonuses: "+20 to Attack (Unarmed), +10 to Initiative when using martial arts",
    cost: 50,
    description:
      "A spiraling, weapon-countering style designed to neutralize armed opponents quickly."
  }),

  enuth: createMartialArt({
    name: "Enuth",
    type: "Martial Art",
    advantages:
      "+20 to Critical Level when striking to knock out. May voluntarily reduce inflicted damage after rolling.",
    requirements: "Sambo or Shotokan, 160+ Attack & Defense (Unarmed)",
    mk: 10,
    bonuses: "+20 to Dodge and Block (Unarmed)",
    cost: 50,
    description:
      "A nonlethal elven martial art perfected to subdue even the resilient Duk’zarist without killing."
  }),

  shephon: createMartialArt({
    name: "Shephon",
    type: "Martial Art",
    advantages: "Total Defense bonus becomes +60.",
    requirements: "Aikido and Kung Fu, Ki Control, Mastery of Defense (Unarmed)",
    mk: 10,
    bonuses: "+20 to Dodge and Block (Unarmed)",
    cost: 50,
    description:
      "A supreme defensive art inspired by flowing water, capable of diverting nearly any attack."
  }),

  asakusen: createMartialArt({
    name: "Asakusen",
    type: "Martial Art",
    advantages:
      "Kung Fu’s +10 applies to ALL stats (Attack, Block, Dodge, Initiative, Damage) simultaneously while using martial arts. Gains an additional +10 to one chosen stat.",
    requirements: "Kung Fu, 160+ Attack & Defense (Unarmed)",
    mk: 10,
    bonuses: "As per Advantages",
    cost: 50,
    description: "A forbidden, lethal martial art from which many diluted Kung Fu schools descend."
  }),

  velez: createMartialArt({
    name: "Velez",
    type: "Martial Art",
    advantages: "Attacks use the Energy Table but can still be blocked normally.",
    requirements: "Tai Chi or Kung Fu, Presence Extrusion",
    mk: 20,
    bonuses: "+20 to Block or Dodge (Unarmed)",
    cost: 50,
    description:
      "A rare art that channels spiritual power into strikes capable of penetrating matter."
  }),

  selene: createMartialArt({
    name: "Selene",
    type: "Martial Art",
    advantages: "Doubles counterattack bonus when using Response Action to attack.",
    requirements: "Aikido, Mastery of Block or Dodge (Unarmed)",
    mk: 10,
    bonuses: "+20 to Dodge and Block (Unarmed)",
    cost: 50,
    description:
      "An ancient, subtle martial art traditionally practiced only by women, redirecting force with minimal motion."
  }),

  hakyoukuken: createMartialArt({
    name: "Hakyoukuken",
    type: "Martial Art",
    advantages: "+20 Final Damage. Soft armor loses 2 AT. +20 Critical Level vs organic beings.",
    requirements: "Shotokan or Muay Thai, Use of Necessary Energy, Mastery in Attack (Unarmed)",
    mk: 10,
    bonuses: "+20 to Initiative when using martial arts, +10 to Attack (Unarmed)",
    cost: 50,
    description:
      "A devastating, possibly nonhuman martial art that destroys opponents from within and emphasizes striking first."
  })
};
