export function createDiscipline(input) {
  const { name = "", description = "", modifiers = "" } = input;

  return {
    name,
    description,
    modifiers
  };
}

export function createMentalPower(input) {
  const {
    name = "",
    level = 0,
    discipline = "",
    action = "",
    maintenance = false,
    mastered = false,
    innate = false,
    strengthen = 0,
    description = "",
    modifiers = "",
    effects = []
  } = input;

  return {
    name,
    level,
    discipline,
    action,
    maintenance,
    mastered,
    innate,
    strengthen,
    description,
    modifiers,
    effects
  };
}

export const ABF_PSYCHIC_DISCIPLINES = {
  Telepathy: createDiscipline({
    name: "Telepathy",
    description:
      "Telepathy is one of the most fascinating Disciplines psychics have at their disposal. It synchronizes the energies of two Psychic Matrices, allowing the user to access the minds of others. Some examples of Telepathic abilities are mind reading, altering a subject’s perception, or even subduing their will. Telepathy has no effect upon mindless beings – such as golems or similar creatures. Unlike with other Disciplines, no Psychic Projection is required for setting the target (the check is still needed to determine the range of the Power), but if the Psychic is not able to obtain a minimum of 10% damage on the Combat Table, the affected target can add +60 to his PsR roll.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential."
  }),
  Psychokinesis: createDiscipline({
    name: "Psychokinesis",
    description:
      "Psychokinesis is the psychic ability to move distant objects by the sole action of mental force. As levels progress, characters may even be able to destroy objects or modify their atomic structure from a distance.",
    modifiers: "There are no modifiers for this discipline."
  }),

  Pyrokinesis: createDiscipline({
    name: "Pyrokinesis",
    description:
      "This discipline allows dominion over high temperatures and fire. The psychic can control its shape or become immune to the effects of heat.",
    modifiers:
      "The surroundings of the psychic will increase or diminish his potential in the following way:<table><tr><td>Glacial Area or Arctic Zone</td><td>–30</td></tr><tr><td>Intense Cold</td><td>–10</td></tr><tr><td>Before a Big Bonfire</td><td>+10</td></tr><tr><td>Fire of Immense Proportions</td><td>+20</td></tr><tr><td>Volcano</td><td>+30</td></tr></table>"
  }),

  Cryokinesis: createDiscipline({
    name: "Cryokinesis",
    description:
      "Just like Pyrokinesis refers to the control of fire, this Discipline focuses on low temperatures and ice control. These Powers may go as far as freezing people or decreasing temperature across very long distances.",
    modifiers:
      "As in Pyrokinesis, the surrounding area will increase or decrease a character’s Psychic Potential in the following way:<table><tr><td>Volcano</td><td>–30</td></tr><tr><td>Fire of Immense Proportions</td><td>–10</td></tr><tr><td>Cold and Rainy Ground</td><td>+10</td></tr><tr><td>Intense Cold</td><td>+20</td></tr><tr><td>Glacial Area or Arctic Zone</td><td>+30</td></tr></table>"
  }),

  PhysicalIncrease: createDiscipline({
    name: "Physical Increase",
    description:
      "This Discipline endows psychics with a complete dominion of their body and the cells which comprise it. In this way, they control every inch of their anatomy. Powers can be applied to the same individual only once.",
    modifiers: "There are no modifiers for this Discipline."
  }),

  Energy: createDiscipline({
    name: "Energy",
    description:
      "This Discipline allows psychics to use their Powers to generate pure energy and, to a lesser extent, influence Heat, Cold and Electricity.",
    modifiers: "There are no modifiers for this discipline."
  }),

  Sentience: createDiscipline({
    name: "Sentience",
    description:
      "This Discipline allows the psychic to perceive and control other people’s feelings and senses. As is the case with Telepathy, it has no effect upon mindless beings. No Psychic Projection is required for setting the target, but if the Psychic is not able to obtain a minimum of 10% damage on the Combat Table, the affected target can add +50 to his PsR roll.",
    modifiers:
      "Psychics in physical contact with a subject against which they are using their Sentience Powers may add a +20 bonus to their Psychic Potential."
  }),

  Telemetry: createDiscipline({
    name: "Telemetry",
    description:
      "Telemetry is the mental ability of sensing psychic residue present in an environment. All Psychic Matrices leave certain energy behind, depending on their mood and thoughts. Characters mastering this Discipline are able to notice such residues and sense the past.",
    modifiers:
      "Psychics in physical contact with the object they are applying Telemetric Powers to may add a +10 bonus to their Psychic Potential."
  }),

  MatrixPowers: createDiscipline({
    name: "Matrix Powers",
    description:
      "In addition to the mental abilities we have seen, there are four generic Powers to which all psychics have equal access. They do not belong to any Discipline, which means they can be obtained by investing only 1 PP, or simply by spending one temporarily for limited access. These Powers are not organized into levels.",
    modifiers: "There are no modifiers for this discipline."
  })
};

