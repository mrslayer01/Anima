export function createModule(modInput) {
  const {
    name = "",
    type = "",
    effects = "",
    cost = 0,
    description = "",
    weaponTypes = { type: "" }
  } = modInput;

  return {
    name,
    type,
    effects,
    cost,
    description,
    weaponTypes
  };
}

export const ABF_MODULES = {
  similarWeapon: createModule({
    name: "Similar Weapon",
    type: "General Weapon",
    effects:
      "Gives the character the ability to use an additional weapon of the same class as one the character already knows.",
    cost: 10,
    description: "The character knows how to use two similar weapons."
  }),

  mixedClassWeapon: createModule({
    name: "Mixed-Class Weapon",
    type: "General Weapon",
    effects:
      "Allows the character to use an additional weapon that shares at least one class with a weapon they already know.",
    cost: 15,
    description: "The character is trained in two weapons that share at least one class."
  }),

  differentTypeWeapon: createModule({
    name: "Different Type / Unarmed",
    type: "General Weapon",
    effects: "Allows the character to use a weapon of a class with which they are not familiar.",
    cost: 20,
    description: "The character can use two very different weapons, including unfamiliar classes."
  }),

  wholeClassWeapons: createModule({
    name: "Whole-Class Weapons",
    type: "General Weapon",
    effects:
      "Allows the character to use any weapon of a chosen class without applying penalties to Combat Abilities.",
    cost: 50,
    description:
      "The character masters all weapons of a chosen class (pure or mixed). For example, mastery of Swords includes all swords but not mixed-class weapons like the Bastard Sword."
  }),

  projectileWeapons: createModule({
    name: "Projectile Weapons",
    type: "General Weapon",
    effects: "Allows the character to use any projectile weapon using the same Attack Ability.",
    cost: 50,
    description:
      "The character is trained in all projectile weapons, using a unified Attack Ability."
  }),

  throwing: createModule({
    name: "Throwing",
    type: "General Weapon",
    effects: "Allows the character to throw any object or weapon using the same Attack Ability.",
    cost: 50,
    description:
      "The character gains skill at throwing all sorts of items. This does not grant the ability to use weapons with the Throwable rule — only to throw them effectively."
  }),

  improvisedWeapons: createModule({
    name: "Improvised Weapons",
    type: "General Weapon",
    effects: "Allows the character to use any type of object as an improvised weapon.",
    cost: 50,
    description:
      "The character is adept at turning everyday objects into effective improvised weapons."
  })
};
