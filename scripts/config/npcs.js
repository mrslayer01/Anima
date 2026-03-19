export function createNPCAdvantage(NPCAdvInput) {
  const {
    name = "",
    cost = 0,
    gnosisMin = "0",
    description = "",
    notes = "",
    purchased = false
  } = NPCAdvInput;

  return {
    name,
    cost,
    gnosisMin,
    description,
    notes,
    purchased
  };
}

export function createNPCDisadvantage(NPCDisInput) {
  const {
    name = "",
    bonus = 0,
    gnosisMin = "0",
    description = "",
    notes = "",
    purchased = false
  } = NPCDisInput;

  return {
    name,
    bonus,
    gnosisMin,
    description,
    notes,
    purchased
  };
}

export function createNPCPower(NPCPowerInput) {
  const {
    name = "",
    gnosisMin = "",
    description = "",
    notes = "",
    purchased = false,
    type = "",
    prohibitions = "",
    purchasedAbilities = [],
    effects = []
  } = NPCPowerInput;

  return {
    name,
    gnosisMin,
    description,
    notes,
    purchased,
    type,
    prohibitions,
    purchasedAbilities,
    effects
  };
}

//#region Advantages and Disadvanatges
export const ABF_NPC_ADVANTAGES = {
  FatigueResistance: createNPCAdvantage({
    name: "Fatigue Resistance",
    cost: 10,
    gnosisMin: "0",
    notes: "",
    purchased: false,
    description:
      "This Advantage grants two additional points to Fatigue. It can be acquired several times to gain greater benefits."
  }),

  Gift: createNPCAdvantage({
    name: "Gift",
    cost: 30,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description:
      "The being is able to use magic. If we are dealing with an elemental, he possesses a bonus of +20 to his MA on the path that he is attuned to, and a –20 on the opposite one."
  }),

  AccessToAPsychicDiscipline: createNPCAdvantage({
    name: "Access to a Psychic Discipline",
    cost: 15,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description:
      "The being can use its PP to acquire an affinity to a single psychic discipline and use its powers. Fire elementals cannot use cryokinetic powers, and vice versa."
  }),

  AccessToPsychicDisciplines: createNPCAdvantage({
    name: "Access to Psychic Disciplines",
    cost: 30,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Same as the one before, except that it grants access to several disciplines."
  }),

  AcuteSense: createNPCAdvantage({
    name: "Acute Sense",
    cost: 10,
    gnosisMin: "0",
    notes: "",
    purchased: false,
    description:
      "One of its five senses is especially developed. Therefore, apply a bonus of +30 to any perception-based Secondary Ability Check that implies its use."
  }),

  Attuned: createNPCAdvantage({
    name: "Attuned",
    cost: 10,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description:
      "The being is attuned to something specifically, from a type of being to an element. If it is an element, it receives a bonus of +20 to any Resistance that is rolled against effects caused by it. If, on the other hand, it is a class of creature, any member of said species will feel some kind of tie towards it, as if it belonged to the same race."
  }),

  SuperhumanPhysicalCharacteristics: createNPCAdvantage({
    name: "Superhuman Physical Characteristics",
    cost: 20,
    gnosisMin: "0",
    notes: "",
    purchased: false,
    description:
      "It extends the maximum limit you can choose for physical Characteristics (STR, DEX, AGI, CON and PER) to a maximum of 13."
  }),

  SuperhumanSpiritualCharacteristics: createNPCAdvantage({
    name: "Superhuman Spiritual Characteristics",
    cost: 20,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description:
      "It extends the maximum limit you can choose for spiritual Characteristics (STR, DEX, AGI, CON and PER) to a maximum of 13."
  }),

  SupernaturalPhysicalCharacteristics: createNPCAdvantage({
    name: "Supernatural Physical Characteristics",
    cost: 40,
    gnosisMin: "20",
    notes: "",
    purchased: false,
    description:
      "The same as the previous ones, except that the maximum limit of the physical Characteristics is increased to 15."
  }),

  SupernaturalSpiritualCharacteristics: createNPCAdvantage({
    name: "Supernatural Spiritual Characteristics",
    cost: 40,
    gnosisMin: "20",
    notes: "",
    purchased: false,
    description:
      "The same as the previous ones, except that it affects the spiritual Characteristics."
  }),

  DivinePhysicalCharacteristics: createNPCAdvantage({
    name: "Divine Physical Characteristics",
    cost: 80,
    gnosisMin: "30",
    notes: "",
    purchased: false,
    description: "The GM can grant any value to the physical Characteristic of the being."
  }),

  DivineSpiritualCharacteristics: createNPCAdvantage({
    name: "Divine Spiritual Characteristics",
    cost: 80,
    gnosisMin: "35",
    notes: "",
    purchased: false,
    description:
      "The same as the previous ones, except that it affects the spiritual Characteristics."
  }),

  AttributeIncreasedPlus1: createNPCAdvantage({
    name: "Attribute Increased +1",
    cost: 20,
    gnosisMin: "0",
    notes: "",
    purchased: false,
    description:
      "This ability only can be acquired through the use of spells that grant monster abilities or to create racial modifiers of a natural ethnicity. In these cases, they grant a +1 to a Characteristic and it can be acquired again to increase a different one. It cannot be chosen twice for the same Characteristic."
  }),

  AttributeIncreasedPlus2: createNPCAdvantage({
    name: "Attribute Increased +2",
    cost: 40,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "The same as the previous ones, except that it grants a +2 to the Characteristic."
  }),

  AttributeIncreasedPlus3: createNPCAdvantage({
    name: "Attribute Increased +3",
    cost: 60,
    gnosisMin: "Variable",
    notes: "",
    purchased: false,
    description:
      "The same as the previous ones, except that it grants a +3 to the Characteristic. This ability can be chosen again to increase even further the same Characteristic, and in which case it grants a cumulative +1 to the previous bonus. That is to say, it provides a +4 if acquired twice, a +5 if it is chosen three times, etc. The base Gnosis of this ability is 15 but every time it is selected again it increases its value by 5 points."
  }),

  UnnaturalSize: createNPCAdvantage({
    name: "Unnatural Size",
    cost: 10,
    gnosisMin: "0",
    notes: "",
    purchased: false,
    description:
      "The GM can increase or decrease the base Size of the being by a maximum of 5 points."
  }),

  Ambidextrous: createNPCAdvantage({
    name: "Ambidextrous",
    cost: 30,
    gnosisMin: "0",
    notes: "",
    purchased: false,
    description: "It works the same way as the creation Advantage of the same name."
  }),

  Inhumanity: createNPCAdvantage({
    name: "Inhumanity",
    cost: 10,
    gnosisMin: "0",
    notes: "",
    purchased: false,
    description:
      "For all intents and purposes, it works the same way as the Ki Ability that has the same name."
  }),

  Zen: createNPCAdvantage({
    name: "Zen",
    cost: 20,
    gnosisMin: "25",
    notes: "",
    purchased: false,
    description:
      "The being can carry out naturally physical actions that have a difficulty of Zen and have the full benefits of its Characteristics. It works like the Ki Ability with the same name."
  }),

  AquaticBreathing: createNPCAdvantage({
    name: "Aquatic Breathing",
    cost: 10,
    gnosisMin: "0",
    notes: "",
    purchased: false,
    description: "The creature can breathe underwater without difficulty."
  }),
  WithoutUnconsciousness: createNPCAdvantage({
    name: "Without Unconsciousness",
    cost: 10,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description:
      "The creature cannot become unconscious, regardless of what critical results or supernatural effects indicate."
  }),

  Tireless: createNPCAdvantage({
    name: "Tireless",
    cost: 20,
    gnosisMin: "15",
    notes: "",
    purchased: false,
    description:
      "The creature does not get tired regardless of the amount of physical or mental effort exerted. However, because of that, the being cannot use Fatigue points to increase its physical abilities."
  }),

  DoesNotBreath: createNPCAdvantage({
    name: "Does not breath",
    cost: 10,
    gnosisMin: "15",
    notes: "",
    purchased: false,
    description: "The creature does not require air to live."
  }),

  DoesNotEat: createNPCAdvantage({
    name: "Does not eat",
    cost: 10,
    gnosisMin: "15",
    notes: "",
    purchased: false,
    description: "The creature does not require food to live."
  }),

  DoesNotSleep: createNPCAdvantage({
    name: "Does not sleep",
    cost: 10,
    gnosisMin: "15",
    notes: "",
    purchased: false,
    description:
      "The creature does not possess the physical need to sleep. It can become unconscious as normal."
  }),

  ImmuneToNaturalPoisons: createNPCAdvantage({
    name: "Immune to natural poisons",
    cost: 20,
    gnosisMin: "20",
    notes: "",
    purchased: false,
    description:
      "No natural poison can affect the creature. However, any harmful substance that comes from a being with a Gnosis greater than 10, or that has been created through mystic means, will continue to affect it normally."
  }),

  ImmuneToNaturalDiseases: createNPCAdvantage({
    name: "Immune to natural diseases",
    cost: 10,
    gnosisMin: "20",
    notes: "",
    purchased: false,
    description:
      "Just like the one before, only that in this case it’s immune to any natural disease."
  }),

  ImmuneToClimacticPhenomena: createNPCAdvantage({
    name: "Immune to climactic phenomena",
    cost: 10,
    gnosisMin: "15",
    notes: "",
    purchased: false,
    description:
      "No matter how extreme the climate is, the being does not suffer any type of problem from being exposed to it."
  }),

  PhysicalExemption: createNPCAdvantage({
    name: "Physical exemption",
    cost: 50,
    gnosisMin: "20",
    notes: "",
    purchased: false,
    description:
      "This ability represents all of the other reduction of physical needs that have been explained. A being that possesses it can have any of the following advantages: Without Unconsciousness, Tireless, Does Not breath, Does Not Eat, Does Not Sleep, Immune to Natural Poisons, Immune to Natural Diseases, Immune to Climactic Phenomena."
  }),

  NaturalImmunityToAnElementHalfDamage: createNPCAdvantage({
    name: "Natural Immunity to an Element, Half the damage",
    cost: 10,
    gnosisMin: "20",
    notes: "",
    purchased: false,
    description:
      "The being is partially immune to the effects caused by a specific element. Therefore, if it takes damage from this type, it is reduced to half. This ability is not effective if the element comes from, or is generated by, a being that possesses a Gnosis greater than that of the creature. Nor will it work against damages that are produced by Resistance Checks (although in this case, it can apply a +40 to its rolls). Regarding elementals, the chosen one must be the element that it is attuned to."
  }),

  NaturalImmunityToAnElementComplete: createNPCAdvantage({
    name: "Natural Immunity to an Element, Complete",
    cost: 30,
    gnosisMin: "25",
    notes: "",
    purchased: false,
    description:
      "The same as the one before, except that the damage caused by the element is completely nullified."
  }),

  PsychologicalImmunity: createNPCAdvantage({
    name: "Psychological Immunity",
    cost: 20,
    gnosisMin: "10",
    notes: "",
    purchased: false,
    description:
      "The mind of the being is not able to feel any type of psychological State. Therefore, it is completely immune to psychic effects, like Pain, Fear, Terror, or Rage."
  }),
  //Magic & Psychic
  SuperiorMagicRecovery: createNPCAdvantage({
    name: "Superior magic recovery (magical)",
    cost: 30,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Superior magic recovery (magical)"
  }),

  NaturalKnowledgePath20: createNPCAdvantage({
    name: "Natural knowledge of a path 20 (magical)",
    cost: 10,
    gnosisMin: "10",
    notes: "",
    purchased: false,
    description:
      "Natural knowledge of a path: In elemental beings, the natural knowledge has to be on that which they are attuned to. This advantage cannot be chosen through spells that allow the acquisition of abilities."
  }),

  NaturalKnowledgePath40: createNPCAdvantage({
    name: "Natural knowledge of a path 40 (magical)",
    cost: 20,
    gnosisMin: "15",
    notes: "",
    purchased: false,
    description:
      "Natural knowledge of a path: In elemental beings, the natural knowledge has to be on that which they are attuned to. This advantage cannot be chosen through spells that allow the acquisition of abilities."
  }),

  NaturalKnowledgePath60: createNPCAdvantage({
    name: "Natural knowledge of a path 60 (magical)",
    cost: 30,
    gnosisMin: "20",
    notes: "",
    purchased: false,
    description:
      "Natural knowledge of a path: In elemental beings, the natural knowledge has to be on that which they are attuned to. This advantage cannot be chosen through spells that allow the acquisition of abilities."
  }),

  NaturalKnowledgePath80: createNPCAdvantage({
    name: "Natural knowledge of a path 80 (magical)",
    cost: 40,
    gnosisMin: "25",
    notes: "",
    purchased: false,
    description:
      "Natural knowledge of a path: In elemental beings, the natural knowledge has to be on that which they are attuned to. This advantage cannot be chosen through spells that allow the acquisition of abilities."
  }),

  NaturalKnowledgePath90: createNPCAdvantage({
    name: "Natural knowledge of a path 90 (magical)",
    cost: 50,
    gnosisMin: "30",
    notes: "",
    purchased: false,
    description:
      "Natural knowledge of a path: In elemental beings, the natural knowledge has to be on that which they are attuned to. This advantage cannot be chosen through spells that allow the acquisition of abilities."
  }),

  GesturelessCasting: createNPCAdvantage({
    name: "Gestureless casting (magical)",
    cost: 20,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Gestureless casting (magical)"
  }),

  UnspokenCasting: createNPCAdvantage({
    name: "Unspoken casting (magical)",
    cost: 20,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Unspoken casting (magical)"
  }),

  ImprovedInnateMagic: createNPCAdvantage({
    name: "Improved innate magic (magical)",
    cost: 20,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Improved innate magic (magical)"
  }),

  AmplifySustainedPower: createNPCAdvantage({
    name: "Amplify sustained power (psychic)",
    cost: 30,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Amplify sustained power (psychic)"
  }),

  PsychicFatigueResistance: createNPCAdvantage({
    name: "Psychic Fatigue resistance (psychic)",
    cost: 30,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Psychic Fatigue resistance (psychic)"
  }),

  PsychicPointRecovery: createNPCAdvantage({
    name: "Psychic Point Recovery (psychic)",
    cost: 20,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Psychic Point Recovery (psychic)"
  }),

  ExtremeConcentration: createNPCAdvantage({
    name: "Extreme concentration (psychic)",
    cost: 30,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Extreme concentration (psychic)"
  }),

  FocusPsychic: createNPCAdvantage({
    name: "Focus (psychic)",
    cost: 20,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Focus (psychic)"
  }),

  PsychicInclination: createNPCAdvantage({
    name: "Psychic inclination (psychic)",
    cost: 20,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Psychic inclination (psychic)"
  }),

  PassiveConcentration: createNPCAdvantage({
    name: "Passive concentration (psychic)",
    cost: 30,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Passive concentration (psychic)"
  })
};

