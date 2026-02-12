// module/config/classes.js
//#region Scehma and Validation
const CLASS_SCHEMA = {
  name: "string",
  level: "number",
  archetype: "string",
  description: "string",

  lifePointMultiple: "number",
  lifePointsPerLevel: "number",

  initiativePerLevel: "number",

  martialKnowledgePerLevel: "number",

  psychicPointsPerLevel: "number",
  psychicPointsInterval: "number",

  abilityLimits: {
    Combat: "number",
    Supernatural: "number",
    Psychic: "number"
  },

  primaryAbilityCosts: {
    Attack: "number",
    Block: "number",
    Dodge: "number",
    WearArmor: "number",
    Ki: "number",
    KiAccumulation: "number"
  },

  supernaturalAbilityCosts: {
    Zeon: "number",
    MagicProjection: "number",
    Summon: "number",
    Control: "number",
    Bind: "number",
    Banish: "number"
  },

  psychicAbilityCosts: {
    PsychicPoints: "number",
    PsychicProjection: "number"
  },

  secondaryAbilityCosts: {
    Athletics: "number",
    Social: "number",
    Perception: "number",
    Intellectual: "number",
    Vigor: "number",
    Subterfuge: "number",
    Creative: "number"
  },

  innateBonuses: {
    primaryAbilities: [{ name: "string", innateBonus: "number" }],
    secondaryAbilities: [{ name: "string", innateBonus: "number", reducedCost: "number" }]
  },

  specialRules: "string"
};

//Validator
function validateField(value, schema, path) {
  if (typeof schema === "string") {
    if (typeof value !== schema) {
      throw new Error(`ABF Class Error: "${path}" must be type ${schema}, got ${typeof value}`);
    }
    return;
  }

  if (Array.isArray(schema)) {
    if (!Array.isArray(value)) {
      throw new Error(`ABF Class Error: "${path}" must be an array`);
    }

    const elementSchema = schema[0];
    value.forEach((element, index) => {
      validateField(element, elementSchema, `${path}[${index}]`);
    });
    return;
  }

  if (typeof value !== "object" || value === null) {
    throw new Error(`ABF Class Error: "${path}" must be an object`);
  }

  for (const key of Object.keys(schema)) {
    if (!(key in value)) {
      throw new Error(`ABF Class Error: Missing field "${path}.${key}"`);
    }
    validateField(value[key], schema[key], `${path}.${key}`);
  }
}

// Validate wrapper
function validateClassInput(input) {
  for (const key of Object.keys(CLASS_SCHEMA)) {
    if (!(key in input)) {
      throw new Error(`ABF Class Error: Missing required field "${key}"`);
    }
    validateField(input[key], CLASS_SCHEMA[key], key);
  }
}
//#endregion

export function createClass(classInput) {
  validateClassInput(classInput);

  const {
    name = "",
    level = 0,
    archetype = "",
    description = "",
    lifePointMultiple = 0,
    lifePointsPerLevel = 0,
    initiativePerLevel = 0,
    martialKnowledgePerLevel = 0,
    psychicPointsPerLevel = 0,
    psychicPointsInterval = 0,
    abilityLimits,
    primaryAbilityCosts,
    supernaturalAbilityCosts,
    psychicAbilityCosts,
    secondaryAbilityCosts,
    innateBonuses,
    specialRules,
    journalEntry
  } = classInput;

  return {
    name,
    level,
    archetype,
    description,

    lifePointMultiple,
    lifePointsPerLevel,

    initiativePerLevel,

    martialKnowledgePerLevel,

    psychicPointsPerLevel,
    psychicPointsInterval,

    abilityLimits,
    primaryAbilityCosts,
    supernaturalAbilityCosts,
    psychicAbilityCosts,
    secondaryAbilityCosts,
    innateBonuses,
    specialRules,
    journalEntry
  };
}

