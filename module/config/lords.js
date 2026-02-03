export function createLord(lordInput) {
  const {
    name = "",
    elan = { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type = "",
    title = "",
    description = "",
    gifts = [{ name: "", description: "", elanCost: 0, elanRequirements: 0 }],
    modifiers = [{ action: "", elanModifier: 0 }],
  } = lordInput;

  return {
    name,
    elan,
    type,
    title,
    description,
    gifts,
    modifiers,
  };
}

export const ABF_LORDS = {
  Mikael: createLord({
    name: "Mikael",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Beryl",
    title: "The Soul of God",
    description:
      "Mikael is the first among the Beryls – the most powerful and important of all the Daughters of Light. She is extremely consonant with C’iel’s ideas and she generally acts as her spokeswoman and representative. She was also the first one to feel the need to form part of the existence which is alien to all of them, and fused a fragment of her essence with reality, as Lady Jade had done before. Mikael incarnates the virtue of hope and creation, without which all living beings would be completely lost – hope and salvation. For centuries, she has looked after men and women of all races, giving little thought to their affiliation to the Light or the Darkness, since they are all her desire to be worshipped. Although several cultures worship her directly, her only goal was always to help and guide others. Nevertheless, she felt a strong empathy with the principles and precepts of Christianity when they were first developed. For this reason, she slowly began to promote the virtues preached by the figure of God. In time, she became the most benign and merciful face of the god-men who sought to save mankind from suffering and offer it hope for the future. Those who follow her are, above all, strong believers of salvation.",

    gifts: {
      LightOfHope: {
        name: "Light of Hope",
        description:
          "Characters become a source of hope for others wherever they go. Their mere presence stirs the joie de vivre in people with little joy in life, and they give bliss and hope to all. Those in daily contact with them never discourage nor lose their faith.",
        elanCost: 5,
        elanRequirements: 10,
      },
      EliminateDisease: {
        name: "Eliminate Disease",
        description:
          "It enables characters to heal any disease of the same or lower Elan value they possess. As an example, a character with 30 points of Elan would cure diseases up to that level.",
        elanCost: 10,
        elanRequirements: 20,
      },
      KeepingInTheWorld: {
        name: "Keeping in the World",
        description:
          "Characters may immediately bring back to life individuals in a Between Life and Death state, simply by imposing their hands on the subject without the need of a PhR check.",
        elanCost: 5,
        elanRequirements: 30,
      },
      HeavenlyResistance: {
        name: "Heavenly Resistance",
        description:
          "This gift gives characters a special bonus equal to half the amount of their Elan to all of their Resistances.",
        elanCost: 20,
        elanRequirements: 40,
      },
      ExorciseEvil: {
        name: "Exorcise Evil",
        description:
          "Communion with Mikael enables characters to exorcise supernatural beings of a naturally negative essence. Exorcism works just like the Banish ability, meaning that any creature failing the required MR will be expelled from the material plane and brought back to the Flow of Souls or the Wake. This ability may also be used on powers the creature has created to harm others directly. It may be used once per creature as long as the character’s Elan does not increase. The MR Difficulty it must overcome is Elan’s Real level x2.",
        elanCost: 10,
        elanRequirements: 50,
      },
      Aura: {
        name: "Aura",
        description:
          "It grants the ability to extend a character’s Resistance bonus to any individual around the character as long as he does not choose to do so deliberately. The ability’s action radius is half the character’s Elan level in yards.",
        elanCost: 10,
        elanRequirements: 50,
      },
      Miracle: {
        name: "Miracle",
        description:
          "Communion with Mikael enables characters to recreate any of the minor miracles performed by saints as told by the legends. This is a small effect ability that under no circumstance may imply a harm to anyone.",
        elanCost: 10,
        elanRequirements: 60,
      },
      UndoNegativeStates: {
        name: "Undo Negative States",
        description:
          "This gift dispels any harmful state present in anyone including characters that are not allies. In the case of negative states caused by magic, this does not dispel them completely but it does reduce their effects to a minor effect.",
        elanCost: 10,
        elanRequirements: 70,
      },
      Savior: {
        name: "Savior",
        description:
          "Whenever characters perform an action tending to save a life, Mikael endows powers that reduce the level of Difficulty on any Check they need to make. They also receive a +40 on opposed checks.",
        elanCost: 10,
        elanRequirements: 70,
      },
      HeavenlyEssence: {
        name: "Heavenly Essence",
        description:
          "Characters are so close to Mikael that they can invoke her angels when they need their help. The character must perform a ritual that takes 10 minutes and spend 1 point of Elan to summon a single angel.",
        elanCost: 10,
        elanRequirements: 80,
      },
      RiseFromTheDead: {
        name: "Rise from the Dead",
        description:
          "By adhering entirely to the concepts embodied by Mikael, characters may give life back to the dead. The character must spend a permanent point of Elan for each month elapsed since their death.",
        elanCost: 20,
        elanRequirements: 90,
      },
      Resurrection: {
        name: "Resurrection",
        description:
          "Mikael’s chosen ones are never too far from salvation, even in death. This gift allows the character in question to return from the dead as if his soul never left his body.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },

    modifiers: {
      lowElan: [
        { action: "Giving back hope to an individual", modifier: 1 },
        { action: "Giving back hope to a large number of people", modifier: 5 },
        { action: "Saving someone’s life", modifier: 3 },
        { action: "Helping someone in need", modifier: 3 },
        { action: "Undoing a minor wrong", modifier: 1 },
        { action: "Undoing a major wrong", modifier: 5 },
      ],
      highElan: [
        { action: "Helping someone at one’s own expense", modifier: 5 },
        { action: "Undoing a major wrongdoing", modifier: 5 },
        { action: "Changing one’s life to save someone else’s", modifier: 5 },
        {
          action: "Give back the will to live to someone who has lost it",
          modifier: 5,
        },
      ],
      negative: [
        { action: "Losing hope", modifier: -5 },
        { action: "Ignoring someone in great need", modifier: -5 },
        { action: "Committing a really evil action", modifier: -10 },
      ],
    },
  }),
  Zemial: createLord({
    name: "Zemial",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Shajad",
    title: "The End of Days",

    description:
      "Zemial, the shadow of existence, the burden of all life – there are so many names for a nightmare that never should have been named. Many arguments are made to sustain his status as the greatest among the Shajads and Beryls, but Darkness itself states his power is only comparable to his insanity. Some legends say that after the War of Heaven, he exterminated entire races; others say he rebelled against his own. Whatever his actions may have been in the past, time has washed them away. The only thing we know for sure is that Gaira himself locked Zemial away in the darkness to prevent him from acting freely upon the world, and chained him to the Void as punishment for his disobedience. The very thought of the existence of a concept like Zemial is a contradiction. It incarnates unchained destruction, despair, and death without meaning or purpose – it is the end of all existence. He makes no distinction between Light and Darkness; to him all that exists must be destroyed. There is no record of cults who openly worshipped him, although there have been cases of individuals slightly synchronizing with him. These are destructive beings that neither seek nor need justification for their acts, subjects with nothing to lose or gain in life and, usually, with some degree of psychotic disorder.",

    gifts: {
      SpiritualAssault: {
        name: "Spiritual Assault",
        description:
          "It enables characters to kill any kind of creature, even one of an immaterial nature or one with immunity to traditional attacks. In gaming terms, it allows a character to damage Energy as described in the Ki ability Aura Extension.",
        elanCost: 5,
        elanRequirements: 10,
      },
      DementedYearning: {
        name: "Demented Yearning",
        description:
          "Once they have killed, the characters’ killer instincts are awakened, allowing them to ignore any psychological attempts to be calmed down in any way. If they wish, they may dive into a Rage State and receive a +10 bonus to any offensive action leading to kill. The ability will linger for half an hour after having provoked death.",
        elanCost: 5,
        elanRequirements: 20,
      },
      IncreasedDamage: {
        name: "Increased Damage",
        description:
          "Any violent action performed by the character will have a strong increased effect. The ability will heighten Base Damage on any attack in a proportion equivalent to half the character’s Elan level, rounding the number down to the nearest five.",
        elanCost: 10,
        elanRequirements: 30,
      },
      AnimicDamage: {
        name: "Animic Damage",
        description:
          "The characters’ attacks not only affect their victim’s body, they also have a direct effect on his spirit. Damage produced through this ability will not be recovered naturally, and wounds will not heal through conventional methods. The only way victims can recover is through spells or mystical abilities.",
        elanCost: 10,
        elanRequirements: 40,
      },
      Destroyer: {
        name: "Destroyer",
        description:
          "Those who possess this gift are able to destroy inorganic objects by mere contact, turning them to ashes or causing them to burst into pieces. In this way, they are able to disintegrate any object with a Presence lower than half their Elan level, plus 10.",
        elanCost: 15,
        elanRequirements: 50,
      },
      LordOfDestructionTouch: {
        name: "Lord of Destruction (Touch)",
        description:
          "This gift grants the ability to destroy other creatures simply by touching them. Upon the character’s wish, anyone in contact with him will need to pass an MR or PhR Check with a Difficulty equal to his Elan plus 80, or suffer a loss of a number of Life Points equivalent to their Failure Level. The affected ones must repeat the Check every five turns for as long as contact continues.",
        elanCost: 10,
        elanRequirements: 50,
      },
      ExterminatingPresence: {
        name: "Exterminating Presence",
        description:
          "The characters’ mere presence is like poison to all that exists. Anything a few feet away from them will die or weaken slowly, plants will wither wherever they go, and people’s health will deteriorate.",
        elanCost: 10,
        elanRequirements: 60,
      },
      LordOfDestructionSight: {
        name: "Lord of Destruction (Sight)",
        description:
          "The field of action is widened; the ability permits a character to inflict damage just by staring. The Difficulty of the Resistance Check is equal to the character’s Elan level, plus 60. Fixing the stare upon the same individual will force the victim to repeat the Check every five turns. Those who pass the Check three times in a row will be considered immune. This gift can not be activated simultaneously with Touch.",
        elanCost: 10,
        elanRequirements: 60,
      },
      LordOfDestructionAura: {
        name: "Lord of Destruction (Aura)",
        description:
          "Synchronicity with Zemial has reached such proportions that the destructive essence of the character extends to his or her surroundings like an aura, provoking damage to everyone within a 30-foot radius. The effect has an MR Difficulty equal to the character’s Elan level, plus 40. The Check must be repeated every five turns for as long as the victims remain inside the aura. Those able to pass it three consecutive times will be considered immune. This gift can not be activated simultaneously with Touch or Sight.",
        elanCost: 10,
        elanRequirements: 70,
      },
      DestructiveAssault: {
        name: "Destructive Assault",
        description:
          "It grants the ability to damage any creature regardless of power, supernatural presence, or special immunity. Those victims with a Gnosis Level lower than the aggressor whose lives are taken by him or her will have their souls completely destroyed instead of returning to the Flow of Souls.",
        elanCost: 15,
        elanRequirements: 80,
      },
      BloodOfInsanity: {
        name: "Blood of Insanity",
        description:
          "Zemial’s blood of dementia runs through the character’s veins, allowing them to infect others with it. Whoever drinks it will suffer the consequences of a Level 80 supernatural poison with an instantaneous effect and a 140 VR Difficulty. Those who fail the Resistance will enter a communion state with Zemial, gaining 50 Elan points from the entity, but losing their mind in the process.",
        elanCost: 20,
        elanRequirements: 90,
      },
      BearerOfCatastrophes: {
        name: "Bearer of Catastrophes",
        description:
          "In this level, unchained destruction and madness are one with the incarnation. The arrival of Zemial’s chosen one brings forth all kinds of natural cataclysms and disasters. Volcanoes erupt, earthquakes, hurricanes, and hail lash the earth, the seas go mad, ravishing the coastlines, and fire falls from the skies wherever they go.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },

    modifiers: {
      lowElan: [
        { action: "Killing someone for no reason", modifier: 1 },
        { action: "Provoking large scale deaths for no reason", modifier: 5 },
        { action: "Instigating people to killing for no reason", modifier: 2 },
        {
          action: "Losing sanity (once more than 10 Elan points)",
          modifier: 1,
        },
        { action: "Driving someone mad", modifier: 2 },
        { action: "Engaging in self-destructive behavior", modifier: 2 },
        { action: "Exterminating a race", modifier: 7 },
      ],
      highElan: [
        { action: "Provoking an unnecessary massacre", modifier: 2 },
        { action: "Destroying a nation or principality", modifier: 3 },
        { action: "Seeking death", modifier: 1 },
      ],
      negative: [
        { action: "Consciously saving a life", modifier: -3 },
        { action: "Stopping a massacre", modifier: -3 },
        { action: "Showing concern for one’s own well-being", modifier: -2 },
      ],
    },
  }),
  Uriel: createLord({
    name: "Uriel",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Beryl",
    title: "The Spirit of Freedom",

    description:
      "Uriel Beryl is a spirit embodying freedom and rebellion, opposing tyranny, slavery, and laws that limit autonomy. The character is known for unpredictability and has inspired various religions and cults. Uriel is associated with the Beryls, a group of spiritual entities, and is said to have a strong connection with the Shaajad Eriol.",

    gifts: {
      InstinctOfLiberty: {
        name: "Instinct of Liberty",
        description:
          "Characters gain a natural resistance to any attempt to limit their freedom or autonomy.",
        elanCost: 5,
        elanRequirements: 10,
      },
      Unnoticed: {
        name: "Unnoticed",
        description:
          "Characters can move without being seen or remembered, as if they were never there.",
        elanCost: 5,
        elanRequirements: 20,
      },
      IndomitableSpirit: {
        name: "Indomitable Spirit",
        description:
          "Characters become immune to mental domination or control, including supernatural coercion.",
        elanCost: 10,
        elanRequirements: 20,
      },
      FreeSoul: {
        name: "Free Soul",
        description:
          "Characters cannot be bound by magical or spiritual chains, and escape any form of imprisonment.",
        elanCost: 5,
        elanRequirements: 30,
      },
      Visionary: {
        name: "Visionary",
        description:
          "Characters gain glimpses of possible futures, allowing them to act with foresight and intuition.",
        elanCost: 10,
        elanRequirements: 40,
      },
      MeansOfTransport: {
        name: "Means of Transport",
        description:
          "Characters can travel great distances instantly, bypassing physical and magical barriers.",
        elanCost: 5,
        elanRequirements: 40,
      },
      BreakingTheChains: {
        name: "Breaking the Chains",
        description:
          "Characters can free others from spiritual, magical, or physical bondage.",
        elanCost: 10,
        elanRequirements: 50,
      },
      EyesOfTheFuture: {
        name: "Eyes of the Future",
        description:
          "Characters can see into the future with clarity, predicting events and outcomes.",
        elanCost: 20,
        elanRequirements: 60,
      },
      FreePassage: {
        name: "Free Passage",
        description:
          "Characters can pass through any barrier or locked space without resistance.",
        elanCost: 15,
        elanRequirements: 60,
      },
      CommunionWithUriel: {
        name: "Communion with Uriel",
        description:
          "Characters may speak directly with Uriel and receive guidance or insight.",
        elanCost: 10,
        elanRequirements: 70,
      },
      SupernaturalEssence: {
        name: "Supernatural Essence",
        description:
          "Characters gain a permanent supernatural aura that protects them from control and confinement.",
        elanCost: 10,
        elanRequirements: 80,
      },
      ASecondChance: {
        name: "A Second Chance",
        description:
          "Characters may undo a fatal mistake or event, returning to life or reversing a tragedy.",
        elanCost: 20,
        elanRequirements: 90,
      },
      TheTraveler: {
        name: "The Traveler",
        description:
          "Characters become beings of pure freedom, able to move across planes and dimensions at will.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },

    modifiers: {
      lowElan: [
        { action: "Freeing a subdued person", modifier: 2 },
        { action: "Freeing a group of people", modifier: 5 },
        { action: "Acting freely, without ties", modifier: 2 },
        { action: "Ending tyrannical laws", modifier: 1 },
        { action: "Rebelling against oppression", modifier: 1 },
        { action: "Showing people the value of freedom", modifier: 2 },
      ],
      highElan: [
        { action: "Freeing a nation from an oppressor", modifier: 3 },
        { action: "Instigating rebellion against oppression", modifier: 2 },
        { action: "Living in absolute freedom", modifier: 1 },
      ],
      negative: [
        { action: "Obeying unfair orders", modifier: -1 },
        { action: "Obeying tyrannical orders", modifier: -2 },
        { action: "Bonding to something forever", modifier: -2 },
        { action: "Slavery", modifier: -3 },
        { action: "Enslaving or subduing someone", modifier: -3 },
      ],
    },
  }),
  Jedah: createLord({
    name: "Jedah",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Shajad",
    title: "Puppet Master",

    description:
      "Jedah is the puppet master, the most manipulative and subtle of the Shajads. He is said to control the history of mankind through the manipulation of beings, events, and the course of time. The purpose of such manipulation is nothing more than power, especially if it can be obtained in secret. Jedah never seeks to rule openly or directly. To him, the ideal would be to become the true master of a game, so subtle that no one would even notice his influence. He is not truly evil. He does not promote hatred or seek to cause suffering. Instead, he sees existence and its forces as tools to be used as much as he can. However, he would never use too much affection or emotion to achieve his goals. Jedah has influenced the entire fundamental idea of true humanism, aloof reason, dominance, politics, and knowledge. To most mortals, Jedah does not appear to be evil. He is not cruel, nor does he take pleasure in suffering. He simply manipulates others to serve his own ends. He believes that the best way to improve the world is to control it. He believes that the truth is meaningless compared to perception. He believes that the best way to understand someone is to dominate them. He believes that the best way to protect someone is to enslave them. He believes that the best way to improve someone is to manipulate them.",

    gifts: {
      TheGiftOfPolitics: {
        name: "The Gift of Politics",
        description:
          "It confers a supernatural capability to manipulate others through diplomacy, negotiation, and influence.",
        elanCost: 5,
        elanRequirements: 10,
      },
      TheDominator: {
        name: "The Dominator",
        description:
          "Characters gain the ability to subdue people through psychological manipulation. They may impose their will on others without physical force.",
        elanCost: 5,
        elanRequirements: 20,
      },
      TheManipulator: {
        name: "The Manipulator",
        description:
          "Characters can manipulate the emotions and thoughts of others, subtly influencing their decisions and beliefs.",
        elanCost: 10,
        elanRequirements: 30,
      },
      LordOfSlavery: {
        name: "Lord of Slavery",
        description:
          "Characters may enslave others spiritually or mentally, binding them to their will. The enslaved must pass a Resistance Check equal to the character’s Elan + 20.",
        elanCost: 10,
        elanRequirements: 40,
      },
      LordOfSlaveryCommand: {
        name: "Lord of Slavery (Command)",
        description:
          "Characters may issue direct commands to a subordinate with the purpose of carrying out specific orders. The power level of the orders is Elan x 20 points. Both the will of the master and the servant must be strong enough to resist external influence.",
        elanCost: 10,
        elanRequirements: 50,
      },
      LordOfSlaveryDomination: {
        name: "Lord of Slavery (Domination)",
        description:
          "Characters may dominate others completely, erasing their will and replacing it with their own. The dominated must pass a Resistance Check equal to Elan x 3.",
        elanCost: 10,
        elanRequirements: 60,
      },
      TheDominatorAura: {
        name: "The Dominator (Aura)",
        description:
          "Characters emit an aura of domination that affects all those nearby. Anyone within 30 feet must pass a Resistance Check equal to Elan + 40 or become submissive.",
        elanCost: 10,
        elanRequirements: 70,
      },
      TheManipulatorEssence: {
        name: "The Manipulator (Essence)",
        description:
          "Characters become embodiments of manipulation, able to twist reality and perception to suit their goals.",
        elanCost: 10,
        elanRequirements: 80,
      },
      TheManipulatorSoul: {
        name: "The Manipulator (Soul)",
        description:
          "Characters may manipulate the soul of others, altering their spiritual essence and alignment.",
        elanCost: 20,
        elanRequirements: 90,
      },
      TheManipulatorGod: {
        name: "The Manipulator (God)",
        description:
          "Characters reach the pinnacle of manipulation, able to rewrite the fate of others and control their destiny.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },

    modifiers: {
      lowElan: [
        { action: "Manipulating someone for personal power", modifier: 1 },
        {
          action: "Subduing others through psychological control",
          modifier: 2,
        },
        { action: "Using diplomacy to dominate", modifier: 1 },
        { action: "Controlling a group through influence", modifier: 3 },
        { action: "Creating a system of control", modifier: 2 },
        { action: "Enslaving someone mentally or spiritually", modifier: 3 },
      ],
      highElan: [
        { action: "Controlling a nation through manipulation", modifier: 3 },
        { action: "Creating a religion or ideology for control", modifier: 2 },
        { action: "Erasing someone’s will completely", modifier: 2 },
      ],
      negative: [
        { action: "Freeing someone from control", modifier: -2 },
        { action: "Promoting personal freedom", modifier: -2 },
        { action: "Rejecting manipulation as a tool", modifier: -3 },
      ],
    },
  }),
  Gabriel: createLord({
    name: "Gabriel",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Beryl",
    title: "Lady of Feelings",

    description:
      "Gabriel, the great Lady of Feelings is undoubtedly the Beryl who incarnates the largest number of positive feelings. It is the lady of love, friendship, arts, and peace. Those who know the true identity of the Daughters of the Light think of her as the purest among them. She feels devotion for all living beings and has always tried to protect and help them. For years she has lived among mortals under several different identities to feel integrated in their society and to be able to understand them. She is said to have become close enough with men as to even fall in love with one, although his identity is unknown. Gabriel promotes peace, friendship, love, and creative feelings among artists and poets. She thinks the best way to reach the dream of C’iel is to create an awareness of the importance of these feelings. Her capacity for forgiving is limitless, and she usually tries to avoid violent solutions. Artists and lovers and those whose lives are ruled by the most positive of feelings synchronize with her.",

    gifts: {
      ArtisticAptitude: {
        name: "Artistic Aptitude",
        description:
          "This gift will increase an individual’s creativity by endowing a special bonus equal to his Elan level for the Art and Music Secondary Abilities.",
        elanCost: 5,
        elanRequirements: 10,
      },
      Grace: {
        name: "Grace",
        description:
          "Whoever possesses this gift will appear beautiful in everyone’s eyes without the need of altering his or her outlook. People will find gracefulness even in the most monster-like of individuals.",
        elanCost: 5,
        elanRequirements: 20,
      },
      PositiveEmpathy: {
        name: "Positive Empathy",
        description:
          "It intensifies all positive feelings of those individuals characters are in contact with. In a way, the bearer of this gift possesses a strong aura that brings out the best in everyone.",
        elanCost: 10,
        elanRequirements: 30,
      },
      PeaceMaker: {
        name: "Peace Maker",
        description:
          "Characters create a state of harmony that pacifies small quarrels and bickering. Wars and large-scale conflicts can not be stopped with this ability, but consequences of these conflicts will be milder wherever the character is.",
        elanCost: 10,
        elanRequirements: 40,
      },
      PsychologicalImmunity: {
        name: "Psychological Immunity",
        description:
          "This power endows complete immunity from any negative psychological State – like fear, anger or sadness. In case these are supernaturally induced, characters may add their Elan level to their MR Check as a special bonus to resist them.",
        elanCost: 10,
        elanRequirements: 40,
      },
      FeelingPerception: {
        name: "Feeling Perception",
        description:
          "It senses any kind of positive emotion present in the surroundings. The higher the Elan level, the more exact the perception will be, and the wider its radius.",
        elanCost: 10,
        elanRequirements: 50,
      },
      ImbuingFeelings: {
        name: "Imbuing Feelings",
        description:
          "This gift infuses positive feelings into another individual. In order for the gift to work, the character and the target should talk for a long time or spend some time together. The MR Difficulty is twice the gifted character’s Elan level. If the nature of the target is especially contrary to the specific emotion, a bonus between +10 and +40 may be applied to the roll, as the GM determines. Those who pass the Check will no longer need to repeat it until the character’s Elan rises.",
        elanCost: 15,
        elanRequirements: 50,
      },
      Bond: {
        name: "Bond",
        description:
          "Gifted characters tie their lives to an individual extremely important to them; a strong bond is created between the two, based on the feelings each one has for the other. From then on, they both acquire certain special abilities that spring from that relationship. They can choose to use whichever Resistance of the pair is higher, automatically pass Checks to exit the Between Life and Death state, and communicate with one another simply by exchanging glances using their supernatural connection.",
        elanCost: 15,
        elanRequirements: 60,
      },
      Help: {
        name: "Help",
        description:
          "No matter how difficult things get, the gifted character will always find someone to lend a hand in any way they can. Oftentimes, he will only need to ask for help to be assisted by whoever may be around.",
        elanCost: 10,
        elanRequirements: 70,
      },
      PeaceSong: {
        name: "Peace Song",
        description:
          "Characters have the capacity of singing a song that incarnates the very nature of peace. Gabriel’s voice springs from their throat with an indescribable melody that enraptures everyone who hears it, stripping them of their will to fight. Whoever hears it for longer than half a minute must automatically pass an MR Check against twice the singer’s Elan points.",
        elanCost: 15,
        elanRequirements: 80,
      },
      Protection: {
        name: "Protection",
        description:
          "Due to their closeness with Gabriel, characters are protected by a strong presence that acts upon anyone who may try to harm them. Every being capable of entertaining feelings needs to pass an MR Check against twice the Elan level of the character with Protection in order to harm him or her.",
        elanCost: 20,
        elanRequirements: 90,
      },
      Paradise: {
        name: "Paradise",
        description:
          "Gabriel’s chosen one possesses the quality of entering the heart of good-natured people as a positive influence, forever removing all negative emotions from them. No one with a lower Presence than his will be able to cause damage or fall prey to dark passions. Negative beings will be forced to leave at once, or else be purified and inevitably transformed into benign creatures.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },

    modifiers: {
      lowElan: [
        { action: "Loving and caring for others", modifier: 3 },
        { action: "Stopping a conflict", modifier: 1 },
        { action: "Saving someone’s life", modifier: 2 },
        { action: "Promoting positive feelings among people", modifier: 3 },
        { action: "Creating art", modifier: 1 },
      ],
      highElan: [
        { action: "Stopping a war", modifier: 3 },
        { action: "Creating a masterpiece", modifier: 2 },
        { action: "Finding someone special to love", modifier: 1 },
        { action: "Protecting all forms of life", modifier: 2 },
      ],
      negative: [
        { action: "Starting a conflict", modifier: -2 },
        { action: "Hating someone", modifier: -3 },
        { action: "Being overcome by dark feelings", modifier: -2 },
        { action: "Destroying beauty", modifier: -1 },
        { action: "Causing unnecessary death", modifier: -5 },
      ],
    },
  }),
  Noah: createLord({
    name: "Noah",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Shajad",
    title: "The Dark Warrior",

    description:
      "Undoubtedly, Noah is Gaira’s most strict disciple. Above all, he values strength and the drive to succeed that lies within every living creature. Noah incarnates competitiveness, combat, and victory. On the other hand, he also represents darker concepts – such as war and violence. He believes the only truly weak beings are those without the will to fight or to advance; such creatures are nothing but an obstacle in the way of evolution and universal progress. All means are acceptable when it comes to bettering one’s self. He approves of all conflicts, war, and the most critical of situations no matter how tragic or terrible, in the thought that those bring out the best in people and lead them into learning. Noah tremendously dislikes those that stupidly abuse their power, and those unable of controlling it. He has opened many fronts against the Beryls, which he considers to be a weakness for the world. Many cultures have worshipped him in his best known aspect as a god of war, but he has adopted many other identities throughout history. His main followers are typically great warriors or generals, but even thinkers and artists may also synchronize with him provided they are competitive enough.",

    gifts: {
      InTheRightHands: {
        name: "In the Right Hands",
        description:
          "This gift provides an exceptional ability to find the necessary equipment for every circumstance.",
        elanCost: 5,
        elanRequirements: 10,
      },
      TheWillToImprove: {
        name: "The Will to Improve",
        description:
          "The competitive spirit of the character is easily transmitted to others, inspiring them to improve and better themselves.",
        elanCost: 10,
        elanRequirements: 20,
      },
      Resistant: {
        name: "Resistant",
        description:
          "The gift allows extraordinary resistance to physical damage and its consequences. Characters get a PhR bonus equivalent to half their Elan.",
        elanCost: 5,
        elanRequirements: 20,
      },
      Inhuman: {
        name: "Inhuman",
        description:
          "It allows the bearer to reach Inhuman Difficulty Levels in whatever fields the character excels or specializes.",
        elanCost: 5,
        elanRequirements: 30,
      },
      IgnorePenalties: {
        name: "Ignore Penalties",
        description:
          "Automatically eliminates penalties to action equal to half the character’s Elan level.",
        elanCost: 10,
        elanRequirements: 40,
      },
      DarkPower: {
        name: "Dark Power",
        description:
          "Characters may enhance their actions using Noah’s power. They gain points equal to twice their Elan level to spend as bonuses.",
        elanCost: 15,
        elanRequirements: 50,
      },
      Equipment: {
        name: "Equipment",
        description:
          "Any device the character uses automatically gains +10 Quality, unless it already has a higher bonus.",
        elanCost: 10,
        elanRequirements: 60,
      },
      InTheFaceOfAdversity: {
        name: "In the Face of Adversity",
        description:
          "Characters excel when facing impossible challenges. +10 Attack/Defense in combat, +20 to Secondary Abilities.",
        elanCost: 15,
        elanRequirements: 70,
      },
      WarAura: {
        name: "War Aura",
        description:
          "All soldiers commanded by the character gain +10 Attack and Defense within a radius equal to the character’s Elan in yards.",
        elanCost: 10,
        elanRequirements: 70,
      },
      DarkAvatar: {
        name: "Dark Avatar",
        description:
          "The character becomes a dark avatar, gaining natural weapons, +30 All Actions, +3 Characteristics, and Zen-level actions.",
        elanCost: 20,
        elanRequirements: 80,
      },
      TheShadowOfWar: {
        name: "The Shadow of War",
        description:
          "Violence and war follow the character. Conflicts erupt wherever they go.",
        elanCost: 15,
        elanRequirements: 90,
      },
      TheVanquisher: {
        name: "The Vanquisher",
        description:
          "Noah’s chosen one can never be defeated. They automatically gain the Primary or Secondary Ability of those they beat.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },

    modifiers: {
      lowElan: [
        { action: "Being competitive", modifier: 2 },
        { action: "Overcoming a complex challenge", modifier: 3 },
        { action: "Dedicating life to combat", modifier: 3 },
        { action: "Imbuing self-improvement drive to others", modifier: 3 },
        { action: "Bettering one’s self", modifier: 2 },
      ],
      highElan: [
        { action: "Defeating a really difficult opponent", modifier: 1 },
        { action: "Inducing war", modifier: 2 },
        {
          action: "Creating a masterpiece or setting an unparalleled record",
          modifier: 4,
        },
      ],
      negative: [
        { action: "Ignoring a challenge for fear of failure", modifier: -2 },
        {
          action: "Being defeated by an opponent of equal or lower standing",
          modifier: -5,
        },
        { action: "Losing the will to better one’s self", modifier: -10 },
        { action: "Abusing power foolishly", modifier: -2 },
      ],
    },
  }),
  Rafael: createLord({
    name: "Rafael",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Beryl",
    title: "Mother Nature",

    description:
      "Life and nature are the aspects of creation that Rafael, one of the most independent Daughters of the Light, has chosen to incarnate. She is mainly devoted to people, animals, and plants that inhabit the natural world, but deep down she loves all living creatures equally. Even though she respects magic and the occult powers, she regards them as unnecessary in comparison to natural elements and their laws. The only mystical creatures she openly sympathizes with are those closely connected to nature, such as spirits of the woods or beings associated with vegetation. She openly opposes those who destroy nature or even worse pervert life. Above all, she dislikes necromantic entities and all they stand for; she considers them as a deviation. For centuries she has struggled with the idea of initiating active confrontation against them for fear of losing an important part of her conscience in the process. Many druids and cultures associated with forests worship her as the origin of all life and think of her as a primary aspect of creation. Those who protect nature and life achieve the highest level of synchronicity with her.",

    gifts: {
      MotherNatureKnowledge: {
        name: "Mother Nature Knowledge",
        description:
          "Endows a special bonus to the Herbal Lore Secondary Ability equivalent to the character’s Elan level.",
        elanCost: 5,
        elanRequirements: 10,
      },
      AnimalKnowledge: {
        name: "Animal Knowledge",
        description:
          "Develops an instinct to interact with all kinds of animals, granting a bonus to the Animals Secondary Ability equal to Elan.",
        elanCost: 5,
        elanRequirements: 20,
      },
      Healing: {
        name: "Healing",
        description:
          "Heals 5 LP per turn up to a daily maximum equal to Elan. Damages undead instead, forcing an MR Check vs twice Elan.",
        elanCost: 10,
        elanRequirements: 20,
      },
      FertilityCloak: {
        name: "Fertility Cloak",
        description:
          "The character’s presence intensifies plant and animal growth, bringing nature to full splendor.",
        elanCost: 5,
        elanRequirements: 30,
      },
      EliminateNaturalVenoms: {
        name: "Eliminate Natural Venoms",
        description:
          "Dispels natural venoms of a Level equal to or lower than the character’s Elan.",
        elanCost: 10,
        elanRequirements: 40,
      },
      Totem: {
        name: "Totem",
        description:
          "Forms a bond with a natural animal spirit. The Totem gains +5 Intelligence, levels with the character, and can be resurrected by sacrificing 10 Elan.",
        elanCost: 20,
        elanRequirements: 50,
      },
      ExpandedHealing: {
        name: "Expanded Healing",
        description:
          "Works like Healing, but the daily LP maximum is multiplied by ten.",
        elanCost: 15,
        elanRequirements: 50,
      },
      MotherNatureEyes: {
        name: "Mother Nature Eyes",
        description:
          "Allows the character to see and hear through an animal once per day for every 10 Elan points.",
        elanCost: 10,
        elanRequirements: 60,
      },
      InvokingAnimals: {
        name: "Invoking Animals",
        description:
          "Summons animals of a chosen species once per day. Small animals equal to Elan; large animals at a 1:5 ratio.",
        elanCost: 10,
        elanRequirements: 60,
      },
      AnimalTransformation: {
        name: "Animal Transformation",
        description:
          "Transforms into a natural animal, gaining its characteristics while optionally keeping superior personal abilities.",
        elanCost: 10,
        elanRequirements: 70,
      },
      IncreasedInvocation: {
        name: "Increased Invocation",
        description:
          "Allows invoking additional races (one per 5 Elan) or multiplying the original species count by ten.",
        elanCost: 10,
        elanRequirements: 80,
      },
      UnlimitedHealing: {
        name: "Unlimited Healing",
        description: "Removes the daily healing limit entirely.",
        elanCost: 20,
        elanRequirements: 90,
      },
      NatureConscience: {
        name: "Nature Conscience",
        description:
          "Rafael’s chosen one becomes the soul of forests and jungles, aware of everything within them and able to communicate with all plants and animals.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },

    modifiers: {
      lowElan: [
        { action: "Saving the life of an animal or plant", modifier: 1 },
        {
          action: "Saving the life of a large number of people or animals",
          modifier: 5,
        },
        { action: "Protecting nature", modifier: 3 },
        { action: "Destroying an undead creature", modifier: 1 },
        {
          action: "Extending or planting forests, jungles or woods",
          modifier: 5,
        },
      ],
      highElan: [
        {
          action: "Watching over the interests of plants and animals",
          modifier: 2,
        },
        {
          action: "Saving the lives of a large number of people or animals",
          modifier: 1,
        },
        {
          action: "Extending or planting large forests, jungles or woods",
          modifier: 2,
        },
      ],
      negative: [
        { action: "Taking a life for no reason", modifier: -5 },
        { action: "Unnecessarily damaging nature", modifier: -3 },
        { action: "Altering nature or life supernaturally", modifier: -10 },
      ],
    },
  }),
  Erebus: createLord({
    name: "Erebus",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Shajad",
    title: "The Shadow of Dreams",

    description:
      "Erebus is one of the most enigmatic of Shajads; his actions and goals are always wrapped in mystery. He is the Lord of Shadows, and he has chosen to incarnate the occult, the supernatural and fear. Throughout history, many cultures have worshipped him as a god of magic, dreams, or wonders. He remains away from the other Shajads’ conflicts for power while concentrating on his own mysterious ends. He is whimsical and unpredictable, but he follows a strange set of self-imposed rules which he never breaks. He supports the followers of the occult and magic, as well as all those dreamers who are able to create wonders in their sleep. Surprisingly, his influence is as big in dreams as it is in nightmares, although he is much more interested in the latter. He has a peculiar fascination with fear, which he considers to be the most fundamental and primeval emotion of living beings. To him, this is the secret drive behind all acts in the world and even the originator of existence itself. He who is not afraid, and is not able to understand this, has no future and is doomed to disappear. Whoever masters fear will have creation at his feet. Those who employ supernatural forces and dabble in the occult will synchronize with him. He is also drawn to those who learn to master fear, as well as dreamers and poets.",

    gifts: {
      SupernaturalKnowledge: {
        name: "Supernatural Knowledge",
        description:
          "Develops innate knowledge of the supernatural world, granting a bonus to the Occult Secondary Ability equal to Elan.",
        elanCost: 5,
        elanRequirements: 10,
      },
      FrightfulPresence: {
        name: "Frightful Presence",
        description:
          "Creates a frightful aura that enhances the character’s ability to intimidate, granting a bonus to Intimidate equal to Elan.",
        elanCost: 5,
        elanRequirements: 20,
      },
      PathOfNightmares: {
        name: "Path of Nightmares",
        description:
          "Allows the character to provoke nightmares or prevent them in those sleeping nearby.",
        elanCost: 5,
        elanRequirements: 30,
      },
      DreamWhispers: {
        name: "Dream Whispers",
        description:
          "Enables communication with others through their dreams by sending subconscious messages.",
        elanCost: 10,
        elanRequirements: 40,
      },
      NaturalMystic: {
        name: "Natural Mystic",
        description:
          "Allows innate spellcasting of Free Access spells using Zeon equal to twice Elan, up to spell level equal to Elan.",
        elanCost: 15,
        elanRequirements: 50,
      },
      SupernaturalInflux: {
        name: "Supernatural Influx",
        description:
          "Enhances supernatural abilities by granting +2 to Power or Willpower, depending on the character’s focus.",
        elanCost: 10,
        elanRequirements: 60,
      },
      DreamWalker: {
        name: "Dream Walker",
        description:
          "Allows entry into the dreams of others after establishing contact, and sometimes physical entry into The Wake.",
        elanCost: 10,
        elanRequirements: 60,
      },
      CardinalFears: {
        name: "Cardinal Fears",
        description:
          "Invokes one of the three primeval fears—Umbra, Maiyer, or Caedus—each requiring MR/PhR/PsR 140 to resist and causing severe psychological or physical consequences.",
        elanCost: 20,
        elanRequirements: 70,
      },
      SupernaturalEnhancement: {
        name: "Supernatural Enhancement",
        description:
          "Increases the Difficulty of all supernatural Resistance checks caused by the character’s abilities by +20.",
        elanCost: 15,
        elanRequirements: 80,
      },
      NuxAbsoluteFear: {
        name: "Nux, Absolute Fear",
        description:
          "Invokes the ultimate fear. Victims automatically enter Fear State for hours and must pass MR/PsR 140 or be utterly destroyed in body and soul.",
        elanCost: 10,
        elanRequirements: 90,
      },
      Demiurge: {
        name: "Demiurge",
        description:
          "The character becomes the Lord of Dreams and the Supernatural, gaining Gnosis 45 in The Wake and 5 Characteristic points to distribute among Intelligence, Power, and Willpower.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },

    modifiers: {
      lowElan: [
        {
          action: "To delve into the world of the occult and the supernatural",
          modifier: 2,
        },
        { action: "Mastering a supernatural discipline", modifier: 3 },
        { action: "Facing and overcoming terror", modifier: 2 },
        { action: "Being fascinated by fear and all it entails", modifier: 3 },
        { action: "Being a dreamer who lives in a fantasy world", modifier: 2 },
        { action: "Mastering the meaning of dreams", modifier: 2 },
      ],
      highElan: [
        { action: "Living between reality and fantasy", modifier: 2 },
        {
          action: "Devoting life to the study of the occult arts",
          modifier: 2,
        },
        { action: "Learning to master one’s fears", modifier: 2 },
      ],
      negative: [
        { action: "Not having dreams or desires", modifier: -3 },
        {
          action: "Neglecting the opportunity to advance in the occult",
          modifier: -2,
        },
      ],
    },
  }),
  Azrael: createLord({
    name: "Azrael",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Beryl",
    title: "Queen of Swords",

    description:
      "Azrael is the warrior of the Light, the Beryl who represents the concepts of good and justice. This is a combative entity always ready to employ violence in the defense of the innocent and all the principles she personifies. She has a rather tumultuous story. At the beginning she was as peaceful as Mikael or Rafael and devoted to helping everyone equally. But little by little, she started to witness daily massacres of innocent victims who were not helped by any of the principles she stood for. All the pain, suffering, and death influenced her deeply in her decision to fight for all those who deserved protection and justice. Since then, her philosophy has moved into a more violent direction, its goal being to confront evil and darkness even if this means going against some of C’iel’s ideas (whom she professes true devotion for). She is the Beryl who faces the Shajads and the forces of darkness most directly. She combats their agents and followers and is at all-out war with them. In the very few occasions C’iel requires the use of violence, it is usually Azrael’s agents and paladins she relies on. She is the precept heroes incarnate, as well as all those who fight to defend those in need even at the expense of their own lives.",

    gifts: {
      Leader: {
        name: "Leader",
        description:
          "Increases natural charisma with a bonus to Leadership equal to the character’s Elan level.",
        elanCost: 5,
        elanRequirements: 10,
      },
      TheValueOfHeroes: {
        name: "The Value of Heroes",
        description:
          "Arms the character with unusual courage, granting a bonus to Composure equal to Elan.",
        elanCost: 5,
        elanRequirements: 20,
      },
      ExaltationOfTheSpirit: {
        name: "Exaltation of the Spirit",
        description:
          "Heightens the sense of justice in those around the character, inspiring good conduct.",
        elanCost: 10,
        elanRequirements: 30,
      },
      SenseOfJustice: {
        name: "Sense of Justice",
        description:
          "Allows the bearer to sense unjust or evil acts in the surroundings, with precision scaling by Elan.",
        elanCost: 10,
        elanRequirements: 40,
      },
      SacredSpirit: {
        name: "Sacred Spirit",
        description:
          "Transforms the character’s essence into a holy being, radiating potent positive energy.",
        elanCost: 5,
        elanRequirements: 50,
      },
      PowerAura: {
        name: "Power Aura",
        description:
          "Creates an aura that harms dark or evil creatures within half the character’s Elan in yards.",
        elanCost: 10,
        elanRequirements: 60,
      },
      Immunity: {
        name: "Immunity",
        description:
          "Grants immunity to evil supernatural powers requiring Resistance Checks below Elan + 40.",
        elanCost: 15,
        elanRequirements: 60,
      },
      DestroyerOfEvil: {
        name: "Destroyer of Evil",
        description:
          "Doubles all damage inflicted on dark or naturally evil creatures.",
        elanCost: 15,
        elanRequirements: 70,
      },
      Blessed: {
        name: "Blessed",
        description:
          "Provides +10 to any check when destroying evil or performing a fair action, or +30 if spending permanent Elan.",
        elanCost: 20,
        elanRequirements: 70,
      },
      AzraelWarrior: {
        name: "Azrael Warrior",
        description:
          "Communion with Azrael grants +1 Strength and +1 Dexterity.",
        elanCost: 10,
        elanRequirements: 80,
      },
      Consecrating: {
        name: "Consecrating",
        description:
          "Allows consecration of places or objects, granting bonuses against evil beings and creating holy barriers.",
        elanCost: 15,
        elanRequirements: 90,
      },
      Yihad: {
        name: "Yihad",
        description:
          "Azrael’s chosen one may declare holy war, calling all who value justice. Responders become immune to Fear and can fight even Between Life and Death.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },

    modifiers: {
      lowElan: [
        { action: "Protecting the innocent", modifier: 3 },
        { action: "Destroying an evil/dark entity", modifier: 2 },
        {
          action: "Destroying a large number of dark/evil beings",
          modifier: 5,
        },
        { action: "Preventing an evil act", modifier: 2 },
        { action: "Defending justice", modifier: 2 },
        { action: "Stopping or destroying a Shajad agent", modifier: 3 },
        { action: "Becoming a hero", modifier: 5 },
      ],
      highElan: [
        { action: "Performing a relevant heroic act", modifier: 1 },
        { action: "Destroying a powerful evil creature", modifier: 2 },
        {
          action: "Saving the lives of a large number of innocents",
          modifier: 2,
        },
        { action: "Stopping a Shajad plan", modifier: 3 },
      ],
      negative: [
        { action: "Committing an evil action", modifier: -2 },
        { action: "Taking an innocent person’s life", modifier: -8 },
        { action: "Collaborating with the forces of darkness", modifier: -2 },
      ],
    },
  }),
  Abbadon: createLord({
    name: "Abbadon",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Shajad",
    title: "The Primeval Evil",

    description:
      "Abbadon was originally the only Shajad unable to find a place for himself within the structure of reality. Indecisive, he ended up by absorbing in his essence all the minor negative feelings not related to his companions like disgust, envy, anger or pride. However, he did not feel attached to those emotions and to increase his importance he decided to personify the very principle of evil itself. As a form of mockery to all what the Beryls represent, his favorite incarnation is the traditional Christian devil; the figure of the fallen angel, which symbolizes all the sins of men and where he derives his name from. In time, he has come to feel exceptionally attached to this representation, to the point of considering it the main aspect of his being. He is constantly competing with the other Shajads for power and conspiring against Jedah and Meseguis to overtake their predominance. He is completely absorbed by the precept he has chosen and the role he plays, so he delights himself causing tragedies and spreading evil. His followers are usually satanists or worshippers of evil deities from different cultures. Those who synchronize best with him are low or deranged individuals whose lives are guided by evil.",

    gifts: {
      DarkEmpathy: {
        name: "Dark Empathy",
        description:
          "Intensifies all dark feelings in those the character is in contact with, bringing out the worst in people.",
        elanCost: 10,
        elanRequirements: 10,
      },
      EyesOfTheEvil: {
        name: "Eyes of the Evil",
        description:
          "Enables characters to perceive the evil inside people, with accuracy scaling by Elan.",
        elanCost: 5,
        elanRequirements: 20,
      },
      LordOfSins: {
        name: "Lord of Sins",
        description:
          "Stirs the capital sin most deeply rooted in an individual. Requires MR or PsR vs twice Elan after brief interaction.",
        elanCost: 10,
        elanRequirements: 30,
      },
      DarkBeing: {
        name: "Dark Being",
        description:
          "Transforms the character into a dark elemental, radiating a potent evil aura.",
        elanCost: 5,
        elanRequirements: 40,
      },
      SoulCorruptor: {
        name: "Soul Corruptor",
        description:
          "Corrupts the souls of others. MR vs Elan + 60 or become twisted and evil. Permanent if failure exceeds 40.",
        elanCost: 15,
        elanRequirements: 50,
      },
      DemonicIncarnation: {
        name: "Demonic Incarnation",
        description:
          "Transforms the character into a true demon, granting twice their Elan in DP to choose supernatural powers.",
        elanCost: 10,
        elanRequirements: 60,
      },
      DestroyerOfTheSacred: {
        name: "Destroyer of the Sacred",
        description:
          "Doubles all damage inflicted on creatures of light or naturally good beings.",
        elanCost: 15,
        elanRequirements: 70,
      },
      GiftOfEvil: {
        name: "Gift of Evil",
        description:
          "Attracts evil creatures and people who feel drawn to the character’s presence and receptive to suggestions.",
        elanCost: 10,
        elanRequirements: 80,
      },
      DemonicSummoning: {
        name: "Demonic Summoning",
        description:
          "Allows summoning Abbadon’s demons once per month, or more by sacrificing Elan.",
        elanCost: 15,
        elanRequirements: 80,
      },
      SoulDevourer: {
        name: "Soul Devourer",
        description:
          "Allows feeding on the souls of evil individuals, recovering LP/Zeon or gaining temporary attribute increases.",
        elanCost: 15,
        elanRequirements: 90,
      },
      TheSeedOfTheDevil: {
        name: "The Seed of the Devil",
        description:
          "Allows the character to corrupt others into demonic entities with Gnosis 20–30 and up to 200 DP.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },

    modifiers: {
      lowElan: [
        { action: "Being swept away by dark feelings", modifier: 1 },
        { action: "Committing a really evil action", modifier: 4 },
        {
          action: "Spreading evil among a large number of people",
          modifier: 3,
        },
        { action: "Originating evil or devil worshipping cults", modifier: 2 },
        { action: "Leading others into sin", modifier: 2 },
      ],
      highElan: [
        { action: "Corrupting a pure person’s heart", modifier: 2 },
        { action: "Causing a major evil to the world", modifier: 3 },
      ],
      negative: [
        { action: "Helping others without personal gain", modifier: -1 },
        { action: "Committing a really good deed", modifier: -6 },
      ],
    },
  }),
  Barakiel: createLord({
    name: "Barakiel",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Beryl",
    title: "The Perfect God",

    description:
      "Barakiel is a powerful Beryl who incarnates the concepts of order and perfection. She thinks of herself as the greatest and highest of all powers, outdone only by C’iel herself, the only entity she admires and worships. The goal of her philosophy is to lead all civilizations into a perfect order of absolute equality. She thinks the way to achieve this is by establishing strict laws that govern every aspect of human life. She abhors chaos and instability, and fosters the advancement of the exact sciences, like mathematics and mechanics. She has a tense relationship with her sisters; in her opinion all of them are weak and imperfect. Her attitude has caused several open conflicts with Mikael, whose privileged position next to their Master she covets. She is extremely strict with her chosen ones and followers and demands them to maintain a scrupulous order and never to make mistakes. Those who fail rarely receive a second chance to please her. She is vain and likes to feel adored in all of the identities she takes on as a deity of order, law and the sciences. She synchronizes with narcissistic people who are endowed with great abilities or powers and who above all conduct their lives in an orderly fashion. She also favors scientists and those who worship her in any of her faces.",

    gifts: {
      Aesthetics: {
        name: "Aesthetics",
        description:
          "Whatever the character does is beautiful. Grants a bonus to Style equal to Elan.",
        elanCost: 5,
        elanRequirements: 10,
      },
      Attractive: {
        name: "Attractive",
        description:
          "The character naturally draws attention and interest everywhere they go.",
        elanCost: 10,
        elanRequirements: 20,
      },
      ScienceKnowledge: {
        name: "Science Knowledge",
        description:
          "Grants vast scientific understanding. Provides a bonus to Science equal to Elan.",
        elanCost: 10,
        elanRequirements: 30,
      },
      SensingImperfections: {
        name: "Sensing Imperfections",
        description:
          "Allows the character to detect flaws in behavior, personality, or physical form.",
        elanCost: 10,
        elanRequirements: 40,
      },
      SensingOrder: {
        name: "Sensing Order",
        description:
          "Allows perception of natural order and detection of chaotic or supernatural disturbances.",
        elanCost: 5,
        elanRequirements: 40,
      },
      PerfectBeauty: {
        name: "Perfect Beauty",
        description:
          "Gradually transforms the character into a being of unparalleled beauty, raising Appearance to 10.",
        elanCost: 5,
        elanRequirements: 50,
      },
      PerfectBody: {
        name: "Perfect Body",
        description:
          "Transforms the character’s body into the ideal form of their race, granting Inhuman checks and immunity to Fatigue and aging penalties.",
        elanCost: 15,
        elanRequirements: 50,
      },
      OrderAura: {
        name: "Order Aura",
        description:
          "Creates an aura that suppresses chaos and instills order in beings with Gnosis under 10.",
        elanCost: 10,
        elanRequirements: 60,
      },
      BarakielsEssence: {
        name: "Barakiel’s Essence",
        description:
          "Removes weaknesses and disadvantages at a rate of one per month.",
        elanCost: 20,
        elanRequirements: 70,
      },
      UnableToErr: {
        name: "Unable to Err",
        description:
          "The character becomes incapable of fumbles or mistakes caused by luck.",
        elanCost: 10,
        elanRequirements: 70,
      },
      DivinityInBodyAndSoul: {
        name: "Divinity in Body and Soul",
        description:
          "Raises all characteristics to a natural base of 10 over time, plus racial modifiers.",
        elanCost: 20,
        elanRequirements: 80,
      },
      Immortality: {
        name: "Immortality",
        description:
          "The character stops aging and becomes immune to disease and natural venom.",
        elanCost: 10,
        elanRequirements: 90,
      },
      AbsolutePerfection: {
        name: "Absolute Perfection",
        description:
          "The character becomes a divine being whose actions are flawless. Automatically adds +100 to all ability and resistance rolls.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },
    modifiers: {
      lowElan: [
        { action: "Being the object of praise and admiration", modifier: 1 },
        { action: "Worshipping a divine incarnation of Barakiel", modifier: 2 },
        { action: "Promoting law and order", modifier: 2 },
        { action: "Undoing a chaotic situation", modifier: 3 },
        { action: "Making an important scientific advancement", modifier: 5 },
        {
          action: "Making a public display of extraordinary ability",
          modifier: 2,
        },
      ],
      highElan: [
        { action: "Being considered a divinity", modifier: 2 },
        { action: "Inducing society into order and law", modifier: 3 },
        { action: "Showing the true meaning of perfection", modifier: 1 },
      ],
      negative: [
        { action: "Showing external weakness", modifier: -2 },
        { action: "Acting inconsistently or chaotically", modifier: -2 },
        { action: "Breaking the laws", modifier: -5 },
        { action: "Objectively failing something important", modifier: -10 },
      ],
    },
  }),
  Eriol: createLord({
    name: "Eriol",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Shajad",
    title: "Angel of Chaos",

    description:
      "The Angel of Chaos is one of the strangest Lords of Darkness. His philosophy digresses from the principles of balance that both the Shajads and the Beryls have tried to sustain. He is an anarchic entity who, ironically, shares more doctrines with Uriel than anyone would care to admit. He is fickle and changes his mind according to his mood, yet he maintains a profound bond with Gaira, to whom he is completely faithful. Eriol incarnates chaos and luck, both good and bad. To him, existence is an infinite set of possibilities, and the true fascination lies in discovering which possibility will manifest. Everything is a game he calls 'The Law of Chance.' Those who synchronize with him are individuals who reject external rules, trust luck, and embrace chaos. Throughout history, Eriol and his agents have inspired cults devoted to luck, fortune, and chaos.",

    gifts: {
      GrantingMisfortuneAndDisgrace: {
        name: "Granting Misfortune and Disgrace",
        description:
          "Allows the character to influence another person’s luck, positively or negatively, with intensity and duration scaling by Elan.",
        elanCost: 10,
        elanRequirements: 10,
      },
      AlteringTheLawOfChance: {
        name: "Altering the Law of Chance",
        description:
          "Modifies the thresholds for Open Rolls and Fumbles. Every 20 Elan lowers Open Roll thresholds by 2 and increases Fumble range by 1.",
        elanCost: 5,
        elanRequirements: 20,
      },
      SensingChaos: {
        name: "Sensing Chaos",
        description:
          "Allows the character to sense supernatural alterations in reality and the intensity of chaos in the area.",
        elanCost: 5,
        elanRequirements: 30,
      },
      StealingLuck: {
        name: "Stealing Luck",
        description:
          "Steals another individual’s good fortune, temporarily benefiting from it. Victims must pass MR vs twice Elan to resist.",
        elanCost: 10,
        elanRequirements: 40,
      },
      ConjuringUpProvidence: {
        name: "Conjuring Up Providence",
        description:
          "Allows the character to reroll one of their own rolls and take the second result. Usable once per session per 10 Elan.",
        elanCost: 10,
        elanRequirements: 50,
      },
      ChaosStigmata: {
        name: "Chaos Stigmata",
        description:
          "Grants DP equal to twice Elan to select supernatural powers as if the character had Gnosis 25.",
        elanCost: 15,
        elanRequirements: 50,
      },
      ChaosAura: {
        name: "Chaos Aura",
        description:
          "The character’s presence enhances chaos in the surroundings, causing unusual events and influencing beings with Gnosis < 10.",
        elanCost: 10,
        elanRequirements: 60,
      },
      AlteringFate: {
        name: "Altering Fate",
        description:
          "Enhances Conjuring Up Providence, allowing the character to force others to reroll. Forcing another consumes two uses.",
        elanCost: 15,
        elanRequirements: 70,
      },
      ForcingLuck: {
        name: "Forcing Luck",
        description:
          "Allows the character to force one of their rolls to be automatically Open. Usable once per session per 20 Elan.",
        elanCost: 15,
        elanRequirements: 80,
      },
      TruncatingFate: {
        name: "Truncating Fate",
        description:
          "Predetermines another’s next roll to be a Fumble unless they pass MR vs twice Elan. Usable once per day per target.",
        elanCost: 15,
        elanRequirements: 90,
      },
      LordOfChaos: {
        name: "Lord of Chaos",
        description:
          "Grants absolute dominion over chaos, allowing the character to alter events through chance. Cannot create impossible events, but can force any plausible outcome.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },

    modifiers: {
      lowElan: [
        { action: "Ignoring law and order", modifier: 2 },
        { action: "Promoting chaotic situations", modifier: 2 },
        { action: "Leaving an important event up to chance", modifier: 5 },
        { action: "Showing others the importance of chance", modifier: 1 },
        { action: "Behaving anarchically", modifier: 2 },
      ],
      highElan: [
        { action: "Partially controlling the Law of Chance", modifier: 2 },
        { action: "Unleashing chaos upon the world", modifier: 2 },
        { action: "Being completely ruled by chance", modifier: 1 },
      ],
      negative: [
        { action: "Conducting oneself in an orderly fashion", modifier: -2 },
        { action: "Following orders or laws", modifier: -3 },
        { action: "Disregarding chance", modifier: -2 },
      ],
    },
  }),
  Edamiel: createLord({
    name: "Edamiel",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Beryl",
    title: "The Spirit of Emptiness",

    description:
      "There is no Shajad or Beryl as inscrutable and unfeeling as The Spirit of Emptiness. Edamiel is separated from the world by her own choice, and unlike her sisters, she is not interested in becoming integrated with it. In the beginning, she tried to incarnate pleasure, the only feeling that brought her some satisfaction. Unfortunately, she soon realized not even that was enough to fill the void she carried inside, and she slowly drifted apart from reality until she disappeared. This is how she involuntarily came to represent abstract notions—like ignorance and nothingness—that neither Light nor Dark wanted to pick up. She believes true happiness is impossible because all feelings fade, and the only escape is to become one with emptiness. Her sisters are horrified by her philosophy, yet they tolerate her, unaware of the threat she poses. Occasionally she returns to her old incarnation, unleashing pleasure and desire, but often uses them to confuse and drag people toward nothingness. She has worshippers across cultures, often as a deity of desire and pleasure. Alarmingly, many synchronize with her—from hedonists to isolated individuals who reject the world.",

    gifts: {
      Desirable: {
        name: "Desirable",
        description:
          "The bearer becomes sexually enticing, awakening desire in those around them, especially the opposite sex.",
        elanCost: 5,
        elanRequirements: 10,
      },
      PleasureAmplifier: {
        name: "Pleasure Amplifier",
        description:
          "Enhances pleasure for anyone the character interacts with, even through minimal contact.",
        elanCost: 5,
        elanRequirements: 20,
      },
      VoiceOfPleasure: {
        name: "The Voice of Pleasure",
        description:
          "The character’s voice enraptures listeners. Adds Elan to Persuasion when seducing.",
        elanCost: 5,
        elanRequirements: 30,
      },
      FeelingDesire: {
        name: "Feeling Desire",
        description:
          "Allows the character to perceive desires and passions with supernatural clarity.",
        elanCost: 10,
        elanRequirements: 40,
      },
      PsychologicalImmunity: {
        name: "Psychological Immunity",
        description:
          "The character loses most emotions and becomes immune to psychological States. Adds Elan to resisting supernatural ones.",
        elanCost: 10,
        elanRequirements: 50,
      },
      PluckingFeelingsAway: {
        name: "Plucking Feelings Away",
        description:
          "Eradicates a specific feeling from a willing individual permanently.",
        elanCost: 10,
        elanRequirements: 60,
      },
      Passivity: {
        name: "Passivity",
        description:
          "Suppresses the will of those who speak with or look at the character. MR vs twice Elan or become incapacitated.",
        elanCost: 15,
        elanRequirements: 60,
      },
      Suppression: {
        name: "Suppression",
        description:
          "Neutralizes an Active Action performed by another individual unless they pass MR 140. Usable once per week per 10 Elan.",
        elanCost: 15,
        elanRequirements: 70,
      },
      TransitionToEmptiness: {
        name: "Transition to Emptiness",
        description:
          "The character becomes neither alive nor dead. Cannot die from damage and is immune to direct-death effects unless Presence > 160.",
        elanCost: 15,
        elanRequirements: 80,
      },
      Vortex: {
        name: "Vortex",
        description:
          "Transforms the character into a vortex of nothingness, functioning like the Level 90 Void spell. Usable once per day per 10 Elan.",
        elanCost: 25,
        elanRequirements: 90,
      },
      ArrivalOfNothingness: {
        name: "Arrival of Nothingness",
        description:
          "The chosen one’s arrival causes creativity, memory, and emotion to fade from an area until people become empty shells.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },

    modifiers: {
      lowElan: [
        { action: "Conducting oneself with apathy", modifier: 3 },
        { action: "Surrendering to the pleasures of the flesh", modifier: 3 },
        {
          action: "Drawing someone into the world of desire and pleasure",
          modifier: 2,
        },
        {
          action: "Completely wiping something off from existence",
          modifier: 5,
        },
        {
          action: "Suppressing an individual’s emotions through pleasure",
          modifier: 4,
        },
      ],
      highElan: [
        { action: "Destroying a great amount of matter or souls", modifier: 2 },
        { action: "Driving a population or culture into desire", modifier: 3 },
        {
          action:
            "Suppressing someone’s emotions by forcing them to embrace nothingness",
          modifier: 1,
        },
        { action: "Driving a population or culture into apathy", modifier: 4 },
      ],
      negative: [
        {
          action: "Taking decisions that promote people’s being active",
          modifier: -2,
        },
        {
          action: "Repressing one’s own worldly desires or those of others",
          modifier: -2,
        },
      ],
    },
  }),
  Meseguis: createLord({
    name: "Meseguis",
    elan: { current: 0, bonus: 0, sepcial: 0, final: 0 },
    type: "Shajad",
    title: "The Lament of Darkness",

    description:
      "Meseguis, the Lady of Vengeance, is the only Shajad to have adopted a female identity. Exceptionally powerful, she holds great influence over Gaira alongside Jedah. Her essence contains some of the darkest and most contradictory emotions of humanity—hatred, pain, and sadness—yet she despises these feelings and seeks to spare others from them. She believes forgiveness is a temporary escape, not a cure, and that only vengeance can bring true peace. Those consumed by hatred synchronize with her only faintly, while those who believe in vengeance and help others pursue it achieve true communion. Meseguis is a melancholy entity, sometimes protective of the weak, other times capable of cruelty beyond comprehension.",

    gifts: {
      SerenityOfMelancholy: {
        name: "Serenity of Melancholy",
        description:
          "Pain and sorrow inundate the character, granting stoic endurance. Provides a bonus to Composure and Withstand Pain equal to Elan.",
        elanCost: 5,
        elanRequirements: 10,
      },
      PathOfVengeance: {
        name: "The Path of Vengeance",
        description:
          "Grants instinctive guidance toward the correct direction for revenge, offering clues but not full answers.",
        elanCost: 5,
        elanRequirements: 20,
      },
      EyesOfSorrow: {
        name: "Eyes of Sorrow",
        description:
          "Allows sensing sorrow and hatred in others, with accuracy scaling by Elan.",
        elanCost: 10,
        elanRequirements: 30,
      },
      TearsForOthers: {
        name: "Tears for Others",
        description:
          "Allows easing another’s sorrow by taking part of it onto oneself.",
        elanCost: 5,
        elanRequirements: 30,
      },
      TransmittingPain: {
        name: "Transmitting Pain",
        description:
          "Transfers the character’s pain or sorrow to another through touch. MR/PsR vs twice Elan or suffer Pain or deep sadness.",
        elanCost: 10,
        elanRequirements: 40,
      },
      SpiritOfVengeance: {
        name: "Spirit of Vengeance",
        description:
          "Creates an aura that makes those around the character more vindictive. At Elan 60+, can intensify one person’s thirst for revenge.",
        elanCost: 10,
        elanRequirements: 40,
      },
      VoiceOfTheDead: {
        name: "The Voice of the Dead",
        description:
          "Allows communication with spirits who died in sorrow and have not yet received The Calling, or spirits of the Wake.",
        elanCost: 10,
        elanRequirements: 50,
      },
      DarkAvenger: {
        name: "Dark Avenger",
        description: "Grants +10 to all actions related to revenge.",
        elanCost: 10,
        elanRequirements: 60,
      },
      VoiceOfPain: {
        name: "The Voice of Pain",
        description:
          "Inflicts pain through speech. MR vs Elan + 60 or suffer Pain; failure by 40+ causes Extreme Pain. Three successes grant immunity.",
        elanCost: 15,
        elanRequirements: 60,
      },
      BeyondDeath: {
        name: "Beyond Death",
        description:
          "Allows the character to return from death to complete their vendetta. Gains 300 DP like a Gnosis 30 being but loses 1 Elan per day.",
        elanCost: 10,
        elanRequirements: 70,
      },
      DarkExecutor: {
        name: "Dark Executor",
        description: "Increases the Dark Avenger bonus to +20.",
        elanCost: 10,
        elanRequirements: 80,
      },
      DarkMirror: {
        name: "Dark Mirror",
        description:
          "Reflects a target’s sins back at them. MR/PsR 140 or suffer Paralysis (failure < 40) or soul destruction (failure ≥ 40).",
        elanCost: 15,
        elanRequirements: 90,
      },
      CommunionWithTheFallenOnes: {
        name: "Communion with the Fallen Ones",
        description:
          "Allows invoking spirits who seek revenge against the current opponent, granting their powers or manifesting them as lost souls.",
        elanCost: 10,
        elanRequirements: 100,
      },
    },

    modifiers: {
      lowElan: [
        { action: "Being consumed by sorrow or grief", modifier: 8 },
        { action: "Devoting one’s entire life to vengeance", modifier: 8 },
      ],
      highElan: [
        { action: "Helping a weak person take revenge", modifier: 2 },
        { action: "Fostering a sense of vengeance in others", modifier: 1 },
        { action: "Consummating a lifelong revenge", modifier: 4 },
      ],
      negative: [
        { action: "Forgiving someone", modifier: -3 },
        { action: "Inflicting pain or suffering for no reason", modifier: -4 },
      ],
    },
  }),
};
