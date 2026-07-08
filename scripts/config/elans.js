export function createLord(lordInput) {
  const {
    name = "",
    elan = { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type = "",
    title = "",
    description = "",
    gifts = [],
    modifiers = [],
    purchasedGifts = [],
    journalEntry = ""
  } = lordInput;

  return {
    name,
    elan,
    type,
    title,
    description,
    gifts,
    modifiers,
    purchasedGifts,
    journalEntry
  };
}

export const ABF_LORDS = {
  Mikael: createLord({
    name: "Mikael",
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Beryl",
    title: "The Soul of God",
    description:
      "Mikael is the first among the Beryls – the most powerful and important of all the Daughters of Light. She is extremely consonant with C’iel’s ideas and she generally acts as her spokeswoman and representative. She was also the first one to feel the need to form part of the existence which is alien to all of them, and fused a fragment of her essence with reality, as Lady Jade had done before. Mikael incarnates the virtue of hope and creation, without which all living beings would be completely lost – hope and salvation. For centuries, she has looked after men and women of all races, giving little thought to their affiliation to the Light or the Darkness, since they are all her desire to be worshipped. Although several cultures worship her directly, her only goal was always to help and guide others. Nevertheless, she felt a strong empathy with the principles and precepts of Christianity when they were first developed. For this reason, she slowly began to promote the virtues preached by the figure of God. In time, she became the most benign and merciful face of the god-men who sought to save mankind from suffering and offer it hope for the future. Those who follow her are, above all, strong believers of salvation.",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.5uFtMW1hvbwTIy9H",
    gifts: [
      {
        name: "Light of Hope",
        description:
          "Characters become a source of hope for others wherever they go. Their mere presence stirs the joie de vivre in people little by little, and they give bliss back to the world. Those in daily contact with them are never discouraged nor lose their faith.",
        elanCost: 5,
        elanRequirements: 10
      },
      {
        name: "Eliminate Disease",
        description:
          "It enables characters to heal any disease of the same or lower Elan value they possess. As an example, a character with 30 points of Elan would cure diseases up to that level.",
        elanCost: 10,
        elanRequirements: 20
      },
      {
        name: "Keeping in the World",
        description:
          "Characters may immediately bring back to life individuals in a Between Life and Death state, simply by imposing their hands on the subject without the need of a PhR check.",
        elanCost: 5,
        elanRequirements: 30
      },
      {
        name: "Heavenly Resistance",
        description:
          "This gift gives characters a special bonus equal to half the amount of their Elan to all of their Resistances.",
        elanCost: 20,
        elanRequirements: 40
      },
      {
        name: "Exorcise Evil",
        description:
          "Communion with Mikael enables characters to exorcise supernatural beings of a naturally negative essence. Exorcism works just like the Banish Ability, meaning that any creature failing the required MR will be expelled from the material plane and brought back to the Flow of Souls or The Wake. This ability may also be used on powers the creature has employed to harm others directly. It may only be applied once per creature as long as the character’s Elan does not increase. The MR Difficulty is twice the exorcist’s Elan level. For instance, an exorcist with 70 Elan points would pose a 140 MR Difficulty for the creature attempting to resist the exorcism.",
        elanCost: 15,
        elanRequirements: 50
      },
      {
        name: "Aura",
        description:
          "It grants the ability to extend a character’s Resistance bonus to any individual around the character he or she does not choose to exclude deliberately. The ability’s action radius is half the character’s Elan level in yards. For instance, anyone with 80 Elan points would concede a +40 bonus to Resistances in a 40-yard (120-foot) radius.",
        elanCost: 10,
        elanRequirements: 50
      },
      {
        name: "Miracle",
        description:
          "Communion with Mikael enables characters to recreate any of the minor miracles performed by saints as told by the legends. This is a small effect ability that under no circumstance may imply a harm to anyone (i.e. walking on water, multiplying food…). Miracles will be more or less powerful depending on the character’s Elan level.",
        elanCost: 10,
        elanRequirements: 60
      },
      {
        name: "Undo Negative States",
        description:
          "This gift dispels any harmful state (as described in Chapter 14: States, Effects and Accidents) present in any one individual, including the character himself. In the cases of negatives provoked by physical defects, it does not dispel them completely, but it reduces them to half their original value. Effects caused by supernatural means are not immediately undone, but the affected character may repeat the Resistance Check once.",
        elanCost: 10,
        elanRequirements: 70
      },
      {
        name: "Savior",
        description:
          "Whenever characters perform an action tending to save a life, Mikael endows powers that reduce one level of Difficulty on any Check they need to make. They also receive a +40 on opposed checks.",
        elanCost: 10,
        elanRequirements: 70
      },
      {
        name: "Heavenly Essence",
        description:
          "Characters are so close to Mikael that they can invoke her angels when they need their help. They are usually Maidens of the Light, although other similar entities may also perform this task. Angels are not obligated to obey, but they usually will agree to anything they are asked to do because of their close relationship with Mikael. Characters are entitled to one summoning per month, but they may repeat it, sacrificing 1 Elan point permanently per additional call.",
        elanCost: 15,
        elanRequirements: 80
      },
      {
        name: "Rise from the Dead",
        description:
          "By adhering entirely to the concepts embodied by Mikael, characters gain the ability to give life back to the dead if they have died against their will. Those who have not yet received The Calling can be brought back for absolutely no cost at all. On the contrary, bringing back those who have already returned to the Flow of Souls will cost 1 permanent point of Elan for each month elapsed since their death. The ability is useless in reincarnated or destroyed spirits. Beings with Gnosis 40 or higher will not be affected, either.",
        elanCost: 20,
        elanRequirements: 90
      },
      {
        name: "Resurrection",
        description:
          "Mikael’s chosen ones are never too far from salvation, even in death. This gift will allow the character in question to return from the dead with all of his or her faculties untouched. If the body is completely destroyed or has been injured severely, it will be regenerated automatically at the time of its resurrection. This will only work if the character still has things to do in the world and has the drive to live. Soul-destroying effects like those of the spell Sever the Existence may annihilate the character completely.",
        elanCost: 10,
        elanRequirements: 100
      }
    ],


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
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Shajad",
    title: "The End of Days",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.chr6eh7aw982FZGR",
    description:
      "Zemial, the shadow of existence, the burden of all life – there are so many names for a nightmare that never should have been named. Many arguments are made to sustain his status as the greatest among the Shajads and Beryls, but Darkness itself states his power is only comparable to his insanity. Some legends say that after the War of Heaven, he exterminated entire races; others say he rebelled against his own. Whatever his actions may have been in the past, time has washed them away. The only thing we know for sure is that Gaira himself locked Zemial away in the darkness to prevent him from acting freely upon the world, and chained him to the Void as punishment for his disobedience. The very thought of the existence of a concept like Zemial is a contradiction. It incarnates unchained destruction, despair, and death without meaning or purpose – it is the end of all existence. He makes no distinction between Light and Darkness; to him all that exists must be destroyed. There is no record of cults who openly worshipped him, although there have been cases of individuals slightly synchronizing with him. These are destructive beings that neither seek nor need justification for their acts, subjects with nothing to lose or gain in life and, usually, with some degree of psychotic disorder.",

    gifts: [
      {
        name: "Spiritual Assault",
        description:
          "It enables characters to kill any kind of creature, even one of an immaterial nature or one with immunity to traditional attacks. In gaming terms, it allows a character to damage Energy as described in the Ki ability Aura Extension.",
        elanCost: 5,
        elanRequirements: 10,
      },
      {
        name: "Demented Yearning",
        description:
          "Once they have killed, the characters’ killer instincts are awakened, allowing them to ignore any psychological attempts to be calmed down in any way. If they wish, they may dive into a Rage State and receive a +10 bonus to any offensive action leading to kill. The ability will linger for half an hour after having provoked death.",
        elanCost: 5,
        elanRequirements: 20,
      },
      {
        name: "Increased Damage",
        description:
          "Any violent action performed by the character will have a strong increased effect. The ability will heighten Base Damage on any attack in a proportion equivalent to half the character’s Elan level, rounding the number down to the nearest five. A character with Elan 70 would increase his or her Base Damage by 35 points.",
        elanCost: 10,
        elanRequirements: 30,
      },
      {
        name: "Animic Damage",
        description:
          "The characters’ attacks not only affect their victim’s body, they also have a direct effect on his spirit. Damage produced through this ability will not be recovered naturally, and wounds will not heal through conventional methods. The only way victims can recover is through spells or mystical abilities.",
        elanCost: 10,
        elanRequirements: 40,
      },
      {
        name: "Destroyer",
        description:
          "Those who possess this gift are able to destroy inorganic objects by mere contact, turning them to ashes or causing them to burst into pieces. In this way, they are able to disintegrate any object with a Presence lower than half their Elan level, plus 10. For instance, characters with Elan 60 would be able to automatically destroy objects with a maximum presence of 40.",
        elanCost: 15,
        elanRequirements: 50,
      },
      {
        name: "Lord of Destruction (Touch)",
        description:
          "This gift grants the ability to destroy other creatures simply by touching them. Upon the character’s wish, anyone in contact with him will need to pass an MR or PhR Check with a Difficulty equal to his Elan plus 80, or suffer a loss of a number of Life Points equivalent to their Failure Level. The affected ones must repeat the Check every five turns for as long as contact continues.",
        elanCost: 10,
        elanRequirements: 50,
      },
      {
        name: "Exterminating Presence",
        description:
          "The characters’ mere presence is like poison to all that exists. Anything a few feet away from them will die or weaken slowly, plants will wither wherever they go, and people’s health will deteriorate.",
        elanCost: 10,
        elanRequirements: 60,
      },
      {
        name: "Lord of Destruction (Sight)",
        description:
          "The field of action is widened; the ability permits a character to inflict damage just by staring. In this case, the Difficulty of the Resistance Check is equal to the character’s Elan level, plus 60. Fixing the stare upon the same individual will force the victim to repeat the Check every five turns. Those who pass the Check three times in a row will be considered immune. This gift can not be activated simultaneously with Touch.",
        elanCost: 10,
        elanRequirements: 60,
      },
      {
        name: "Lord of Destruction (Aura)",
        description:
          "Synchronicity with Zemial has reached such proportions that the destructive essence of the character extends to his or her surroundings like an aura, provoking damage to everyone within a 30-foot radius. The effect has an MR Difficulty equal to the character’s Elan level, plus 40. The Check must be repeated every five turns for as long as the victims remain inside the aura. Those able to pass it three consecutive times will be considered immune. This gift can not be activated simultaneously with Touch or Sight.",
        elanCost: 10,
        elanRequirements: 70,
      },
      {
        name: "Destructive Assault",
        description:
          "It grants the ability to damage any creature regardless of power, supernatural presence, or special immunity. Those victims with a Gnosis Level lower than the aggressor whose lives are taken by him or her will have their souls completely destroyed instead of returning to the Flow of Souls.",
        elanCost: 15,
        elanRequirements: 80,
      },
      {
        name: "Blood of Insanity",
        description:
          "Zemial’s blood of dementia runs through the character’s veins, allowing them to infect others with it. Whoever drinks it will suffer the consequences of a Level 80 supernatural poison with an instantaneous effect and a 140 VR Difficulty. Those who fail the Resistance will enter a communion state with Zemial, thus gaining 50 Elan points from the entity (except, of course, if they already possessed a higher value), but losing their mind in the process. From then on, the affected characters will turn into madmen obsessed with killing and destroying everything that crosses their path, not minding their own personal security at all.",
        elanCost: 20,
        elanRequirements: 90,
      },
      {
        name: "Bearer of Catastrophes",
        description:
          "In this level, unchained destruction and madness are one with the incarnation. The arrival of Zemial’s chosen one brings forth all kinds of natural cataclysms and disasters. Volcanoes erupt, earthquakes, hurricanes, and hail lash the earth, the seas go mad, ravishing the coastlines, and fire falls from the skies wherever they go. Terrible consequences will always ensue from these events, and thousands of lives will be lost tragically for no reason.",
        elanCost: 10,
        elanRequirements: 100,
      },
    ],

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
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Beryl",
    title: "The Spirit of Freedom",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.ExYa1bTdncRUVskd",
    description:
      "Uriel Beryl is a spirit embodying freedom and rebellion, opposing tyranny, slavery, and laws that limit autonomy. The character is known for unpredictability and has inspired various religions and cults. Uriel is associated with the Beryls, a group of spiritual entities, and is said to have a strong connection with the Shaajad Eriol.",
    gifts: [
      {
        name: "Instinct of Liberty",
        description:
          "Characters have a great ability for finding the way out from wherever they may be. Their natural instinct allows them to escape from places they do not want to stay, and to sense what the most trouble-free, available route will be. This is why it is said Uriel’s followers are the greatest escapists in the world.",
        elanCost: 5,
        elanRequirements: 10
      },
      {
        name: "Unnoticed",
        description:
          "Someone benefited by this ability may choose to go unnoticed among normal people, attracting very little attention.",
        elanCost: 5,
        elanRequirements: 20
      },
      {
        name: "Indomitable Spirit",
        description:
          "The character possesses an iron will. A special bonus, equivalent to his Elan level, is applied to Resistance Checks against any form of domination.",
        elanCost: 10,
        elanRequirements: 20
      },
      {
        name: "Free Soul",
        description:
          "Those in contact with the character will gain a new sense of longing for freedom and a desire to follow their impulses. In many aspects, their behavior is contagious, and they push their acquaintances to pursue their own dreams and rebel against oppression.",
        elanCost: 5,
        elanRequirements: 30
      },
      {
        name: "Visionary",
        description:
          "By acquiring this gift, characters begin to receive visions about possible future events. Images may come in any format the GM desires – dreams, whispers in the air, or water reflections. The higher the Elan level, the clearer and more accurate the visions. The limits of this advantage must be interpreted by the GM. Naturally, predictions are not entirely safe and only depict possible outcomes totally liable to modification by the characters.",
        elanCost: 10,
        elanRequirements: 40
      },
      {
        name: "Means of Transport",
        description:
          "Characters always have a suitable means of transport at hand when they need it. As if by magic, they will find an appropriate form of travel to wherever they need to go – be it on horseback, caravan, or ship. Naturally, this ability may be impaired by certain circumstances.",
        elanCost: 5,
        elanRequirements: 40
      },
      {
        name: "Breaking the Chains",
        description:
          "Their union with Uriel allows characters the ability to free others (and themselves) from any type of supernatural control, in the form of mystical, Psychic or Summoning Abilities, that might subdue them. This power requires the subduer to pass an MR Check or he will free his prey from his control. It can only be used one time per subject, as long as characters do not increase their Elan level. The MR Difficulty is equal to twice the character’s Elan. For instance, a character with 65 Elan would generate a 130 MR Difficulty.",
        elanCost: 10,
        elanRequirements: 50
      },
      {
        name: "Eyes of the Future",
        description:
          "It grants the ability to foresee certain immediate events, thus making it possible to alter their course. It operates in the same way a sixth sense would, allowing characters to know what will happen in the next turn. Characters receive a +30 bonus to all Opposed Checks because they already know the intentions of their opponent. The ability may be used once a day for every 10 Elan points. It may be used passively, if the GM allows, to anticipate possible danger or eliminate a surprise. Those uses will count as two instead of one.",
        elanCost: 20,
        elanRequirements: 60
      },
      {
        name: "Free Passage",
        description:
          "No wall or gate stands in the way of the recipients of this gift. Characters are allowed to move in and out freely, walking through any material physical barriers as if they did not exist. Supernatural walls or barriers are not included in this ability.",
        elanCost: 15,
        elanRequirements: 60
      },
      {
        name: "Communion with Uriel",
        description:
          "Characters obtain 1 extra point in their Power, Willpower and Dexterity Characteristics as a reflection of their direct relationship with the spirit of freedom.",
        elanCost: 10,
        elanRequirements: 70
      },
      {
        name: "Supernatural Essence",
        description:
          "The character is imbued with Uriel’s power, thus obtaining Gnosis 30 and all the advantages this implies.",
        elanCost: 10,
        elanRequirements: 80
      },
      {
        name: "A Second Chance",
        description:
          "Characters are entitled to a second roll upon failing any Resistance Check that would subject them to a negative state.",
        elanCost: 20,
        elanRequirements: 90
      },
      {
        name: "The Traveler",
        description:
          "Uriel’s chosen ones always find themselves exactly where they need to be, regardless of distance or obstacles that would separate them from their destination. Once per turn, Travelers are able to transport themselves immediately to wherever they may wish to be, ignoring all protection or barriers. Only the most powerful mystical walls are capable of stopping them. To transport one’s self is an Active Action; characters must have the Initiative to execute it.",
        elanCost: 10,
        elanRequirements: 100
      }
    ],


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
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Shajad",
    title: "Puppet Master",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.a5hlnPVBlfaDBsF3",
    description:
      "Jedah is the puppet master, the most manipulative and subtle of the Shajads. He is said to control the history of mankind through the manipulation of beings, events, and the course of time. The purpose of such manipulation is nothing more than power, especially if it can be obtained in secret. Jedah never seeks to rule openly or directly. To him, the ideal would be to become the true master of a game, so subtle that no one would even notice his influence. He is not truly evil. He does not promote hatred or seek to cause suffering. Instead, he sees existence and its forces as tools to be used as much as he can. However, he would never use too much affection or emotion to achieve his goals. Jedah has influenced the entire fundamental idea of true humanism, aloof reason, dominance, politics, and knowledge. To most mortals, Jedah does not appear to be evil. He is not cruel, nor does he take pleasure in suffering. He simply manipulates others to serve his own ends. He believes that the best way to improve the world is to control it. He believes that the truth is meaningless compared to perception. He believes that the best way to understand someone is to dominate them. He believes that the best way to protect someone is to enslave them. He believes that the best way to improve someone is to manipulate them.",

    gifts: [
      {
        name: "The Gift of Politics",
        description:
          "It confers a disproportionate capability for influencing and persuading. It gives a special bonus (equal to a character’s Elan level) to the Persuasion and Leadership Secondary Abilities. In other words, someone with 40 Elan points would get a +40 bonus for his or her Checks using these Abilities.",
        elanCost: 5,
        elanRequirements: 10
      },
      {
        name: "Increased Domination",
        description:
          "Union with Jedah allows the character to use the forces of the Flow of Souls to subdue supernatural beings. Because of this, a user of this gift will apply a special bonus to his or her Control Summoning Ability equal to half the character’s Elan. This gift will not work against Light-based beings.",
        elanCost: 10,
        elanRequirements: 20
      },
      {
        name: "Shadow",
        description:
          "Through supernatural means, characters are able to alter their shadow’s appearance or shape in any way they like.",
        elanCost: 5,
        elanRequirements: 30
      },
      {
        name: "Dark Affinity",
        description:
          "The receiver of this gift will obtain affinity with all dark supernatural beings who will recognize them as one of their own.",
        elanCost: 5,
        elanRequirements: 40
      },
      {
        name: "The Power Of Knowledge",
        description:
          "It increases the characters’ intellectual faculties conferring a bonus to all Intellectual Secondary Abilities equivalent to half the characters’ Elan level.",
        elanCost: 10,
        elanRequirements: 50
      },
      {
        name: "The Dominator (Speech)",
        description:
          "Characters are able to subdue people through their voice. All those listening for more than five turns must pass an MR or PsR with a Difficulty equal to the Dominator’s Elan level, plus 60, to avoid being dominated. Subdued individuals are not conscious of their state; still, they may roll again for Resistance upon receiving an order totally contrary to their behavior. If they pass the Resistance Check, they will become aware of their having been used as puppets.",
        elanCost: 10,
        elanRequirements: 50
      },
      {
        name: "Chain of Command",
        description:
          "Characters expand the control over people and creatures, and they are now able to transfer some of their power to those who act on their behalf. They are entitled to pass on any gift they possess to a subordinate with the purpose of carrying out specific orders. The power granted acts as if the vassal’s Elan was 20 points less than that of his or her master. Although both can continue using it, each gift can only be attributed once. If the character wants to grant it to another servant, first he would have to remove it from the one that currently holds it.",
        elanCost: 10,
        elanRequirements: 60
      },
      {
        name: "Lord of Shadows",
        description:
          "Characters possess such command of the darkness that they are able to invoke dark creatures and subject them to their service. As a general rule, beings responding to the call will be Shadows, minor elementals of darkness. However, other entities of a similar nature or ability may also manifest themselves. Characters may invoke and sustain control over one being for every 2 Elan points they have. Whenever an entity is destroyed, it shall be necessary to wait for a whole new day until a new being can be summoned.",
        elanCost: 15,
        elanRequirements: 65
      },
      {
        name: "Dark Power",
        description:
          "Characters who receive this gift will obtain part of Jedah’s supernatural power and increase their Power, Willpower, and Intelligence in one point.",
        elanCost: 15,
        elanRequirements: 70
      },
      {
        name: "The Dominator (Sight)",
        description:
          "Dominion extends to the sense of sight; characters are able to control others by staring at them for longer than two turns. In this case, the MR or PsR Difficulty is equivalent to their Elan level, plus 40.",
        elanCost: 10,
        elanRequirements: 70
      },
      {
        name: "Supernatural Essence",
        description:
          "Characters are imbued with the spirit of the Puppet Master, and they obtain Gnosis 30 with all the advantages that come with it.",
        elanCost: 15,
        elanRequirements: 80
      },
      {
        name: "The Dominator (Aura)",
        description:
          "The characters’ very essence becomes so powerful that it subdues all those less than 30 feet away from them. Anyone inside that radius must pass an MR or PsR with a Difficulty equal to their Elan level plus 20 to avoid being subdued. If the Resistance is passed, it does not need to be rerolled until after an hour.",
        elanCost: 10,
        elanRequirements: 90
      },
      {
        name: "Master of Puppets",
        description:
          "Those who synchronize with Jedah completely will obtain the power of manipulating their subordinates as mere extensions of themselves, like a puppet master pulling puppet strings. They will project their awareness over their agents and act through all of them simultaneously, regardless of number or distance. Even though they all retain their identities, the puppet master knows what they are thinking or feeling, and he is entitled to make decisions for them anytime he wants. These individuals will keep their own abilities, but while under their master’s control, all intellectual knowledge he may possess will be available to them. In addition to this, all creatures mystically subdued by the master will lose the ability to free themselves from him even upon receiving orders opposed to their normal behavior.",
        elanCost: 10,
        elanRequirements: 100
      }
    ],

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
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Beryl",
    title: "Lady of Feelings",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.NPzNJRpRuDqZNQ2I",
    description:
      "Gabriel, the great Lady of Feelings is undoubtedly the Beryl who incarnates the largest number of positive feelings. It is the lady of love, friendship, arts, and peace. Those who know the true identity of the Daughters of the Light think of her as the purest among them. She feels devotion for all living beings and has always tried to protect and help them. For years she has lived among mortals under several different identities to feel integrated in their society and to be able to understand them. She is said to have become close enough with men as to even fall in love with one, although his identity is unknown. Gabriel promotes peace, friendship, love, and creative feelings among artists and poets. She thinks the best way to reach the dream of C’iel is to create an awareness of the importance of these feelings. Her capacity for forgiving is limitless, and she usually tries to avoid violent solutions. Artists and lovers and those whose lives are ruled by the most positive of feelings synchronize with her.",

    gifts: [
      {
        name: "Artistic Aptitude",
        description:
          "This gift will increase an individual’s creativity by endowing a special bonus equal to his Elan level for the Art and Music Secondary Abilities.",
        elanCost: 5,
        elanRequirements: 10
      },
      {
        name: "Grace",
        description:
          "Whoever possesses this gift will appear beautiful in everyone’s eyes without the need of altering his or her outlook. People will find gracefulness even in the most monster-like of individuals.",
        elanCost: 5,
        elanRequirements: 20
      },
      {
        name: "Positive Empathy",
        description:
          "It intensifies all positive feelings of those individuals characters are in contact with. In a way, the bearer of this gift possesses a strong aura that brings out the best in everyone.",
        elanCost: 10,
        elanRequirements: 30
      },
      {
        name: "Peace Maker",
        description:
          "Characters create a state of harmony that pacifies small quarrels and bickering. Wars and large-scale conflicts can not be stopped with this ability, but consequences of these conflicts will be milder wherever the character is.",
        elanCost: 10,
        elanRequirements: 40
      },
      {
        name: "Psychological Immunity",
        description:
          "This power endows complete immunity from any negative psychological State – like fear, anger or sadness. In case these are supernaturally induced, characters may add their Elan level to their MR Check as a special bonus to resist them.",
        elanCost: 10,
        elanRequirements: 40
      },
      {
        name: "Feeling Perception",
        description:
          "It senses any kind of positive emotion present in the surroundings. The higher the Elan level, the more exact the perception will be, and the wider its radius.",
        elanCost: 10,
        elanRequirements: 50
      },
      {
        name: "Imbuing Feelings",
        description:
          "This gift infuses positive feelings into another individual. In order for the gift to work, the character and the target should talk for a long time or spend some time together. The MR Difficulty is twice the gifted character’s Elan level. If the nature of the target is especially contrary to the specific emotion, a bonus between +10 and +40 may be applied to the roll, as the GM determines. Those who pass the Check will no longer need to repeat it until the character’s Elan rises.",
        elanCost: 15,
        elanRequirements: 50
      },
      {
        name: "Bond",
        description:
          "Gifted characters tie their lives to an individual extremely important to them; a strong bond is created between the two, based on the feelings each one has for the other. From then on, they both acquire certain special abilities that spring from that relationship. To begin with, they can choose to use whatever Resistance of the pair is higher, at any given circumstance. Secondly, as long as one of them lives, they will both automatically pass Checks to exit the Between Life and Death state. Lastly, they will be able to communicate with one another simply by exchanging glances using their supernatural connection. For this gift to be activated, it is necessary that the character first finds someone who is drawn to him by strong and mutual feelings of love or friendship.",
        elanCost: 15,
        elanRequirements: 60
      },
      {
        name: "Help",
        description:
          "No matter how difficult things get, the gifted character will always find someone to lend a hand in any way they can. Oftentimes, he will only need to ask for help to be assisted by whoever may be around.",
        elanCost: 10,
        elanRequirements: 70
      },
      {
        name: "Peace Song",
        description:
          "Characters have the capacity of singing a song that incarnates the very nature of peace. When they do, Gabriel’s voice springs from their throat with an indescribable melody that enraptures everyone who hears it, stripping them of their will to fight. The song can be heard in a 60-foot radius for every Elan point the character possesses; feelings are transmitted straight into the listener’s soul. Whoever hears it for longer than half a minute must automatically pass an MR Check against twice the singer’s Elan points to avoid being subject to his or her power. If characters have developed Music as a Secondary Ability, each Difficulty Level above Difficult they obtain in a Check will increase the MR Difficulty by 10 points.",
        elanCost: 15,
        elanRequirements: 80
      },
      {
        name: "Protection",
        description:
          "Due to their closeness with Gabriel, characters are protected by a strong presence that acts upon any one who may try to harm them. Every being capable of entertaining feelings needs to pass an MR Check against twice the Elan level of the character with Protection in order to harm him or her. Once passed, the Resistance can be ignored until the next encounter.",
        elanCost: 20,
        elanRequirements: 90
      },
      {
        name: "Paradise",
        description:
          "Gabriel’s chosen one possesses the quality of entering the heart of good-natured people as a positive influence, forever removing all negative emotions from them. Wherever he or she is will be heaven on earth, and no one with a lower Presence than his will be able to cause damage to others or fall prey to dark passions or emotions. Negative beings will be forced to leave at once, or else be purified and inevitably transformed into benign creatures.",
        elanCost: 10,
        elanRequirements: 100
      }
    ],

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
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Shajad",
    title: "The Dark Warrior",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.F1oBGXaMW2U21SEb",
    description:
      "Undoubtedly, Noah is Gaira’s most strict disciple. Above all, he values strength and the drive to succeed that lies within every living creature. Noah incarnates competitiveness, combat, and victory. On the other hand, he also represents darker concepts – such as war and violence. He believes the only truly weak beings are those without the will to fight or to advance; such creatures are nothing but an obstacle in the way of evolution and universal progress. All means are acceptable when it comes to bettering one’s self. He approves of all conflicts, war, and the most critical of situations no matter how tragic or terrible, in the thought that those bring out the best in people and lead them into learning. Noah tremendously dislikes those that stupidly abuse their power, and those unable of controlling it. He has opened many fronts against the Beryls, which he considers to be a weakness for the world. Many cultures have worshipped him in his best known aspect as a god of war, but he has adopted many other identities throughout history. His main followers are typically great warriors or generals, but even thinkers and artists may also synchronize with him provided they are competitive enough.",

    gifts: [
      {
        name: "In the Right Hands",
        description:
          "This gift provides an exceptional ability to find the necessary equipment for every circumstance. In this way, a swordsman who has lost his weapon fleeing from a group of enemies will be likely to stumble upon a sword on the way, while a thief without a picklock will come across a device that will serve his purpose very close to the door he is attempting to open.",
        elanCost: 5,
        elanRequirements: 10
      },
      {
        name: "The Will to Improve",
        description:
          "The competitive spirit of the character is easily transmitted to others, and he becomes a strong influence to the people he is in regular contact with. Everyone around him wants to improve and better themselves.",
        elanCost: 10,
        elanRequirements: 20
      },
      {
        name: "Resistant",
        description:
          "The gift allows extraordinary resistance to physical damage and its consequences. Characters get a PhR bonus equivalent to half their Elan.",
        elanCost: 5,
        elanRequirements: 20
      },
      {
        name: "Inhuman",
        description:
          "It allows the bearer to reach Inhuman Difficulty Levels in whatever fields the character excels or specializes.",
        elanCost: 5,
        elanRequirements: 30
      },
      {
        name: "Ignore Penalties",
        description:
          "The gift will automatically eliminate an amount of penalties to action equivalent to half the character’s Elan level. As example, anyone with Elan 60 suffering the combined effects of penalties that come to a total of –40 would only apply a –10, thanks to this ability.",
        elanCost: 10,
        elanRequirements: 40
      },
      {
        name: "Dark Power",
        description:
          "Characters are able to enhance the outcomes of their actions in certain moments by using Noah’s power. This gift will grant as many points as twice the subject’s Elan level and they can be spent in the form of bonuses to rolls. It is left to the character to decide the amount to be invested prior to rolling the dice, but there is a 30-point per action limit. For instance, anyone with Elan 70 would get 140 points. 25 could be invested in a temporary bonus to Attack Ability, while 115 would still remain to be spent at a later stage. Points spent are recovered at a rate of five per day.",
        elanCost: 15,
        elanRequirements: 50
      },
      {
        name: "Equipment",
        description:
          "This gift puts only the best resources into the characters’ hands. Any device he employs will automatically acquire +10 Quality, as long as the character is using it – be they weapons, paintbrushes, or similar objects. The ability will not bear any effect upon artifacts with a pre-existent higher bonus.",
        elanCost: 10,
        elanRequirements: 60
      },
      {
        name: "In the Face of Adversity",
        description:
          "Characters are able to give the best of themselves while faced with the least favorable of circumstances. When having to deal with a situation that clearly defies their limits, or when dealing with an impossible challenge, the receiver of the gift will apply a bonus to the ability in use. In a combat situation, he or she will receive +10 bonus for Attack and Defense. Secondary Abilities are aided with a +20 bonus.",
        elanCost: 15,
        elanRequirements: 70
      },
      {
        name: "War Aura",
        description:
          "All soldiers or subordinates commanded by the character are imbued with his warfare power and receive a special +10 bonus to Attack and Defense. The action radius of the gift is equivalent to the character’s Elan level in yards. The bonus does not allow any member of the troops to achieve a Combat Skill higher than the character with War Aura. Given such a case, the +10 bonus would not apply.",
        elanCost: 10,
        elanRequirements: 70
      },
      {
        name: "Dark Avatar",
        description:
          "The gift provides full communion with the darkness; the character’s body becomes a portal through which the power of darkness can be channeled. He can invoke his strength for a limited amount of time, during which he turns into a ghastly avatar. By doing this, his physical form is altered; he obtains natural weapons, a +30 All Action bonus, +3 to all Characteristics, and can achieve Zen-Difficulty Level actions. The gift can be used at any time, but will only hold for 1 turn per Elan point. Once time is up, power overcharge will produce a –30 All Action Penalty for as many days as turns the avatar was active. No transformation will be allowed during this period.",
        elanCost: 20,
        elanRequirements: 80
      },
      {
        name: "The Shadow of War",
        description:
          "It brings out the war instinct in all of those in contact with the character for a prolonged period of time. Their path is thus filled with violence and war. Small quarrels and large-scale battles break out wherever they go.",
        elanCost: 15,
        elanRequirements: 90
      },
      {
        name: "The Vanquisher",
        description:
          "Only the very best can ever become Noah’s chosen one – the one who can never be defeated. From the time the gift is awarded, characters automatically receive the Primary or Secondary Ability of those they beat. For instance, upon defeating an opponent with a higher Defense, they will automatically increase their own ability until it matches that of the victim. Opponents are regarded as defeated when characters personally beat them in combat or a balanced contest. Beating an enemy who is under the effects of negatives to his action will afford Vanquishers the opponent’s Ability with the same penalties. The Vanquisher will assimilate the essential abilities and powers of supernatural beings except for knowledge-dependant abilities.",
        elanCost: 10,
        elanRequirements: 100
      }
    ],

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
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Beryl",
    title: "Mother Nature",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.npCe38Ug8U0LczLc",
    description:
      "Life and nature are the aspects of creation that Rafael, one of the most independent Daughters of the Light, has chosen to incarnate. She is mainly devoted to people, animals, and plants that inhabit the natural world, but deep down she loves all living creatures equally. Even though she respects magic and the occult powers, she regards them as unnecessary in comparison to natural elements and their laws. The only mystical creatures she openly sympathizes with are those closely connected to nature, such as spirits of the woods or beings associated with vegetation. She openly opposes those who destroy nature or even worse pervert life. Above all, she dislikes necromantic entities and all they stand for; she considers them as a deviation. For centuries she has struggled with the idea of initiating active confrontation against them for fear of losing an important part of her conscience in the process. Many druids and cultures associated with forests worship her as the origin of all life and think of her as a primary aspect of creation. Those who protect nature and life achieve the highest level of synchronicity with her.",

    gifts: [
      {
        name: "Mother Nature Knowledge",
        description:
          "This gift will endow a special bonus to the Herbal Lore Secondary Ability equivalent to the character’s Elan level. For instance, anyone with 35 Elan points would add up a +35 bonus to the Ability.",
        elanCost: 5,
        elanRequirements: 10
      },
      {
        name: "Animal Knowledge",
        description:
          "A character with animal knowledge will develop an instinct to interact with all kinds of animals; this translates into a special bonus to the Animals Secondary Ability equivalent to his or her Elan level.",
        elanCost: 5,
        elanRequirements: 20
      },
      {
        name: "Healing",
        description:
          "Characters are able to heal their own, or somebody else’s, wounds by imposing their hands. Recovery rate is 5 LP per turn. The maximum amount of points per day they are allowed to heal is equal to their Elan level, and they can be distributed freely among several subjects. The gift will only work on living creatures. If applied on undead creatures, their essence will be consumed and healing will turn to damage. In this case, characters force any necromantic being they touch to pass an MR Check against twice their Elan level to avoid receiving damage equivalent to their Failure Level (multiplied by five for creatures with Damage Resistance). Point loss cannot be higher than points allowed for healing per day.",
        elanCost: 10,
        elanRequirements: 20
      },
      {
        name: "Fertility Cloak",
        description:
          "The character’s mere presence intensifies animal and vegetable growth and expansion in the area. Plants sprout with renewed strength until they reach their maximum splendor, while animals live strong and healthy. It also has some minor effects on human beings and similar races.",
        elanCost: 5,
        elanRequirements: 30
      },
      {
        name: "Eliminate Natural Venoms",
        description:
          "It enables characters to dispel the effects of natural venoms of Level equal to or lower than their Elan.",
        elanCost: 10,
        elanRequirements: 40
      },
      {
        name: "Totem",
        description:
          "The character establishes a communion with nature, attracting an animal spirit, or Totem, and forging an unbreakable bond. The GM must choose a natural animal which will appear to the character and accompany him from then on. In many ways, the Totem will act similarly to the Familiars described in Summoning, but characters with a Totem will not hold true power over it (although they can request its help voluntarily). The animal’s statistics correspond to its species, but its Intelligence is increased by 5 points. Whenever the character gains levels, so will the Totem, who may spend DP to acquire essential abilities or powers as a Spiritual Being with Gnosis 25 would. The Totem communicates telepathically with its master, and they can connect senses. If the Totem is destroyed, the master can resurrect it by sacrificing 10 Elan points.",
        elanCost: 20,
        elanRequirements: 50
      },
      {
        name: "Expanded Healing",
        description:
          "It works exactly as Healing, except the character’s daily LP maximum to heal is multiplied by ten. According to this, someone with 50 Elan points would be able to heal up to 500 points.",
        elanCost: 15,
        elanRequirements: 50
      },
      {
        name: "Mother Nature Eyes",
        description:
          "It allows the character to connect his or her senses to those of an animal, thus obtaining the ability to see and hear through it. This gift can be used once a day for every 10 Elan points.",
        elanCost: 10,
        elanRequirements: 60
      },
      {
        name: "Invoking Animals",
        description:
          "This gift grants the ability to invoke and command a group of animals. The number of animals who will respond depends on the species being summoned. Lower level, small size animals such as mice, cats, or snakes will respond in numbers equivalent to the character’s Elan. Larger animals such as bears or elephants will turn up in a one-to-five ratio. The gift is restricted to a single species chosen at the time it is awarded. Those closest to the character will respond to the call and hurry to him as much as they can. This gift works once a day.",
        elanCost: 10,
        elanRequirements: 60
      },
      {
        name: "Animal Transformation",
        description:
          "It enables a character to transform into a natural animal, acquiring all its characteristics and physical features. Characters may choose to keep their own abilities if they are higher than the beast’s. They could, for instance, transform into a wolf to take advantage of its senses and speed but keep their own combat abilities (not their damage). A new species can be chosen every 10 Elan points.",
        elanCost: 10,
        elanRequirements: 70
      },
      {
        name: "Increased Invocation",
        description:
          "The character may choose to invoke an additional race for every 5 Elan points he or she possesses, or to multiply by ten the number of the species originally chosen. For instance, if a character has Elan 85, he can invoke up to 170 bears.",
        elanCost: 10,
        elanRequirements: 80
      },
      {
        name: "Unlimited Healing",
        description:
          "At this level, the character has an unlimited amount of LP to heal with per day.",
        elanCost: 20,
        elanRequirements: 90
      },
      {
        name: "Nature Conscience",
        description:
          "Rafael’s chosen ones become the soul of the woods, forests, and jungles, and they are made aware of everything going on inside it. They can also perceive the feelings of all the plants and animals of the world and communicate with them independently of the distance between them.",
        elanCost: 10,
        elanRequirements: 100
      }
    ],

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
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Shajad",
    title: "The Shadow of Dreams",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.aBtq0pZr3y5A7PLx",
    description:
      "Erebus is one of the most enigmatic of Shajads; his actions and goals are always wrapped in mystery. He is the Lord of Shadows, and he has chosen to incarnate the occult, the supernatural and fear. Throughout history, many cultures have worshipped him as a god of magic, dreams, or wonders. He remains away from the other Shajads’ conflicts for power while concentrating on his own mysterious ends. He is whimsical and unpredictable, but he follows a strange set of self-imposed rules which he never breaks. He supports the followers of the occult and magic, as well as all those dreamers who are able to create wonders in their sleep. Surprisingly, his influence is as big in dreams as it is in nightmares, although he is much more interested in the latter. He has a peculiar fascination with fear, which he considers to be the most fundamental and primeval emotion of living beings. To him, this is the secret drive behind all acts in the world and even the originator of existence itself. He who is not afraid, and is not able to understand this, has no future and is doomed to disappear. Whoever masters fear will have creation at his feet. Those who employ supernatural forces and dabble in the occult will synchronize with him. He is also drawn to those who learn to master fear, as well as dreamers and poets.",

    gifts: [
      {
        name: "Supernatural Knowledge",
        description:
          "The character develops an innate knowledge about the supernatural world. This translates into a special bonus to the Occult Secondary Ability equivalent to the character’s Elan level.",
        elanCost: 5,
        elanRequirements: 10
      },
      {
        name: "Frightful Presence",
        description:
          "This gift will create a frightful aura around the character, allowing him or her to intimidate the others easily. The gift will bring a special bonus to the Intimidate Secondary Ability equivalent to their Elan level.",
        elanCost: 5,
        elanRequirements: 20
      },
      {
        name: "Path of Nightmares",
        description:
          "Characters are able to influence people and provoke nightmares. They have the power to inflict dark and terrible dreams on whoever is sleeping in the surroundings; however, they do not have a strict control on the content of the nightmares. The ability also permits them to cause the opposite effect; to prevent bad dreams.",
        elanCost: 5,
        elanRequirements: 30
      },
      {
        name: "Dream Whispers",
        description:
          "The gift allows the bearer to communicate with other people in their sleep by transmitting messages straight into the sleeper’s subconscious mind. It is meant to be directed to subjects the character is well acquainted with, but messages may be sent out with no specific addressee in the hopes of finding a receptive individual.",
        elanCost: 10,
        elanRequirements: 40
      },
      {
        name: "Natural Mystic",
        description:
          "Characters have become so acclimatized to the mystical world that they are able to cast some spells innately, without even knowing them or possessing the Gift. They will have the equivalent to twice their Elan level in Zeon points to cast any Free Access spells they choose. The maximum level of the spell is that of their Elan level (the maximum Zeon value, however, will depend on their Intelligence). In other words, a character with Elan 80 would have 160 Zeon points everyday to cast Free Access spells up to level 80.",
        elanCost: 15,
        elanRequirements: 50
      },
      {
        name: "Supernatural Influx",
        description:
          "The characters’ communion with Erebus enhances their supernatural abilities. In this way, they get 2 additional points to their Power or Willpower, depending on which Characteristic their abilities are mainly based on.",
        elanCost: 10,
        elanRequirements: 60
      },
      {
        name: "Dream Walker",
        description:
          "Characters are able to slip into people’s dreams and freely observe their oniric universe. They must establish contact with the dreamer first in order to achieve this, but once they do, they have free access to pay as many visits as they wish. In some occasions, the ability will also allow them to physically introduce themselves in The Wake, depending on how fragile the barrier between both worlds is.",
        elanCost: 10,
        elanRequirements: 60
      },
      {
        name: "Cardinal Fears",
        description:
          "There are three primeval fears beyond common terror or individual fears; they are the fundamental principles and the source of all the others. Even creatures immune to psychology are prey to these original panics, so they too have to roll checks against their effects. Umbra is the first one. It represents the essential terror we all feel of darkness and the unknown. Whenever it is called upon an individual, he must automatically pass an MR or PhR with a Difficulty of 140 or suffer the Blind and Terror States. Failing will result in a permanent phobia to darkness that will produce the Fear State. Passing three times will make an individual immune to Umbra. Maiyer, the second cardinal fear, represents all living creatures’ fear of suffering, pain, and blood. Characters are required to pass an MR or PsR with a Difficulty of 140 in order to avoid falling prey to the Terror State and experiencing terrible pain. From the moment they fail, they will have a phobia of being harmed in any possible way. Passing three times will make an individual immune to Maiyer. The third fear is Caedus, the fear of death. All those it is called upon will have to pass a PsR or MR Check with a Difficulty of 140 or face death by an unknown cause. Those who pass the Check twice will be considered immune to Caedus.",
        elanCost: 20,
        elanRequirements: 70
      },
      {
        name: "Supernatural Enhancement",
        description:
          "Any supernatural ability characters may employ will enhance their potential as a consequence of Erebus’ influence. Every spell, psychic discipline, or equivalent power that requires the opponent to roll for Resistance will have an increased Difficulty of 20 points. In other words, this gift will turn a spell with an MR of 80 into one of 100.",
        elanCost: 15,
        elanRequirements: 80
      },
      {
        name: "Nux, Absolute Fear",
        description:
          "Nux is the absolute fear, the inexplicable terror that nothing and no one can face. To confront it is to dissolve into nothingness, to vanish from reality without leaving a trace of ever having existed. Calling Nux upon an individual will automatically put him into a state of Fear for hours (no Resistance checks allowed) by the mere fact of glimpsing at the primeval fear. In addition to this, the victim will need to roll an MR or PsR with a Difficulty of 140 to avoid meeting face to face with the absolute terror and being utterly destroyed in body and soul. Nux can only be invoked upon the same person once.",
        elanCost: 10,
        elanRequirements: 90
      },
      {
        name: "Demiurge",
        description:
          "He or she who completely synchronizes with Erebus will become the Demiurge, Lord of Dreams and the Supernatural. Demiurge can use his power to oversee and control anyone’s dreams. He obtains the equivalent to Gnosis 45 in The Wake. In addition to this, he receives 5 Characteristic points which he can distribute as they wish among Intelligence, Power, and Willpower according to what his abilities demand.",
        elanCost: 10,
        elanRequirements: 100
      }
    ],

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
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Beryl",
    title: "Queen of Swords",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.BxwAZRSHS7KCzGG6",
    description:
      "Azrael is the warrior of the Light, the Beryl who represents the concepts of good and justice. This is a combative entity always ready to employ violence in the defense of the innocent and all the principles she personifies. She has a rather tumultuous story. At the beginning she was as peaceful as Mikael or Rafael and devoted to helping everyone equally. But little by little, she started to witness daily massacres of innocent victims who were not helped by any of the principles she stood for. All the pain, suffering, and death influenced her deeply in her decision to fight for all those who deserved protection and justice. Since then, her philosophy has moved into a more violent direction, its goal being to confront evil and darkness even if this means going against some of C’iel’s ideas (whom she professes true devotion for). She is the Beryl who faces the Shajads and the forces of darkness most directly. She combats their agents and followers and is at all-out war with them. In the very few occasions C’iel requires the use of violence, it is usually Azrael’s agents and paladins she relies on. She is the precept heroes incarnate, as well as all those who fight to defend those in need even at the expense of their own lives.",

    gifts: [
      {
        name: "Leader",
        description:
          "This gift will increase the bearer’s natural charisma with a special bonus to Leadership equivalent to his or her Elan level. For instance, anyone with 50 Elan points would gain a +50 bonus.",
        elanCost: 5,
        elanRequirements: 10
      },
      {
        name: "The Value of Heroes",
        description:
          "The character is armed with unusual courage and is thus able to remain undaunted where others would run. This grants him a special bonus to the Composure Secondary Ability equivalent to his Elan level.",
        elanCost: 5,
        elanRequirements: 20
      },
      {
        name: "Exaltation of the Spirit",
        description:
          "The character heightens the sense of justice of those usually in contact with him and leads them to an awareness of the importance of good conduct.",
        elanCost: 10,
        elanRequirements: 30
      },
      {
        name: "Sense of Justice",
        description:
          "It allows the bearer to sense an unjust or evil act being committed in the surroundings. It does not provide exact information on the perpetrator. The higher the Elan level, the more precise the ability and greater the coverage.",
        elanCost: 10,
        elanRequirements: 40
      },
      {
        name: "Sacred Spirit",
        description:
          "Characters’ closeness to Azrael affects their essence and makes them holy beings. From then on, their whole essence is inundated by a potent positive energy, and they obtain a status similar to that of a pure light elemental. A potent benign aura will appear as a result of supernatural detection performed on the individual with Sacred Spirit.",
        elanCost: 5,
        elanRequirements: 50
      },
      {
        name: "Power Aura",
        description:
          "The essence of the character is so powerful that it extends to the surrounding area, destroying all sorts of dark or evil creatures that may approach him or her. The coverage of the aura is equivalent to half the character’s Elan level in yards. Any negative-natured being in its radius of action will be automatically forced to pass an MR or PhR Check with a Difficulty equal to twice the bearer’s Elan level every five turns in order to avoid damage equivalent to half the Failure Level per turn.",
        elanCost: 10,
        elanRequirements: 60
      },
      {
        name: "Immunity",
        description:
          "This gift will grant some immunity from evil supernatural powers. Protected by the essence of Azrael, characters will ignore any Mystical or Psychic Ability that requires them to roll for Resistance Checks lower than their Elan level, plus 40. For instance, a character with Elan 60 would automatically pass all MR or PsR against a 100 Difficulty, while an 85 Elan character would be immune to controls up to 125.",
        elanCost: 15,
        elanRequirements: 60
      },
      {
        name: "Destroyer of Evil",
        description:
          "It will double any damage to a dark or naturally evil creature inflicted by the character. The ability will work for physical attacks, as well as spells and special powers that cause direct damage.",
        elanCost: 15,
        elanRequirements: 70
      },
      {
        name: "Blessed",
        description:
          "The character receives Azrael’s blessing whenever he or she attempts to destroy an evil creature or to perform a truly fair action. This translates into a +10 to any Check in connection with this purpose. If he or she is spending a permanent Elan point, the blessing will reach +30 for that turn.",
        elanCost: 20,
        elanRequirements: 70
      },
      {
        name: "Azrael Warrior",
        description:
          "Receiving this gift, characters achieve communion with Azrael – thus increasing their capabilities with an extra point in Strength and Dexterity.",
        elanCost: 10,
        elanRequirements: 80
      },
      {
        name: "Consecrating",
        description:
          "Characters are able to introduce a part of their sacred essence into a place or object, thus endowing it with their blessing. Consecrated weapons will carry 50% additional Base Damage against dark or evil-natured creatures, while consecrated places will be protected against their intrusion. Gaining access to a consecrated place requires them to pass an MR Check with a Difficulty of 140. Otherwise, an invisible barrier will stop them. Consecrating will last 1 hour for every 10 Elan points the character possesses. Consecrating permanently requires sacrificing 1 Elan point. The consecrated weapon bonus can not be accumulated with the bonus of the gift Destroyer of Evil.",
        elanCost: 15,
        elanRequirements: 90
      },
      {
        name: "Yihad",
        description:
          "Azrael’s chosen one becomes her right hand in the fight against evil and darkness, and she is empowered to declare holy war or Yihad to destroy or protect whatever is worth protecting or destroying. Yihad works as a call to all those with a high sense of justice and allows them to sense the reason why they are needed. Whoever responds to it will be immune to the effects of Fear and Terror and will also gain the capability of fighting consciously and without negative bonuses even in a state Between Life and Death. The outreach of the call lies at the hands of Azrael’s chosen one; it may affect the inhabitants of a certain town or be made to cover the entire world.",
        elanCost: 10,
        elanRequirements: 100
      }
    ],

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
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Shajad",
    title: "The Primeval Evil",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.zp1UzkJU7g2EcfgK",
    description:
      "Abbadon was originally the only Shajad unable to find a place for himself within the structure of reality. Indecisive, he ended up by absorbing in his essence all the minor negative feelings not related to his companions like disgust, envy, anger or pride. However, he did not feel attached to those emotions and to increase his importance he decided to personify the very principle of evil itself. As a form of mockery to all what the Beryls represent, his favorite incarnation is the traditional Christian devil; the figure of the fallen angel, which symbolizes all the sins of men and where he derives his name from. In time, he has come to feel exceptionally attached to this representation, to the point of considering it the main aspect of his being. He is constantly competing with the other Shajads for power and conspiring against Jedah and Meseguis to overtake their predominance. He is completely absorbed by the precept he has chosen and the role he plays, so he delights himself causing tragedies and spreading evil. His followers are usually satanists or worshippers of evil deities from different cultures. Those who synchronize best with him are low or deranged individuals whose lives are guided by evil.",

  gifts: [
    {
      name: "Dark Empathy",
      description:
        "It intensifies all dark feelings of those individuals the character is in contact with. The gift acts in the form of a strong aura of evil that brings out the worst in people.",
      elanCost: 10,
      elanRequirements: 10
    },
    {
      name: "Eyes of the Evil",
      description:
        "It enables characters to perceive the evil inside people. The higher the Elan level, the more accurate the ability.",
      elanCost: 5,
      elanRequirements: 20
    },
    {
      name: "Lord of Sins",
      description:
        "The character stirs the capital sin most deeply rooted inside individuals. The arrogant will be consumed with conceit and the gourmand will be overtaken by gluttony. The intensity and duration of the effect will depend on the failure level in the MR or PsR Check against twice the Elan level of the lord of sins. The activation of the ability requires that there be at least a couple of minutes talk or exchange of glances.",
      elanCost: 10,
      elanRequirements: 30
    },
    {
      name: "Dark Being",
      description:
        "Evil has taken so badly into the character’s soul that it contaminates him completely, slowly turning him into an evil creature. From then on, he achieves a status equivalent to that of a dark elemental, brimming with sheer evil. A potent evil aura will appear as a result of supernatural detection performed on the Dark Being.",
      elanCost: 5,
      elanRequirements: 40
    },
    {
      name: "Soul Corruptor",
      description:
        "Characters are able to influence people’s souls, perverting their spirits with evil. Even the purest of individuals will become twisted and evil if he should fail an MR Check against the soul corruptor’s Elan level plus 60. The effects will be temporary unless the victim fails for over 40 points. It is necessary to talk or look into someone’s eyes for a long period of time to corrupt them. Those passing the Check will be considered immune to the ability for as long as the corruptor maintains his or her Elan level.",
      elanCost: 15,
      elanRequirements: 50
    },
    {
      name: "Demonic Incarnation",
      description:
        "Evil transforms the very essence of the characters and turns them into true demons to all practical purposes. Demonic Incarnation grants characters twice their Elan points in DP, which allows them the chance of choosing any of the supernatural powers described in Chapter 26 like a Gnosis 25 creature would.",
      elanCost: 10,
      elanRequirements: 60
    },
    {
      name: "Destroyer of the Sacred",
      description:
        "It doubles all damage characters may inflict upon a creature of light or naturally good. The ability will operate on physical attacks and also spells and special powers that cause direct damage.",
      elanCost: 15,
      elanRequirements: 70
    },
    {
      name: "Gift of Evil",
      description:
        "Like an evil magnet, the bearer of the gift will attract dozens of creatures and people of a negative nature who will feel seduced by his or her presence. They will not be obliged to obey but will be fascinated enough by his or her empathy with evil as to be receptive to directions or suggestions.",
      elanCost: 10,
      elanRequirements: 80
    },
    {
      name: "Demonic Summoning",
      description:
        "This gift establishes a link between characters and the Abbadon demons, allowing to summon them for a variety of reasons. These are supernatural creatures of varied natures, like Lords of the Darkness at the service of Abbadon or other entities of a markedly evil nature. None of them are forced to obey, but they generally act guided by blood pacts, in exchange of souls or other items that may awaken their interest. Whoever calls on these beings may do so on their own behalf or simply to connect them with other interested parties. Characters will be entitled to one summoning per month with the option of sacrificing one Elan point per summoning if they should wish to use the ability further within the same period.",
      elanCost: 15,
      elanRequirements: 80
    },
    {
      name: "Soul Devourer",
      description:
        "Already transformed into a demonic entity, characters are granted the capability of feeding on the souls of evil individuals with which they greatly increase their own power. In order to devour a spirit, they must have some right to it, in the form of a pact or other kind of dominion. At the time of the individual’s death, the devourer claims his or her rights to the soul and feeds on it immediately or keeps it for later. The devourer will recover 20 LP or Zeon points for every point the consumed essence had in Power. If they are both already at the top, the devourer can increase his or her own characteristics at a rate of +1 out of five Power points of the consumed soul. This method will not allow characters to pass 15 in any of their attributes. Advantages acquired through this gift will vanish at a one point per day rate.",
      elanCost: 15,
      elanRequirements: 90
    },
    {
      name: "The Seed of the Devil",
      description:
        "Abbadon is the very essence of darkness, a primeval evil that even demons fear. This is why, once the character attains this level of synchronization, he is enabled to pass his seed unto others, thus perverting their souls until they are transformed into truly demonic entities. Anyone receiving the baptism of evil will become a Being Between Worlds or Spirit, with Gnosis between 20 to 30 and a maximum of 200 additional DP with which choose Essential Abilities and Powers of supernatural creatures. The chosen one decides the number of DP and Gnosis level he will endow. He may later increase them up to their full value if he does not grant them all at once. The seed of the devil may only be granted to really evil people or creatures who wish to obtain the power it entails.",
      elanCost: 10,
      elanRequirements: 100
    }
  ],

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
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Beryl",
    title: "The Perfect God",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.L4k3Mzx68LsfSugu",
    description:
      "Barakiel is a powerful Beryl who incarnates the concepts of order and perfection. She thinks of herself as the greatest and highest of all powers, outdone only by C’iel herself, the only entity she admires and worships. The goal of her philosophy is to lead all civilizations into a perfect order of absolute equality. She thinks the way to achieve this is by establishing strict laws that govern every aspect of human life. She abhors chaos and instability, and fosters the advancement of the exact sciences, like mathematics and mechanics. She has a tense relationship with her sisters; in her opinion all of them are weak and imperfect. Her attitude has caused several open conflicts with Mikael, whose privileged position next to their Master she covets. She is extremely strict with her chosen ones and followers and demands them to maintain a scrupulous order and never to make mistakes. Those who fail rarely receive a second chance to please her. She is vain and likes to feel adored in all of the identities she takes on as a deity of order, law and the sciences. She synchronizes with narcissistic people who are endowed with great abilities or powers and who above all conduct their lives in an orderly fashion. She also favors scientists and those who worship her in any of her faces.",

    gifts: [
      {
        name: "Aesthetics",
        description:
          "Whatever the character does is beautiful. This gift translates into a special bonus to the secondary ability Style, equivalent to the character’s Elan level.",
        elanCost: 5,
        elanRequirements: 10,
      },
      {
        name: "Attractive",
        description:
          "Bearers of the gift are capable of attracting attention towards themselves wherever they go and to raise the interest of all those they meet. Unfortunately, characters can not help being the center of attention at all times, which can be either a benefit or a disadvantage depending on the situation.",
        elanCost: 10,
        elanRequirements: 20,
      },
      {
        name: "Science Knowledge",
        description:
          "Thanks to Barakiel, characters have a vast knowledge of all scientific fields, this allows them to develop their abilities beyond common standards. The gift will endow a special bonus to the secondary ability Science equivalent to their Elan level; a character with 40 Elan points would get a +40 bonus to Checks.",
        elanCost: 10,
        elanRequirements: 30,
      },
      {
        name: "Sensing Imperfections",
        description:
          "It grants the possibility of strongly sensing imperfections in everyone’s behavior and body. The character will easily recognize personality traits in the others such as an unstable or nervous disposition, a disproportionate face feature, ill-health, etc.",
        elanCost: 10,
        elanRequirements: 40,
      },
      {
        name: "Sensing Order",
        description:
          "The gift allows characters to perceive the natural order of things as well as any chaotic or supernatural alteration in their surroundings or in the people around. The higher the Elan level, the greater the outreach of the ability.",
        elanCost: 5,
        elanRequirements: 40,
      },
      {
        name: "Perfect Beauty",
        description:
          "Once the gift is granted, the bearer’s physical appearance begins to change slowly until it reaches an unparalleled beauty. From then on he or she will add one point to Appearance each week until it gets to 10.",
        elanCost: 5,
        elanRequirements: 50,
      },
      {
        name: "Perfect Body",
        description:
          "The gift will operate changes on the bearer’s body until it is transformed into the ideal prototype of a member of his or her race in height, weight and proportions. In this way, characters can reach Inhuman difficulty in Checks and no longer be affected by Fatigue (equivalent to essential Ability Untiring). On top of this, they will not receive aging negative bonuses.",
        elanCost: 15,
        elanRequirements: 50,
      },
      {
        name: "Order Aura",
        description:
          "Characters with order aura are able to make chaos disappear gradually from their surroundings. Things fall into place and unusual or strange events become less frequent. The effect will also operate on people with Gnosis lower than 10 in contact with them; they acquire a greater sense of order and a new respect for laws.",
        elanCost: 10,
        elanRequirements: 60,
      },
      {
        name: "Barakiel’s Essence",
        description:
          "By the time the character obtains this gift his or her essence will be so close to Barakiel that all weaknesses or disadvantages will fade at a rate of one per month until they can be completely ignored. This includes negative bonuses of both natural and supernatural creatures.",
        elanCost: 20,
        elanRequirements: 70,
      },
      {
        name: "Unable to Err",
        description:
          "When characters reach this point, they are free from making mistakes on account of bad luck. They will no longer be capable of incurring into fumbles even with results of 01, 02, 03 (a result of 10 in Opposed Characteristic Checks does keep its negative bonus).",
        elanCost: 10,
        elanRequirements: 70,
      },
      {
        name: "Divinity in Body and Soul",
        description:
          "This gift will push characters one step beyond in their physical and spiritual evolution allowing them to reach an almost divine perfection in all aspects of their being. Once granted, the gift causes characteristics to rise at a rate of one point per month until they reach a natural base of ten, to which all modifiers or bonuses according to race are to be added (in this way, a Duk’zarist would have 11 in all of his attributes, thanks to the race bonuses). It does not affect those with an already higher value.",
        elanCost: 20,
        elanRequirements: 80,
      },
      {
        name: "Immortality",
        description:
          "Whoever reaches this synchronization level will immediately stop aging and become immune to any disease or natural venom. In many ways the character has become an immortal entity, keeping all of the abilities intact along the years until it dies of violent causes.",
        elanCost: 10,
        elanRequirements: 90,
      },
      {
        name: "Absolute Perfection",
        description:
          "Barakiel’s chosen one becomes a divine being whose actions are utterly perfect from the first one to the last. Once the definitive gift has been granted, the character will stop rolling dices, automatically add 100 to all ability or resistance rolls and get 1 in characteristic rolls. For instance, anyone with an attack ability of 180 points will always be considered to have a final result of 280. The 100 in a Resistance Check does not imply that the character will pass it automatically.",
        elanCost: 10,
        elanRequirements: 100,
      },
    ],

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
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Shajad",
    title: "Angel of Chaos",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.dSLczIbB7dHKJ6zd",
    description:
      "The Angel of Chaos is one of the strangest Lords of Darkness. His philosophy digresses from the principles of balance that both the Shajads and the Beryls have tried to sustain. He is an anarchic entity who, ironically, shares more doctrines with Uriel than anyone would care to admit. He is fickle and changes his mind according to his mood, yet he maintains a profound bond with Gaira, to whom he is completely faithful. Eriol incarnates chaos and luck, both good and bad. To him, existence is an infinite set of possibilities, and the true fascination lies in discovering which possibility will manifest. Everything is a game he calls 'The Law of Chance.' Those who synchronize with him are individuals who reject external rules, trust luck, and embrace chaos. Throughout history, Eriol and his agents have inspired cults devoted to luck, fortune, and chaos.",

    gifts: [
      {
        name: "Granting Misfortune and Disgrace",
        description:
          "Whoever has this gift is armed with the ability to influence other people’s luck (positively or negatively) in the short term. Intensity and duration can be molded according to Elan level.",
        elanCost: 10,
        elanRequirements: 10,
      },
      {
        name: "Altering the Law of Chance",
        description:
          "This ability exceptionally alters a character’s luck, increasing his chances of performing great feats or failing tasks tragically. Necessary results for obtaining an Open Roll will drop two degrees for every 20 Elan points and will extend in one for a Fumble. In this way, someone with 80 Elan points will increase his chances of getting an Open Roll or a Fumble by 8 and 4 respectively; he would get an open result starting from 82 and would Fumble with 7 or less (6 if he is a master). It is up to the character to decide whether to use this ability before rolling the dice.",
        elanCost: 5,
        elanRequirements: 20,
      },
      {
        name: "Sensing Chaos",
        description:
          "Individuals with this gift will supernaturally sense the alterations in reality taking place around them. This perception will allow them to notice the intensity of chaos in the surrounding area or, at times, even in people. The higher the Elan level, the wider the outreach of the ability.",
        elanCost: 5,
        elanRequirements: 30,
      },
      {
        name: "Stealing Luck",
        description:
          "Like a parasite, the character has the power to steal the fortune of other individuals, temporarily benefiting from the good luck of the others. Consequently, those deprived of their good luck will be unfortunate for a short period of time, until their natural luck comes back. Methodology varies from bearer to bearer. Some people only need to touch their victims; in other cases, a more complex process is required. Avoiding luck theft requires an individual to pass an MR Check with a Difficulty equal to twice the thief’s Elan level.",
        elanCost: 10,
        elanRequirements: 40,
      },
      {
        name: "Conjuring Up Providence",
        description:
          "This gift allows characters to alter the Law of Chance by repeating one of their rolls and using the second result. Once the ability is used, the character is forced to go with the second result, even if it is less favorable than the first one. Conjuring up providence may be used only once per game session for every 10 Elan points the player has. The same result can not be modified twice.",
        elanCost: 10,
        elanRequirements: 50,
      },
      {
        name: "Chaos Stigmata",
        description:
          "This gift provides characters with an amount of DP equal to twice their Elan level to be used in selecting any supernatural power described in Chapter 26 as if they had a Gnosis score of 25.",
        elanCost: 15,
        elanRequirements: 50,
      },
      {
        name: "Chaos Aura",
        description:
          "The character’s presence strongly influences his surroundings, gradually enhancing the existing chaos in the area. When a character stays in a place for a prolonged period of time, all kinds of unusual events begin to happen. The effects will also be felt by characters with a Gnosis level lower than 10; these individuals will become more chaotic and tend to ignore laws and rules.",
        elanCost: 10,
        elanRequirements: 60,
      },
      {
        name: "Altering Fate",
        description:
          "The ability enhances the powers in Conjuring up Providence, allowing another character or individual to repeat their rolls. Forcing a third party to reroll consumes two uses instead of one.",
        elanCost: 15,
        elanRequirements: 70,
      },
      {
        name: "Forcing Luck",
        description:
          "By using this ability, characters may force one of their rolls to be automatically Open, regardless of the result. The action must be declared prior to rolling the dice. There is a once-per-game-session limit for every 20 Elan points the character has. It can only be applied once to each Check.",
        elanCost: 15,
        elanRequirements: 80,
      },
      {
        name: "Truncating Fate",
        description:
          "Characters are in control of someone else’s fate to the point of predetermining them to fail or to make a staggering wrong decision in the short term. When this ability is employed, targets must pass an MR Check with a Difficulty equal to twice the Elan of the character using it. Failure turns their next roll into a Fumble, no matter how high the result is. In fact, the result they get on this roll will constitute their Fumble level. The power will remain active until the victim performs an action, or a full minute goes by. This gift can be applied to the same individual only once a day. Truncating Fate will only affect Actions Checks, not Resistance Checks.",
        elanCost: 15,
        elanRequirements: 90,
      },
      {
        name: "Lord of Chaos",
        description:
          "Eriol’s chosen ones will obtain absolute dominion over chaos, and be able to alter the normal course of events as they please. The gift allows them to control everything that goes on around them through luck and chance, however unusual or strange it may seem. They are not capable of modifying the surroundings by producing impossible events, but they are able to bring about any event chance may originate. For instance, they could easily cause an active volcano to erupt or have an old chair fall to pieces when someone sits down, but they would be unable to cause something naturally impossible to happen, like having someone fly. The lower the chance there is for something to happen the more time and effort the Lord of Chaos needs to put into making it come to pass. The gift does not operate on people’s psyche or control their actions.",
        elanCost: 10,
        elanRequirements: 100,
      },
    ],

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
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Beryl",
    title: "The Spirit of Emptiness",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.2mrkIj2B6VXr2HcF",
    description:
      "There is no Shajad or Beryl as inscrutable and unfeeling as The Spirit of Emptiness. Edamiel is separated from the world by her own choice, and unlike her sisters, she is not interested in becoming integrated with it. In the beginning, she tried to incarnate pleasure, the only feeling that brought her some satisfaction. Unfortunately, she soon realized not even that was enough to fill the void she carried inside, and she slowly drifted apart from reality until she disappeared. This is how she involuntarily came to represent abstract notions—like ignorance and nothingness—that neither Light nor Dark wanted to pick up. She believes true happiness is impossible because all feelings fade, and the only escape is to become one with emptiness. Her sisters are horrified by her philosophy, yet they tolerate her, unaware of the threat she poses. Occasionally she returns to her old incarnation, unleashing pleasure and desire, but often uses them to confuse and drag people toward nothingness. She has worshippers across cultures, often as a deity of desire and pleasure. Alarmingly, many synchronize with her—from hedonists to isolated individuals who reject the world.",

    gifts: [
      {
        name: "Desirable",
        description:
          "Something in the bearer of this gift is sexually enticing. Even without being attractive, characters will awaken the libido and desire of everyone around them. The ability will generally affect those of the opposite sex of the bearer more strongly.",
        elanCost: 5,
        elanRequirements: 10,
      },
      {
        name: "Pleasure Amplifier",
        description:
          "This gift allows the bearer to increase pleasure for those he is involved with in any way. Even mere lip contact with a gifted person will result in a much more pleasurable experience.",
        elanCost: 5,
        elanRequirements: 20,
      },
      {
        name: "The Voice of Pleasure",
        description:
          "The character’s voice will enrapture everyone listening to it for a prolonged period of time. They are allowed to add their Elan level to the Persuasion Secondary Ability when making Checks for trying to seduce an individual.",
        elanCost: 5,
        elanRequirements: 30,
      },
      {
        name: "Feeling Desire",
        description:
          "The character is extremely perceptive to people’s desires and passions. In a way, they are armed with a supernatural instinct to tune into those emotions and guess their cause.",
        elanCost: 10,
        elanRequirements: 40,
      },
      {
        name: "Psychological Immunity",
        description:
          "Characters lose a great part of their emotions and obtain full immunity to the effects of any psychological State. If they are being imbued by one supernaturally, their Elan level can be added to their Resistance Checks.",
        elanCost: 10,
        elanRequirements: 50,
      },
      {
        name: "Plucking Feelings Away",
        description:
          "The gift will grant the ability to eradicate a specific feeling from any given individual, wiping it completely away from his or her memory and spirit. The subject must be willing to be rid of the feeling and let the character tear it from within. Once destroyed, the emotion can not be felt again.",
        elanCost: 10,
        elanRequirements: 60,
      },
      {
        name: "Passivity",
        description:
          "Edamiel’s essence will suppress the will of all those who talk to the gifted character or look into his eyes. Anyone doing any of the two must pass an MR Check with a Difficulty equal to twice the gifted person’s Elan, or be numbed into complete incapacity, unable to execute any Active Action or even move. Passivity will last for as long as the bearer remains in the presence of the targets. A new Check will be awarded if the victims are the object of an attack or suffer any damage.",
        elanCost: 15,
        elanRequirements: 60,
      },
      {
        name: "Suppression",
        description:
          "Whoever is gifted with suppression is so close to the void that he or she can neutralize any action performed by those around them. The ability permits the bearer to cancel an Active Action executed by another individual during that turn, as well as any immediate event ensuing as a consequence of that action, if the target does not pass an MR with a Difficulty of 140. The allowed frequency is once a week for every 10 Elan points of the bearer.",
        elanCost: 15,
        elanRequirements: 70,
      },
      {
        name: "Transition to Emptiness",
        description:
          "Once this point is reached, characters are neither alive nor dead, but somewhere between existence and emptiness. Their body is really nothing but a shadow of their old identity that still ties them to the world and allows for interaction. In this way, even though they can still suffer physical damage normally, they are unable to die—no matter how much damage they suffer. Even if decapitated, they could still pick up their head and continue to act (with the corresponding negatives). They are also immune to any spell or mystical ability that would cause a direct effect of death. This does not include soul-destroying spells like Sever the Existence. The ability will not affect weapons or supernatural attacks with a Presence higher than 160, which will be able to exterminate the character completely.",
        elanCost: 15,
        elanRequirements: 80,
      },
      {
        name: "Vortex",
        description:
          "By becoming one with Edamiel, characters temporarily turn their bodies into a vortex of nothingness—a hole in existence itself that is capable of absorbing all matter, (physical or spiritual) around it. The effects of the gift are equivalent to the Level 90 spell Void from the Path of Destruction, and it is cast with its Zeonic base value. Unlike the spell, however, the character will not be swallowed into the vortex because his own body is the vortex. The ability may be used once a day for every 10 Elan points the character has. It will last for five turns.",
        elanCost: 25,
        elanRequirements: 90,
      },
      {
        name: "Arrival of Nothingness",
        description:
          "The arrival of the chosen one is preceded by a series of strange events that will affect anyone living in the area. Little by little, creativity will fade from the area, and all things will fall into oblivion. The first signs are barely recognizable—although still somber. Weeks before, people stop having dreams, artists lose their inspiration, and poets are no longer able to write in verse. Once the character finally arrives, the strength and intensity of events are heightened. As time goes by, everyone begins to slowly forget their lives until they can not remember their own names. Then, they lose their emotions until, in the end, they turn into empty shells without even a soul.",
        elanCost: 10,
        elanRequirements: 100,
      },
    ],

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
    elan: { current: 0, special: 0, bonus: 0, spent: 0, remaining: 0, final: 0 },
    type: "Shajad",
    title: "The Lament of Darkness",
    purchasedGifts: [],
    journalEntry: "Compendium.abf-system.abf-journals.JournalEntry.LsxDkxLwfpJZr9pz.JournalEntryPage.rlzuvRlKPwy4qtvo",
    description:
      "Meseguis, the Lady of Vengeance, is the only Shajad to have adopted a female identity. Exceptionally powerful, she holds great influence over Gaira alongside Jedah. Her essence contains some of the darkest and most contradictory emotions of humanity—hatred, pain, and sadness—yet she despises these feelings and seeks to spare others from them. She believes forgiveness is a temporary escape, not a cure, and that only vengeance can bring true peace. Those consumed by hatred synchronize with her only faintly, while those who believe in vengeance and help others pursue it achieve true communion. Meseguis is a melancholy entity, sometimes protective of the weak, other times capable of cruelty beyond comprehension.",

    gifts: [
      {
        name: "Serenity of Melancholy",
        description:
          "Through this gift, pain and sorrow inundate characters, allowing them to suffer stoically through situations that would make anyone lose their composure. This gift will endow characters with a special bonus to the Composure and Withstand Pain Secondary Abilities equivalent to their Elan level.",
        elanCost: 5,
        elanRequirements: 10,
      },
      {
        name: "The Path of Vengeance",
        description:
          "Guided by Meseguis’ hand, the gift will endow characters with a natural instinct to sense the best direction to take on their revenge. This is not to say they will know exactly what to do, but they will always have at least a clue on where to start looking.",
        elanCost: 5,
        elanRequirements: 20,
      },
      {
        name: "Eyes of Sorrow",
        description:
          "It allows characters to sense the sorrow and hatred in people. The higher a character’s Elan level, the more accurate his ability.",
        elanCost: 10,
        elanRequirements: 30,
      },
      {
        name: "Tears for Others",
        description:
          "It enables characters to influence others by making their sadness and sorrow more bearable, although not completely taking it away from them. The more suffering the characters eliminate, the more sorrow they will throw upon themselves.",
        elanCost: 5,
        elanRequirements: 30,
      },
      {
        name: "Transmitting Pain",
        description:
          "It allows characters to pass their own feelings of pain and sorrow on to others (in some cases those close to them). In order for this to happen, there should be physical contact between the two parties, and the targeted individual must have failed an MR or PsR Check with a Difficulty equal to twice the Elan of the character using the ability. If the victim fails the Resistance Check, he shall be immediately subject to the Pain State or be afflicted by huge sadness, the intensity of which depends on how deeply rooted and strong the original emotions are. The ability can be exercised only while the character or someone they care about is suffering.",
        elanCost: 10,
        elanRequirements: 40,
      },
      {
        name: "Spirit of Vengeance",
        description:
          "The nature of a character reaches out like an aura, influencing the people they live with for a prolonged period of time. These individuals shall become extremely vindictive and act accordingly given the slightest of opportunities. If the gift bearer’s Elan Level is higher than 60, they will be able to intensify a specific person’s thirst for revenge.",
        elanCost: 10,
        elanRequirements: 40,
      },
      {
        name: "The Voice of the Dead",
        description:
          "It enables characters to contact those who have died in sorrow and suffering. They will only be allowed to hear their begging or to engage in actual conversation depending on their Elan level. The ability will only work on spirits who have not received The Calling yet, or on spirits of the Wake.",
        elanCost: 10,
        elanRequirements: 50,
      },
      {
        name: "Dark Avenger",
        description: "Communion with Meseguis endows the character with the obscure blessing of the Lady of Tears. Nourished by the power of the darkness, he receives a special +10 bonus to every Action leading to revenge.",
        elanCost: 10,
        elanRequirements: 60,
      },
      {
        name: "The Voice of Pain",
        description:
          "The words of the character transmit suffering; he or she is able to inflict pain on those who listen. Listeners are compelled to pass an MR Check with a Difficulty equal to the bearer’s Elan Level, plus 60, to avoid being subject to the Pain State at the bearer’s command. If they fail by over 40 points, the applicable negative State is Extreme Pain. Passing the Check three times will afford them immunity.",
        elanCost: 15,
        elanRequirements: 60,
      },
      {
        name: "Beyond Death",
        description:
          "Not even death is an obstacle for revenge. Even if they die, characters will return from the great beyond within an undetermined period of time to fulfill their vendetta. Transformed into beings halfway between life and death, they shall automatically obtain 300 DP to acquire powers and essential abilities like a creature with a Gnosis score of 30 would. Unfortunately, the amount is limited; they will lose 1 Elan point each passing day. When their Elan points run out, or their revenge is finally achieved, they die.",
        elanCost: 10,
        elanRequirements: 70,
      },
      {
        name: "Dark Executor",
        description: "Being close to Meseguis, the gift will increase the Dark Avenger bonus up to +20.",
        elanCost: 10,
        elanRequirements: 80,
      },
      {
        name: "Dark Mirror",
        description:
          "Characters are able to materialize the very essence of revenge, reflecting on the souls of others their own sins and regrets to destroy them. Targets will automatically need to pass an MR or PsR Check with a Difficulty of 140. Effects will vary according to Failure Level. Failing by less than 40 will cause Paralysis while they are assaulted by visions of all those they have damaged. If a target’s Failure Level is higher than 40, he shall be devoured by his sins and lose his soul, which will be tortured for eternity. Depending on the target’s own feelings of guilt or fear, the Difficulty may be 20 points higher or lower. The ability can only be performed once per individual until a long time has elapsed.",
        elanCost: 15,
        elanRequirements: 90,
      },
      {
        name: "Communion with the Fallen Ones",
        description:
          "Their link to the spirits who claim revenge allows the chosen ones to commune with them, acquiring their knowledge, abilities, and powers in the process. Acting as a dark gate to the great beyond, when facing an opponent, they can invoke all those souls that deeply hate the antagonist and desire to get even. Through this act, characters are able to gain any power or ability these spirits had when they were alive, or they can bring them to life as lost souls at their service. Communion lasts for as long as the confrontation lasts, and the powers or spectral manifestations can only be used against the specific opponent during combat.",
        elanCost: 10,
        elanRequirements: 100,
      },
    ],

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