export const ABF_NPC_DISADVANTAGES = {
  RacialVice: createNPCDisadvantage({
    name: "Racial Vice",
    bonus: 10,
    gnosisMin: "0",
    notes: "",
    purchased: false,
    description:
      "The creature has some form of natural vice that it cannot overcome by any means. Anytime that he has the opportunity to quench it and it does not, causes the being to suffer a –20 All Action Penalty."
  }),

  AtrophiedMembers: createNPCDisadvantage({
    name: "Atrophied Members",
    bonus: 20,
    gnosisMin: "0",
    notes: "",
    purchased: false,
    description:
      "The being lacks useable extremities or the ones that he possesses cannot be used correctly, applying a penalty of –60 to any physical check that requires it. If the members are its legs, apply a –6 penalty to its Movement Value. It can’t be selected by souls."
  }),

  RacialFear: createNPCDisadvantage({
    name: "Racial Fear",
    bonus: 10,
    gnosisMin: "10",
    notes: "",
    purchased: false,
    description:
      "The creature has an unsurpassable fear to something specific, for which he suffers said state when found in its presence."
  }),

  RacialTerror: createNPCDisadvantage({
    name: "Racial Terror",
    bonus: 20,
    gnosisMin: "10",
    notes: "",
    purchased: false,
    description: "Same as the one before, except apply the State of Terror."
  }),

  LackOfASense: createNPCDisadvantage({
    name: "Lack of a Sense",
    bonus: 10,
    gnosisMin: "0",
    notes: "",
    purchased: false,
    description:
      "The creature lacks a sense other than sight, and he cannot make perception rolls that require it."
  }),

  Blind: createNPCDisadvantage({
    name: "Blind",
    bonus: 20,
    gnosisMin: "0",
    notes: "",
    purchased: false,
    description:
      "It does not possess a sense of sight, and it does not have some supernatural way to see. It will always apply the penalty of Blindness."
  }),

  PhysicalNeed: createNPCDisadvantage({
    name: "Physical Need",
    bonus: 10,
    gnosisMin: "0",
    notes: "",
    purchased: false,
    description:
      "The being has a need of a physical nature to survive. For example, it requires something specific, like consuming iron, within a determined time period or it suffers a cumulative All Action Penalty of –10. If the need isn’t satisfied over a long period of time, it can even die."
  }),

  ExtremeNeed: createNPCDisadvantage({
    name: "Extreme Need",
    bonus: 20,
    gnosisMin: "10",
    notes: "",
    purchased: false,
    description:
      "Same as the one before, except that if the being does not carry it out on time, it will die automatically."
  }),

  NaturalVulnerabilityHalfDamage: createNPCDisadvantage({
    name: "Natural Vulnerability to an Element, 50% More Damage",
    bonus: 10,
    gnosisMin: "20",
    notes: "",
    purchased: false,
    description:
      "It is naturally vulnerable to the damage produced by an element, that increases its damage by 50%. Regarding elemental beings, the chosen element has to be the opposite of what its attuned to."
  }),

  NaturalVulnerabilityDoubleDamage: createNPCDisadvantage({
    name: "Natural Vulnerability to an Element, Double Damage",
    bonus: 20,
    gnosisMin: "20",
    notes: "",
    purchased: false,
    description: "Same as the one before, except that it doubles the damage taken."
  }),

  VulnerableToATypeOfAttack: createNPCDisadvantage({
    name: "Vulnerable to a Type of Attack",
    bonus: 20,
    gnosisMin: "10",
    notes: "",
    purchased: false,
    description:
      "This means that a specific type of attack produces double damage to the being, like for example, projectile or Impact weapons."
  }),
  // Psychic & Magic
  OralRequirement: createNPCDisadvantage({
    name: "Oral requirement (magical)",
    bonus: 10,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Oral requirement (magical)"
  }),

  RequireGestures: createNPCDisadvantage({
    name: "Require gestures (magical)",
    bonus: 10,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Require gestures (magical)"
  }),

  SlowRecoveryOfMagic: createNPCDisadvantage({
    name: "Slow recovery of magic (magical)",
    bonus: 10,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Slow recovery of magic (magical)"
  }),

  MagicBlockage: createNPCDisadvantage({
    name: "Magic blockage (magical)",
    bonus: 30,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Magic blockage (magical)"
  }),

  MagicalExhaustion: createNPCDisadvantage({
    name: "Magical exhaustion (magical)",
    bonus: 10,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Magical exhaustion (magical)"
  }),

  ActionRequirement: createNPCDisadvantage({
    name: "Action Requirement (magical)",
    bonus: 20,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Action Requirement (magical)"
  }),

  NoConcentration: createNPCDisadvantage({
    name: "No concentration (psychic)",
    bonus: 10,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "No concentration (psychic)"
  }),

  PsychicExhaustion: createNPCDisadvantage({
    name: "Psychic exhaustion (psychic)",
    bonus: 10,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Psychic exhaustion (psychic)"
  }),

  PsychicConsumption: createNPCDisadvantage({
    name: "Psychic consumption (psychic)",
    bonus: 20,
    gnosisMin: "5",
    notes: "",
    purchased: false,
    description: "Psychic consumption (psychic)"
  })
};
//#endregion

