import { ABF_CLASSES } from "../config/classes.js";
import { ABF_ADVANTAGES } from "../config/advantages.js";
import { ABF_DISADVANTAGES } from "../config/disadvantages.js";
import {
  ARMOR_SECTIONS,
  DAMAGE_TYPES,
  SECONDARY_DAMAGE_TYPES,
  SECONDARY_WEAPON_TYPES,
  WEAPON_TYPES
} from "../utils/lookup.js";
import { ABF_MODULES } from "../config/modules.js";

export function loadAllActorHandlerbarsHelpers() {
  Handlebars.registerHelper("ifEquals", function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
  });
  Handlebars.registerHelper("percent", function (current, max) {
    if (!max || max === 0) return 0;
    return Math.min(100, Math.floor((current / max) * 100));
  });
  Handlebars.registerHelper("clsName", function (key) {
    return ABF_CLASSES[key].name;
  });
  Handlebars.registerHelper("advName", function (key) {
    return ABF_ADVANTAGES[key].name;
  });
  Handlebars.registerHelper("disadvName", function (key) {
    return ABF_DISADVANTAGES[key].name;
  });
  Handlebars.registerHelper("moduleName", function (key) {
    return ABF_MODULES[key].name;
  });
  Handlebars.registerHelper("armorSection", function () {
    return ARMOR_SECTIONS;
  });
  Handlebars.registerHelper("weaponTypes", function () {
    return WEAPON_TYPES;
  });
  Handlebars.registerHelper("secondaryWeaponTypes", function () {
    return SECONDARY_WEAPON_TYPES;
  });
  Handlebars.registerHelper("weaponDamageType", function () {
    return DAMAGE_TYPES;
  });
  Handlebars.registerHelper("secondaryWeaponDamageType", function () {
    return SECONDARY_DAMAGE_TYPES;
  });
  Handlebars.registerHelper("humanize", function (str) {
    if (!str) return "";
    return str
      .replace(/([A-Z])/g, " $1") // insert spaces before capitals
      .replace(/^./, (c) => c.toUpperCase()); // capitalize first letter
  });

  Handlebars.registerHelper("expandedIcon", function (set, category, ability) {
    if (!set || !set.has) {
      return '<i class="fas fa-plus-circle"></i>'; // default collapsed
    }

    const key = `${category}.${ability}`;
    return set.has(key)
      ? '<i class="fas fa-minus-circle"></i>'
      : '<i class="fas fa-plus-circle"></i>';
  });

  Handlebars.registerHelper("in", function (value, ...list) {
    list.pop();
    return list.includes(value);
  });

  //#region Secondaries
  // Athletics
  Handlebars.registerHelper("orderAthletics", () => [
    "Acrobatics",
    "Athleticism",
    "Climb",
    "Jump",
    "Ride",
    "Swim"
  ]);

  // Vigor
  Handlebars.registerHelper("orderVigor", () => ["Composure", "FeatsOfStrength", "WithstandPain"]);

  // Perception
  Handlebars.registerHelper("orderPerception", () => ["Notice", "Search", "Track"]);

  // Intellectual
  Handlebars.registerHelper("orderIntellectual", () => [
    "Animals",
    "Appraisal",
    "HerbalLore",
    "History",
    "MagicAppraisal",
    "Medicine",
    "Memorize",
    "Navigation",
    "Occult",
    "Sciences"
  ]);

  // Social
  Handlebars.registerHelper("orderSocial", () => [
    "Intimidate",
    "Leadership",
    "Persuasion",
    "Style"
  ]);

  // Subterfuge
  Handlebars.registerHelper("orderSubterfuge", () => [
    "Disguise",
    "Hide",
    "LockPicking",
    "Poisons",
    "Theft",
    "TrapLore",
    "Stealth"
  ]);

  // Creative
  Handlebars.registerHelper("orderCreative", () => [
    "Art",
    "Dance",
    "Forging",
    "Music",
    "SleightOfHand"
  ]);
  //#endregion

  //#region Primaries
  Handlebars.registerHelper("orderCombat", () => [
    "Attack",
    "Block",
    "Dodge",
    "WearArmor",
    "Ki",
    "KiAccumulation"
  ]);

  Handlebars.registerHelper("orderSupernatural", () => [
    "MagicProjection",
    "Summon",
    "Control",
    "Bind",
    "Banish",
    "Zeon",
    "MagicAccumulation",
    "MAMultiples"
  ]);

  Handlebars.registerHelper("orderPsychic", () => ["PsychicProjection", "PsychicPoints"]);
  //#endregion

  Handlebars.registerHelper("armorTooltip", function (armor, type, sections) {
    if (!armor || !type || !sections) return "";

    return sections.map((s) => `${s}: ${armor[s]?.[type] ?? 0}`).join(", ");
  });

  Handlebars.registerHelper("lookupArmor", function (total, type) {
    return total?.[type] ?? 0;
  });
}