export const ABF_MENTAL_POWERS = {
  //#region Telepathy
  AreaScanning: createMentalPower({
    name: "Area Scanning",
    level: 1,
    action: "Active",
    discipline: "Telepathy",
    maintenance: true,
    description:
      "This Power detects any active mind around the psychic. It may differentiate between simple psyches – such as that of animals – or those of a much more complex nature. However, it cannot locate a specific mind within the radius. Resisting this Power requires a character to make a successful PsR Check against the target Difficulty indicated by the Effects Table below. Characters failing this Check will not be entitled to new Resistance Checks while they remain within the scanned area. This ability does not call for Psychic Projection; it will automatically affect everyone within the area.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "100 PsR / 30 foot radius" },
      { difficulty: 120, effect: "120 PsR / 150 foot radius" },
      { difficulty: 140, effect: "140 PsR / 300 foot radius" },
      { difficulty: 180, effect: "160 PsR / 800 foot radius" },
      { difficulty: 240, effect: "180 PsR / 1,500 foot radius" },
      { difficulty: 280, effect: "200 PsR / 1 mile radius" },
      { difficulty: 320, effect: "220 PsR / 5 miles radius" },
      { difficulty: 440, effect: "260 PsR / 60 miles radius" }
    ]
  }),
  MentalRestraint: createMentalPower({
    name: "Mental Restraint",
    level: 1,
    action: "Active",
    discipline: "Telepathy",
    maintenance: true,
    description:
      "The psychic is able to impose a very basic restraint upon his target, preventing the victim from performing a specific action. The ability will only work on Active actions – that is, those requiring a character’s conscious will. It will not affect Passive actions or those executed by mere reaction. The affected character may resist the effect by making a successful PsR Check against the target Difficulty indicated by the Effects Table below. He is also granted one additional Check every time he attempts to carry out the forbidden action. In the case of a very generic restraint, or if the prohibition limits the subject’s freedom excessively, a +20 bonus may be applied to a victim’s Check.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 4" },
      { difficulty: 40, effect: "Fatigue 2" },
      { difficulty: 80, effect: "80 PsR" },
      { difficulty: 120, effect: "100 PsR" },
      { difficulty: 140, effect: "120 PsR" },
      { difficulty: 180, effect: "140 PsR" },
      { difficulty: 240, effect: "160 PsR" },
      { difficulty: 280, effect: "180 PsR" },
      { difficulty: 320, effect: "200 PsR" },
      { difficulty: 440, effect: "220 PsR" }
    ]
  }),

  MindReading: createMentalPower({
    name: "Mind Reading",
    level: 1,
    action: "Active",
    discipline: "Telepathy",
    maintenance: true,
    description:
      "This Power allows the psychic to read a subject’s current thoughts – although it does not permit him to delve into the victim’s memories. Resisting this Power requires the victim to make a successful PsR Check against a target Difficulty listed along with the intensity of the effect below. A character can make a new Check every 5 turns, as long as he is somehow aware of the fact that he is being targeted by this Power. So long as he is reading his opponent’s intentions, the psychic can apply a +30 bonus to any actions pitted against him.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "100 PsR" },
      { difficulty: 120, effect: "120 PsR" },
      { difficulty: 140, effect: "140 PsR" },
      { difficulty: 180, effect: "160 PsR" },
      { difficulty: 240, effect: "180 PsR" },
      { difficulty: 280, effect: "200 PsR" },
      { difficulty: 320, effect: "220 PsR" },
      { difficulty: 440, effect: "240 PsR" }
    ]
  }),

  MentalCommunication: createMentalPower({
    name: "Mental Communication",
    level: 1,
    action: "Active",
    discipline: "Telepathy",
    maintenance: true,
    description:
      "The psychic is able to engage in long distance conversation with another character whose approximate location is known. Unlike with other Powers, no Psychic Projection is required for setting the target. Maximum distance allowed for conversation is indicated by the Power’s effects.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "300 feet" },
      { difficulty: 120, effect: "1,500 feet" },
      { difficulty: 140, effect: "1 mile" },
      { difficulty: 180, effect: "5 miles" },
      { difficulty: 240, effect: "60 miles" },
      { difficulty: 280, effect: "600 miles" },
      { difficulty: 320, effect: "3,000 miles" },
      { difficulty: 440, effect: "Any distance" }
    ]
  }),

  PsychicShield: createMentalPower({
    name: "Psychic Shield",
    level: 1,
    action: "Passive",
    discipline: "Telepathy",
    maintenance: true,
    description:
      "Psychic Shield enhances the psychic’s PsR It may be used to enhance another person’s PsR, but such an enhancement is reduced to half the bonus indicated.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "+10 PsR" },
      { difficulty: 120, effect: "+30 PsR" },
      { difficulty: 140, effect: "+50 PsR" },
      { difficulty: 180, effect: "+80 PsR" },
      { difficulty: 240, effect: "+120 PsR" },
      { difficulty: 280, effect: "+160 PsR" },
      { difficulty: 320, effect: "+200 PsR" },
      { difficulty: 440, effect: "+240 PsR" }
    ]
  }),

  PsychicIllusion: createMentalPower({
    name: "Psychic Illusion",
    level: 1,
    action: "Active",
    discipline: "Telepathy",
    maintenance: true,
    description:
      "This Power alters a subject’s perception by introducing illusory images or sounds into his mind. It enables psychics to become invisible to individuals, to throw illusory rocks at them, or even make them think they are facing a dragon. If a character decides to form illusory creatures, they will Attack and Defend themselves using the character’s own Psychic Projection, just as other illusions will (arrows, spells, explosions, etc.) Resisting this Power requires a character to make a successful PsR Check against the target Difficulty indicated by the Effects Table below. Naturally, damage is unreal and the opponent will be entitled to a new PsR Check upon being hit. If a character knows he is dealing with an illusion, he can make an PsR Check every turn.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "80 PsR" },
      { difficulty: 120, effect: "100 PsR" },
      { difficulty: 140, effect: "120 PsR" },
      { difficulty: 180, effect: "140 PsR" },
      { difficulty: 240, effect: "160 PsR" },
      { difficulty: 280, effect: "180 PsR" },
      { difficulty: 320, effect: "200 PsR" },
      { difficulty: 440, effect: "220 PsR" }
    ]
  }),

  MentalResearch: createMentalPower({
    name: "Mental Research",
    level: 2,
    action: "Active",
    discipline: "Telepathy",
    maintenance: true,
    description:
      "Using this Power, the psychic delves into another person’s thoughts and memories. It is left to the GM’s best judgment to decide the number of turns a psychic needs to find the desired information, depending on how deep it is buried in the character’s memory. The psychic will have access to the victim’s knowledge, but not to supernaturally altered memories. The affected party may resist the effect by making a successful PsR Check against the target Difficulty indicated by the Effects Table below. He is also granted one additional Check every 5 turns.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "100 PsR" },
      { difficulty: 140, effect: "120 PsR" },
      { difficulty: 180, effect: "140 PsR" },
      { difficulty: 240, effect: "160 PsR" },
      { difficulty: 280, effect: "180 PsR" },
      { difficulty: 320, effect: "200 PsR" },
      { difficulty: 440, effect: "240 PsR" }
    ]
  }),

  PsychicAssault: createMentalPower({
    name: "Psychic Assault",
    level: 2,
    action: "Active",
    discipline: "Telepathy",
    maintenance: false,
    description:
      "The psychic casts an attack upon a subject’s mind, weakening his mental resistance. The victim suffers a penalty to all PsR Checks equal to his Failure against the Check to resists this Power. Weakened Resistance is recovered at a rate of 5 points per hour.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "120 PsR" },
      { difficulty: 140, effect: "140 PsR" },
      { difficulty: 180, effect: "160 PsR" },
      { difficulty: 240, effect: "180 PsR" },
      { difficulty: 280, effect: "200 PsR" },
      { difficulty: 320, effect: "220 PsR" },
      { difficulty: 440, effect: "260 PsR" }
    ]
  }),

  PsychicConnection: createMentalPower({
    name: "Psychic Connection",
    level: 2,
    action: "Active",
    discipline: "Telepathy",
    maintenance: true,
    description:
      "This Power connects the psychic’s mind to the mind of another willing person, allowing them both to act upon each other’s physical bodies. Characters participating in the switch retain their knowledge and skills, but they are subject to the Physical Characteristics of the host individual, which means their Base Abilities must be recalcuated to account for the different advantages and disadvantages of the host’s body. Since the soul does not transmigrate, spellcasters cannot cast spells upon introducing their mind into another physical form. This is a voluntary capability; characters can not be forced to give up control of their bodies or to control another body from a distance. Characters in control of another body temporarily lose control of their own. If one participant dies while the connection is active, the Power is canceled and the surviving participant returns to his normal state. The maximum distance between the bodies is determined by the success level reached using the Effects Table below.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "300 foot radius" },
      { difficulty: 140, effect: "1,500 foot radius" },
      { difficulty: 180, effect: "1 mile radius" },
      { difficulty: 240, effect: "5 mile radius" },
      { difficulty: 280, effect: "60 mile radius" },
      { difficulty: 320, effect: "600 mile radius" },
      { difficulty: 440, effect: "Any distance" }
    ]
  }),

  AlterMemory: createMentalPower({
    name: "Alter Memory",
    level: 2,
    action: "Active",
    discipline: "Telepathy",
    maintenance: false,
    description:
      "This Power permits a psychic to edit a subject’s memories, eliminating them completely or creating new ones. The exact element to be deleted or created needs to be determined. Each point of difference between the victim’s roll and the required PsR Check represents one hour of memories that a psychic can modify. Even though no maintenance is required, the victim is entitled to a new PsR Check against the original target Difficulty if he sees or does anything that can prompt a deeply rooted memory to surface.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 6" },
      { difficulty: 80, effect: "Fatigue 4" },
      { difficulty: 120, effect: "Fatigue 2" },
      { difficulty: 140, effect: "100 PsR" },
      { difficulty: 180, effect: "120 PsR" },
      { difficulty: 240, effect: "140 PsR" },
      { difficulty: 280, effect: "160 PsR" },
      { difficulty: 320, effect: "180 PsR" },
      { difficulty: 440, effect: "200 PsR" }
    ]
  }),

  AstralShape: createMentalPower({
    name: "Astral Shape",
    level: 2,
    action: "Active",
    discipline: "Telepathy",
    maintenance: true,
    description:
      "The psychic is can abandon his physical shape and project his mind in space. For as long as he remains in this state, he is absolutely intangible toward anything non-energy based, and he is invisible to those without the ability to see Psychic Matrices. He can only be hurt by attacks that affect immaterial beings or damage their Resistances. If the psychic is damaged in this state, the damage is transposed to his physical body and causes the Astral Shape to be canceled. While in an Astral Shape, the psychic has a Flight Value equivalent to his Willpower, but he can only use mental abilities. If his real body should face death, the psychic would is trapped in the Astral Shape until the time of its end, which would also be the time of his own utter destruction.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 6" },
      { difficulty: 80, effect: "Fatigue 4" },
      { difficulty: 120, effect: "Fatigue 2" },
      { difficulty: 140, effect: "5 mile radius" },
      { difficulty: 180, effect: "60 mile radius" },
      { difficulty: 240, effect: "300 mile radius" },
      { difficulty: 280, effect: "600 mile radius" },
      { difficulty: 320, effect: "3,000 mile radius" },
      { difficulty: 440, effect: "Any distance" }
    ]
  }),

  PsychicTracking: createMentalPower({
    name: "Psychic Tracking",
    level: 2,
    action: "Active",
    discipline: "Telepathy",
    maintenance: true,
    description:
      "This Power allows the psychic to pinpoint the location of a specific subject’s mind within range – as determined by the psychic’s success in activating this Power. The psychic should know the matrix of the subject he is seeking, but he may also be after only certain mental patterns. Once he has found his subject, the psychic may Maintain this Power so as to keep track of the subject’s location at all times. Resisting this Power requires the victim to make a successful PsR Check against the target Value indicated by the Effects Table below. The affected character is allowed a new Check every 5 turns if he is aware that he is being targeted by this ability. No Psychic Projection is required. Psychic Tracking works automatically whenever the subject is inside the Power’s area of action.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 6" },
      { difficulty: 80, effect: "Fatigue 4" },
      { difficulty: 120, effect: "Fatigue 2" },
      { difficulty: 140, effect: "Up to 5-mile radius / 140 PsR" },
      { difficulty: 180, effect: "Up to 60-mile radius / 160 PsR" },
      { difficulty: 240, effect: "Up to 300-mile radius / 180 PsR" },
      { difficulty: 280, effect: "Up to 600-mile radius / 200 PsR" },
      { difficulty: 320, effect: "Up to 3,000-mile radius / 220 PsR" },
      { difficulty: 440, effect: "Any distance and 260 PsR" }
    ]
  }),

  MindControl: createMentalPower({
    name: "Mind Control",
    level: 3,
    action: "Active",
    discipline: "Telepathy",
    maintenance: true,
    description:
      "The psychic obtains full control of the subject who fails the required PsR. The victim is entitled to a new Check every day, as well as every time he receives an order completely against his normal behavior. He is able to apply a +20 to his PsR if he receives a life-endangering command or any order that would subject him to extreme actions.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 12" },
      { difficulty: 40, effect: "Fatigue 8" },
      { difficulty: 80, effect: "Fatigue 6" },
      { difficulty: 120, effect: "Fatigue 4" },
      { difficulty: 140, effect: "100 PsR" },
      { difficulty: 180, effect: "120 PsR" },
      { difficulty: 240, effect: "140 PsR" },
      { difficulty: 280, effect: "160 PsR" },
      { difficulty: 320, effect: "180 PsR" },
      { difficulty: 440, effect: "220 PsR" }
    ]
  }),

  PsychicDeath: createMentalPower({
    name: "Psychic Death",
    level: 3,
    action: "Active",
    discipline: "Telepathy",
    maintenance: false,
    description:
      "This Power attacks a victim’s mind and produces total devastation from within. The character loses one point of Intelligence and Willpower for every 10 points by which he fails the required Resistance. Characters recover lost points at a rate of one per day. However, if either of the two Characteristics should reach 0, the character has suffered catastrophic damage to mind his mind and becomes a hollow shell, incapabile of independent actions. Mindless bodies do not die. However, they can be controlled through Psychic Connection.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "Fatigue 6" },
      { difficulty: 140, effect: "Fatigue 4" },
      { difficulty: 180, effect: "140 PsR" },
      { difficulty: 240, effect: "160 PsR" },
      { difficulty: 280, effect: "180 PsR" },
      { difficulty: 320, effect: "220 PsR" },
      { difficulty: 440, effect: "240 PsR" }
    ]
  }),

  Area: createMentalPower({
    name: "Area",
    level: 3,
    action: "Active",
    discipline: "Telepathy",
    maintenance: true,
    description:
      "Maintaining Area enables the psychic to use any other Telepathic Power on all subjects within the radius – as determined by the character’s success in activating the Power. Specific targets may be designated, as long as the psychic is aware of their presence within the radius. For instance, if a character utilizes Psychic Assault while this Power is Maintained on a Very Difficult level, all individuals designated by the psychic within a 30-foot area will be attacked.",
    modifiers:
      "Psychics in physical contact with the subject against whom they are using their Telepathic Powers may add a +20 bonus to their Potential.",
    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "Fatigue 4" },
      { difficulty: 140, effect: "30 feet" },
      { difficulty: 180, effect: "300 feet" },
      { difficulty: 240, effect: "1 mile" },
      { difficulty: 280, effect: "5 miles" },
      { difficulty: 320, effect: "60 miles" },
      { difficulty: 440, effect: "300 miles" }
    ]
  }),
  //#endregion

  //#region Pshychokinesis
  MinorPsychokinesis: createMentalPower({
    name: "Minor Psychokinesis",
    level: 1,
    action: "Active",
    discipline: "Psychokinesis",
    maintenance: true,
    description:
      "This Power allows a psychic to move inorganic matter from a distance. The weight and speed of the action depend upon the success a psychic has in using this Power (as detailed on the Effects Table). When used for hurling objects, as in long distance attacks, the character’s Psychic Projection is reduced by half, because the control this Power offers isn’t meant for that uses. A fighter with this Power who uses the Psychic Projection Module can gain control of a weapon and perform a long distance attack using his Psychic Projection rather than his Attack score (provided of course he has developed his Attack Ability and Psychic Projection on equal terms).",

    effects: [
      { difficulty: 20, effect: "Fatigue 1" },
      { difficulty: 40, effect: "2 lbs. / Flight Value 4" },
      { difficulty: 80, effect: "5 lbs. / Flight Value 6" },
      { difficulty: 120, effect: "10 lbs. / Flight Value 8" },
      { difficulty: 140, effect: "20 lbs. / Flight Value 10" },
      { difficulty: 180, effect: "40 lbs. / Flight Value 12" },
      { difficulty: 240, effect: "80 lbs. / Flight Value 14" },
      { difficulty: 280, effect: "200 lbs. / Flight Value 16" },
      { difficulty: 320, effect: "400 lbs. / Flight Value 18" },
      { difficulty: 440, effect: "1,000 lbs. / Flight Value 20" }
    ]
  }),

  PsychokineticImpact: createMentalPower({
    name: "Psychokinetic Impact",
    level: 1,
    action: "Active",
    discipline: "Psychokinesis",
    maintenance: false,
    description:
      "This Power projects an invisible force that impacts its target with variable potency. Even though its main function is to push the target, Psychokinetic Impact can cause damage equal to twice the Strength bonus indicated on the Effects Table, plus whatever the GM regards suitable considering the surroundings.",

    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "Strength 8" },
      { difficulty: 120, effect: "Strength 10" },
      { difficulty: 140, effect: "Strength 12" },
      { difficulty: 180, effect: "Strength 14" },
      { difficulty: 240, effect: "Strength 15" },
      { difficulty: 280, effect: "Strength 16" },
      { difficulty: 320, effect: "Strength 18" },
      { difficulty: 440, effect: "Strength 20" }
    ]
  }),

  PsychokineticTrap: createMentalPower({
    name: "Psychokinetic Trap",
    level: 1,
    action: "Active",
    discipline: "Psychokinesis",
    maintenance: true,
    description:
      "This Power enables the user to carry out Trapping maneuvers through Psychic Projection – with no penalties. The success of the Power’s activation determines the intensity of the Trap (as detailed in the Effects Table). The Power could become so strong as to trap several subjects within a given area. A –2 to the Power’s Strength score applies when trapping multiple targets.",

    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "Strength 6" },
      { difficulty: 120, effect: "Strength 8" },
      { difficulty: 140, effect: "Strength 10" },
      { difficulty: 180, effect: "Strength 12 / 15-foot radius" },
      { difficulty: 240, effect: "Strength 14 / 30-foot radius" },
      { difficulty: 280, effect: "Strength 15 / 150-foot radius" },
      { difficulty: 320, effect: "Strength 16 / 300-foot radius" },
      { difficulty: 440, effect: "Strength 18 / 1,500-foot radius" }
    ]
  }),

  PsychokineticShield: createMentalPower({
    name: "Psychokinetic Shield",
    level: 1,
    action: "Passive",
    discipline: "Psychokinesis",
    maintenance: true,
    description:
      "This Power creates a psychokinetic shield that protects the user from physical attacks, including most weapons – even those with magical enchantments. It does not offer protection against spell or energy-based damage. However, if a character creates a barrier with a Power level higher than Impossible, he can use it to stop ethereal effects and attacks. Upon reaching a certain level, the shield gains a damage barrier (as detailed on the Effects Table). Unlike others Maintained Powers, which a character can only Maintain at a strength equal to his Base Psychic Potential, the Psychokinetic Shield keeps the Life Points that it had when it was created.",

    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "300 LP" },
      { difficulty: 120, effect: "500 LP" },
      { difficulty: 140, effect: "700 LP" },
      { difficulty: 180, effect: "1000 LP" },
      { difficulty: 240, effect: "1500 LP / Damage Barrier 60" },
      { difficulty: 280, effect: "2000 LP / Damage Barrier 80 / Stops energy" },
      { difficulty: 320, effect: "3000 LP / Damage Barrier 120 / Stops energy" },
      { difficulty: 440, effect: "5000 LP / Damage Barrier 160 / Stops energy" }
    ]
  }),

  PsychokineticArmor: createMentalPower({
    name: "Psychokinetic Armor",
    level: 1,
    action: "Passive",
    discipline: "Psychokinesis",
    maintenance: true,
    description:
      "This Power creates a force armor around the psychic, or anyone he designates. The armor’s AT offers protection against all attacks save those based upon Energy. It can be used in conjunction with any other protection as an additional layer, but it will not cause any special penalties.",

    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "AT 1" },
      { difficulty: 120, effect: "AT 2" },
      { difficulty: 140, effect: "AT 4" },
      { difficulty: 180, effect: "AT 6" },
      { difficulty: 240, effect: "AT 8" },
      { difficulty: 280, effect: "AT 10" },
      { difficulty: 320, effect: "AT 12" },
      { difficulty: 440, effect: "AT 14" }
    ]
  }),

  MotionDetection: createMentalPower({
    name: "Motion Detection",
    level: 2,
    action: "Active",
    discipline: "Psychokinesis",
    maintenance: true,
    description:
      "All bodies in motion within the radius of this Power who fail the required PhR Check will be detected by the psychic. He will perceive the object’s speed, size, and direction, but he will not be able to distinguish its shape. The ability will only work on physical material forms; things without substance will remain undetected. This ability does not call for Psychic Projection; it will automatically affect all parties within its area of effect.",

    effects: [
      { difficulty: 20, effect: "Fatigue 4" },
      { difficulty: 40, effect: "Fatigue 2" },
      { difficulty: 80, effect: "Fatigue 1" },
      { difficulty: 120, effect: "120 PhR / 30-foot radius" },
      { difficulty: 140, effect: "160 PhR / 150-foot radius" },
      { difficulty: 180, effect: "200 PhR / 300-foot radius" },
      { difficulty: 240, effect: "240 PhR / 1,500-foot radius" },
      { difficulty: 280, effect: "280 PhR / 1-mile radius" },
      { difficulty: 320, effect: "320 PhR / 5-mile radius" },
      { difficulty: 440, effect: "400 PhR / 60-mile radius" }
    ]
  }),

  Repulsion: createMentalPower({
    name: "Repulsion",
    level: 2,
    action: "Active",
    discipline: "Psychokinesis",
    maintenance: true,
    description:
      "Repulsion creates a barrier that violently repels any physical body that comes into contact with it – unless it wins an Opposed Strength or Agility Check. No Psychic Projection is necessary for focusing this Power. Repulsion affects all objects or individuals in touch with the barrier. The barrier’s length is determined by the character’s success in activating the Power.",

    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 6" },
      { difficulty: 80, effect: "Fatigue 4" },
      { difficulty: 120, effect: "Fatigue 2" },
      { difficulty: 140, effect: "Strength 6 / 5-foot line" },
      { difficulty: 180, effect: "Strength 8 / 15-foot line" },
      { difficulty: 240, effect: "Strength 10 / 30-foot line" },
      { difficulty: 280, effect: "Strength 12 / 60-foot line" },
      { difficulty: 320, effect: "Strength 14 / 150-foot line" },
      { difficulty: 440, effect: "Strength 18 / 300-foot line" }
    ]
  }),

  Ballistics: createMentalPower({
    name: "Ballistics",
    level: 2,
    action: "Active",
    discipline: "Psychokinesis",
    maintenance: false,
    description:
      "This Power enables the psychic to throw objects with extreme precision using his Psychic Projection. Depending on the PC the psychic has obtained, he can increase either the number of objects or the precision of his power. Damage varies depending on the elements being projected and whether area of effect is being used.",

    effects: [
      { difficulty: 20, effect: "Fatigue 4" },
      { difficulty: 40, effect: "Fatigue 2" },
      { difficulty: 80, effect: "Fatigue 1" },
      { difficulty: 120, effect: "+0 Projection / 15 feet" },
      { difficulty: 140, effect: "+10 Projection / 30 feet" },
      { difficulty: 180, effect: "+20 Projection / 50 feet" },
      { difficulty: 240, effect: "+30 Projection / 80 feet" },
      { difficulty: 280, effect: "+40 Projection / 125 feet" },
      { difficulty: 320, effect: "+50 Projection / 250 feet" },
      { difficulty: 440, effect: "+60 Projection / 500 feet" }
    ]
  }),

  Shatter: createMentalPower({
    name: "Shatter",
    level: 2,
    action: "Active",
    discipline: "Psychokinesis",
    maintenance: false,
    description:
      "This Psychic Power shatters a body, causing it to burst into pieces from the inside. Objects must pass a PhR Check or break. Living beings must resist with PhR or lose LP equal to twice the Failure. Structural or Damage Resistance converts damage to five times the Failure.",

    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 6" },
      { difficulty: 80, effect: "Fatigue 4" },
      { difficulty: 120, effect: "Fatigue 2" },
      { difficulty: 140, effect: "100 PhR" },
      { difficulty: 180, effect: "120 PhR" },
      { difficulty: 240, effect: "140 PhR" },
      { difficulty: 280, effect: "160 PhR" },
      { difficulty: 320, effect: "180 PhR" },
      { difficulty: 440, effect: "220 PhR" }
    ]
  }),

  PsychokineticFlight: createMentalPower({
    name: "Psychokinetic Flight",
    level: 2,
    action: "Active",
    discipline: "Psychokinesis",
    maintenance: true,
    description:
      "The psychic gets to move freely through the air, with the Flight Value indicated by his success in activating the Power, as detailed on the Effects Table.",

    effects: [
      { difficulty: 20, effect: "Fatigue 4" },
      { difficulty: 40, effect: "Fatigue 2" },
      { difficulty: 80, effect: "Fatigue 1" },
      { difficulty: 120, effect: "Flight Value 6" },
      { difficulty: 140, effect: "Flight Value 8" },
      { difficulty: 180, effect: "Flight Value 10" },
      { difficulty: 240, effect: "Flight Value 12" },
      { difficulty: 280, effect: "Flight Value 14" },
      { difficulty: 320, effect: "Flight Value 16" },
      { difficulty: 440, effect: "Flight Value 18" }
    ]
  }),
  OrganicPsychokinesis: createMentalPower({
    name: "Organic Psychokinesis",
    level: 2,
    action: "Active",
    discipline: "Psychokinesis",
    maintenance: true,
    description:
      "This Power allows the psychic to move material objects of an organic nature – provided that the target fails his PhR Check. Speed is determined by the psychic’s success in activating the Power (as detailed in the Effects Table).",

    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "200 lbs. / Flight Value 4 / 100 PhR" },
      { difficulty: 140, effect: "500 lbs. / Flight Value 6 / 120 PhR" },
      { difficulty: 180, effect: "1,000 lbs. / Flight Value 8 / 140 PhR" },
      { difficulty: 240, effect: "2,000 lbs. / Flight Value 10 / 160 PhR" },
      { difficulty: 280, effect: "5,000 lbs. / Flight Value 12 / 180 PhR" },
      { difficulty: 320, effect: "10,000 lbs. / Flight Value 14 / 200 PhR" },
      { difficulty: 440, effect: "20,000 lbs. / Flight Value 16 / 220 PhR" }
    ]
  }),

  GroundControl: createMentalPower({
    name: "Ground Control",
    level: 3,
    action: "Active",
    discipline: "Psychokinesis",
    maintenance: false,
    description:
      "Ground Control grants the psychic complete control of the area or terrain in which he stands. His dominion is absolute; he can create a small earthquake or build a huge stone wall – as long as he stays within the area of effect. If a psychic wishes to affect something that has been built, its possible destruction is subject to its Damage Barrier.",

    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "Fatigue 6" },
      { difficulty: 140, effect: "Fatigue 4" },
      { difficulty: 180, effect: "30-foot radius / Damage Barrier 40" },
      { difficulty: 240, effect: "300-foot radius / Damage Barrier 60" },
      { difficulty: 280, effect: "800-foot radius / Damage Barrier 80" },
      { difficulty: 320, effect: "1,500-foot radius / Damage Barrier 100" },
      { difficulty: 440, effect: "1 mile radius / Damage Barrier 140" }
    ]
  }),

  AtomicRestructuring: createMentalPower({
    name: "Atomic Restructuring",
    level: 3,
    action: "Active",
    discipline: "Psychokinesis",
    maintenance: false,
    description:
      "The psychic is capable of restructuring the atoms of any organic or inorganic material, transforming its substance and form. A psychic could turn a living being into a stone statue, or a pile of sand into coins of gold, for example. The degree to which a character successfully activates this Power determines the maximum amount of mass affected, as well as the Resistance target Difficulty for those who do not wish to be affected by Atomic Restructuring.",

    effects: [
      { difficulty: 20, effect: "Fatigue 24" },
      { difficulty: 40, effect: "Fatigue 20" },
      { difficulty: 80, effect: "Fatigue 16" },
      { difficulty: 120, effect: "Fatigue 12" },
      { difficulty: 140, effect: "Fatigue 8" },
      { difficulty: 180, effect: "Fatigue 6" },
      { difficulty: 240, effect: "Fatigue 4" },
      { difficulty: 280, effect: "140 PhR / 250 pounds" },
      { difficulty: 320, effect: "160 PhR / 10 tons" },
      { difficulty: 440, effect: "200 PhR / 100 tons" }
    ]
  }),

  MajorPsychokinesis: createMentalPower({
    name: "Major Psychokinesis",
    level: 3,
    action: "Active",
    discipline: "Psychokinesis",
    maintenance: true,
    description:
      "This is an amplified version of Minor Psychokinesis that allows characters to move much heavier masses.",

    effects: [
      { difficulty: 20, effect: "Fatigue 24" },
      { difficulty: 40, effect: "Fatigue 20" },
      { difficulty: 80, effect: "Fatigue 16" },
      { difficulty: 120, effect: "Fatigue 12" },
      { difficulty: 140, effect: "Fatigue 8" },
      { difficulty: 180, effect: "Fatigue 4" },
      { difficulty: 240, effect: "500 tons / Flight Value 4" },
      { difficulty: 280, effect: "10,000 tons / Flight Value 6" },
      { difficulty: 320, effect: "100,000 tons / Flight Value 8" },
      { difficulty: 440, effect: "1,000,000 tons / Flight Value 10" }
    ]
  }),

  //#endregion

  //#region Pyrokinesis
  CreateFire: createMentalPower({
    name: "Create Fire",
    level: 1,
    action: "Active",
    discipline: "Pyrokinesis",
    maintenance: true,
    description:
      "This Power creates fire Intensities or arouses an existing flame to equal proportions. If used upon a body capable of catching fire, Create Fire does not require Maintenance. If not, Maintenance allows the flame to burn without consuming anything – although nothing prevents it from being extinguished.",

    effects: [
      { difficulty: 20, effect: "Fatigue 1" },
      { difficulty: 40, effect: "1 Intensity" },
      { difficulty: 80, effect: "3 Intensities" },
      { difficulty: 120, effect: "5 Intensities" },
      { difficulty: 140, effect: "7 Intensities" },
      { difficulty: 180, effect: "10 Intensities" },
      { difficulty: 240, effect: "13 Intensities" },
      { difficulty: 280, effect: "16 Intensities" },
      { difficulty: 320, effect: "20 Intensities" },
      { difficulty: 440, effect: "25 Intensities" }
    ]
  }),

  ExtinguishFire: createMentalPower({
    name: "Extinguish Fire",
    level: 1,
    action: "Active",
    discipline: "Pyrokinesis",
    maintenance: false,
    description:
      "This Power lowers the Intensity of an existing fire. When cast upon a heat-based being, the creature will suffer 5 Life Points of damage for every diminished Intensity – if it does not make a successful PhR Check. Damage Resistance creatures suffer 25 points of damage per Intensity. Bear in mind that a fire not completely extinguished may regain strength in the following turn.",

    effects: [
      { difficulty: 20, effect: "Fatigue 1" },
      { difficulty: 40, effect: "–1 Intensity / 80 PhR" },
      { difficulty: 80, effect: "–3 Intensities / 100 PhR" },
      { difficulty: 120, effect: "–5 Intensities / 120 PhR" },
      { difficulty: 140, effect: "–7 Intensities / 140 PhR" },
      { difficulty: 180, effect: "–10 Intensities / 160 PhR" },
      { difficulty: 240, effect: "–15 Intensities / 180 PhR" },
      { difficulty: 280, effect: "–20 Intensities / 200 PhR" },
      { difficulty: 320, effect: "–30 Intensities / 220 PhR" },
      { difficulty: 440, effect: "–40 Intensities / 260 PhR" }
    ]
  }),

  ControlFire: createMentalPower({
    name: "Control Fire",
    level: 1,
    action: "Active",
    discipline: "Pyrokinesis",
    maintenance: true,
    description:
      "This Power controls the spread and size of a fire within the Intensity range specified by the psychic’s success in activating this ability. Control Fire also allows the psychic to choose the shape and color of the flames. When used against fire with a Presence of its own, or an elemental creature, this effect can be avoided by passing a PhR Check against the Difficulty indicated.",

    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "4 Intensities / 80 PhR" },
      { difficulty: 120, effect: "6 Intensities / 100 PhR" },
      { difficulty: 140, effect: "8 Intensities / 120 PhR" },
      { difficulty: 180, effect: "12 Intensities / 140 PhR" },
      { difficulty: 240, effect: "16 Intensities / 160 PhR" },
      { difficulty: 280, effect: "20 Intensities / 180 PhR" },
      { difficulty: 320, effect: "25 Intensities / 200 PhR" },
      { difficulty: 440, effect: "30 Intensities / 240 PhR" }
    ]
  }),

  Immolate: createMentalPower({
    name: "Immolate",
    level: 1,
    action: "Active",
    discipline: "Pyrokinesis",
    maintenance: false,
    description:
      "The psychic creates an explosion of a variable Base Damage (using the Heat Attack Type) over a wide area. He cannot select targets inside the area, and he might even find himself affected unless he is careful. Since it usually takes the form of a fire ball, the attack is perfectly visible – even to those who can not see Psychic Matrices.",

    effects: [
      { difficulty: 20, effect: "Fatigue 4" },
      { difficulty: 40, effect: "Fatigue 2" },
      { difficulty: 80, effect: "Fatigue 1" },
      { difficulty: 120, effect: "Damage 60 / 15-foot radius" },
      { difficulty: 140, effect: "Damage 80 / 30-foot radius" },
      { difficulty: 180, effect: "Damage 100 / 60-foot radius" },
      { difficulty: 240, effect: "Damage 120 / 100-foot radius" },
      { difficulty: 280, effect: "Damage 150 / 150-foot radius" },
      { difficulty: 320, effect: "Damage 200 / 300-foot radius" },
      { difficulty: 440, effect: "Damage 250 / 650-foot radius" }
    ]
  }),

  IgneousMaintenance: createMentalPower({
    name: "Igneous Maintenance",
    level: 2,
    action: "Active",
    discipline: "Pyrokinesis",
    maintenance: true,
    description:
      "This Power keeps several fire Intensities burning and prevents them from extinguishing. There are no natural means for extinguishing fire maintained by this method – including by sand or water. Fire sustained by Igneous Maintenance does not rely on any sort of fuel to burn.",

    effects: [
      { difficulty: 20, effect: "Fatigue 4" },
      { difficulty: 40, effect: "Fatigue 2" },
      { difficulty: 80, effect: "Fatigue 1" },
      { difficulty: 120, effect: "5 Intensities" },
      { difficulty: 140, effect: "10 Intensities" },
      { difficulty: 180, effect: "15 Intensities" },
      { difficulty: 240, effect: "20 Intensities" },
      { difficulty: 280, effect: "30 Intensities" },
      { difficulty: 320, effect: "40 Intensities" },
      { difficulty: 440, effect: "50 Intensities" }
    ]
  }),

  FireImmunity: createMentalPower({
    name: "Fire Immunity",
    level: 2,
    action: "Passive",
    discipline: "Pyrokinesis",
    maintenance: true,
    description:
      "The psychic, or the character designated by him, gains immunity to several heat Intensities – including those of a Supernatural nature. When receiving a fire-based attack, every Intensity level to which the character is immune decreases the attack’s Base Damage by 5 points and raises his Resistances by +5 against effects.",

    effects: [
      { difficulty: 20, effect: "Fatigue 4" },
      { difficulty: 40, effect: "Fatigue 2" },
      { difficulty: 80, effect: "Fatigue 1" },
      { difficulty: 120, effect: "5 Intensities" },
      { difficulty: 140, effect: "10 Intensities" },
      { difficulty: 180, effect: "15 Intensities" },
      { difficulty: 240, effect: "20 Intensities" },
      { difficulty: 280, effect: "30 Intensities" },
      { difficulty: 320, effect: "40 Intensities" },
      { difficulty: 440, effect: "50 Intensities" }
    ]
  }),

  IgneousBarrier: createMentalPower({
    name: "Igneous Barrier",
    level: 2,
    action: "Active",
    discipline: "Pyrokinesis",
    maintenance: true,
    description:
      "This ability will create a fire barrier wherever the psychic needs it. Trespassers will automatically receive a Psychic Projection attack from its maker. It uses the Heat Attack Type and has a variable Base Damage. The maximum length of the barrier is determined by the character’s success in activating the Power, but its shape is up to the psychic.",

    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "Fatigue 1" },
      { difficulty: 140, effect: "Base Damage 60 / 15 feet long" },
      { difficulty: 180, effect: "Base Damage 80 / 30 feet long" },
      { difficulty: 240, effect: "Base Damage 120 / 60 feet long" },
      { difficulty: 280, effect: "Base Damage 160 / 100 feet long" },
      { difficulty: 320, effect: "Base Damage 200 / 130 feet long" },
      { difficulty: 440, effect: "Base Damage 240 / 150 feet long" }
    ]
  }),

  RaiseTemperature: createMentalPower({
    name: "Raise Temperature",
    level: 2,
    action: "Active",
    discipline: "Pyrokinesis",
    maintenance: true,
    description:
      "The psychic can control the weather temperature and is able to increase it considerably in a wide radius.",

    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "+30°F / 1-mile radius" },
      { difficulty: 140, effect: "+50°F / 3-mile radius" },
      { difficulty: 180, effect: "+60°F / 5-mile radius" },
      { difficulty: 240, effect: "+70°F / 15-mile radius" },
      { difficulty: 280, effect: "+85°F / 30-mile radius" },
      { difficulty: 320, effect: "+100°F / 60-mile radius" },
      { difficulty: 440, effect: "+100°F / 60-mile radius" }
    ]
  }),

  Consume: createMentalPower({
    name: "Consume",
    level: 3,
    action: "Active",
    discipline: "Pyrokinesis",
    maintenance: false,
    description:
      "This Power causes objects to burn internally, consuming their substance and reducing them to ashes. Characters affected by this Power need to pass a PhR Check to avoid its effects. Those who Fail automatically suffer damage as indicated by the Effects Table below. Creatures with Damage Resistance multiply this amount by 5.",

    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "Fatigue 6" },
      { difficulty: 140, effect: "Fatigue 4" },
      { difficulty: 180, effect: "120 PhR / Automatic Damage 80" },
      { difficulty: 240, effect: "140 PhR / Automatic Damage 120" },
      { difficulty: 280, effect: "160 PhR / Automatic Damage 160" },
      { difficulty: 320, effect: "180 PhR / Automatic Damage 200" },
      { difficulty: 440, effect: "220 PhR / Automatic Damage 250" }
    ]
  }),
  Nova: createMentalPower({
    name: "Nova",
    level: 3,
    action: "Active",
    discipline: "Pyrokinesis",
    maintenance: true,
    description:
      "This Power allows a character to consume his own vital energy in order to increase his psychic capabilities. In gaming terms, he is allowed to trade Life Points in exchange for a bonus to Psychic Potential. Each point consumed allows him to increase his Psychic Potential by 2 during the current turn. Note that beings with Damage Resistance multiply lost LP times 5. The maximum amount of Life Points a character can sacrifice per round is determined by his success in activating this Power. However, a character has the choice of investing fewer points than the maximum. Damage is fire based and heals half as fast as conventional wounds.",

    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "10 Life Points" },
      { difficulty: 140, effect: "20 Life Points" },
      { difficulty: 180, effect: "30 Life Points" },
      { difficulty: 240, effect: "40 Life Points" },
      { difficulty: 280, effect: "60 Life Points" },
      { difficulty: 320, effect: "80 Life Points" },
      { difficulty: 440, effect: "120 Life Points" }
    ]
  }),

  MajorFire: createMentalPower({
    name: "Major Fire",
    level: 3,
    action: "Active",
    discipline: "Pyrokinesis",
    maintenance: true,
    description:
      "An amplified version of Create Fire. A character can create flames and temperatures of much greater strength, according to the Effects Table below.",

    effects: [
      { difficulty: 20, effect: "Fatigue 20" },
      { difficulty: 40, effect: "Fatigue 16" },
      { difficulty: 80, effect: "Fatigue 12" },
      { difficulty: 120, effect: "Fatigue 8" },
      { difficulty: 140, effect: "Fatigue 6" },
      { difficulty: 180, effect: "Fatigue 4" },
      { difficulty: 240, effect: "30 Intensities" },
      { difficulty: 280, effect: "40 Intensities" },
      { difficulty: 320, effect: "50 Intensities" },
      { difficulty: 440, effect: "60 Intensities" }
    ]
  }),

  //#endregion

  //#region Cryokinesis
  CreateChill: createMentalPower({
    name: "Create Chill",
    level: 1,
    action: "Active",
    discipline: "Cryokinesis",
    maintenance: true,
    description:
      "This Power creates several levels of cold Intensity. If applied to liquid bodies, Create Chill may produce ice.",
    effects: [
      { difficulty: 20, effect: "Fatigue 1" },
      { difficulty: 40, effect: "1 Intensity" },
      { difficulty: 80, effect: "3 Intensities" },
      { difficulty: 120, effect: "5 Intensities" },
      { difficulty: 140, effect: "7 Intensities" },
      { difficulty: 180, effect: "10 Intensities" },
      { difficulty: 240, effect: "13 Intensities" },
      { difficulty: 280, effect: "16 Intensities" },
      { difficulty: 320, effect: "20 Intensities" },
      { difficulty: 440, effect: "25 Intensities" }
    ]
  }),

  Freeze: createMentalPower({
    name: "Freeze",
    level: 1,
    action: "Active",
    discipline: "Cryokinesis",
    maintenance: true,
    description:
      "This Power freezes anybody who fails the required Check. The victim receives an All Action Penalty equivalent to the amount by which he Failed the Check. If the difference is higher than 40, the victim is frozen and subject to Partial Paralysis. The Cold AT may be used defensively against this Power. Affected individuals can make a new Check every 5 turns.",

    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 6" },
      { difficulty: 80, effect: "Fatigue 4" },
      { difficulty: 120, effect: "80 PhR" },
      { difficulty: 140, effect: "100 PhR" },
      { difficulty: 180, effect: "120 PhR" },
      { difficulty: 240, effect: "140 PhR" },
      { difficulty: 280, effect: "160 PhR" },
      { difficulty: 320, effect: "180 PhR" },
      { difficulty: 440, effect: "220 PhR" }
    ]
  }),

  SenseTemperature: createMentalPower({
    name: "Sense Temperature",
    level: 1,
    action: "Active",
    discipline: "Cryokinesis",
    maintenance: true,
    description:
      "The character can sense any variation in weather temperature – including live body heat – within the area of effect. This ability can overcome walls or obstacles that are not based on energy. However, it is useless against Ki Concealment or opponents who do not emit heat. All individuals within the area will be equally affected without the need of Psychic Projection.",

    effects: [
      { difficulty: 20, effect: "Fatigue 4" },
      { difficulty: 40, effect: "Fatigue 2" },
      { difficulty: 80, effect: "Fatigue 1" },
      { difficulty: 120, effect: "30-foot radius" },
      { difficulty: 140, effect: "150-foot radius" },
      { difficulty: 180, effect: "300-foot radius" },
      { difficulty: 240, effect: "1,500-foot radius" },
      { difficulty: 280, effect: "1-mile radius" },
      { difficulty: 320, effect: "5-mile radius" },
      { difficulty: 440, effect: "60-mile radius" }
    ]
  }),

  EliminateCold: createMentalPower({
    name: "Eliminate Cold",
    level: 1,
    action: "Active",
    discipline: "Cryokinesis",
    maintenance: false,
    description:
      "This Power decreases the temperature of an object, being, or zone by several Intensities. When cast upon a cold-based being, Eliminate Cold causes 5 Life Points of damage for every diminished Intensity – provided the creature fails the appropriate PhR Check. Creatures with Damage Resistance receive 25 Life Points of damage for each level of Intensity diminished.",

    effects: [
      { difficulty: 20, effect: "Fatigue 1" },
      { difficulty: 40, effect: "–1 Intensity / 80 PhR" },
      { difficulty: 80, effect: "–3 Intensities / 100 PhR" },
      { difficulty: 120, effect: "–5 Intensities / 120 PhR" },
      { difficulty: 140, effect: "–7 Intensities / 140 PhR" },
      { difficulty: 180, effect: "–10 Intensities / 160 PhR" },
      { difficulty: 240, effect: "–15 Intensities / 180 PhR" },
      { difficulty: 280, effect: "–20 Intensities / 200 PhR" },
      { difficulty: 320, effect: "–30 Intensities / 220 PhR" },
      { difficulty: 440, effect: "–40 Intensities / 260 PhR" }
    ]
  }),

  ColdDominion: createMentalPower({
    name: "Cold Dominion",
    level: 1,
    action: "Active",
    discipline: "Cryokinesis",
    maintenance: true,
    description:
      "Psychics with this Power can control ice and cold within a given area. They may modify it in any way they please, breaking it or causing it to shift its shape. An elemental creature can avoid the effects of Cold Dominion by passing a PhR Check against the appropriate target difficulty.",

    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "4 Intensities / 80 PhR" },
      { difficulty: 120, effect: "6 Intensities / 100 PhR" },
      { difficulty: 140, effect: "8 Intensities / 120 PhR" },
      { difficulty: 180, effect: "12 Intensities / 140 PhR" },
      { difficulty: 240, effect: "16 Intensities / 160 PhR" },
      { difficulty: 280, effect: "20 Intensities / 180 PhR" },
      { difficulty: 320, effect: "25 Intensities / 200 PhR" },
      { difficulty: 440, effect: "30 Intensities / 240 PhR" }
    ]
  }),

  Crystallize: createMentalPower({
    name: "Crystallize",
    level: 2,
    action: "Active",
    discipline: "Cryokinesis",
    maintenance: true,
    description:
      "This Power crystallizes any type of body that Fails the required PhR Check. All things frozen in this way become exceptionally brittle and likely to break at the slightest bump. A crystallized character is subject to Minor Paralysis and automatically suffers a Critical with a –40 penalty to his PhR Checks upon suffering any sort of damage. Creatures with Damage Resistance will not receive a direct Critical, but their whole body will be regarded as a vulnerable spot from then on.",

    effects: [
      { difficulty: 20, effect: "Fatigue 12" },
      { difficulty: 40, effect: "Fatigue 8" },
      { difficulty: 80, effect: "Fatigue 6" },
      { difficulty: 120, effect: "Fatigue 4" },
      { difficulty: 140, effect: "Fatigue 2" },
      { difficulty: 180, effect: "120 PhR" },
      { difficulty: 240, effect: "140 PhR" },
      { difficulty: 280, effect: "160 PhR" },
      { difficulty: 320, effect: "180 PhR" },
      { difficulty: 440, effect: "220 PhR" }
    ]
  }),

  IceSplinters: createMentalPower({
    name: "Ice Splinters",
    level: 2,
    action: "Active",
    discipline: "Cryokinesis",
    maintenance: false,
    description:
      "The psychic creates ice splinters that he can use as projectiles during an attack. They strike on the Cold or Thrust AT with a Base Damage that varies according to the Effects Table. These projectiles are perfectly visible to everyone, including characters without the ability to see Psychic Matrices.",

    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 6" },
      { difficulty: 80, effect: "Fatigue 4" },
      { difficulty: 120, effect: "Fatigue 2" },
      { difficulty: 140, effect: "Fatigue 1" },
      { difficulty: 180, effect: "Base Damage 80" },
      { difficulty: 240, effect: "Base Damage 100" },
      { difficulty: 280, effect: "Base Damage 120" },
      { difficulty: 320, effect: "Base Damage 160 / 15-foot area" },
      { difficulty: 440, effect: "Base Damage 200 / 80-foot area" }
    ]
  }),

  DecreaseAmbientTemperature: createMentalPower({
    name: "Decrease Ambient Temperature",
    level: 2,
    action: "Active",
    discipline: "Cryokinesis",
    maintenance: true,
    description:
      "The psychic is in control of the temperature and can decrease it considerably in a wide area of effect.",
    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "Fatigue 1" },
      { difficulty: 140, effect: "–40°F / 1-mile radius" },
      { difficulty: 180, effect: "–50°F / 3-mile radius" },
      { difficulty: 240, effect: "–60°F / 5-mile radius" },
      { difficulty: 280, effect: "–70°F / 15-mile radius" },
      { difficulty: 320, effect: "–85°F / 30-mile radius" },
      { difficulty: 440, effect: "–100°F / 60-mile radius" }
    ]
  }),

  IceShield: createMentalPower({
    name: "Ice Shield",
    level: 2,
    action: "Passive",
    discipline: "Cryokinesis",
    maintenance: true,
    description:
      "This Power creates a shield of ice that protects the psychic from any non-energy based source of attack and beams from Light or Darkness. Unlike other Powers, Ice Shield works on the same Life Points with which it has been created. Once created, the shield loses 5 Life Points per turn until it reaches an amount that the psychic can Maintain naturally.",

    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "600 LP" },
      { difficulty: 140, effect: "800 LP" },
      { difficulty: 180, effect: "1,200 LP" },
      { difficulty: 240, effect: "1,800 LP" },
      { difficulty: 280, effect: "2,500 LP" },
      { difficulty: 320, effect: "4,000 LP" },
      { difficulty: 440, effect: "6,000 LP" }
    ]
  }),

  AbsoluteZero: createMentalPower({
    name: "Absolute Zero",
    level: 3,
    action: "Active",
    discipline: "Cryokinesis",
    maintenance: true,
    description:
      "The psychic is able to cause the temperature to drop to absolute zero, destroying all organic or inorganic bodies within the radius. In gaming terms, every being or physical object failing a PhR Check with a difficulty of 100 each turn they remain within the area of effect is automatically destroyed by the complete cold. All individuals within the area will be affected equally without the need of Psychic Projection.",

    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "Fatigue 6" },
      { difficulty: 140, effect: "Fatigue 4" },
      { difficulty: 180, effect: "15-foot radius" },
      { difficulty: 240, effect: "30-foot radius" },
      { difficulty: 280, effect: "60-foot radius" },
      { difficulty: 320, effect: "150-foot radius" },
      { difficulty: 440, effect: "300-foot radius" }
    ]
  }),

  EverlastingMoment: createMentalPower({
    name: "Everlasting Moment",
    level: 3,
    action: "Active",
    discipline: "Cryokinesis",
    maintenance: true,
    description:
      "Through cold manipulation, psychics can create a low temperature area within which any body in motion, except for his own, is immobilized – unless it passes the required PhR Check. If a character Fails the Check by more than 40 points, he is completely frozen and subject to Full Paralysis. A Failure of less than 40 points inflicts an All Action Penalty equal to the Failure level. Penalties last for as long as the Power is Maintained. Characters are not entitled to new Resistance rolls while they remain in the area of effect. Even individuals who pass their PhR Check must repeat the Check every 5 turns while in the area of effect. All individuals within the area will be affected equally without the need of Psychic Projection.",
    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "Fatigue 6" },
      { difficulty: 140, effect: "Fatigue 4" },
      { difficulty: 180, effect: "120 PhR / 15-foot radius" },
      { difficulty: 240, effect: "140 PhR / 30-foot radius" },
      { difficulty: 280, effect: "160 PhR / 60-foot radius" },
      { difficulty: 320, effect: "180 PhR / 150-foot radius" },
      { difficulty: 440, effect: "200 PhR / 300-foot radius" }
    ]
  }),

  MajorCold: createMentalPower({
    name: "Major Cold",
    level: 3,
    action: "Active",
    discipline: "Cryokinesis",
    maintenance: true,
    description:
      "An amplified version of Create Chill. It permits psychics to generate temperatures of an extreme nature.",
    effects: [
      { difficulty: 20, effect: "Fatigue 20" },
      { difficulty: 40, effect: "Fatigue 16" },
      { difficulty: 80, effect: "Fatigue 12" },
      { difficulty: 120, effect: "Fatigue 8" },
      { difficulty: 140, effect: "Fatigue 6" },
      { difficulty: 180, effect: "Fatigue 4" },
      { difficulty: 240, effect: "30 Intensities" },
      { difficulty: 280, effect: "40 Intensities" },
      { difficulty: 320, effect: "50 Intensities" },
      { difficulty: 440, effect: "60 Intensities" }
    ]
  }),
  //#endregion

  //#region Physical Increase
  IncreaseJumpAbility: createMentalPower({
    name: "Increase Jump Ability",
    level: 1,
    action: "Active",
    discipline: "Physical Increase",
    maintenance: true,
    description:
      "The psychic can jump extraordinarily high. The psychic adds a variable bonus to his Jump Ability, in some cases reaching Inhuman or Zen levels.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "+10 to Jump" },
      { difficulty: 80, effect: "+20 to Jump" },
      { difficulty: 120, effect: "+40 to Jump" },
      { difficulty: 140, effect: "+80 to Jump" },
      { difficulty: 180, effect: "+120 to Jump / Inhumanity" },
      { difficulty: 240, effect: "+180 to Jump / Inhumanity" },
      { difficulty: 280, effect: "+220 to Jump / Inhumanity" },
      { difficulty: 320, effect: "+280 to Jump / Zen" },
      { difficulty: 440, effect: "+320 to Jump / Zen" }
    ]
  }),

  IncreaseAbility: createMentalPower({
    name: "Increase Ability",
    level: 1,
    action: "Active",
    discipline: "Physical Increase",
    maintenance: true,
    description:
      "This Power enhances a psychic’s Dexterity or Agility. If Agility is chosen, only the Characteristic increases; Movement Value does not increase. Progression is halved once the increased Characteristic reaches 10.",
    effects: [
      { difficulty: 20, effect: "Fatigue 4" },
      { difficulty: 40, effect: "Fatigue 2" },
      { difficulty: 80, effect: "Dexterity or Agility +1" },
      { difficulty: 120, effect: "Dexterity or Agility +2" },
      { difficulty: 140, effect: "Dexterity or Agility +3" },
      { difficulty: 180, effect: "Dexterity or Agility +4" },
      { difficulty: 240, effect: "Dexterity or Agility +5" },
      { difficulty: 280, effect: "Dexterity or Agility +6" },
      { difficulty: 320, effect: "Dexterity or Agility +8" },
      { difficulty: 440, effect: "Dexterity or Agility +10" }
    ]
  }),

  IncreaseAcrobatics: createMentalPower({
    name: "Increase Acrobatics",
    level: 1,
    action: "Active",
    discipline: "Physical Increase",
    maintenance: true,
    description:
      "The psychic can perform stunning acrobatic feats. A bonus is added to the Acrobatics Ability, potentially reaching Inhuman or Zen levels.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "+10 Acrobatics" },
      { difficulty: 80, effect: "+20 Acrobatics" },
      { difficulty: 120, effect: "+40 Acrobatics" },
      { difficulty: 140, effect: "+80 Acrobatics" },
      { difficulty: 180, effect: "+120 Acrobatics / Inhumanity" },
      { difficulty: 240, effect: "+180 Acrobatics / Inhumanity" },
      { difficulty: 280, effect: "+220 Acrobatics / Inhumanity" },
      { difficulty: 320, effect: "+280 Acrobatics / Zen" },
      { difficulty: 440, effect: "+320 Acrobatics / Zen" }
    ]
  }),

  IncreaseStrength: createMentalPower({
    name: "Increase Strength",
    level: 1,
    action: "Active",
    discipline: "Physical Increase",
    maintenance: true,
    description:
      "This Power increases the psychic’s Strength. Progression is halved once the increased Characteristic exceeds 10.",
    effects: [
      { difficulty: 20, effect: "Fatigue 4" },
      { difficulty: 40, effect: "Fatigue 2" },
      { difficulty: 80, effect: "Strength +1" },
      { difficulty: 120, effect: "Strength +2" },
      { difficulty: 140, effect: "Strength +3" },
      { difficulty: 180, effect: "Strength +4" },
      { difficulty: 240, effect: "Strength +5" },
      { difficulty: 280, effect: "Strength +6" },
      { difficulty: 320, effect: "Strength +8" },
      { difficulty: 440, effect: "Strength +10" }
    ]
  }),

  Inhumanity: createMentalPower({
    name: "Inhumanity",
    level: 1,
    action: "Active",
    discipline: "Physical Increase",
    maintenance: true,
    description:
      "This Power allows psychics to reach Inhuman Difficulty levels when performing physical actions and grants bonuses to Athletics Secondary Abilities.",
    effects: [
      { difficulty: 20, effect: "Fatigue 4" },
      { difficulty: 40, effect: "Fatigue 2" },
      { difficulty: 80, effect: "Inhumanity" },
      { difficulty: 120, effect: "Inhumanity / +5 to Athletics Abilities" },
      { difficulty: 140, effect: "Inhumanity / +10 to Athletics Abilities" },
      { difficulty: 180, effect: "Inhumanity / +20 to Athletics Abilities" },
      { difficulty: 240, effect: "Zen / +30 to Athletics Abilities" },
      { difficulty: 280, effect: "Zen / +40 to Athletics Abilities" },
      { difficulty: 320, effect: "Zen / +60 to Athletics Abilities" },
      { difficulty: 440, effect: "Zen / +80 to Athletics Abilities" }
    ]
  }),

  IncreaseMotion: createMentalPower({
    name: "Increase Motion",
    level: 1,
    action: "Active",
    discipline: "Physical Increase",
    maintenance: true,
    description:
      "Psychics can move at much higher speeds than usual, increasing their Movement Value. Progression is halved once Movement Value reaches 10.",
    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "Movement Value +1" },
      { difficulty: 140, effect: "Movement Value +2" },
      { difficulty: 180, effect: "Movement Value +3" },
      { difficulty: 240, effect: "Movement Value +4" },
      { difficulty: 280, effect: "Movement Value +5" },
      { difficulty: 320, effect: "Movement Value +6" },
      { difficulty: 440, effect: "Movement Value +8" }
    ]
  }),

  IncreaseReaction: createMentalPower({
    name: "Increase Reaction",
    level: 2,
    action: "Active",
    discipline: "Physical Increase",
    maintenance: true,
    description:
      "By increasing their reaction speed and enhancing their senses, this ability grants a special Initiative bonus for the next turn.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "+20 to Initiative" },
      { difficulty: 140, effect: "+40 to Initiative" },
      { difficulty: 180, effect: "+60 to Initiative" },
      { difficulty: 240, effect: "+80 to Initiative" },
      { difficulty: 280, effect: "+120 to Initiative" },
      { difficulty: 320, effect: "+160 to Initiative" },
      { difficulty: 440, effect: "+200 to Initiative" }
    ]
  }),

  PerceptionIncrease: createMentalPower({
    name: "Perception Increase",
    level: 2,
    action: "Active",
    discipline: "Physical Increase",
    maintenance: true,
    description:
      "This Power enhances a character’s perceptive capabilities by increasing Perception. Progression is halved once the Characteristic exceeds 10.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "Perception +1" },
      { difficulty: 140, effect: "Perception +2" },
      { difficulty: 180, effect: "Perception +3" },
      { difficulty: 240, effect: "Perception +4" },
      { difficulty: 280, effect: "Perception +5" },
      { difficulty: 320, effect: "Perception +6" },
      { difficulty: 440, effect: "Perception +8" }
    ]
  }),

  IncreaseEndurance: createMentalPower({
    name: "Increase Endurance",
    level: 2,
    action: "Passive",
    discipline: "Physical Increase",
    maintenance: true,
    description:
      "The psychic strengthens his body resistance by controlling his own cells, increasing his PhR.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "+10 to PhR" },
      { difficulty: 140, effect: "+20 to PhR" },
      { difficulty: 180, effect: "+40 to PhR" },
      { difficulty: 240, effect: "+80 to PhR" },
      { difficulty: 280, effect: "+120 to PhR" },
      { difficulty: 320, effect: "+160 to PhR" },
      { difficulty: 440, effect: "+200 to PhR" }
    ]
  }),

  Regeneration: createMentalPower({
    name: "Regeneration",
    level: 2,
    action: "Active",
    discipline: "Physical Increase",
    maintenance: true,
    description:
      "By controlling their bodies on a very primary level, psychics can increase their healing rate. This Power increases a character’s Regeneration level, but cannot raise it past 18.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 6" },
      { difficulty: 80, effect: "Fatigue 4" },
      { difficulty: 120, effect: "+1 to Regeneration level" },
      { difficulty: 140, effect: "+2 to Regeneration level" },
      { difficulty: 180, effect: "+4 to Regeneration level" },
      { difficulty: 240, effect: "+6 to Regeneration level" },
      { difficulty: 280, effect: "+8 to Regeneration level" },
      { difficulty: 320, effect: "+10 to Regeneration level" },
      { difficulty: 440, effect: "+12 to Regeneration level" }
    ]
  }),

  FatigueElimination: createMentalPower({
    name: "Fatigue Elimination",
    level: 3,
    action: "Active",
    discipline: "Physical Increase",
    maintenance: false,
    description:
      "By using energy from their Psychic Matrix, characters can unload physical exhaustion, restoring some of their lost Fatigue Points. Fatigue lost due to failing Psychic Powers cannot be restored.",
    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "Fatigue 6" },
      { difficulty: 140, effect: "Fatigue 4" },
      { difficulty: 180, effect: "Recovery of 2 Fatigue Points" },
      { difficulty: 240, effect: "Recovery of 4 Fatigue Points" },
      { difficulty: 280, effect: "Recovery of 6 Fatigue Points" },
      { difficulty: 320, effect: "Recovery of 10 Fatigue Points" },
      { difficulty: 440, effect: "Complete recovery" }
    ]
  }),

  TotalIncrease: createMentalPower({
    name: "Total Increase",
    level: 3,
    action: "Active",
    discipline: "Physical Increase",
    maintenance: true,
    description:
      "Characters can increase all of their Physical Characteristics at once. This Power provides a bonus to Strength, Dexterity, Agility, Constitution, and Perception. Progression is halved once Characteristics reach 10.",
    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "Fatigue 6" },
      { difficulty: 140, effect: "Fatigue 4" },
      { difficulty: 180, effect: "Physical Characteristics +1" },
      { difficulty: 240, effect: "Physical Characteristics +2" },
      { difficulty: 280, effect: "Physical Characteristics +4" },
      { difficulty: 320, effect: "Physical Characteristics +6" },
      { difficulty: 440, effect: "Physical Characteristics +8" }
    ]
  }),

  Imbue: createMentalPower({
    name: "Imbue",
    level: 3,
    action: "Active",
    discipline: "Physical Increase",
    maintenance: true,
    description:
      "This Power allows the psychic to use abilities from this Discipline on other characters. Imbued Powers cannot have an activation Difficulty higher than the one indicated on the Effects Table.",
    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "Fatigue 6" },
      { difficulty: 140, effect: "Fatigue 4" },
      { difficulty: 180, effect: "Very Difficult-level Powers" },
      { difficulty: 240, effect: "Absurd-level Powers" },
      { difficulty: 280, effect: "Almost Impossible-level Powers" },
      { difficulty: 320, effect: "Impossible-level Powers" },
      { difficulty: 440, effect: "Inhuman-level Powers" }
    ]
  }),
  //#endregion

  //#region Energy
  EnergyObjectCreation: createMentalPower({
    name: "Energy Object Creation",
    level: 1,
    action: "Active",
    discipline: "Energy",
    maintenance: true,
    description:
      "This Power creates one simple material object, such as a sword, shaping it out of sheer energy. The material is Energy-based with Resistance 25. Weapons created have Base Damage between 80 and 120, natural speed 10, and attack on the Electricity AT without using the character’s Strength bonus.",
    effects: [
      { difficulty: 20, effect: "Fatigue 4" },
      { difficulty: 40, effect: "Fatigue 2" },
      { difficulty: 80, effect: "Fatigue 1" },
      { difficulty: 120, effect: "3 cubic feet" },
      { difficulty: 140, effect: "5 cubic feet" },
      { difficulty: 180, effect: "10 cubic feet" },
      { difficulty: 240, effect: "15 cubic feet" },
      { difficulty: 280, effect: "60 cubic feet" },
      { difficulty: 320, effect: "100 cubic feet" },
      { difficulty: 440, effect: "200 cubic feet" }
    ]
  }),

  EnergyDischarge: createMentalPower({
    name: "Energy Discharge",
    level: 1,
    action: "Active",
    discipline: "Energy",
    maintenance: false,
    description:
      "Energy Discharge allows characters to use their Psychic Projection to perform attacks using the Electricity AT. Base Damage depends on activation success, and at Impossible or higher levels it can damage immaterial beings. The attack is perfectly visible, even to those who cannot see Psychic Matrices.",
    effects: [
      { difficulty: 20, effect: "Fatigue 4" },
      { difficulty: 40, effect: "Fatigue 2" },
      { difficulty: 80, effect: "Fatigue 1" },
      { difficulty: 120, effect: "Damage 50" },
      { difficulty: 140, effect: "Damage 70" },
      { difficulty: 180, effect: "Damage 100" },
      { difficulty: 240, effect: "Damage 120" },
      { difficulty: 280, effect: "Damage 140 / It affects immaterial beings" },
      { difficulty: 320, effect: "Damage 180 / It affects immaterial beings" },
      { difficulty: 440, effect: "Damage 220 / It affects immaterial beings" }
    ]
  }),

  CreateEnergy: createMentalPower({
    name: "Create Energy",
    level: 1,
    action: "Active",
    discipline: "Energy",
    maintenance: true,
    description:
      "This Power creates Energy Intensities or arouses an existing source to equal proportions. Any non-Supernatural energy may be created, from bonfires to lightning.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "1 Intensity" },
      { difficulty: 120, effect: "3 Intensities" },
      { difficulty: 140, effect: "5 Intensities" },
      { difficulty: 180, effect: "7 Intensities" },
      { difficulty: 240, effect: "10 Intensities" },
      { difficulty: 280, effect: "13 Intensities" },
      { difficulty: 320, effect: "16 Intensities" },
      { difficulty: 440, effect: "20 Intensities" }
    ]
  }),

  EnergyShield: createMentalPower({
    name: "Energy Shield",
    level: 1,
    action: "Passive",
    discipline: "Energy",
    maintenance: true,
    description:
      "This Power creates a shield of energy that protects the psychic from all sorts of attacks, including those of a Supernatural origin. It uses the Life Points with which it was created and loses 5 LP per turn until it reaches an amount the psychic can Maintain naturally.",
    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "300 Life Points" },
      { difficulty: 140, effect: "500 Life Points" },
      { difficulty: 180, effect: "800 Life Points" },
      { difficulty: 240, effect: "1,000 Life Points" },
      { difficulty: 280, effect: "1,400 Life Points" },
      { difficulty: 320, effect: "2,000 Life Points" },
      { difficulty: 440, effect: "3,000 Life Points" }
    ]
  }),

  SenseEnergy: createMentalPower({
    name: "Sense Energy",
    level: 1,
    action: "Active",
    discipline: "Energy",
    maintenance: true,
    description:
      "The character can detect the energy around him, including the Intensity and nature of the source, unless it is hidden. It automatically affects all parties within its area of action without requiring Psychic Projection.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "30-foot radius" },
      { difficulty: 120, effect: "150-foot radius" },
      { difficulty: 140, effect: "300-foot radius" },
      { difficulty: 180, effect: "800-foot radius" },
      { difficulty: 240, effect: "1,500-foot radius" },
      { difficulty: 280, effect: "1-mile radius" },
      { difficulty: 320, effect: "5-mile radius" },
      { difficulty: 440, effect: "60-mile radius" }
    ]
  }),

  ModifyNature: createMentalPower({
    name: "Modify Nature",
    level: 2,
    action: "Active",
    discipline: "Energy",
    maintenance: false,
    description:
      "This Power allows a psychic to transfer several Intensities of a particular Energy Type to another type of Energy, such as turning Fire into Electricity or Ice. Living beings or entities with Presence can avoid the effect with a successful PhR Check.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 6" },
      { difficulty: 80, effect: "Fatigue 4" },
      { difficulty: 120, effect: "Fatigue 2" },
      { difficulty: 140, effect: "6 Intensities / 100 PhR" },
      { difficulty: 180, effect: "8 Intensities / 120 PhR" },
      { difficulty: 240, effect: "12 Intensities / 140 PhR" },
      { difficulty: 280, effect: "16 Intensities / 160 PhR" },
      { difficulty: 320, effect: "20 Intensities / 180 PhR" },
      { difficulty: 440, effect: "25 Intensities / 220 PhR" }
    ]
  }),

  UndoEnergy: createMentalPower({
    name: "Undo Energy",
    level: 2,
    action: "Active",
    discipline: "Energy",
    maintenance: false,
    description:
      "This Power decreases the Intensity level of non-Supernatural energy. When used against an Energy-based being, it causes 5 damage per Intensity decreased (25 if the creature has Damage Resistance), unless it succeeds at a PhR Check.",
    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "–1 Intensity / 100 PhR" },
      { difficulty: 140, effect: "–3 Intensities / 120 PhR" },
      { difficulty: 180, effect: "–5 Intensities / 140 PhR" },
      { difficulty: 240, effect: "–8 Intensities / 160 PhR" },
      { difficulty: 280, effect: "–12 Intensities / 180 PhR" },
      { difficulty: 320, effect: "–18 Intensities / 200 PhR" },
      { difficulty: 440, effect: "–24 Intensities / 240 PhR" }
    ]
  }),

  Immunity: createMentalPower({
    name: "Immunity",
    level: 2,
    action: "Passive",
    discipline: "Energy",
    maintenance: true,
    description:
      "The psychic, or a designated target, becomes immune to several Intensities of a specific Energy Type. Each Intensity reduces Base Damage by 5 and grants +5 to Resistance Checks against that Energy Type.",
    effects: [
      { difficulty: 20, effect: "Fatigue 12" },
      { difficulty: 40, effect: "Fatigue 8" },
      { difficulty: 80, effect: "Fatigue 6" },
      { difficulty: 120, effect: "Fatigue 4" },
      { difficulty: 140, effect: "Fatigue 2" },
      { difficulty: 180, effect: "10 Intensities" },
      { difficulty: 240, effect: "15 Intensities" },
      { difficulty: 280, effect: "20 Intensities" },
      { difficulty: 320, effect: "30 Intensities" },
      { difficulty: 440, effect: "40 Intensities" }
    ]
  }),

  ControlEnergy: createMentalPower({
    name: "Control Energy",
    level: 2,
    action: "Active",
    discipline: "Energy",
    maintenance: true,
    description:
      "This Power allows the psychic to control several Cold, Heat, or Electricity Intensities, manipulating them freely. If used offensively, the psychic’s Psychic Projection is reduced by half. Living beings or entities with Presence can avoid the effect with a successful PhR Check.",
    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "4 Intensities / 80 PhR" },
      { difficulty: 140, effect: "6 Intensities / 100 PhR" },
      { difficulty: 180, effect: "8 Intensities / 120 PhR" },
      { difficulty: 240, effect: "12 Intensities / 140 PhR" },
      { difficulty: 280, effect: "16 Intensities / 160 PhR" },
      { difficulty: 320, effect: "20 Intensities / 180 PhR" },
      { difficulty: 440, effect: "25 Intensities / 220 PhR" }
    ]
  }),

  EnergyDome: createMentalPower({
    name: "Energy Dome",
    level: 3,
    action: "Active",
    discipline: "Energy",
    maintenance: false,
    description:
      "The psychic generates an energy dome that destroys anything within its area. It uses the Electricity AT and affects all targets in the area without selection. At higher levels, the dome can damage immaterial beings and is perfectly visible.",
    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "Fatigue 6" },
      { difficulty: 140, effect: "Fatigue 4" },
      { difficulty: 180, effect: "Damage 100 / 80-foot radius" },
      { difficulty: 240, effect: "Damage 120 / 150-foot radius" },
      { difficulty: 280, effect: "Damage 140 / 300-foot radius" },
      { difficulty: 320, effect: "Damage 160 / 650-foot radius / It can damage immaterial beings" },
      {
        difficulty: 440,
        effect: "Damage 200 / 1,500-foot radius / It can damage immaterial beings"
      }
    ]
  }),

  MajorEnergy: createMentalPower({
    name: "Major Energy",
    level: 3,
    action: "Active",
    discipline: "Energy",
    maintenance: true,
    description:
      "An amplified version of Create Energy, capable of provoking much more devastating effects.",
    effects: [
      { difficulty: 20, effect: "Fatigue 20" },
      { difficulty: 40, effect: "Fatigue 16" },
      { difficulty: 80, effect: "Fatigue 12" },
      { difficulty: 120, effect: "Fatigue 8" },
      { difficulty: 140, effect: "Fatigue 6" },
      { difficulty: 180, effect: "Fatigue 4" },
      { difficulty: 240, effect: "25 Intensities" },
      { difficulty: 280, effect: "35 Intensities" },
      { difficulty: 320, effect: "45 Intensities" },
      { difficulty: 440, effect: "55 Intensities" }
    ]
  }),
  //#endregion

  //#region Sentience
  SenseFeelings: createMentalPower({
    name: "Sense Feelings",
    level: 1,
    action: "Active",
    discipline: "Sentience",
    maintenance: true,
    description:
      "The psychic can sense an individual’s feelings at a particular moment. Targets may resist with a PsR Check. They may retry every 5 turns only if they suspect the Power.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "100 PsR" },
      { difficulty: 120, effect: "120 PsR" },
      { difficulty: 140, effect: "140 PsR" },
      { difficulty: 180, effect: "160 PsR" },
      { difficulty: 240, effect: "180 PsR" },
      { difficulty: 280, effect: "200 PsR" },
      { difficulty: 320, effect: "220 PsR" },
      { difficulty: 440, effect: "240 PsR" }
    ]
  }),

  IntensifyFeelings: createMentalPower({
    name: "Intensify Feelings",
    level: 1,
    action: "Active",
    discipline: "Sentience",
    maintenance: true,
    description:
      "This Power intensifies an individual’s dominant feeling or mood. It cannot create new feelings. Targets may resist with a PsR Check and retry every 5 turns if suspicious.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "100 PsR" },
      { difficulty: 120, effect: "120 PsR" },
      { difficulty: 140, effect: "140 PsR" },
      { difficulty: 180, effect: "160 PsR" },
      { difficulty: 240, effect: "180 PsR" },
      { difficulty: 280, effect: "200 PsR" },
      { difficulty: 320, effect: "220 PsR" },
      { difficulty: 440, effect: "240 PsR" }
    ]
  }),

  DetectFeelings: createMentalPower({
    name: "Detect Feelings",
    level: 1,
    action: "Active",
    discipline: "Sentience",
    maintenance: true,
    description:
      "This Power detects a specific feeling in any subject within its area. All individuals are affected equally. Targets may resist with a PsR Check.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "80 PhR / 30-foot radius" },
      { difficulty: 120, effect: "100 PhR / 150-foot radius" },
      { difficulty: 140, effect: "120 PhR / 300-foot radius" },
      { difficulty: 180, effect: "140 PhR / 800-foot radius" },
      { difficulty: 240, effect: "160 PhR / 1,500-foot radius" },
      { difficulty: 280, effect: "180 PhR / 1-mile radius" },
      { difficulty: 320, effect: "200 PhR / 5-mile radius" },
      { difficulty: 440, effect: "220 PhR / 60-mile radius" }
    ]
  }),

  ConnectSenses: createMentalPower({
    name: "Connect Senses",
    level: 1,
    action: "Active",
    discipline: "Sentience",
    maintenance: true,
    description:
      "This Power links the psychic’s senses with another individual, allowing shared perception. Targets may resist with a PsR Check. Maximum distance depends on activation success.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "60 PsR / 30-foot radius" },
      { difficulty: 120, effect: "80 PsR / 300-foot radius" },
      { difficulty: 140, effect: "100 PsR / 1,500-foot radius" },
      { difficulty: 180, effect: "120 PsR / 1-mile radius" },
      { difficulty: 240, effect: "140 PsR / 5-mile radius" },
      { difficulty: 280, effect: "160 PsR / 60-mile radius" },
      { difficulty: 320, effect: "180 PsR / 600-mile radius" },
      { difficulty: 440, effect: "200 PsR / Any distance" }
    ]
  }),

  ProjectSenses: createMentalPower({
    name: "Project Senses",
    level: 2,
    action: "Active",
    discipline: "Sentience",
    maintenance: true,
    description:
      "The psychic can project their senses to a distant location, using perceptive abilities as if physically present. Cannot pass through energy barriers or magical protections.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 6" },
      { difficulty: 80, effect: "Fatigue 4" },
      { difficulty: 120, effect: "Fatigue 2" },
      { difficulty: 140, effect: "1-mile radius" },
      { difficulty: 180, effect: "5-mile radius" },
      { difficulty: 240, effect: "30-mile radius" },
      { difficulty: 280, effect: "60-mile radius" },
      { difficulty: 320, effect: "600-mile radius" },
      { difficulty: 440, effect: "Any distance" }
    ]
  }),

  EliminateSenses: createMentalPower({
    name: "Eliminate Senses",
    level: 2,
    action: "Active",
    discipline: "Sentience",
    maintenance: true,
    description:
      "The psychic can temporarily eliminate one of a victim’s senses. One extra sense is removed for every 20 points the victim fails their PsR Check. Victims may retry every 5 turns.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 6" },
      { difficulty: 80, effect: "Fatigue 4" },
      { difficulty: 120, effect: "Fatigue 2" },
      { difficulty: 140, effect: "100 PsR" },
      { difficulty: 180, effect: "120 PsR" },
      { difficulty: 240, effect: "140 PsR" },
      { difficulty: 280, effect: "160 PsR" },
      { difficulty: 320, effect: "180 PsR" },
      { difficulty: 440, effect: "220 PsR" }
    ]
  }),

  CreateFeelings: createMentalPower({
    name: "Create Feelings",
    level: 2,
    action: "Active",
    discipline: "Sentience",
    maintenance: true,
    description:
      "This Power instills new feelings in an individual, even radically altering emotional states. Targets resisting receive +20 PsR if the induced feeling contradicts their current state.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "80 PsR" },
      { difficulty: 140, effect: "100 PsR" },
      { difficulty: 180, effect: "120 PsR" },
      { difficulty: 240, effect: "140 PsR" },
      { difficulty: 280, effect: "160 PsR" },
      { difficulty: 320, effect: "180 PsR" },
      { difficulty: 440, effect: "200 PsR" }
    ]
  }),

  InfuseFeelings: createMentalPower({
    name: "Infuse Feelings",
    level: 2,
    action: "Active",
    discipline: "Sentience",
    maintenance: true,
    description:
      "This Power infuses an object or place with a strong feeling that affects anyone who touches it or enters the area. Effects vanish when leaving the area or breaking contact.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 6" },
      { difficulty: 80, effect: "Fatigue 4" },
      { difficulty: 120, effect: "Fatigue 2" },
      { difficulty: 140, effect: "100 PsR / 15-foot area" },
      { difficulty: 180, effect: "120 PsR / 30-foot area" },
      { difficulty: 240, effect: "140 PsR / 80-foot area" },
      { difficulty: 280, effect: "160 PsR / 150-foot area" },
      { difficulty: 320, effect: "180 PsR / 60-foot area" },
      { difficulty: 440, effect: "220 PsR / 1,500-foot area" }
    ]
  }),

  DestroyFeelings: createMentalPower({
    name: "Destroy Feelings",
    level: 3,
    action: "Active",
    discipline: "Sentience",
    maintenance: false,
    description:
      "The psychic can eliminate unwanted feelings. Deeply rooted emotions grant +20 PsR to resist. If the victim fails by more than 80 points, all feelings may be erased, leaving them catatonic.",
    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "Fatigue 6" },
      { difficulty: 140, effect: "Fatigue 4" },
      { difficulty: 180, effect: "120 PsR" },
      { difficulty: 240, effect: "140 PsR" },
      { difficulty: 280, effect: "160 PsR" },
      { difficulty: 320, effect: "180 PsR" },
      { difficulty: 440, effect: "200 PsR" }
    ]
  }),

  Area: createMentalPower({
    name: "Area",
    level: 3,
    action: "Active",
    discipline: "Sentience",
    maintenance: true,
    description:
      "This Power causes all Sentience Discipline Powers used while active to affect every individual within the indicated radius.",
    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "Fatigue 4" },
      { difficulty: 140, effect: "30-foot radius" },
      { difficulty: 180, effect: "300-foot radius" },
      { difficulty: 240, effect: "1-mile radius" },
      { difficulty: 280, effect: "5-mile radius" },
      { difficulty: 320, effect: "60-mile radius" },
      { difficulty: 440, effect: "1,500-mile radius" }
    ]
  }),
  //#endregion

  //#region Telemetry
  SenseResidues: createMentalPower({
    name: "Sense Residues",
    level: 1,
    action: "Active",
    discipline: "Telemetry",
    maintenance: true,
    description:
      "The psychic senses environmental residues of intense feelings emitted long ago. Only strong emotions such as passion or fear leave detectable traces.",
    effects: [
      { difficulty: 20, effect: "Fatigue 1" },
      { difficulty: 40, effect: "One Hour" },
      { difficulty: 80, effect: "Six Hours" },
      { difficulty: 120, effect: "One Day" },
      { difficulty: 140, effect: "Three Days" },
      { difficulty: 180, effect: "One Week" },
      { difficulty: 240, effect: "One Month" },
      { difficulty: 280, effect: "One Year" },
      { difficulty: 320, effect: "One Decade" },
      { difficulty: 440, effect: "One Century" }
    ]
  }),

  ReadThePast: createMentalPower({
    name: "Read The Past",
    level: 2,
    action: "Active",
    discipline: "Telemetry",
    maintenance: false,
    description:
      "This Power enables the psychic to read the history of a specific object or place, revealing all events that occurred within the time span indicated by the activation success.",
    effects: [
      { difficulty: 20, effect: "Fatigue 8" },
      { difficulty: 40, effect: "Fatigue 6" },
      { difficulty: 80, effect: "Fatigue 4" },
      { difficulty: 120, effect: "Fatigue 2" },
      { difficulty: 140, effect: "One Hour" },
      { difficulty: 180, effect: "Six Hours" },
      { difficulty: 240, effect: "One Day" },
      { difficulty: 280, effect: "One Week" },
      { difficulty: 320, effect: "One Month" },
      { difficulty: 440, effect: "One Year" }
    ]
  }),

  HumanErudition: createMentalPower({
    name: "Human Erudition",
    level: 2,
    action: "Active",
    discipline: "Telemetry",
    maintenance: false,
    description:
      "This Power allows the psychic to analyze an individual's past to discover specific actions or determine what they were doing at a given time. Targets may resist with a PsR Check.",
    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "One Day / 80 PsR" },
      { difficulty: 140, effect: "One Week / 100 PsR" },
      { difficulty: 180, effect: "One Month / 120 PsR" },
      { difficulty: 240, effect: "One Year / 140 PsR" },
      { difficulty: 280, effect: "Ten Years / 160 PsR" },
      { difficulty: 320, effect: "Fifty Years / 180 PsR" },
      { difficulty: 440, effect: "All of his life / 200 PsR" }
    ]
  }),

  SeeInHistory: createMentalPower({
    name: "See in History",
    level: 3,
    action: "Active",
    discipline: "Telemetry",
    maintenance: true,
    description:
      "This Power allows psychics to project their senses into the past and witness events that occurred at their current location. The number of years they can look back depends on activation success.",
    effects: [
      { difficulty: 20, effect: "Fatigue 16" },
      { difficulty: 40, effect: "Fatigue 12" },
      { difficulty: 80, effect: "Fatigue 8" },
      { difficulty: 120, effect: "Fatigue 6" },
      { difficulty: 140, effect: "Fatigue 4" },
      { difficulty: 180, effect: "One Year" },
      { difficulty: 240, effect: "Ten Years" },
      { difficulty: 280, effect: "One Century" },
      { difficulty: 320, effect: "One Millennium" },
      { difficulty: 440, effect: "Any Amount of Time" }
    ]
  }),
  //#endregion

  //#region Matrix Powers
  SenseMatrices: createMentalPower({
    name: "Sense Matrices",
    level: 0,
    action: "Active",
    discipline: "Matrix Powers",
    maintenance: true,
    description:
      "The psychic senses the use of Powers and the Presence of individuals who share this ability. They perceive the energy of Psychic Matrices and suffer no Blindness penalty against invisible Psychic Abilities.",
    effects: [
      { difficulty: 20, effect: "Fatigue 1" },
      { difficulty: 40, effect: "30 feet / See active Psychic Matrices" },
      { difficulty: 80, effect: "80 feet / Detect latent Powers in people" },
      { difficulty: 120, effect: "150 feet / Recognize the Power in use" },
      { difficulty: 140, effect: "300 feet" },
      {
        difficulty: 180,
        effect: "800 feet / Notice which Disciplines a psychic has affinity with"
      },
      { difficulty: 240, effect: "1,500 feet / Measure another psychic’s Potential" },
      { difficulty: 280, effect: "1 mile / Detect another psychic’s free PP left" },
      { difficulty: 320, effect: "5 miles / Notice another psychic’s Powers" },
      { difficulty: 440, effect: "60 miles" }
    ]
  }),

  DestroyMatrices: createMentalPower({
    name: "Destroy Matrices",
    level: 0,
    action: "Passive",
    discipline: "Matrix Powers",
    maintenance: true,
    description:
      "This ability destroys active Psychic Powers, provided they are not of a higher Difficulty than indicated by the activation success.",
    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "Medium-level Powers" },
      { difficulty: 140, effect: "Difficult-level Powers" },
      { difficulty: 180, effect: "Very Difficult-level Powers" },
      { difficulty: 240, effect: "Absurd-level Powers" },
      { difficulty: 280, effect: "Almost Impossible-level Powers" },
      { difficulty: 320, effect: "Impossible-level Powers" },
      { difficulty: 440, effect: "Inhuman-level Powers" }
    ]
  }),

  HideMatrices: createMentalPower({
    name: "Hide Matrices",
    level: 0,
    action: "Active",
    discipline: "Matrix Powers",
    maintenance: true,
    description:
      "This Power hides the psychic’s mental abilities from Sense Matrices by reducing its effective Difficulty result. If the Sense Matrices result falls below Easy, the psychic remains undetected.",
    effects: [
      { difficulty: 20, effect: "Fatigue 2" },
      { difficulty: 40, effect: "Fatigue 1" },
      { difficulty: 80, effect: "-2 Difficulty Degrees" },
      { difficulty: 120, effect: "-3 Difficulty Degrees" },
      { difficulty: 140, effect: "-4 Difficulty Degrees" },
      { difficulty: 180, effect: "-5 Difficulty Degrees" },
      { difficulty: 240, effect: "-6 Difficulty Degrees" },
      { difficulty: 280, effect: "-7 Difficulty Degrees" },
      { difficulty: 320, effect: "-8 Difficulty Degrees" },
      { difficulty: 440, effect: "-9 Difficulty Degrees" }
    ]
  }),

  LinkMatrices: createMentalPower({
    name: "Link Matrices",
    level: 0,
    action: "Active",
    discipline: "Matrix Powers",
    maintenance: true,
    description:
      "This Power connects the minds of several psychics. One linked member may add the Willpower bonuses of others to his Psychic Potential. Only one character may use Psychic Abilities while linked.",
    effects: [
      { difficulty: 20, effect: "Fatigue 6" },
      { difficulty: 40, effect: "Fatigue 4" },
      { difficulty: 80, effect: "Fatigue 2" },
      { difficulty: 120, effect: "2 Individuals" },
      { difficulty: 140, effect: "3 Individuals" },
      { difficulty: 180, effect: "4 Individuals" },
      { difficulty: 240, effect: "6 Individuals" },
      { difficulty: 280, effect: "8 Individuals" },
      { difficulty: 320, effect: "10 Individuals" },
      { difficulty: 440, effect: "20 Individuals" }
    ]
  })
  //#endregion
};
