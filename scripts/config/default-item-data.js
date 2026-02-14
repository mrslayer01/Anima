export const DEFAULT_ITEM_DATA = {
  name: "",
  cost: { value: 0, type: "copper" },
  weight: 0,
  availability: "common",
  quality: { value: "decent", spcialBonus: 0 },
  decription: ""
};

export const DEFAULT_WEAPON_DATA = {
  damage: 0,
  finalDamage: 0,
  speed: 0,
  requiredStrength: "",
  primaryAtkType: "cut",
  secondaryAtckType: "none",
  weaponType: "none",

  size: "M",
  handling: "oneHanded",
  reach: 0,
  initMod: 0,
  blockMod: 0,
  fumble: 0,
  critType: "cut",
  critMod: 0,

  fortitude: 0,
  breakage: 0,
  presence: 0,
  equipped: false,
  modifier: { name: "known", value: 0 },

  special: []
};

export const DEFAULT_ARMOR_DATA = {
  armorType: {
    cut: 0,
    imp: 0,
    thr: 0,
    hea: 0,
    ele: 0,
    col: 0,
    ene: 0
  },
  fortitude: 0, // Fortitude
  presence: 0, // Presence
  wearArmorReq: 0, // Armor Requirement, penalty is the difference between the req and wearArmor skills
  moveRestriction: 0, // Movement Restriction
  naturalPenalty: 0, // Natural Penalty
  isEnchanted: false,
  armorClass: "soft", // "soft" or "hard"
  location: "Breastplate", // Breastplate, Shirt, Complete, or helmet
  equipped: false
};
