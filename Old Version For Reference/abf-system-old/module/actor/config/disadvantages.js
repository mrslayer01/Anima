export function createDisadvantage(advInput) {
    const {
        name = "",
        type = "",
        effects = "",
        benefit = "",
        description = ""
    } = advInput;

    return {
        name,
        type,
        effects,
        benefit,
        description
    };
}

export const ABF_DISADVANTAGES = {
    //Common Disadvantages
    badLuck: createDisadvantage({
        name: "Bad Luck",
        type: "Common",
        effects: "The required number for a fumble increases by 2 points. Normal abilities, therefore, fumble on a result of 5 (4 if the character possesses mastery in that ability).",
        benefit: "1",
        description: "Characters with this Disadvantage have very bad luck in doing what they set out to do; they fail much more than they would like."
    }),
    blind: createDisadvantage({
        name: "Blind",
        type: "Common",
        effects: "The character cannot use any ability that requires sight. He applies the blinded penalty at all times.",
        benefit: "2",
        description: "A character with this Disadvantage is completely blind."
    }),

    deafness: createDisadvantage({
        name: "Deafness",
        type: "Common",
        effects: "The character cannot use any ability that requires hearing.",
        benefit: "1",
        description: "A character with this Disadvantage cannot hear anything."
    }),

    mute: createDisadvantage({
        name: "Mute",
        type: "Common",
        effects: "The character cannot speak.",
        benefit: "1",
        description: "A character with this Disadvantage is incapable of speaking."
    }),

    nearsighted: createDisadvantage({
        name: "Nearsighted",
        type: "Common",
        effects: "Apply a –50 penalty to any Notice and Search rolls using vision, and a –3 to any Perception checks that require it. This penalty also applies to aiming. A character can reduce this penalty somewhat (as determined by the GM) by obtaining glasses.",
        benefit: "1",
        description: "A character with this Disadvantage cannot see well; many things appear blurry, and he has difficulty even reading."
    }),

    exclusiveWeapon: createDisadvantage({
        name: "Exclusive Weapon",
        type: "Common",
        effects: "The character applies a penalty of –30 to his combat ability with any weapon other than his preferred one.",
        restriction: "Only classes in the Domine, Fighter, Prowler, and Novel Archetypes can acquire this Disadvantage.",
        benefit: "1",
        description: "A character with this Disadvantage is accustomed to fighting exclusively with a specific weapon."
    }),

    severeAllergy: createDisadvantage({
        name: "Severe Allergy",
        type: "Common",
        effects: "On making contact with the allergen, a character suffers penalties between –40 to –80 on all actions, depending on the severity or the length of time in contact with the allergen.",
        benefit: "1",
        description: "A character with this Disadvantage suffers from a serious allergy that causes severe reactions upon contact or inhalation."
    }),

    addictionOrSeriousVice: createDisadvantage({
        name: "Addiction or Serious Vice",
        type: "Common",
        effects: "The character applies a cumulative penalty of –10 for every day that passes without satisfying his addiction (up to –100).",
        benefit: "1",
        description: "A character with this Disadvantage has an urgent need to take some action or consume a substance daily."
    }),

    atrophiedLimb: createDisadvantage({
        name: "Atrophied Limb",
        type: "Common",
        effects: "The character applies a penalty of –80 to all physical actions that require the use of the atrophied limb.",
        benefit: "1",
        description: "A character with this Disadvantage has a severe problem with one of his limbs."
    }),

    seriousIllness: createDisadvantage({
        name: "Serious Illness",
        type: "Common",
        effects: "The character applies a cumulative penalty of –10 to all actions for each month of game time that passes. The GM secretly determines the date when the character will die.",
        benefit: "2",
        description: "A character with this Disadvantage suffers from a degenerative disease that will eventually kill him."
    }),

    physicalWeakness: createDisadvantage({
        name: "Physical Weakness",
        type: "Common",
        effects: "Reduce the Physical Resistance (PhR) of a character by half.",
        benefit: "1",
        description: "A character with this Disadvantage is exceptionally weak physically."
    }),

    deepSleeper: createDisadvantage({
        name: "Deep Sleeper",
        type: "Common",
        effects: "The character applies a penalty of –200 to any Perceptive roll while sleeping. For the first ten turns after waking, he has a penalty of –40 to all actions.",
        benefit: "1",
        description: "A character with this Disadvantage sleeps very deeply and has difficulty awakening."
    }),

    deductTwoPointsFromACharacteristic: createDisadvantage({
        name: "Deduct Two Points From a Characteristic",
        type: "Common",
        effects: "Deduct 2 points from one of the character’s Primary Characteristics.",
        restriction: "Characters can only acquire this Disadvantage once. You cannot reduce a Characteristic below 3.",
        benefit: "1",
        description: "One of the character’s Characteristics is less developed than it should be."
    }),

    unfortunate: createDisadvantage({
        name: "Unfortunate",
        type: "Common",
        effects: "The GM determines the limits of this Disadvantage. The character will always be the one who 'randomly' falls into traps or is targeted first when chance decides.",
        benefit: "1",
        description: "Misfortune follows the character wherever he goes."
    }),

    easilyPossessed: createDisadvantage({
        name: "Easily Possessed",
        type: "Common",
        effects: "The character receives –50 to any Physical Resistance or Magic Resistance against domination or possession effects.",
        benefit: "1",
        description: "A character with this Disadvantage is easily controlled by beings capable of altering his mind."
    }),

    exhausted: createDisadvantage({
        name: "Exhausted",
        type: "Common",
        effects: "Doubles Fatigue penalties to actions and reduces the base Fatigue of the character by 1 point.",
        benefit: "1",
        description: "A character with this Disadvantage is vulnerable to Fatigue and suffers its effects more severely."
    }),

    severePhobia: createDisadvantage({
        name: "Severe Phobia",
        type: "Common",
        effects: "The character suffers the Fear State whenever he encounters the object of his phobia.",
        benefit: "1",
        description: "A character with this Disadvantage experiences a terrible fear of something."
    }),

    vulnerableToPain: createDisadvantage({
        name: "Vulnerable to Pain",
        type: "Common",
        effects: "Doubles any penalty caused by pain, including those produced by critical or mystical effects.",
        benefit: "1",
        description: "The character has no resistance to physical pain, which terrifies him."
    }),

    sickly: createDisadvantage({
        name: "Sickly",
        type: "Common",
        effects: "Reduce the character’s Disease Resistance (DR) by half.",
        benefit: "1",
        description: "A character with this Disadvantage suffers from bad health and sickens easily."
    }),

    slowHealer: createDisadvantage({
        name: "Slow Healer",
        type: "Common",
        effects: "The character recovers only half the Life Points he should by any means, whether normal or magical.",
        benefit: "1",
        description: "A character with this Disadvantage recovers from wounds with great difficulty."
    }),

    slowLearner: createDisadvantage({
        name: "Slow Learner",
        type: "Common",
        effects: "The character suffers a penalty of –4 Experience Points to those granted by the GM at the end of a session. An additional point increases the penalty to –8.",
        benefit: "1, 2",
        description: "A character with this Disadvantage cannot learn as quickly as a normal individual."
    }),

    slowReactions: createDisadvantage({
        name: "Slow Reactions",
        type: "Common",
        effects: "The character applies a special penalty of –30 to his Initiative. An additional point increases the penalty to –60.",
        benefit: "1, 2",
        description: "The character’s reflexes leave him ill-prepared to respond quickly to events."
    }),

    susceptibleToMagic: createDisadvantage({
        name: "Susceptible to Magic",
        type: "Common",
        effects: "Reduce the character’s MR by half.",
        benefit: "1",
        description: "A character with this Disadvantage is easily affected by magical energies."
    }),

    susceptibleToPoisons: createDisadvantage({
        name: "Susceptible to Poisons",
        type: "Common",
        effects: "Reduce the character’s Venom Resistance (VR) by half.",
        benefit: "1",
        description: "A character with this Disadvantage cannot combat the effects of harmful substances."
    }),

    unattractive: createDisadvantage({
        name: "Unattractive",
        type: "Common",
        effects: "This Disadvantage reduces a character’s Appearance to 2.",
        restriction: "The character must have a minimum of 7 in Appearance, generated by die roll, not chosen.",
        benefit: "1",
        description: "A character with this Disadvantage suffers from terrible deformities that make him unpleasant to look upon."
    }),

    vulnerableToHeatCold: createDisadvantage({
        name: "Vulnerable to Heat/Cold",
        type: "Common",
        effects: "The character suffers a penalty of –80 to his Resistance against the chosen element and –30 to all actions in extreme climates.",
        benefit: "1",
        description: "A character with this Disadvantage is particularly vulnerable to heat or cold."
    }),

    //Magic Disadvantages
    oralRequirement: createDisadvantage({
        name: "Oral Requirement",
        type: "Magic",
        effects: "The character must be able to speak to accumulate magic and to cast his spells.",
        benefit: "1",
        description: "A character with this Disadvantage can only cast spells if he can speak."
    }),

    requireGestures: createDisadvantage({
        name: "Require Gestures",
        type: "Magic",
        effects: "The character must move freely to accumulate magic and cast spells.",
        benefit: "1",
        description: "A character with this Disadvantage must have complete freedom of movement in order to control or use his powers."
    }),

    magicalExhaustion: createDisadvantage({
        name: "Magical Exhaustion",
        type: "Magic",
        effects: "The mage loses 1 point of Fatigue when casting a spell with a potential greater than 100, 2 if it is greater than 200, and 3 if it is greater than 300.",
        benefit: "1",
        description: "A character with this Disadvantage suffers intense fatigue whenever he uses magic."
    }),

    shamanism: createDisadvantage({
        name: "Shamanism",
        type: "Magic",
        effects: "The character requires material components to cast spells. Each spell requires a different component as determined by the GM, according to its origin and the knowledge of the character.",
        benefit: "2",
        description: "The magic practiced by this character has a tribal and shamanic character, tied to the material world."
    }),

    magicalTies: createDisadvantage({
        name: "Magical Ties",
        type: "Magic",
        effects: "The magician cannot choose free spells of his magical paths or freely access chosen spells.",
        benefit: "1",
        description: "The character’s powers are tied to the magical paths, preventing him from developing or researching his own spells."
    }),

    slowRecoveryOfMagic: createDisadvantage({
        name: "Slow Recovery of Magic",
        type: "Magic",
        effects: "Reduce the Zeonic regeneration of the character by half.",
        benefit: "1",
        description: "Magic has difficulty passing through the wizard’s essence, making recovery of used power slow."
    }),

    magicBlockage: createDisadvantage({
        name: "Magic Blockage",
        type: "Magic",
        effects: "The character lacks Zeonic regeneration and does not naturally recover the points of Zeon he consumes. He regains magic only by draining objects that allow it or living beings with the Gift.",
        restriction: "This Disadvantage cannot be combined with Slow Recovery of Magic.",
        benefit: "2",
        description: "Magic does not flow naturally through the character; a blockage prevents him from channeling or regenerating power."
    }),

    actionRequirement: createDisadvantage({
        name: "Action Requirement",
        type: "Magic",
        effects: "The character may use magic only if the specific action is performed or the specific conditions of the Disadvantage are met. If the action is a Secondary Ability, the character must roll a check against Difficult (DIF) to cast his spells.",
        benefit: "1",
        description: "The character’s control over the Soul Flow is fickle and works only while performing a specific action or under certain conditions."
    }),
    //Psychic Disadvanatges
    psychicExhaustion: createDisadvantage({
    name: "Psychic Exhaustion",
    type: "Psychic",
    effects: "The character loses double the points of Fatigue indicated whenever using psychic powers.",
    benefit: "1",
    description: "The psychic powers of a character with this Disadvantage cause great physical stress upon his body, leaving him terribly exhausted even when using low-level psychic abilities."
    }),

    psychicConsumption: createDisadvantage({
        name: "Psychic Consumption",
        type: "Psychic",
        effects: "If the character suffers a psychic failure, he automatically loses the same number of Life Points as the number by which he failed.",
        benefit: "2",
        description: "The psychic powers of a character with this Disadvantage create serious feedback in his body, causing internal damage."
    }),

    onePowerAtATime: createDisadvantage({
        name: "One Power at a Time",
        type: "Psychic",
        effects: "The character can use only one psychic power per assault. This does not prevent him from continuing to use others which are maintained, as long as they began in previous assaults.",
        benefit: "1",
        description: "The character’s psychic powers do not allow him to use several abilities at once; his focus is too intense to project more than one at a time."
    }),

    noConcentration: createDisadvantage({
        name: "No Concentration",
        type: "Psychic",
        effects: "A psychic with this Disadvantage does not apply bonuses to his psychic potential by concentrating.",
        benefit: "1",
        description: "The psychic powers of a character with this Disadvantage are too unreliable for him to plan ahead in their use."
    }),

}