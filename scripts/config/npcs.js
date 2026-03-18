export function createNPCAdvantage(NPCAdvInput) {
  const { name = "", cost = 0, gnosisMin = "0", description = "", notes = "" } = NPCAdvInput;

  return {
    name,
    cost,
    gnosisMin,
    description,
    notes
  };
}

export function createNPCDisadvantage(NPCDisInput) {
  const { name = "", bonus = 0, gnosisMin = "0", description = "", notes = "" } = NPCDisInput;

  return {
    name,
    bonus,
    gnosisMin,
    description,
    notes
  };
}

export function createNPCPower(NPCDisInput) {
  const { name = "", description = "", notes = "", type = "", effects = [] } = NPCPowerInput;

  return {
    name,
    bonus,
    gnosisMin,
    description,
    notes,
    type,
    effects
  };
}

//#region Advantages and Disadvanatges
export const ABF_NPC_ADVANTAGES = {
  FatigueResistance: createNPCAdvantage({
    name: "Fatigue Resistance",
    cost: 10,
    gnosisMin: "0",
    description:
      "This Advantage grants two additional points to Fatigue. It can be acquired several times to gain greater benefits."
  }),

  Gift: createNPCAdvantage({
    name: "Gift",
    cost: 30,
    gnosisMin: "5",
    notes: "",
    description:
      "The being is able to use magic. If we are dealing with an elemental, he possesses a bonus of +20 to his MA on the path that he is attuned to, and a –20 on the opposite one."
  }),

  AccessToAPsychicDiscipline: createNPCAdvantage({
    name: "Access to a Psychic Discipline",
    cost: 15,
    gnosisMin: "5",
    notes: "",
    description:
      "The being can use its PP to acquire an affinity to a single psychic discipline and use its powers. Fire elementals cannot use cryokinetic powers, and vice versa."
  }),

  AccessToPsychicDisciplines: createNPCAdvantage({
    name: "Access to Psychic Disciplines",
    cost: 30,
    gnosisMin: "5",
    notes: "",
    description: "Same as the one before, except that it grants access to several disciplines."
  }),

  AcuteSense: createNPCAdvantage({
    name: "Acute Sense",
    cost: 10,
    gnosisMin: "0",
    notes: "",
    description:
      "One of its five senses is especially developed. Therefore, apply a bonus of +30 to any perception-based Secondary Ability Check that implies its use."
  }),

  Attuned: createNPCAdvantage({
    name: "Attuned",
    cost: 10,
    gnosisMin: "5",
    notes: "",
    description:
      "The being is attuned to something specifically, from a type of being to an element. If it is an element, it receives a bonus of +20 to any Resistance that is rolled against effects caused by it. If, on the other hand, it is a class of creature, any member of said species will feel some kind of tie towards it, as if it belonged to the same race."
  }),

  SuperhumanPhysicalCharacteristics: createNPCAdvantage({
    name: "Superhuman Physical Characteristics",
    cost: 20,
    gnosisMin: "0",
    notes: "",
    description:
      "It extends the maximum limit you can choose for physical Characteristics (STR, DEX, AGI, CON and PER) to a maximum of 13."
  }),

  SuperhumanSpiritualCharacteristics: createNPCAdvantage({
    name: "Superhuman Spiritual Characteristics",
    cost: 20,
    gnosisMin: "5",
    notes: "",
    description:
      "It extends the maximum limit you can choose for spiritual Characteristics (STR, DEX, AGI, CON and PER) to a maximum of 13."
  }),

  SupernaturalPhysicalCharacteristics: createNPCAdvantage({
    name: "Supernatural Physical Characteristics",
    cost: 40,
    gnosisMin: "20",
    notes: "",
    description:
      "The same as the previous ones, except that the maximum limit of the physical Characteristics is increased to 15."
  }),

  SupernaturalSpiritualCharacteristics: createNPCAdvantage({
    name: "Supernatural Spiritual Characteristics",
    cost: 40,
    gnosisMin: "20",
    notes: "",
    description:
      "The same as the previous ones, except that it affects the spiritual Characteristics."
  }),

  DivinePhysicalCharacteristics: createNPCAdvantage({
    name: "Divine Physical Characteristics",
    cost: 80,
    gnosisMin: "30",
    notes: "",
    description: "The GM can grant any value to the physical Characteristic of the being."
  }),

  DivineSpiritualCharacteristics: createNPCAdvantage({
    name: "Divine Spiritual Characteristics",
    cost: 80,
    gnosisMin: "35",
    notes: "",
    description:
      "The same as the previous ones, except that it affects the spiritual Characteristics."
  }),

  AttributeIncreasedPlus1: createNPCAdvantage({
    name: "Attribute Increased +1",
    cost: 20,
    gnosisMin: "0",
    notes: "",
    description:
      "This ability only can be acquired through the use of spells that grant monster abilities or to create racial modifiers of a natural ethnicity. In these cases, they grant a +1 to a Characteristic and it can be acquired again to increase a different one. It cannot be chosen twice for the same Characteristic."
  }),

  AttributeIncreasedPlus2: createNPCAdvantage({
    name: "Attribute Increased +2",
    cost: 40,
    gnosisMin: "5",
    notes: "",
    description: "The same as the previous ones, except that it grants a +2 to the Characteristic."
  }),

  AttributeIncreasedPlus3: createNPCAdvantage({
    name: "Attribute Increased +3",
    cost: 60,
    gnosisMin: "Variable",
    notes: "",
    description:
      "The same as the previous ones, except that it grants a +3 to the Characteristic. This ability can be chosen again to increase even further the same Characteristic, and in which case it grants a cumulative +1 to the previous bonus. That is to say, it provides a +4 if acquired twice, a +5 if it is chosen three times, etc. The base Gnosis of this ability is 15 but every time it is selected again it increases its value by 5 points."
  }),

  UnnaturalSize: createNPCAdvantage({
    name: "Unnatural Size",
    cost: 10,
    gnosisMin: "0",
    description:
      "The GM can increase or decrease the base Size of the being by a maximum of 5 points."
  }),

  Ambidextrous: createNPCAdvantage({
    name: "Ambidextrous",
    cost: 30,
    gnosisMin: "0",
    description: "It works the same way as the creation Advantage of the same name."
  }),

  Inhumanity: createNPCAdvantage({
    name: "Inhumanity",
    cost: 10,
    gnosisMin: "0",
    description:
      "For all intents and purposes, it works the same way as the Ki Ability that has the same name."
  }),

  Zen: createNPCAdvantage({
    name: "Zen",
    cost: 20,
    gnosisMin: "25",
    description:
      "The being can carry out naturally physical actions that have a difficulty of Zen and have the full benefits of its Characteristics. It works like the Ki Ability with the same name."
  }),

  AquaticBreathing: createNPCAdvantage({
    name: "Aquatic Breathing",
    cost: 10,
    gnosisMin: "0",
    description: "The creature can breathe underwater without difficulty."
  }),
  WithoutUnconsciousness: createNPCAdvantage({
    name: "Without Unconsciousness",
    cost: 10,
    gnosisMin: "5",
    description:
      "The creature cannot become unconscious, regardless of what critical results or supernatural effects indicate."
  }),

  Tireless: createNPCAdvantage({
    name: "Tireless",
    cost: 20,
    gnosisMin: "15",
    description:
      "The creature does not get tired regardless of the amount of physical or mental effort exerted. However, because of that, the being cannot use Fatigue points to increase its physical abilities."
  }),

  DoesNotBreath: createNPCAdvantage({
    name: "Does not breath",
    cost: 10,
    gnosisMin: "15",
    description: "The creature does not require air to live."
  }),

  DoesNotEat: createNPCAdvantage({
    name: "Does not eat",
    cost: 10,
    gnosisMin: "15",
    description: "The creature does not require food to live."
  }),

  DoesNotSleep: createNPCAdvantage({
    name: "Does not sleep",
    cost: 10,
    gnosisMin: "15",
    description:
      "The creature does not possess the physical need to sleep. It can become unconscious as normal."
  }),

  ImmuneToNaturalPoisons: createNPCAdvantage({
    name: "Immune to natural poisons",
    cost: 20,
    gnosisMin: "20",
    description:
      "No natural poison can affect the creature. However, any harmful substance that comes from a being with a Gnosis greater than 10, or that has been created through mystic means, will continue to affect it normally."
  }),

  ImmuneToNaturalDiseases: createNPCAdvantage({
    name: "Immune to natural diseases",
    cost: 10,
    gnosisMin: "20",
    description:
      "Just like the one before, only that in this case it’s immune to any natural disease."
  }),

  ImmuneToClimacticPhenomena: createNPCAdvantage({
    name: "Immune to climactic phenomena",
    cost: 10,
    gnosisMin: "15",
    description:
      "No matter how extreme the climate is, the being does not suffer any type of problem from being exposed to it."
  }),

  PhysicalExemption: createNPCAdvantage({
    name: "Physical exemption",
    cost: 50,
    gnosisMin: "20",
    description:
      "This ability represents all of the other reduction of physical needs that have been explained. A being that possesses it can have any of the following advantages: Without Unconsciousness, Tireless, Does Not breath, Does Not Eat, Does Not Sleep, Immune to Natural Poisons, Immune to Natural Diseases, Immune to Climactic Phenomena."
  }),

  NaturalImmunityToAnElementHalfDamage: createNPCAdvantage({
    name: "Natural Immunity to an Element, Half the damage",
    cost: 10,
    gnosisMin: "20",
    description:
      "The being is partially immune to the effects caused by a specific element. Therefore, if it takes damage from this type, it is reduced to half. This ability is not effective if the element comes from, or is generated by, a being that possesses a Gnosis greater than that of the creature. Nor will it work against damages that are produced by Resistance Checks (although in this case, it can apply a +40 to its rolls). Regarding elementals, the chosen one must be the element that it is attuned to."
  }),

  NaturalImmunityToAnElementComplete: createNPCAdvantage({
    name: "Natural Immunity to an Element, Complete",
    cost: 30,
    gnosisMin: "25",
    description:
      "The same as the one before, except that the damage caused by the element is completely nullified."
  }),

  PsychologicalImmunity: createNPCAdvantage({
    name: "Psychological Immunity",
    cost: 20,
    gnosisMin: "10",
    description:
      "The mind of the being is not able to feel any type of psychological State. Therefore, it is completely immune to psychic effects, like Pain, Fear, Terror, or Rage."
  }),
  //Magic & Psychic
  SuperiorMagicRecovery: createNPCAdvantage({
    name: "Superior magic recovery (magical)",
    cost: 30,
    gnosisMin: "5",
    description: "Superior magic recovery (magical)"
  }),

  NaturalKnowledgePath20: createNPCAdvantage({
    name: "Natural knowledge of a path 20 (magical)",
    cost: 10,
    gnosisMin: "10",
    description:
      "Natural knowledge of a path: In elemental beings, the natural knowledge has to be on that which they are attuned to. This advantage cannot be chosen through spells that allow the acquisition of abilities."
  }),

  NaturalKnowledgePath40: createNPCAdvantage({
    name: "Natural knowledge of a path 40 (magical)",
    cost: 20,
    gnosisMin: "15",
    description:
      "Natural knowledge of a path: In elemental beings, the natural knowledge has to be on that which they are attuned to. This advantage cannot be chosen through spells that allow the acquisition of abilities."
  }),

  NaturalKnowledgePath60: createNPCAdvantage({
    name: "Natural knowledge of a path 60 (magical)",
    cost: 30,
    gnosisMin: "20",
    description:
      "Natural knowledge of a path: In elemental beings, the natural knowledge has to be on that which they are attuned to. This advantage cannot be chosen through spells that allow the acquisition of abilities."
  }),

  NaturalKnowledgePath80: createNPCAdvantage({
    name: "Natural knowledge of a path 80 (magical)",
    cost: 40,
    gnosisMin: "25",
    description:
      "Natural knowledge of a path: In elemental beings, the natural knowledge has to be on that which they are attuned to. This advantage cannot be chosen through spells that allow the acquisition of abilities."
  }),

  NaturalKnowledgePath90: createNPCAdvantage({
    name: "Natural knowledge of a path 90 (magical)",
    cost: 50,
    gnosisMin: "30",
    description:
      "Natural knowledge of a path: In elemental beings, the natural knowledge has to be on that which they are attuned to. This advantage cannot be chosen through spells that allow the acquisition of abilities."
  }),

  GesturelessCasting: createNPCAdvantage({
    name: "Gestureless casting (magical)",
    cost: 20,
    gnosisMin: "5",
    description: "Gestureless casting (magical)"
  }),

  UnspokenCasting: createNPCAdvantage({
    name: "Unspoken casting (magical)",
    cost: 20,
    gnosisMin: "5",
    description: "Unspoken casting (magical)"
  }),

  ImprovedInnateMagic: createNPCAdvantage({
    name: "Improved innate magic (magical)",
    cost: 20,
    gnosisMin: "5",
    description: "Improved innate magic (magical)"
  }),

  AmplifySustainedPower: createNPCAdvantage({
    name: "Amplify sustained power (psychic)",
    cost: 30,
    gnosisMin: "5",
    description: "Amplify sustained power (psychic)"
  }),

  PsychicFatigueResistance: createNPCAdvantage({
    name: "Psychic Fatigue resistance (psychic)",
    cost: 30,
    gnosisMin: "5",
    description: "Psychic Fatigue resistance (psychic)"
  }),

  PsychicPointRecovery: createNPCAdvantage({
    name: "Psychic Point Recovery (psychic)",
    cost: 20,
    gnosisMin: "5",
    description: "Psychic Point Recovery (psychic)"
  }),

  ExtremeConcentration: createNPCAdvantage({
    name: "Extreme concentration (psychic)",
    cost: 30,
    gnosisMin: "5",
    description: "Extreme concentration (psychic)"
  }),

  FocusPsychic: createNPCAdvantage({
    name: "Focus (psychic)",
    cost: 20,
    gnosisMin: "5",
    description: "Focus (psychic)"
  }),

  PsychicInclination: createNPCAdvantage({
    name: "Psychic inclination (psychic)",
    cost: 20,
    gnosisMin: "5",
    description: "Psychic inclination (psychic)"
  }),

  PassiveConcentration: createNPCAdvantage({
    name: "Passive concentration (psychic)",
    cost: 30,
    gnosisMin: "5",
    description: "Passive concentration (psychic)"
  })
};