//#region Powers
export const ABF_NPC_POWERS = {
  //#region Offensive Powers
  NaturalWeapon: createNPCPower({
    name: "Natural Weapon",
    notes: "",
    purchased: false,
    type: "Offensive",
    prohibitions: "",
    purchasedAbilities: [],
    description:
      "The creature is provided with natural weapons of any type: claws, jaws, sharpened tail… or whatever we would like to imagine for it. In game terms, it allows the being to use as a base damage that which is indicated in the column Natural weapon, corresponding to its Size on Table 82, when it comes time to use any of its attacks. They can be Cut, Impact or Thrust, depending on what you deem appropriate for its nature. Like in those cases of disarmed combat, its Initiative is always +20.",
    effects: [{ name: "Natural Weapon", cost: 20, gnosisMin: "0" }]
  }),
  AdditionalAttacks: createNPCPower({
    name: "Additional Attacks",
    notes: "",
    purchased: false,
    type: "Offensive",
    prohibitions: "",
    purchasedabilities: [],
    description:
      "The being can carry out an additional attack thanks to the fact that he is gifted with secondary extremities or other similar means. The attacks are carried out using the being’s own damage, be that what is indicated by his physical attack or that of a natural weapon. Additional attack –X to its final Attack: The penalty that is indicated by the advantage is that which the creature suffers to its base ability when carrying out its additional attack. Complete additional attack: The being can carry out an additional attack without any penalties to its final Attack.",
    effects: [
      { name: "Additional attack –60", cost: 20, gnosisMin: "0" },
      { name: "Additional attack –50", cost: 30, gnosisMin: "0" },
      { name: "Additional attack –40", cost: 40, gnosisMin: "0" },
      { name: "Additional attack –30", cost: 50, gnosisMin: "5" },
      { name: "Additional attack –20", cost: 60, gnosisMin: "5" },
      { name: "Additional attack –10", cost: 80, gnosisMin: "10" },
      { name: "Complete additional attack", cost: 100, gnosisMin: "15" }
    ]
  }),
  IncreasedReaction: createNPCPower({
    name: "Increased Reaction",
    type: "Offensive",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "The beings reaction is faster than what would seem natural, for which it adds a bonus to its Initiative. +X to the natural Initiative: It indicates the amount that is added to the calculation of the initiative of the being in combat, be that using its physical weapons, spells or other special abilities.",
    effects: [
      { name: "+10 to the natural Initiative", cost: 10, gnosisMin: "0" },
      { name: "+20 to the natural Initiative", cost: 20, gnosisMin: "10" },
      { name: "+30 to the natural Initiative", cost: 30, gnosisMin: "20" }
    ]
  }),
  DamageEnergy: createNPCPower({
    name: "Damage Energy",
    type: "Offensive",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "This allows to damage beings that are based on energy to be harmed the same as the Ki ability Presence Extrusion. It affects all the attacks it carries out.",
    effects: [{ name: "Damage energy", cost: 10, gnosisMin: "10" }]
  }),
  ArmorModifier: createNPCPower({
    name: "Armor Modifier",
    type: "Offensive",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "The natural weapons of the being are prepared to get past with ease even the most resistant armor, for which the defender applies a penalty to his AT. It only affects one of the attacks carried out. -X to the defenders AT: It is the penalty suffered by the defenders AT against one of the beings attack.",
    effects: [
      { name: "–1 to the defenders AT", cost: 10, gnosisMin: "0" },
      { name: "–2 to the defenders AT", cost: 15, gnosisMin: "10" },
      { name: "–3 to the defenders AT", cost: 20, gnosisMin: "15" },
      { name: "–4 to the defenders AT", cost: 25, gnosisMin: "20" },
      { name: "–5 to the defenders AT", cost: 30, gnosisMin: "25" }
    ]
  }),
  SpecialAttack: createNPCPower({
    name: "Special Attack",
    type: "Offensive",
    prohibitions:
      " If the being is an elemental, the attack is carried out in the element that it belongs to.",
    notes: "",
    purchased: false,
    description:
      "The being has the ability to use a special attack, different to the ones that it normally makes. It can be anything imaginable: a supernatural breath in the shape of a cone, the ability to throw explosive spores around itself or project energy at a distance. It is considered an active action, for which the creature must have the ability to act and renounce during this turn one of its natural attacks, to use the special attack in its place. It uses the combat ability of the character (or, in its defect, its Psychic or Magic Projection), but it has an independent damage to those created by his other attacks, that is acquired using the DP indicated in the section of Damage. It can only be used once per day, except if new uses are obtained.",
    effects: [
      // DISTANCE
      { name: "Distance: Up to 80 feet", cost: 10, gnosisMin: "5" },
      { name: "Distance: Up to 150 feet", cost: 20, gnosisMin: "10" },
      { name: "Distance: Up to 300 feet", cost: 30, gnosisMin: "15" },
      { name: "Distance: Up to 800 feet", cost: 40, gnosisMin: "20" },
      { name: "Distance: Up to 1,500 feet", cost: 50, gnosisMin: "25" },
      { name: "Distance: Up to one mile", cost: 60, gnosisMin: "30" },
      { name: "Distance: Up to five miles", cost: 70, gnosisMin: "35" },
      { name: "Distance: Any visible distance", cost: 80, gnosisMin: "40" },

      // DAMAGE
      { name: "Damage: Base 40", cost: 10, gnosisMin: "5" },
      { name: "Damage: Base 50", cost: 15, gnosisMin: "10" },
      { name: "Damage: Base 60", cost: 20, gnosisMin: "10" },
      { name: "Damage: Base 80", cost: 25, gnosisMin: "10" },
      { name: "Damage: Base 100", cost: 30, gnosisMin: "15" },
      { name: "Damage: Base 120", cost: 50, gnosisMin: "20" },
      { name: "Damage: Base 150", cost: 60, gnosisMin: "20" },
      { name: "Damage: Base 200", cost: 80, gnosisMin: "25" },
      { name: "Damage: Base 250", cost: 100, gnosisMin: "30" },

      // AREA
      { name: "Area: 5-foot radius", cost: 10, gnosisMin: "10" },
      { name: "Area: 10-foot radius", cost: 20, gnosisMin: "10" },
      { name: "Area: 15-foot radius", cost: 30, gnosisMin: "15" },
      { name: "Area: 30-foot radius", cost: 40, gnosisMin: "20" },
      { name: "Area: 80-foot radius", cost: 50, gnosisMin: "25" },
      { name: "Area: 150-foot radius", cost: 60, gnosisMin: "30" },
      { name: "Area: 300-foot radius", cost: 80, gnosisMin: "35" },

      // ADDITIONAL USES
      { name: "Additional use per day", cost: 5, gnosisMin: "10" },
      { name: "Unlimited uses", cost: 60, gnosisMin: "20" },

      // PREPARATION PENALTIES
      { name: "Requires 1 turn to prepare", cost: -10, gnosisMin: "5" },
      { name: "Requires 2 turns to prepare", cost: -20, gnosisMin: "5" },
      { name: "Requires 3 turns to prepare", cost: -30, gnosisMin: "5" },
      { name: "Requires 5 turns to prepare", cost: -40, gnosisMin: "5" },
      { name: "Requires 10 turns to prepare", cost: -50, gnosisMin: "5" }
    ]
  }),

  PoisonedAttack: createNPCPower({
    name: "Poisoned Attack",
    type: "Offensive",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "The being has the ability to poison its adversaries when it causes them damage. If the character struck takes damage, he must immediately pass a VR so as not to be affected by it. The poison can be put together freely, using the rules in Chapter 14. It only effects one of the attacks that being produces, for which it will have to be obtained several times if it wants to use it on additional attacks. If it is desired, it can be attached to one of its Special attacks, instead of one of its physical strikes.",
    effects: [
      { name: "Poison level 10", cost: 10, gnosisMin: "0" },
      { name: "Poison level 20", cost: 20, gnosisMin: "0" },
      { name: "Poison level 30", cost: 30, gnosisMin: "0" },
      { name: "Poison level 40", cost: 40, gnosisMin: "0" },
      { name: "Poison level 50", cost: 50, gnosisMin: "0" },
      { name: "Poison level 60", cost: 60, gnosisMin: "0" },
      { name: "Poison level 70", cost: 80, gnosisMin: "0" },
      { name: "Poison level 80", cost: 100, gnosisMin: "10" },
      { name: "Poison level 90", cost: 140, gnosisMin: "20" },
      { name: "Poison level 100", cost: 180, gnosisMin: "30" }
    ]
  }),

  AddedMysticalEffectResistance: createNPCPower({
    name: "Added Mystical Effect (Resistance)",
    type: "Offensive",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "The creature has supernatural powers that allows it to submit its adversaries to various esoteric states, if it is able to cause them damage with one of its attacks. When an individual is struck by an attack that causes damage and has an added mystical effect, he will have to pass a Resistance check to avoid its effects.",
    effects: [
      { name: "MR or PhR 40", cost: 20, gnosisMin: "5" },
      { name: "MR or PhR 60", cost: 30, gnosisMin: "10" },
      { name: "MR or PhR 80", cost: 40, gnosisMin: "15" },
      { name: "MR or PhR 100", cost: 50, gnosisMin: "15" },
      { name: "MR or PhR 120", cost: 60, gnosisMin: "20" },
      { name: "MR or PhR 140", cost: 80, gnosisMin: "25" },
      { name: "MR or PhR 160", cost: 100, gnosisMin: "30" },
      { name: "MR or PhR 180", cost: 120, gnosisMin: "35" },
      { name: "MR or PhR 200", cost: 140, gnosisMin: "40" }
    ]
  }),

  AddedMysticalEffectStates: createNPCPower({
    name: "Added Mystical Effect (States)",
    type: "Offensive",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "Effects that the target is submitted to if it fails its Resistance check. These can be attached to one of the being’s attacks or to a Special Attack.",
    effects: [
      { name: "Fear", cost: 20, gnosisMin: "10" },
      { name: "Terror", cost: 60, gnosisMin: "20" },
      { name: "Pain", cost: 20, gnosisMin: "10" },
      { name: "Extreme pain", cost: 40, gnosisMin: "20" },
      { name: "Weakness", cost: 50, gnosisMin: "10" },
      { name: "Partial paralysis", cost: 40, gnosisMin: "20" },
      { name: "Total paralysis", cost: 80, gnosisMin: "20" },
      { name: "Rage", cost: 20, gnosisMin: "20" },
      { name: "Blindness", cost: 50, gnosisMin: "10" },
      { name: "Deafness", cost: 10, gnosisMin: "10" },
      { name: "Mute", cost: 10, gnosisMin: "10" },
      { name: "Fascination", cost: 20, gnosisMin: "20" },
      { name: "Simple damage", cost: 30, gnosisMin: "10" },
      { name: "Double damage", cost: 60, gnosisMin: "20" },
      { name: "Unconsciousness", cost: 100, gnosisMin: "20" },
      { name: "Dominate", cost: 120, gnosisMin: "25" },
      { name: "Death", cost: 140, gnosisMin: "25" },
      { name: "Madness", cost: 20, gnosisMin: "20" },
      { name: "Age", cost: 60, gnosisMin: "20" },
      { name: "All Action Penalty", cost: 60, gnosisMin: "20" },
      { name: "Destroy characteristics", cost: 120, gnosisMin: "20" },
      { name: "Possession", cost: 120, gnosisMin: "25" }
    ]
  }),

  AddedMysticalEffectDrain: createNPCPower({
    name: "Added Mystical Effect (Drain)",
    type: "Offensive",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "Drain: It allows the being to drain the life points that he produces with its attack, if the affected individual does not pass a Resistance check.",
    effects: [
      { name: "Drain (Half)", cost: 20, gnosisMin: "10" },
      { name: "Drain (Complete)", cost: 50, gnosisMin: "15" },
      { name: "Drain (Double)", cost: 100, gnosisMin: "20" }
    ]
  }),

  AddedMysticalEffectAdditional: createNPCPower({
    name: "Added Mystical Effect (Additional Effect)",
    type: "Offensive",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "Additional effect: It permits to attach new effects to the same Resistance, making it possible that a single attack can produce various states at the same time.",
    effects: [{ name: "Additional Effect", cost: 10, gnosisMin: "10" }]
  }),

  AddedMysticalEffectConditional: createNPCPower({
    name: "Added Mystical Effect (Conditional)",
    type: "Offensive",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "Conditional effect: This means that the being can only cause the effect under an additional determined circumstance.",
    effects: [{ name: "Conditional Effect", cost: -20, gnosisMin: "10" }]
  }),

  IncreasedCritical: createNPCPower({
    name: "Increased Critical",
    type: "Offensive",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "The attacks of the being have the ability to cause additional consequences, for which the value of the critical is increased in the case that it is produced. It only affects one of the attacks carried out.",
    effects: [
      { name: "+10 to critical", cost: 10, gnosisMin: "0" },
      { name: "+20 to critical", cost: 20, gnosisMin: "0" },
      { name: "+30 to critical", cost: 30, gnosisMin: "0" },
      { name: "+40 to critical", cost: 40, gnosisMin: "5" },
      { name: "+50 to critical", cost: 50, gnosisMin: "5" },
      { name: "+60 to critical", cost: 60, gnosisMin: "10" },
      { name: "+70 to critical", cost: 70, gnosisMin: "20" },
      { name: "+80 to critical", cost: 80, gnosisMin: "30" },
      { name: "+90 to critical", cost: 90, gnosisMin: "30" },
      { name: "+100 to critical", cost: 100, gnosisMin: "40" }
    ]
  }),

  Trapping: createNPCPower({
    name: "Trapping",
    type: "Offensive",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "The creature is provided with the natural ability to carry out a Trapping attack. The attack uses the rules of Trapping maneuvers described in Chapter 9 on combat, but does not apply any penalties to its offensive abilities in carrying it out.",
    effects: [
      { name: "Trapping 6", cost: 10, gnosisMin: "0" },
      { name: "Trapping 8", cost: 20, gnosisMin: "0" },
      { name: "Trapping 10", cost: 30, gnosisMin: "0" },
      { name: "Trapping 12", cost: 40, gnosisMin: "10" },
      { name: "Trapping 14", cost: 60, gnosisMin: "20" },
      { name: "Trapping 16", cost: 80, gnosisMin: "25" }
    ]
  }),

  SupernaturalAttack: createNPCPower({
    name: "Supernatural Attack",
    type: "Offensive",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "This means that the method normally used for attacking by the being is mystical in origin, which means that it can only be stopped by using weapons or means that are capable of stopping energy. It also allows the attacks to be carried out on the AT of Energy.",
    effects: [{ name: "Supernatural Attack", cost: 60, gnosisMin: "20" }]
  }),

  ElementalAttack: createNPCPower({
    name: "Elemental Attack",
    type: "Offensive",
    prohibitions: "Elemental beings are obligated in using their own element.",
    notes: "",
    purchased: false,
    description:
      "The nature of the being causes its attacks to be carried out by using a specific element. Those based on fire can attack on the AT of Heat, those based on Air can attack with Electricity, Cut or Impact, and those based on Water on the AT of Cold or that of Impact.",
    effects: [{ name: "Elemental Attack", cost: 10, gnosisMin: "10" }]
  }),

  //#endregion
  //#region Movement And Transport
  SpecialMovement: createNPCPower({
    name: "Special Movement",
    type: "Movement",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "In this section are gathered the abilities of some beings to move using unusual means.",
    effects: [
      { name: "Aquatic movement", cost: 20, gnosisMin: "0" },
      { name: "Free movement", cost: 20, gnosisMin: "5" },
      { name: "Movement without weight", cost: 10, gnosisMin: "15" },
      { name: "Subterranean movement", cost: 10, gnosisMin: "0" },
      { name: "Superior subterranean movement", cost: 30, gnosisMin: "20" },
      { name: "Free movement through nature", cost: 10, gnosisMin: "10" }
    ]
  }),

  AutomaticTransport: createNPCPower({
    name: "Automatic Transport",
    type: "Movement",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "This ability allows a being to instantly transport itself from one place to another. It cannot go through surfaces sealed by energy or supernatural origin. It is Active and can only be used once per day unless additional uses are purchased.",
    effects: [
      // DISTANCES
      { name: "Distance: 60 feet", cost: 10, gnosisMin: "10" },
      { name: "Distance: 150 feet", cost: 20, gnosisMin: "10" },
      { name: "Distance: 300 feet", cost: 40, gnosisMin: "15" },
      { name: "Distance: 800 feet", cost: 60, gnosisMin: "15" },
      { name: "Distance: 1,500 feet", cost: 80, gnosisMin: "20" },
      { name: "Distance: 1 mile", cost: 100, gnosisMin: "20" },
      { name: "Distance: 3 miles", cost: 120, gnosisMin: "25" },
      { name: "Distance: 15 miles", cost: 140, gnosisMin: "30" },
      { name: "Distance: 60 miles", cost: 160, gnosisMin: "35" },
      { name: "Door", cost: 200, gnosisMin: "35" },

      // USES
      { name: "An additional time", cost: 10, gnosisMin: "10" },
      { name: "Unlimited amount of times", cost: 100, gnosisMin: "35" },

      // PENALTIES
      { name: "Requires 1 turn to prepare", cost: -10, gnosisMin: "10" },
      { name: "Requires 5 turns to prepare", cost: -30, gnosisMin: "10" },
      { name: "Requires 10 turns to prepare", cost: -50, gnosisMin: "10" },
      { name: "Through a specific terrain or element", cost: -30, gnosisMin: "10" }
    ]
  }),

  IncreasedMovement: createNPCPower({
    name: "Increased Movement",
    type: "Movement",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description: "The being has a Movement Value greater than what its Agility indicates.",
    effects: [
      { name: "Movement Value +1", cost: 10, gnosisMin: "0" },
      { name: "Movement Value +2", cost: 20, gnosisMin: "5" },
      { name: "Movement Value +3", cost: 30, gnosisMin: "10" },
      { name: "Movement Value +4", cost: 40, gnosisMin: "20" }
    ]
  }),

  NaturalFlight: createNPCPower({
    name: "Natural Flight",
    type: "Movement",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "The being is provided with extremities that function like wings and allow it to fly. It must keep them in good condition and have enough room to flap them. If it receives a critical that produces a negative consequence, it is immediately knocked down.",
    effects: [
      { name: "Natural flight 6", cost: 40, gnosisMin: "0" },
      { name: "Natural flight 8", cost: 60, gnosisMin: "0" },
      { name: "Natural flight 10", cost: 80, gnosisMin: "0" },
      { name: "Natural flight 12", cost: 100, gnosisMin: "0" },
      { name: "Natural flight 14", cost: 120, gnosisMin: "10" }
    ]
  }),

  MysticalFlight: createNPCPower({
    name: "Mystical Flight",
    type: "Movement",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "Same as Natural Flight, except the being flies thanks to supernatural powers. It can elevate itself under any condition and is not knocked down even if it suffers a critical.",
    effects: [
      { name: "Mystical flight 4", cost: 20, gnosisMin: "10" },
      { name: "Mystical flight 6", cost: 40, gnosisMin: "15" },
      { name: "Mystical flight 8", cost: 60, gnosisMin: "20" },
      { name: "Mystical flight 10", cost: 80, gnosisMin: "20" },
      { name: "Mystical flight 12", cost: 100, gnosisMin: "25" },
      { name: "Mystical flight 14", cost: 120, gnosisMin: "30" },
      { name: "Mystical flight 16", cost: 140, gnosisMin: "35" },

      // PENALTY
      { name: "Conditional flight", cost: -20, gnosisMin: "10" }
    ]
  }),
  //#endregion
  //#region Resistances And Regeneration
  IncreasedPhysicalResistance: createNPCPower({
    name: "Increased Physical Resistance",
    type: "Resistances",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "The creature is especially prepared for withstanding physical effects. Therefore, apply a bonus to its three Physical resistances (PhR, VR, or DR).",
    effects: [
      { name: "+10 to Resistances", cost: 10, gnosisMin: "0" },
      { name: "+20 to Resistances", cost: 20, gnosisMin: "0" },
      { name: "+30 to Resistances", cost: 30, gnosisMin: "10" },
      { name: "+40 to Resistances", cost: 40, gnosisMin: "20" },
      { name: "+50 to Resistances", cost: 50, gnosisMin: "30" },

      // PENALTY
      { name: "Only to one Resistance", cost: -20, gnosisMin: "10" }
    ]
  }),

  MysticalPsychicResistance: createNPCPower({
    name: "Mystical & Psychic Resistance",
    type: "Resistances",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "It withstands the psychic and supernatural pretty well. Therefore, apply a bonus to one of the two Resistances (PsR or MR).",
    effects: [
      { name: "+10 to Supernatural resistance", cost: 10, gnosisMin: "10" },
      { name: "+20 to Supernatural resistance", cost: 20, gnosisMin: "15" },
      { name: "+30 to Supernatural resistance", cost: 30, gnosisMin: "20" },
      { name: "+40 to Supernatural resistance", cost: 40, gnosisMin: "25" },
      { name: "+50 to Supernatural resistance", cost: 50, gnosisMin: "35" }
    ]
  }),

  PenaltyMysticResistance: createNPCPower({
    name: "Penalty to Mystic Resistance",
    type: "Resistances",
    prohibitions:
      "With elemental beings, the penalty to Resistances is doubled by effects caused by its opposite element.",
    notes: "",
    purchased: false,
    description:
      "It is vulnerable to psychic attacks or those magic in nature, for which it possesses a penalty to its Resistances in one of the two fields.",
    effects: [
      { name: "–10 to Magic or Psychic Resistance", cost: 10, gnosisMin: "10" },
      { name: "–20 to Magic or Psychic Resistance", cost: 15, gnosisMin: "10" },
      { name: "–30 to Magic or Psychic Resistance", cost: 20, gnosisMin: "10" },
      { name: "–40 to Magic or Psychic Resistance", cost: 25, gnosisMin: "20" },
      { name: "–50 to Magic or Psychic Resistance", cost: 30, gnosisMin: "20" }
    ]
  }),

  Regeneration: createNPCPower({
    name: "Regeneration",
    type: "Resistances",
    prohibitions:
      "With elemental beings, the Regeneration does not work against wounds caused by the opposing element.",
    notes: "",
    purchased: false,
    description:
      "The creature has a different Regeneration than provided by its Constitution. This amount is not added to its base, but rather it substitutes it.",
    effects: [
      { name: "Regeneration 2", cost: 10, gnosisMin: "0" },
      { name: "Regeneration 4", cost: 20, gnosisMin: "0" },
      { name: "Regeneration 6", cost: 30, gnosisMin: "0" },
      { name: "Regeneration 8", cost: 40, gnosisMin: "5" },
      { name: "Regeneration 10", cost: 60, gnosisMin: "10" },
      { name: "Regeneration 12", cost: 100, gnosisMin: "15" },
      { name: "Regeneration 14", cost: 140, gnosisMin: "20" },
      { name: "Regeneration 16", cost: 160, gnosisMin: "25" },
      { name: "Regeneration 18", cost: 180, gnosisMin: "35" },
      { name: "Regeneration 19", cost: 200, gnosisMin: "45" },
      { name: "Regeneration 20", cost: 220, gnosisMin: "50" },

      // PENALTIES
      {
        name: "Regeneration does not work against an attack or condition",
        cost: -10,
        gnosisMin: "0"
      },
      { name: "Regeneration only works under certain situations", cost: -40, gnosisMin: "10" }
    ]
  }),

  Degeneration: createNPCPower({
    name: "Degeneration",
    type: "Resistances",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "Instead of regenerating, the being’s physical form degenerates daily and maintains any wounds that it has suffered.",
    effects: [
      { name: "Regeneration Zero", cost: 30, gnosisMin: "10" },
      { name: "–10 Life Points a day", cost: 40, gnosisMin: "10" },
      { name: "–25 Life Points a day", cost: 45, gnosisMin: "10" },
      { name: "–50 Life Points a day", cost: 50, gnosisMin: "10" },
      { name: "–100 Life Points a day", cost: 60, gnosisMin: "10" }
    ]
  }),
  //#endregion
  //#region Immunities
  Immunity: createNPCPower({
    name: "Immunity",
    type: "Immunities",
    prohibitions:
      "Within elemental beings, the immunity does not function against attacks or effects caused by opposite elements.",
    notes: "",
    purchased: false,
    description:
      "It possesses a natural immunity against certain physical attacks, some spells or psychic abilities.",
    effects: [
      // PHYSICAL IMMUNITY
      { name: "Physical immunity (with any presence)", cost: 40, gnosisMin: "15" },
      { name: "Physical immunity (presence less than 80)", cost: 60, gnosisMin: "20" },
      { name: "Physical immunity (presence less than 100)", cost: 80, gnosisMin: "20" },
      { name: "Physical immunity (presence less than 120)", cost: 100, gnosisMin: "25" },
      { name: "Physical immunity (presence less than 140)", cost: 140, gnosisMin: "30" },
      { name: "Physical immunity (presence less than 160)", cost: 180, gnosisMin: "35" },

      // MAGICAL IMMUNITY
      { name: "Magical immunity (Zeonic value less than 60)", cost: 30, gnosisMin: "15" },
      { name: "Magical immunity (Zeonic value less than 80)", cost: 40, gnosisMin: "15" },
      { name: "Magical immunity (Zeonic value less than 100)", cost: 50, gnosisMin: "20" },
      { name: "Magical immunity (Zeonic value less than 150)", cost: 75, gnosisMin: "20" },
      { name: "Magical immunity (Zeonic value less than 200)", cost: 100, gnosisMin: "25" },
      { name: "Magical immunity (Zeonic value less than 250)", cost: 125, gnosisMin: "30" },
      { name: "Magical immunity (Zeonic value less than 300)", cost: 150, gnosisMin: "35" },

      // IMMUNITY TO MATRICES
      { name: "Immunity to matrices (Very Difficult Potential)", cost: 60, gnosisMin: "15" },
      { name: "Immunity to matrices (Absurd Potential)", cost: 80, gnosisMin: "20" },
      { name: "Immunity to matrices (Almost Impossible Potential)", cost: 120, gnosisMin: "25" },
      { name: "Immunity to matrices (Impossible Potential)", cost: 140, gnosisMin: "30" },

      // PENALTY
      { name: "Immunity conditions", cost: -30, gnosisMin: "15" }
    ]
  }),

  ExtremeVulnerability: createNPCPower({
    name: "Extreme Vulnerability",
    type: "Immunities",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "It is exceptionally weak or vulnerable against something that causes disastrous consequences to it.",
    effects: [
      // VULNERABILITY TRIGGERS
      { name: "Vulnerable to a specific element", cost: 20, gnosisMin: "15" },
      { name: "Vulnerable to a specific object", cost: 10, gnosisMin: "15" },
      { name: "Vulnerable to a word or sound", cost: 10, gnosisMin: "15" },
      { name: "Vulnerable to a generic material", cost: 20, gnosisMin: "15" },
      { name: "Vulnerable to a rare material", cost: 10, gnosisMin: "15" },
      { name: "Vulnerable in a specific place", cost: 10, gnosisMin: "20" },
      { name: "Vulnerable to a personal determined condition", cost: 10, gnosisMin: "25" },

      // CONSEQUENCES
      { name: "Consequence: Damage equal to level of failure", cost: 10, gnosisMin: "20" },
      { name: "Consequence: Penalty equal to level of failure", cost: 10, gnosisMin: "20" },
      { name: "Consequence: Unconsciousness", cost: 20, gnosisMin: "20" },
      { name: "Consequence: Complete paralysis", cost: 15, gnosisMin: "20" },
      { name: "Consequence: Weakness", cost: 10, gnosisMin: "20" },
      { name: "Consequence: Death", cost: 30, gnosisMin: "20" },

      // RESISTANCE VALUES
      { name: "Resistance MR/PhR 140", cost: 10, gnosisMin: "20" },
      { name: "Resistance MR/PhR 160", cost: 15, gnosisMin: "20" },
      { name: "Resistance MR/PhR 180", cost: 20, gnosisMin: "20" },
      { name: "Resistance MR/PhR 200", cost: 25, gnosisMin: "20" }
    ]
  }),

  DamageBarrier: createNPCPower({
    name: "Damage Barrier",
    type: "Immunities",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "For some reason, the being is immune to physical weapons that produce a base damage that is low. They apply the rules of damage barrier described in Chapter 14. This ability does not work against attacks capable of damaging energy.",
    effects: [
      { name: "Damage barrier 40", cost: 5, gnosisMin: "0" },
      { name: "Damage barrier 60", cost: 10, gnosisMin: "0" },
      { name: "Damage barrier 80", cost: 15, gnosisMin: "5" },
      { name: "Damage barrier 100", cost: 20, gnosisMin: "5" },
      { name: "Damage barrier 120", cost: 25, gnosisMin: "10" },
      { name: "Damage barrier 140", cost: 30, gnosisMin: "10" },
      { name: "Damage barrier 160", cost: 40, gnosisMin: "10" }
    ]
  }),
  //#endregion
  //#region Armor
  PhysicalArmor: createNPCPower({
    name: "Physical Armor",
    type: "Armor",
    prohibitions: "Within elementals they do not have protection against their opposite element.",
    notes: "",
    purchased: false,
    description:
      "The being possesses a natural armor of some type, like scales or plates, that protects it from physical impacts. It is applied against all the types of attacks except those that are applied to the AT of Energy. It protects the same across the entire body. This class of armor can be used in combination with other layers of constructed armor, but it does not produce any type of added penalty to Initiative.",
    effects: [
      { name: "AT 1", cost: 10, gnosisMin: "0" },
      { name: "AT 2", cost: 20, gnosisMin: "0" },
      { name: "AT 3", cost: 30, gnosisMin: "0" },
      { name: "AT 4", cost: 40, gnosisMin: "5" },
      { name: "AT 5", cost: 50, gnosisMin: "10" },
      { name: "AT 6", cost: 60, gnosisMin: "15" },
      { name: "AT 7", cost: 80, gnosisMin: "20" },
      { name: "AT 8", cost: 100, gnosisMin: "25" },
      { name: "AT 9", cost: 120, gnosisMin: "30" },
      { name: "AT 10", cost: 140, gnosisMin: "35" },
      { name: "AT 12", cost: 180, gnosisMin: "40" },

      // PENALTIES
      { name: "Limited", cost: -10, gnosisMin: "0" },
      { name: "Open", cost: -10, gnosisMin: "0" }
    ]
  }),

  MysticalArmor: createNPCPower({
    name: "Mystical Armor",
    type: "Armor",
    prohibitions:
      "Within elementals they do not possess protection against spells of the opposing element.",
    notes: "",
    purchased: false,
    description:
      "Same as Physical Armor, except in this case the being possesses a supernatural aura that especially protects it against magic and mystical effects.",
    effects: [
      { name: "AT 1", cost: 10, gnosisMin: "5" },
      { name: "AT 2", cost: 20, gnosisMin: "10" },
      { name: "AT 3", cost: 30, gnosisMin: "15" },
      { name: "AT 4", cost: 40, gnosisMin: "20" },
      { name: "AT 5", cost: 50, gnosisMin: "25" },
      { name: "AT 6", cost: 60, gnosisMin: "30" },
      { name: "AT 7", cost: 70, gnosisMin: "35" },
      { name: "AT 8", cost: 80, gnosisMin: "40" }
    ]
  }),
  //#endregion
  //#region Souls
  SpiritualAbilities: createNPCPower({
    name: "Spiritual Abilities",
    type: "Souls",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description: "A series of powers that can only be acquired by spirits.",
    effects: [
      {
        name: "Interaction with the world",
        cost: 30,
        gnosisMin: "30"
      },
      {
        name: "Manifestation",
        cost: 20,
        gnosisMin: "20"
      },
      {
        name: "Incarnation",
        cost: 60,
        gnosisMin: "30"
      }
    ]
  }),
  //#endregion
  //#region Innate Supernatural Abilities
  ElementalOrImmaterialForm: createNPCPower({
    name: "Elemental or Immaterial Form",
    type: "Innate",
    prohibitions:
      "Only the Living Dead can enter a spectral form. In the case of elementals, they must always choose a form that is in accord with their nature.",
    notes: "",
    purchased: false,
    description:
      "The being holds certain innate supernatural physical conditions. Elemental forms use the abilities described in the spells of physical transformation of level 52 of each elemental path. Spectral form is the necromancy level 52 spell. Immaterial form is naturally intangible.",
    effects: [
      { name: "Immaterial form", cost: 80, gnosisMin: "20" },
      { name: "Elemental form", cost: 100, gnosisMin: "20" },
      { name: "Spectral form", cost: 100, gnosisMin: "20" },
      { name: "Physical form at will", cost: 10, gnosisMin: "20" },

      // PENALTY
      { name: "Conditioned", cost: -20, gnosisMin: "20" }
    ]
  }),

  InnateMagic: createNPCPower({
    name: "Innate Magic",
    type: "Innate",
    prohibitions:
      "In the case of elemental beings, the spell needs to be of the path that corresponds to its element, or in defect, one of free access that is not closed off to it. If this ability is chosen through a spell of Acquire Powers or of Creation of beings, it is only possible to choose spells that the warlock is capable of using, and he will have to pay its Zeonic cost as well, as an added value to the spell that he has cast.",
    notes: "",
    purchased: false,
    description:
      "The being can innately cast a spell without paying Zeon or needing the Gift. Cost is 20 + spell Zeon + maintenance. Gnosis required is half the spell level, rounded up to nearest 5. Each spell is purchased separately and used once per day unless additional uses are bought.",
    effects: [
      { name: "Innate spell (variable cost)", cost: "20+", gnosisMin: "Variable" },
      { name: "An additional use", cost: 5, gnosisMin: "10" },
      { name: "Unlimited uses", cost: 100, gnosisMin: "30" },

      // PENALTIES
      { name: "Conditioned", cost: -30, gnosisMin: "10" },
      { name: "Requires 1 full turn to prepare", cost: -10, gnosisMin: "10" },
      { name: "Requires 2 full turns to prepare", cost: -20, gnosisMin: "10" },
      { name: "Requires 3 full turns to prepare", cost: -30, gnosisMin: "10" },
      { name: "Requires 5 full turns to prepare", cost: -40, gnosisMin: "10" },
      { name: "Requires 10 full turns to prepare", cost: -50, gnosisMin: "10" }
    ]
  }),

  InnatePsychicAbilities: createNPCPower({
    name: "Innate Psychic Abilities",
    type: "Innate",
    prohibitions:
      "The water elemental beings cannot use pyrokinetic powers, the same way that those made of fire will not have access to the cryokinetic ones.",
    notes: "",
    purchased: false,
    description:
      "The being possesses an innate psychic power that does not use the general rule for mental abilities. Cost is 20 + half the Potential. Gnosis required: 5 for level 1, 15 for level 2, 25 for level 3. Each power is purchased separately and used once per day unless additional uses are bought.",
    effects: [
      { name: "Innate power (variable cost)", cost: "20+", gnosisMin: "Variable" },
      { name: "An additional use", cost: 5, gnosisMin: "10" },
      { name: "Unlimited uses", cost: 80, gnosisMin: "25" },

      // PENALTIES
      { name: "Conditioned", cost: -30, gnosisMin: "10" },
      { name: "Requires 1 full turn to prepare", cost: -10, gnosisMin: "10" },
      { name: "Requires 2 full turns to prepare", cost: -20, gnosisMin: "10" },
      { name: "Requires 3 full turns to prepare", cost: -30, gnosisMin: "10" },
      { name: "Requires 5 full turns to prepare", cost: -40, gnosisMin: "10" },
      { name: "Requires 10 full turns to prepare", cost: -50, gnosisMin: "10" }
    ]
  }),

  Metamorphosis: createNPCPower({
    name: "Metamorphosis",
    type: "Innate",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "The creature possesses the ability to change its aspect freely. Basic metamorphosis alters minor traits. Metamorphosis allows doubling or halving size. Advanced metamorphosis allows any shape within 10× size limits.",
    effects: [
      { name: "Basic metamorphosis", cost: 40, gnosisMin: "15" },
      { name: "Metamorphosis", cost: 60, gnosisMin: "20" },
      { name: "Advanced metamorphosis", cost: 100, gnosisMin: "25" },

      // PENALTY
      { name: "Conditioned", cost: -20, gnosisMin: "20" }
    ]
  }),

  InvisibilityUndetectable: createNPCPower({
    name: "Invisibility and Undetectable",
    type: "Innate",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "Powers that allow creatures to avoid being detected by natural or mystical means.",
    effects: [
      // MYSTICAL UNDETECTABLE
      { name: "Mystically undetectable (+50 Resistances)", cost: 10, gnosisMin: "10" },
      { name: "Mystically undetectable (+100 Resistances)", cost: 20, gnosisMin: "20" },
      { name: "Mystically undetectable (+150 Resistances)", cost: 40, gnosisMin: "20" },
      { name: "Mystically undetectable (+200 Resistances)", cost: 80, gnosisMin: "25" },

      // OTHER FORMS
      { name: "Chameleonic camouflage", cost: 50, gnosisMin: "10" },
      { name: "Spiritual invisibility", cost: 80, gnosisMin: "20" },
      { name: "Invisibility", cost: 100, gnosisMin: "25" },
      { name: "Complete invisibility", cost: 150, gnosisMin: "30" },
      { name: "Undetectable to a sense", cost: 50, gnosisMin: "10" },

      // PENALTY
      { name: "Only works under certain situations", cost: -30, gnosisMin: "20" }
    ]
  }),

  Aura: createNPCPower({
    name: "Aura",
    type: "Innate",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "The creature irradiates a strong magical aura that automatically influences anyone within its radius. Works like an automatic spell with a Resistance check.",
    effects: [
      // AREA
      { name: "Area: 5-foot radius", cost: 40, gnosisMin: "20" },
      { name: "Area: 15-foot radius", cost: 60, gnosisMin: "20" },
      { name: "Area: 30-foot radius", cost: 80, gnosisMin: "25" },
      { name: "Area: 80-foot radius", cost: 100, gnosisMin: "25" },
      { name: "Area: 150-foot radius", cost: 120, gnosisMin: "30" },
      { name: "Area: 300-foot radius", cost: 140, gnosisMin: "35" },

      // RESISTANCE
      { name: "Resistance MR/PhR 40", cost: 20, gnosisMin: "20" },
      { name: "Resistance MR/PhR 60", cost: 30, gnosisMin: "20" },
      { name: "Resistance MR/PhR 80", cost: 40, gnosisMin: "25" },
      { name: "Resistance MR/PhR 100", cost: 50, gnosisMin: "25" },
      { name: "Resistance MR/PhR 120", cost: 60, gnosisMin: "30" },
      { name: "Resistance MR/PhR 140", cost: 80, gnosisMin: "35" },

      // EFFECTS
      { name: "Fear", cost: 60, gnosisMin: "20" },
      { name: "Terror", cost: 80, gnosisMin: "30" },
      { name: "Pain", cost: 60, gnosisMin: "20" },
      { name: "Extreme pain", cost: 80, gnosisMin: "25" },
      { name: "Weakness", cost: 100, gnosisMin: "20" },
      { name: "Partial paralysis", cost: 80, gnosisMin: "20" },
      { name: "Complete paralysis", cost: 120, gnosisMin: "30" },
      { name: "Rage", cost: 60, gnosisMin: "20" },
      { name: "Blindness", cost: 80, gnosisMin: "20" },
      { name: "Deafness", cost: 40, gnosisMin: "20" },
      { name: "Mute", cost: 40, gnosisMin: "20" },
      { name: "Fascination", cost: 40, gnosisMin: "20" },
      { name: "Simple damage", cost: 60, gnosisMin: "20" },
      { name: "Double damage", cost: 100, gnosisMin: "30" },
      { name: "Unconsciousness", cost: 120, gnosisMin: "20" },
      { name: "Dominate", cost: 140, gnosisMin: "30" },
      { name: "Death", cost: 160, gnosisMin: "35" },
      { name: "Madness", cost: 40, gnosisMin: "20" },
      { name: "Age", cost: 80, gnosisMin: "25" },
      { name: "Petrification", cost: 140, gnosisMin: "30" },
      { name: "All Action Penalty", cost: 100, gnosisMin: "20" },
      { name: "Link an additional effect", cost: 10, gnosisMin: "20" },

      // PENALTY
      { name: "Additional condition", cost: -30, gnosisMin: "20" }
    ]
  }),
  //#endregion
  //#region Special Perceptions
  SpecialMeansOfVision: createNPCPower({
    name: "Special Means of Vision",
    type: "Perceptions",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description: "This ability grants creatures advantages when using their sense of sight.",
    effects: [
      { name: "Night vision", cost: 10, gnosisMin: "0" },
      { name: "Complete night vision", cost: 20, gnosisMin: "10" },
      { name: "Extrasensorial vision", cost: 30, gnosisMin: "10" },
      { name: "See magic", cost: 10, gnosisMin: "10" },
      { name: "See matrices", cost: 10, gnosisMin: "10" },
      { name: "See spirits", cost: 10, gnosisMin: "10" },
      { name: "See the supernatural", cost: 30, gnosisMin: "20" }
    ]
  }),

  SupernaturalDetection: createNPCPower({
    name: "Supernatural Detection",
    type: "Perceptions",
    prohibitions: "",
    purchasedabilities: [],
    notes: "",
    purchased: false,
    description:
      "The creature has the supernatural ability to locate things or people around it under certain conditions. Equivalent to Detection spells. Requires choosing area, resistance, and what is detected.",
    effects: [
      // AREA
      { name: "Area: 15 feet", cost: 10, gnosisMin: "10" },
      { name: "Area: 30 feet", cost: 20, gnosisMin: "10" },
      { name: "Area: 80 feet", cost: 30, gnosisMin: "15" },
      { name: "Area: 150 feet", cost: 40, gnosisMin: "15" },
      { name: "Area: 200 feet", cost: 50, gnosisMin: "20" },
      { name: "Area: 1,500 feet", cost: 60, gnosisMin: "20" },
      { name: "Area: One mile", cost: 80, gnosisMin: "25" },

      // RESISTANCE
      { name: "Resistance: MR 100", cost: 10, gnosisMin: "10" },
      { name: "Resistance: MR 140", cost: 20, gnosisMin: "10" },
      { name: "Resistance: MR 180", cost: 40, gnosisMin: "15" },
      { name: "Resistance: MR 220", cost: 80, gnosisMin: "20" },
      { name: "Resistance: MR 260", cost: 120, gnosisMin: "25" },

      // DETECTION TYPES
      { name: "Detect life", cost: 20, gnosisMin: "10" },
      { name: "Detect something specific", cost: 30, gnosisMin: "20" }
    ]
  })
  //#endregion
};

//#endregion
