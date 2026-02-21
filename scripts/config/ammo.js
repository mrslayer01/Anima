export function createAmmo(ammoInput) {
  const {
    name = "",
    damage = 0,
    presence = 0,
    fortitude = 0,
    breakage = 0,
    armorReduction = 0,
    attackType = "",
    equipped = false,
    special = "",
    description = ""
  } = ammoInput;

  return {
    name,
    damage,
    presence,
    fortitude,
    breakage,
    armorReduction,
    attackType,
    equipped,
    special,
    description
  };
}

export const ABF_AMMO = {
  pistolShot: createAmmo({
    name: "Pistol Shot",
    damage: 60,
    attackType: "thr",
    special: "Munition for Arquebus",
    fortitude: 11,
    breakage: 5,
    presence: 15,
    description: "Standard pistol shot ammunition."
  }),
  blowgunDarts: createAmmo({
    name: "Blowgun Darts",
    damage: 5,
    attackType: "thr",
    special: "Munition",
    fortitude: 2,
    breakage: -4,
    presence: 15,
    description: "Small darts used with a blowgun."
  }),
  flightArrow: createAmmo({
    name: "Flight Arrow",
    damage: 30,
    attackType: "thr",
    special: "Munition for bows; Special",
    fortitude: 3,
    breakage: 0,
    presence: 20,
    description: "A very light arrow that adds about 60 feet to the maximum range of the bow."
  }),
  standardArrow: createAmmo({
    name: "Standard Arrow",
    damage: 40,
    attackType: "thr",
    special: "Munition for bows",
    fortitude: 4,
    breakage: 1,
    presence: 20,
    description: "A standard arrow used with most bows."
  }),
  armorPiercingArrow: createAmmo({
    name: "Armor-piercing Arrow",
    damage: 30,
    attackType: "thr",
    special: "Munition for bows; Special",
    fortitude: 3,
    breakage: 0,
    presence: 20,
    description: "A specially designed arrow intended to pierce armor."
  }),
  crossbowBolt: createAmmo({
    name: "Crossbow Bolt",
    damage: 40,
    attackType: "thr",
    special: "Munition",
    fortitude: 3,
    breakage: 0,
    presence: 15,
    description: "A standard bolt for crossbows."
  }),
  heavyCrossbowBolt: createAmmo({
    name: "Heavy Crossbow Bolt",
    damage: 60,
    attackType: "thr",
    special: "Munition for Heavy crossbow",
    fortitude: 4,
    breakage: 1,
    presence: 15,
    description: "A heavy bolt designed for use with heavy crossbows."
  }),
  lightCrossbowBolt: createAmmo({
    name: "Light Crossbow Bolt",
    damage: 30,
    attackType: "thr",
    special: "Munition for Light crossbow",
    fortitude: 2,
    breakage: -1,
    presence: 15,
    description: "A lighter bolt used with light crossbows."
  }),
  slingStones: createAmmo({
    name: "Sling Stones",
    damage: 15,
    attackType: "imp",
    special: "Munition for slings",
    fortitude: 7,
    breakage: 2,
    presence: 10,
    description: "Smooth stones used as ammunition for slings."
  })
};
