export const DEFAULT_ITEM_DATA = {
  name: "",
  cost: { value: 0, type: "copper" },
  weight: 0,
  availability: "common",
  quality: { value: "decent", spcialBonus: 0 },
  decription: ""
};

export const DEFAULT_WEAPON_DATA = {
  attackBonus: 0,
  blockBonus: 0,
  speed: { base: 0, bonus: 0, final: 0 },
  damage: { base: 0, bonus: 0, final: 0 },
  presence: { base: 0, bonus: 0, final: 0 },
  breakage: { base: 0, bonus: 0, final: 0 },
  fortitude: { base: 0, bonus: 0, final: 0 },
  armorReduction: 0,

  specialValue: 0,

  requiredStrength: "",
  primaryAtkType: "cut",
  secondaryAtkType: "none",
  weaponType: "shortArm",
  secondaryWeaponType: "none",

  size: "M",
  handling: "oneHanded",
  reach: 0,
  fumble: 0,
  critType: "cut",
  critMod: 0,

  equipped: false,
  modifier: { name: "known", value: 0 },

  special: []
};

export const DEFAULT_ARMOR_DATA = {
  armorType: {
    cut: { base: 0, bonus: 0, final: 0 },
    imp: { base: 0, bonus: 0, final: 0 },
    thr: { base: 0, bonus: 0, final: 0 },
    hea: { base: 0, bonus: 0, final: 0 },
    ele: { base: 0, bonus: 0, final: 0 },
    col: { base: 0, bonus: 0, final: 0 },
    ene: { base: 0, bonus: 0, final: 0 }
  },
  fortitude: { base: 0, bonus: 0, final: 0 }, // Fortitude
  presence: { base: 0, bonus: 0, final: 0 }, // Presence
  wearArmorReq: { base: 0, bonus: 0, final: 0 }, // Armor Requirement, penalty is the difference between the req and wearArmor skills
  moveRestriction: { base: 0, bonus: 0, final: 0 }, // Movement Restriction
  naturalPenalty: { base: 0, bonus: 0, final: 0 },
  isEnchanted: false,
  armorClass: "soft", // "soft" or "hard"
  location: "Breastplate", // Breastplate, Shirt, Complete, or helmet
  equipped: false,
  specialValue: 0
};