export const ABF_NPC_DISADVANTAGES = {
  RacialVice: createNPCDisadvantage({
    name: "Racial Vice",
    bonus: 10,
    gnosisMin: "0",
    description:
      "The creature has some form of natural vice that it cannot overcome by any means. Anytime that he has the opportunity to quench it and it does not, causes the being to suffer a –20 All Action Penalty."
  }),

  AtrophiedMembers: createNPCDisadvantage({
    name: "Atrophied Members",
    bonus: 20,
    gnosisMin: "0",
    description:
      "The being lacks useable extremities or the ones that he possesses cannot be used correctly, applying a penalty of –60 to any physical check that requires it. If the members are its legs, apply a –6 penalty to its Movement Value. It can’t be selected by souls."
  }),

  RacialFear: createNPCDisadvantage({
    name: "Racial Fear",
    bonus: 10,
    gnosisMin: "10",
    description:
      "The creature has an unsurpassable fear to something specific, for which he suffers said state when found in its presence."
  }),

  RacialTerror: createNPCDisadvantage({
    name: "Racial Terror",
    bonus: 20,
    gnosisMin: "10",
    description: "Same as the one before, except apply the State of Terror."
  }),

  LackOfASense: createNPCDisadvantage({
    name: "Lack of a Sense",
    bonus: 10,
    gnosisMin: "0",
    description:
      "The creature lacks a sense other than sight, and he cannot make perception rolls that require it."
  }),

  Blind: createNPCDisadvantage({
    name: "Blind",
    bonus: 20,
    gnosisMin: "0",
    description:
      "It does not possess a sense of sight, and it does not have some supernatural way to see. It will always apply the penalty of Blindness."
  }),

  PhysicalNeed: createNPCDisadvantage({
    name: "Physical Need",
    bonus: 10,
    gnosisMin: "0",
    description:
      "The being has a need of a physical nature to survive. For example, it requires something specific, like consuming iron, within a determined time period or it suffers a cumulative All Action Penalty of –10. If the need isn’t satisfied over a long period of time, it can even die."
  }),

  ExtremeNeed: createNPCDisadvantage({
    name: "Extreme Need",
    bonus: 20,
    gnosisMin: "10",
    description:
      "Same as the one before, except that if the being does not carry it out on time, it will die automatically."
  }),

  NaturalVulnerabilityHalfDamage: createNPCDisadvantage({
    name: "Natural Vulnerability to an Element, 50% More Damage",
    bonus: 10,
    gnosisMin: "20",
    description:
      "It is naturally vulnerable to the damage produced by an element, that increases its damage by 50%. Regarding elemental beings, the chosen element has to be the opposite of what its attuned to."
  }),

  NaturalVulnerabilityDoubleDamage: createNPCDisadvantage({
    name: "Natural Vulnerability to an Element, Double Damage",
    bonus: 20,
    gnosisMin: "20",
    description: "Same as the one before, except that it doubles the damage taken."
  }),

  VulnerableToATypeOfAttack: createNPCDisadvantage({
    name: "Vulnerable to a Type of Attack",
    bonus: 20,
    gnosisMin: "10",
    description:
      "This means that a specific type of attack produces double damage to the being, like for example, projectile or Impact weapons."
  }),
  // Psychic & Magic
  OralRequirement: createNPCDisadvantage({
    name: "Oral requirement (magical)",
    bonus: 10,
    gnosisMin: "5",
    description: "Oral requirement (magical)"
  }),

  RequireGestures: createNPCDisadvantage({
    name: "Require gestures (magical)",
    bonus: 10,
    gnosisMin: "5",
    description: "Require gestures (magical)"
  }),

  SlowRecoveryOfMagic: createNPCDisadvantage({
    name: "Slow recovery of magic (magical)",
    bonus: 10,
    gnosisMin: "5",
    description: "Slow recovery of magic (magical)"
  }),

  MagicBlockage: createNPCDisadvantage({
    name: "Magic blockage (magical)",
    bonus: 30,
    gnosisMin: "5",
    description: "Magic blockage (magical)"
  }),

  MagicalExhaustion: createNPCDisadvantage({
    name: "Magical exhaustion (magical)",
    bonus: 10,
    gnosisMin: "5",
    description: "Magical exhaustion (magical)"
  }),

  ActionRequirement: createNPCDisadvantage({
    name: "Action Requirement (magical)",
    bonus: 20,
    gnosisMin: "5",
    description: "Action Requirement (magical)"
  }),

  NoConcentration: createNPCDisadvantage({
    name: "No concentration (psychic)",
    bonus: 10,
    gnosisMin: "5",
    description: "No concentration (psychic)"
  }),

  PsychicExhaustion: createNPCDisadvantage({
    name: "Psychic exhaustion (psychic)",
    bonus: 10,
    gnosisMin: "5",
    description: "Psychic exhaustion (psychic)"
  }),

  PsychicConsumption: createNPCDisadvantage({
    name: "Psychic consumption (psychic)",
    bonus: 20,
    gnosisMin: "5",
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
    type: "Offensive",
    description:
      "The creature is provided with natural weapons of any type: claws, jaws, sharpened tail… or whatever we would like to imagine for it. In game terms, it allows the being to use as a base damage that which is indicated in the column Natural weapon, corresponding to its Size on Table 82, when it comes time to use any of its attacks. They can be Cut, Impact or Thrust, depending on what you deem appropriate for its nature. Like in those cases of disarmed combat, its Initiative is always +20.",
    effects: [{ name: "Natural Weapon", const: 20, gnosisMin: "0" }]
  }),
  AdditionalAttacks: createNPCPower({
    name: "Additional Attacks",
    notes: "",
    type: "Offensive",
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
    notes: "",
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
    notes: "",
    description:
      "This allows to damage beings that are based on energy to be harmed the same as the Ki ability Presence Extrusion. It affects all the attacks it carries out.",
    effects: [{ name: "Damage energy", cost: 10, gnosisMin: "10" }]
  }),
  ArmorModifier: createNPCPower({
    name: "Armor Modifier",
    type: "Offensive",
    notes: "",
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
    notes: "",
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
  })
};

//#endregion