// Class Definitions
export const ABF_CLASSES = {
  Warrior: createClass({
    name: "Warrior",
    level: 1,
    archetype: "Fighter",
    description:
      "The Warrior is the virtual embodiment of the Fighter Archetype. This class covers those who have completely dedicated their lives to combat, and it includes those who are best able to fully exploit their warlike talents. This inclination leads them not only to master the use of weapons, but also to use their spiritual energy in a fight. Warriors find it easy to develop great knowledge in the field of military tactics and become leaders of armies. Traditionally, Warriors can end up in a wide variety of occupations, from mere mercenaries to sworn knights.",

    lifePointMultiple: 15,
    lifePointsPerLevel: 15,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 25,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 60,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 2,
      Dodge: 2,
      WearArmor: 2,
      Ki: 2,
      KiAccumulation: 20
    },

    supernaturalAbilityCosts: {
      Zeon: 3,
      MagicProjection: 3,
      MAMultiple: 70,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 3,
      Vigor: 2,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [
        { name: "Attack", innateBonus: 5 },
        { name: "Block", innateBonus: 5 },
        { name: "Wear Armor", innateBonus: 5 }
      ],
      secondaryAbilities: [{ name: "Feats of Strength", innateBonus: 5, reducedCost: 1 }]
    },

    specialRules: "",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.knnY8J4MdoHon4g9"
  }),
  AcrobaticWarrior: createClass({
    name: "Acrobatic Warrior",
    level: 1,
    archetype: "Fighter",
    description:
      "Acrobatic Warriors are Fighters who have specialized in getting the biggest advantage out of their speed and agility. Their greatest benefit lies in being a step ahead of their adversaries and trying to finish them off before they can react. They also prefer to dodge attacks, often standing as far as possible from where their enemy’s blows actually land. They possess excellent mobility, and they can jump, fall, or run with a fleetness that few can match. Acrobatic Warriors can play almost any role in society, but they generally gravitate toward professions associated with combat – such as duelists or swordsmen.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 10,

    initiativePerLevel: 10,

    martialKnowledgePerLevel: 25,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 60,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 3,
      Dodge: 2,
      WearArmor: 2,
      Ki: 2,
      KiAccumulation: 20
    },

    supernaturalAbilityCosts: {
      Zeon: 3,
      MagicProjection: 3,
      MAMultiple: 70,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 3,
      Vigor: 2,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [
        { name: "Attack", innateBonus: 5 },
        { name: "Dodge", innateBonus: 5 }
      ],
      secondaryAbilities: [
        { name: "Acrobatics", innateBonus: 10, reducedCost: 0 },
        { name: "Jump", innateBonus: 10, reducedCost: 0 },
        { name: "Athleticism", innateBonus: 10, reducedCost: 0 },
        { name: "Sleight of Hand", innateBonus: 10, reducedCost: 0 },
        { name: "Style", innateBonus: 10, reducedCost: 0 }
      ]
    },

    specialRules: "",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.hkcWN4lc3AQZQsvN"
  }),
  Paladin: createClass({
    name: "Paladin",
    level: 1,
    archetype: "Fighter",
    description:
      "Paladins are Fighters who are very oriented toward defensive fighting, and also make use of certain mystical capabilities. One of their specialties is that of banishing supernatural beings using their own natural powers. Generally, they guide themselves by codes of conduct based on a religious belief or their own sense of honor—though this is not obligatory. They are natural leaders, capable of using their charisma to mobilize a great number of people who may even be willing to give their lives in their service.",

    lifePointMultiple: 15,
    lifePointsPerLevel: 15,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 20,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 60,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 2,
      Dodge: 2,
      WearArmor: 2,
      Ki: 2,
      KiAccumulation: 20
    },

    supernaturalAbilityCosts: {
      Zeon: 2,
      MagicProjection: 3,
      MAMultiple: 60,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 1
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 1,
      Perception: 2,
      Intellectual: 2,
      Vigor: 2,
      Subterfuge: 3,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [
        { name: "Block", innateBonus: 5 },
        { name: "Wear Armor", innateBonus: 10 },
        { name: "Banish", innateBonus: 10 },
        { name: "Zeon", innateBonus: 20 }
      ],
      secondaryAbilities: [
        { name: "Leadership", innateBonus: 10, reducedCost: 0 },
        { name: "Withstand Pain", innateBonus: 10, reducedCost: 1 },
        { name: "Style", innateBonus: 5, reducedCost: 0 }
      ]
    },

    specialRules:
      "If the Paladin chooses not to develop supernatural abilities, they may exchange the +10 Banish and +20 Zeon bonuses for +10 Composure per level.",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.ihbxBD0PiK7HHtac"
  }),
  PaladinAlt: createClass({
    name: "Paladin",
    level: 1,
    archetype: "Fighter",
    description:
      "Paladins are Fighters who are very oriented toward defensive fighting, and also make use of certain mystical capabilities. One of their specialties is that of banishing supernatural beings using their own natural powers. Generally, they guide themselves by codes of conduct based on a religious belief or their own sense of honor—though this is not obligatory. They are natural leaders, capable of using their charisma to mobilize a great number of people who may even be willing to give their lives in their service.",

    lifePointMultiple: 15,
    lifePointsPerLevel: 15,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 20,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 60,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 2,
      Dodge: 2,
      WearArmor: 2,
      Ki: 2,
      KiAccumulation: 20
    },

    supernaturalAbilityCosts: {
      Zeon: 2,
      MagicProjection: 3,
      MAMultiple: 60,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 1
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 1,
      Perception: 2,
      Intellectual: 2,
      Vigor: 2,
      Subterfuge: 3,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [
        { name: "Block", innateBonus: 5 },
        { name: "Wear Armor", innateBonus: 10 }
      ],
      secondaryAbilities: [
        { name: "Leadership", innateBonus: 10, reducedCost: 0 },
        { name: "Withstand Pain", innateBonus: 10, reducedCost: 1 },
        { name: "Style", innateBonus: 5, reducedCost: 0 },
        { name: "Composure", innateBonus: 10, reducedCost: 0 }
      ]
    },

    specialRules:
      "If the Paladin chooses not to develop supernatural abilities, they may exchange the +10 Banish and +20 Zeon bonuses for +10 Composure per level.",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.ihbxBD0PiK7HHtac"
  }),
  DarkPaladin: createClass({
    name: "Dark Paladin",
    level: 1,
    archetype: "Fighter",
    description:
      "In some ways, this class is the polar opposite of the Paladin. Dark Paladins are Fighters who specialize in offense, but who also use some limited mystical abilities. A Dark Paladin’s most important power is the control of supernatural beings who, once they submit to his will, are used to his own benefit. Dark Paladins have a real gift for command, but they employ intimidation and fear to bend others to their wishes. If that doesn’t work, they will use persuasion to get what they want.",

    lifePointMultiple: 15,
    lifePointsPerLevel: 15,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 20,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 60,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 2,
      Dodge: 2,
      WearArmor: 2,
      Ki: 2,
      KiAccumulation: 20
    },

    supernaturalAbilityCosts: {
      Zeon: 2,
      MagicProjection: 3,
      MAMultiple: 60,
      Summon: 3,
      Control: 1,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 1,
      Perception: 2,
      Intellectual: 2,
      Vigor: 2,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [
        { name: "Attack", innateBonus: 5 },
        { name: "Wear Armor", innateBonus: 5 },
        { name: "Control", innateBonus: 10 },
        { name: "Zeon", innateBonus: 20 }
      ],
      secondaryAbilities: [
        { name: "Intimidate", innateBonus: 10, reducedCost: 0 },
        { name: "Composure", innateBonus: 10, reducedCost: 1 },
        { name: "Style", innateBonus: 5, reducedCost: 0 },
        { name: "Persuasion", innateBonus: 5, reducedCost: 0 }
      ]
    },

    specialRules:
      "If the Dark Paladin chooses not to develop supernatural abilities, they may exchange the +10 Control and +20 Zeon bonuses for +10 Withstand Pain per level.",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.AgT4p02U4NofkUZJ"
  }),
  DarkPaladinAlt: createClass({
    name: "Dark Paladin",
    level: 1,
    archetype: "Fighter",
    description:
      "In some ways, this class is the polar opposite of the Paladin. Dark Paladins are Fighters who specialize in offense, but who also use some limited mystical abilities. A Dark Paladin’s most important power is the control of supernatural beings who, once they submit to his will, are used to his own benefit. Dark Paladins have a real gift for command, but they employ intimidation and fear to bend others to their wishes. If that doesn’t work, they will use persuasion to get what they want.",

    lifePointMultiple: 15,
    lifePointsPerLevel: 15,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 20,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 60,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 2,
      Dodge: 2,
      WearArmor: 2,
      Ki: 2,
      KiAccumulation: 20
    },

    supernaturalAbilityCosts: {
      Zeon: 2,
      MagicProjection: 3,
      MAMultiple: 60,
      Summon: 3,
      Control: 1,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 1,
      Perception: 2,
      Intellectual: 2,
      Vigor: 2,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [
        { name: "Attack", innateBonus: 5 },
        { name: "Wear Armor", innateBonus: 5 }
      ],
      secondaryAbilities: [
        { name: "Intimidate", innateBonus: 10, reducedCost: 0 },
        { name: "Composure", innateBonus: 10, reducedCost: 1 },
        { name: "Style", innateBonus: 5, reducedCost: 0 },
        { name: "Persuasion", innateBonus: 5, reducedCost: 0 },
        { name: "Withstand Pain", innateBonus: 10, reducedCost: 0 }
      ]
    },

    specialRules:
      "If the Dark Paladin chooses not to develop supernatural abilities, they may exchange the +10 Control and +20 Zeon bonuses for +10 Withstand Pain per level.",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.AgT4p02U4NofkUZJ"
  }),
  Weaponsmaster: createClass({
    name: "Weaponsmaster",
    level: 1,
    archetype: "Fighter",
    description:
      "These are Fighters who have dedicated themselves to perfecting their skill in armed combat. They are born warriors who have taken their combat skills to limits not reached by any other class. Unlike many other Fighters, they disdain the use of anything but their abilities with weapons in combat. In a fight, they ignore physical energies and everything else except pure weapons skill. This does nothing to detract from their status as the most able of all Fighters and the most strictly devoted to true martial expertise. The great majority of knights and mercenaries are of this class.",

    lifePointMultiple: 10,
    lifePointsPerLevel: 20,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 10,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 60,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 2,
      Dodge: 2,
      WearArmor: 1,
      Ki: 3,
      KiAccumulation: 30
    },

    supernaturalAbilityCosts: {
      Zeon: 3,
      MagicProjection: 3,
      MAMultiple: 70,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 3,
      Vigor: 1,
      Subterfuge: 3,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [
        { name: "Attack", innateBonus: 5 },
        { name: "Block", innateBonus: 5 },
        { name: "Wear Armor", innateBonus: 10 }
      ],
      secondaryAbilities: [{ name: "Feats of Strength", innateBonus: 5, reducedCost: 1 }]
    },

    specialRules:
      "General Weapon Modules, Archetypical Weapon Modules, and Style Modules cost half DP.",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.AuAxRohri2AbkpMi"
  }),
  Technician: createClass({
    name: "Technician",
    level: 1,
    archetype: "Domine",
    description:
      "A Technician is an expert at using Ki abilities. He has deeply explored the secrets of the body and soul, developing abilities that would be impossible for the normal person. Technicians can sometimes take years to realize the full potential of their abilities, but when they do, they become persons of formidable power. Though they do not have great gifts for combat, when they use their Ki control against an adversary, they can unleash inhuman techniques easily.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 5,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 50,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 60,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 2,
      Dodge: 2,
      WearArmor: 2,
      Ki: 1,
      KiAccumulation: 10
    },

    supernaturalAbilityCosts: {
      Zeon: 3,
      MagicProjection: 3,
      MAMultiple: 70,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 3,
      Vigor: 2,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [{ name: "Attack", innateBonus: 5 }],
      secondaryAbilities: []
    },

    specialRules: "",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.2dPCnpwOvsiqeOXs"
  }),
  Tao: createClass({
    name: "Tao",
    level: 1,
    archetype: "Fighter, Domine",
    description:
      "Tao are martial artists who specialize in unarmed combat, though nothing prevents Tao from employing any type of weapon. Dedicated to gathering all the martial knowledge they can, these characters always seek to develop new and unique fighting techniques. Their training permits them to quickly learn any martial arts style they choose, taking from them the elements that help them become better fighters. When the moment comes, Tao also use their internal energies to maximum advantage to overcome heavily armed enemies.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 10,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 30,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 60,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 2,
      Dodge: 2,
      WearArmor: 2,
      Ki: 2,
      KiAccumulation: 15
    },

    supernaturalAbilityCosts: {
      Zeon: 3,
      MagicProjection: 3,
      MAMultiple: 70,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 3,
      Vigor: 2,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [],
      secondaryAbilities: [{ name: "Style", innateBonus: 5, reducedCost: 0 }]
    },

    specialRules: "Martial arts cost only 20 DP (10 for the first martial art learned).",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.bfm8UwrMpshMD03Z"
  }),
  Ranger: createClass({
    name: "Ranger",
    level: 1,
    archetype: "Fighter, Domine",
    description:
      "A Ranger is the virtual embodiment of the traditional adventurer – a person who has made the most of his ability to perceive what is around him and venture where others fear to tread. A Ranger usually has his senses well attuned to the environment, so it isn’t easy to take him by surprise. He is also a tracker and a born survivalist, possessing incredible knowledge of forest and wilderness environments. In society, Rangers often work as hunters, scouts, or even archaelogists, but most of them are simply people who have learned these skills from living in remote areas where such skills are necessary for survival.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 10,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 30,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 60,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 2,
      Dodge: 2,
      WearArmor: 2,
      Ki: 2,
      KiAccumulation: 15
    },

    supernaturalAbilityCosts: {
      Zeon: 3,
      MagicProjection: 3,
      MAMultiple: 70,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 3,
      Vigor: 2,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [],
      secondaryAbilities: [{ name: "Style", innateBonus: 5, reducedCost: 0 }]
    },

    specialRules: "Martial arts cost only 20 DP (10 for the first martial art learned).",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.cqaw9g7WpSNofzJB"
  }),
  Shadow: createClass({
    name: "Shadow",
    level: 1,
    archetype: "Fighter, Prowler",
    description:
      "Shadows are Fighters who move in darkness and take advantage of their surroundings. Although their Combat Abilities are excellent, they prefer to defeat enemies without giving them a chance to fight back. They employ Subterfuge and complex tricks or tactics to gain the advantage of surprise. Even when detected, a Shadow is able to battle his enemies on even footing, but his resistance tends to be weaker than other Fighters’ in such situations. Generally fast and agile, Shadows prefer to dodge rather than meet attacks.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 5,

    initiativePerLevel: 10,

    martialKnowledgePerLevel: 25,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 60,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 3,
      Dodge: 2,
      WearArmor: 2,
      Ki: 2,
      KiAccumulation: 20
    },

    supernaturalAbilityCosts: {
      Zeon: 3,
      MagicProjection: 3,
      MAMultiple: 70,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 3,
      Vigor: 2,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [
        { name: "Attack", innateBonus: 5 },
        { name: "Dodge", innateBonus: 5 }
      ],
      secondaryAbilities: [
        { name: "Notice", innateBonus: 10, reducedCost: 0 },
        { name: "Search", innateBonus: 10, reducedCost: 0 },
        { name: "Hide", innateBonus: 10, reducedCost: 0 },
        { name: "Stealth", innateBonus: 10, reducedCost: 0 }
      ]
    },

    specialRules: "+5 per level to Ki Concealment (only if developed).",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.gyXs9KgckzHocrKz"
  }),
  Thief: createClass({
    name: "Thief",
    level: 1,
    archetype: "Prowler",
    description:
      "As the name suggests, a Thief is someone specialized in skills related to stealth, theft, and hiding. They flee direct confrontation, trusting in their skills and subterfuge to get what they are after. Since their Physical Resistance is usually not very high, Thieves become adept at fleeing or dodging when discovered. They can play diverse roles in society, although they usually dedicate themselves to the profession that gives this class its name.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 5,

    initiativePerLevel: 10,

    martialKnowledgePerLevel: 20,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 50,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 3,
      Dodge: 2,
      WearArmor: 3,
      Ki: 2,
      KiAccumulation: 25
    },

    supernaturalAbilityCosts: {
      Zeon: 3,
      MagicProjection: 3,
      MAMultiple: 70,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 1,
      Social: 2,
      Perception: 2,
      Intellectual: 3,
      Vigor: 3,
      Subterfuge: 1,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [{ name: "Dodge", innateBonus: 5 }],
      secondaryAbilities: [
        { name: "Notice", innateBonus: 5, reducedCost: 0 },
        { name: "Search", innateBonus: 5, reducedCost: 0 },
        { name: "Hide", innateBonus: 5, reducedCost: 0 },
        { name: "Stealth", innateBonus: 5, reducedCost: 0 },
        { name: "Trap Lore", innateBonus: 5, reducedCost: 0 },
        { name: "Sleight of Hand", innateBonus: 5, reducedCost: 0 },
        { name: "Theft", innateBonus: 10, reducedCost: 0 },
        { name: "Appraisal", innateBonus: 0, reducedCost: 1 }
      ]
    },

    specialRules: "+5 per level to Ki Concealment (only if developed).",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.WQRZPCon3aogFY04"
  }),
  Assassin: createClass({
    name: "Assassin",
    level: 1,
    archetype: "Prowler",
    description:
      "Assassins are characters who specialize in subterfuge and intrigue. They move in anonymity and prefer that their victims die not knowing who killed them. They use very refined techniques that help them avoid open combat, as they are very vulnerable in direct confrontations. When their work is done, they fade once again into the shadows. Of course, characters from this class are not necessarily obligated to perform the role of hitmen within a society. There are many other ways that their special abilities can be useful – such as in espionage.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 5,

    initiativePerLevel: 10,

    martialKnowledgePerLevel: 20,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 50,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 3,
      Dodge: 2,
      WearArmor: 3,
      Ki: 2,
      KiAccumulation: 25
    },

    supernaturalAbilityCosts: {
      Zeon: 3,
      MagicProjection: 3,
      MAMultiple: 70,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 1,
      Intellectual: 3,
      Vigor: 3,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [{ name: "Attack", innateBonus: 5 }],
      secondaryAbilities: [
        { name: "Notice", innateBonus: 10, reducedCost: 0 },
        { name: "Search", innateBonus: 10, reducedCost: 0 },
        { name: "Hide", innateBonus: 10, reducedCost: 0 },
        { name: "Stealth", innateBonus: 10, reducedCost: 1 },
        { name: "Poisons", innateBonus: 10, reducedCost: 0 },
        { name: "Composure", innateBonus: 10, reducedCost: 2 },
        { name: "Trap Lore", innateBonus: 10, reducedCost: 0 },
        { name: "Memorize", innateBonus: 0, reducedCost: 2 }
      ]
    },

    specialRules: "",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.azjDf1IhKfE2n506"
  }),
  Wizard: createClass({
    name: "Wizard",
    level: 1,
    archetype: "Mystic",
    description:
      "Wizards have the incredible ability to manipulate mystical energy. They have dedicated themselves, body and soul, to understanding and mastering magic. They specialize in the purest aspects of magic – using spells that are capable of bending reality to their will, focusing and controlling its powers with complete precision. Wizards are also interested in every field of intellect, though, unfortunately, this makes their physical development somewhat inferior to that of others.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 5,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 10,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 50,
      Supernatural: 60,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 3,
      Block: 3,
      Dodge: 2,
      WearArmor: 3,
      Ki: 3,
      KiAccumulation: 30
    },

    supernaturalAbilityCosts: {
      Zeon: 1,
      MagicProjection: 2,
      MAMultiple: 50,
      Summon: 2,
      Control: 2,
      Bind: 2,
      Banish: 2
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 2,
      Vigor: 3,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [{ name: "Zeon", innateBonus: 100 }],
      secondaryAbilities: [
        { name: "Magic Appraisal", innateBonus: 10, reducedCost: 1 },
        { name: "Occult", innateBonus: 5, reducedCost: 0 }
      ]
    },

    specialRules: "",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.JsGDMlnxeLdzLg2d"
  }),
  Warlock: createClass({
    name: "Warlock",
    level: 1,
    archetype: "Fighter, Mystic",
    description:
      "A Warlock is a magical warrior who develops both his martial and magical abilities. Like Wizards, Warlocks control the purest of supernatural abilities – the ability to cast spells to modify reality itself. Although they can concentrate on just one area, a Warlock is perfectly capable of becoming a master who controls both combat arms and supernatural arts equally well. Of course, doing this can leave other important abilities neglected.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 10,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 20,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 50,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 2,
      Dodge: 2,
      WearArmor: 2,
      Ki: 2,
      KiAccumulation: 25
    },

    supernaturalAbilityCosts: {
      Zeon: 1,
      MagicProjection: 2,
      MAMultiple: 50,
      Summon: 2,
      Control: 2,
      Bind: 1,
      Banish: 2
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 2,
      Vigor: 2,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [
        { name: "Attack", innateBonus: 5 },
        { name: "Block", innateBonus: 5 },
        { name: "Dodge", innateBonus: 5 },
        { name: "Zeon", innateBonus: 20 }
      ],
      secondaryAbilities: [{ name: "Magic Appraisal", innateBonus: 5, reducedCost: 0 }]
    },

    specialRules: "",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.kN7KPzmcV9luso1C"
  }),
  Illusionist: createClass({
    name: "Illusionist",
    level: 1,
    archetype: "Mystic, Prowler",
    description:
      "Illusionists combine their notable skills at subterfuge with the control of magic. A good Illusionist makes it impossible for those who witness his feats to tell if he has done them using supernatural powers or mere natural skill. His mystical powers are nearly as great as those of other spellcasters, but he normally lacks the ability to cast spells quickly. In spite of being called Illusionists, these magic users master not only the power of illusion, but many other types of magic as well. They are very vulnerable physically, however, and usually reject the idea of direct combat in favor of more ingenious stratagems.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 5,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 20,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 50,
      Supernatural: 60,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 3,
      Block: 3,
      Dodge: 2,
      WearArmor: 3,
      Ki: 2,
      KiAccumulation: 25
    },

    supernaturalAbilityCosts: {
      Zeon: 1,
      MagicProjection: 2,
      MAMultiple: 60,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 2,
      Vigor: 3,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [{ name: "Zeon", innateBonus: 75 }],
      secondaryAbilities: [
        { name: "Magic Appraisal", innateBonus: 5, reducedCost: 0 },
        { name: "Stealth", innateBonus: 10, reducedCost: 1 },
        { name: "Hide", innateBonus: 10, reducedCost: 0 },
        { name: "Sleight of Hand", innateBonus: 10, reducedCost: 1 },
        { name: "Disguise", innateBonus: 5, reducedCost: 0 },
        { name: "Theft", innateBonus: 5, reducedCost: 0 },
        { name: "Persuasion", innateBonus: 5, reducedCost: 1 }
      ]
    },

    specialRules: "",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.NDe2o2r9dqd0aPgS"
  }),
  WizardMentalist: createClass({
    name: "Wizard Mentalist",
    level: 1,
    archetype: "Mystic, Psychic",
    description:
      "The potential for Wizard Mentalists is enormous. Persons in this category are dedicated to controlling the combination of exceptional abilities with which they are endowed – namely, magic and the psychic matrixes. Although their resistance and Secondary Abilities may be weak due to their extreme dedication, their ability to launch spells and support those spells with psychic disciplines make them exceptionally formidable characters.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 5,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 10,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 1,

    abilityLimits: {
      Combat: 50,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 3,
      Block: 3,
      Dodge: 2,
      WearArmor: 3,
      Ki: 3,
      KiAccumulation: 30
    },

    supernaturalAbilityCosts: {
      Zeon: 1,
      MagicProjection: 2,
      MAMultiple: 50,
      Summon: 2,
      Control: 2,
      Bind: 2,
      Banish: 2
    },

    psychicAbilityCosts: {
      PsychicPoints: 10,
      PsychicProjection: 2
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 2,
      Vigor: 3,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [{ name: "Zeon", innateBonus: 100 }],
      secondaryAbilities: [
        { name: "Magic Appraisal", innateBonus: 10, reducedCost: 0 },
        { name: "Occult", innateBonus: 5, reducedCost: 0 }
      ]
    },

    specialRules: "",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.xJFTJVNeAd8C3FFR"
  }),
  Summoner: createClass({
    name: "Summoner",
    level: 1,
    archetype: "Mystic",
    description:
      "Summoners are mystics endowed with the ability to summon supernatural creatures and force them into submission. Although, in and of themselves, neither their magical powers nor their physical abilities are especially notable, the beings they summon may be capable of almost anything. Summoners can also perform invocations, calling on help from great supernatural Powers for a limited time.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 5,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 10,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 50,
      Supernatural: 60,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 3,
      Block: 3,
      Dodge: 2,
      WearArmor: 3,
      Ki: 3,
      KiAccumulation: 30
    },

    supernaturalAbilityCosts: {
      Zeon: 1,
      MagicProjection: 3,
      MAMultiple: 60,
      Summon: 1,
      Control: 1,
      Bind: 1,
      Banish: 1
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 2,
      Vigor: 3,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [
        { name: "Zeon", innateBonus: 50 },
        { name: "Summon", innateBonus: 10 },
        { name: "Control", innateBonus: 10 },
        { name: "Bind", innateBonus: 10 },
        { name: "Banish", innateBonus: 10 }
      ],
      secondaryAbilities: [
        { name: "Magic Appraisal", innateBonus: 5, reducedCost: 0 },
        { name: "Occult", innateBonus: 10, reducedCost: 1 }
      ]
    },

    specialRules: "",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.sm8SaeYsoZ4n1rU1"
  }),
  WarriorSummoner: createClass({
    name: "Warrior Summoner",
    level: 1,
    archetype: "Fighter, Mystic",
    description:
      "Warrior Summoners bring together the combat abilities of Fighters and the Summoner’s powers of invocation and control, calling upon great Powers or supernatural creatures to aid them in battle, though their focus on mastering both arts often leaves other abilities underdeveloped.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 10,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 20,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 3,

    abilityLimits: {
      Combat: 50,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 2,
      Dodge: 2,
      WearArmor: 2,
      Ki: 2,
      KiAccumulation: 20
    },

    supernaturalAbilityCosts: {
      Zeon: 1,
      MagicProjection: 3,
      MAMultiple: 60,
      Summon: 1,
      Control: 1,
      Bind: 1,
      Banish: 1
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 3
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 2,
      Vigor: 2,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [
        { name: "Attack", innateBonus: 5 },
        { name: "Block", innateBonus: 5 },
        { name: "Dodge", innateBonus: 5 },
        { name: "Zeon", innateBonus: 20 },
        { name: "Summon", innateBonus: 5 },
        { name: "Control", innateBonus: 5 },
        { name: "Bind", innateBonus: 5 },
        { name: "Banish", innateBonus: 5 }
      ],
      secondaryAbilities: [{ name: "Occult", innateBonus: 5, reducedCost: 0 }]
    },

    specialRules: "",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.hTM4BXxPr1uhCoFQ"
  }),
  Mentalist: createClass({
    name: "Mentalist",
    level: 1,
    archetype: "Psychic",
    description:
      "Mentalists are characters who have dedicated themselves to the maximum development of their psychic powers. They are not satisfied with merely possessing mental disciplines; they also wish to discover how they work and how to master new abilities. Like Wizards, Mentalists have wide knowledge in the intellectual fields – though that dedication leads their physical development and resistance to be less than those of other classes.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 5,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 10,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 1,

    abilityLimits: {
      Combat: 50,
      Supernatural: 50,
      Psychic: 60
    },

    primaryAbilityCosts: {
      Attack: 3,
      Block: 3,
      Dodge: 2,
      WearArmor: 3,
      Ki: 3,
      KiAccumulation: 30
    },

    supernaturalAbilityCosts: {
      Zeon: 3,
      MagicProjection: 3,
      MAMultiple: 70,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 10,
      PsychicProjection: 2
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 2,
      Vigor: 3,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [],
      secondaryAbilities: []
    },

    specialRules: "",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.IfEQbQc2WgDUPkGY"
  }),
  WarriorMentalist: createClass({
    name: "Warrior Mentalist",
    level: 1,
    archetype: "Fighter, Psychic",
    description:
      "Warrior Mentalists are fighters endowed with Psychic Abilities who have developed complete control of those powers to gain an edge in combat. Their mental and martial prowess can rival that of dedicated warriors, though such intense focus often leaves other abilities less refined. Typically, a Warrior Mentalist leans toward one side of their dual nature—either a warrior who augments his combat skill with psychic techniques, or a psychic who reinforces his mental disciplines with martial training.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 10,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 20,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 1,

    abilityLimits: {
      Combat: 50,
      Supernatural: 50,
      Psychic: 50
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 2,
      Dodge: 2,
      WearArmor: 2,
      Ki: 2,
      KiAccumulation: 25
    },

    supernaturalAbilityCosts: {
      Zeon: 3,
      MagicProjection: 3,
      MAMultiple: 70,
      Summon: 3,
      Control: 3,
      Bind: 3,
      Banish: 3
    },

    psychicAbilityCosts: {
      PsychicPoints: 15,
      PsychicProjection: 2
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 3,
      Vigor: 2,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [
        { name: "Attack", innateBonus: 5 },
        { name: "Block", innateBonus: 5 },
        { name: "Dodge", innateBonus: 5 }
      ],
      secondaryAbilities: []
    },

    specialRules: "",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.BsVMCjF6K6Jnb0EJ"
  }),
  Freelancer: createClass({
    name: "Freelancer",
    level: 1,
    archetype: "Novel",
    description:
      "The Freelancer class represents someone who does not fit any of the other Archetypes. A Freelancer has no true specialization; instead, they possess balanced, versatile abilities across every field—from combat to magic to psychic disciplines—without excelling in any single one. Farmers, bards, nobles, jesters, and countless others fall naturally into this category. Because their development is so flexible, Freelancers can easily transition into any other class later on. For players unsure of their long‑term direction, beginning as a Freelancer offers a safe, adaptable foundation that can evolve into whatever path they ultimately choose.",

    lifePointMultiple: 20,
    lifePointsPerLevel: 5,

    initiativePerLevel: 5,

    martialKnowledgePerLevel: 20,

    psychicPointsPerLevel: 1,
    psychicPointsInterval: 2,

    abilityLimits: {
      Combat: 60,
      Supernatural: 60,
      Psychic: 60
    },

    primaryAbilityCosts: {
      Attack: 2,
      Block: 2,
      Dodge: 2,
      WearArmor: 2,
      Ki: 2,
      KiAccumulation: 20
    },

    supernaturalAbilityCosts: {
      Zeon: 2,
      MagicProjection: 2,
      MAMultiple: 60,
      Summon: 2,
      Control: 2,
      Bind: 2,
      Banish: 2
    },

    psychicAbilityCosts: {
      PsychicPoints: 20,
      PsychicProjection: 2
    },

    secondaryAbilityCosts: {
      Athletics: 2,
      Social: 2,
      Perception: 2,
      Intellectual: 2,
      Vigor: 2,
      Subterfuge: 2,
      Creative: 2
    },

    innateBonuses: {
      primaryAbilities: [{ name: "Zeon", innateBonus: 10 }],
      secondaryAbilities: []
    },

    specialRules:
      "+10 per level to five different secondary abilities (chosen by the player). Changing class to or from Freelancer costs only 20 DP.",
    journalEntry:
      "Compendium.abf-system.abf-journals.JournalEntry.2RR9NFAmNjMA9rMM.JournalEntryPage.3Dqbqt58xRV5npn3"
  })
};
