import { ABF_CLASSES } from "../config/classes.js";
import { ABF_ADVANTAGES } from "../config/advantages.js";
import { ABF_DISADVANTAGES } from "../config/disadvantages.js";

export function loadAllHandlerbarsHelpers () {
      Handlebars.registerHelper("ifEquals", function(a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
  });
  Handlebars.registerHelper("percent", function (current, max) {
  if (!max || max === 0) return 0;
  return Math.min(100, Math.floor((current / max) * 100));
  });
  Handlebars.registerHelper("clsName", function(key) {
  return ABF_CLASSES[key].name;
  });
  Handlebars.registerHelper("advName", function(key) {
  return ABF_ADVANTAGES[key].name;
  });
  Handlebars.registerHelper("disadvName", function(key) {
  return ABF_DISADVANTAGES[key].name;
  });
  Handlebars.registerHelper("humanize", function (str) {
  if (!str) return "";
  return str
    .replace(/([A-Z])/g, " $1")   // insert spaces before capitals
    .replace(/^./, c => c.toUpperCase()); // capitalize first letter
  });

  //#region Secondaries
  // Athletics
  Handlebars.registerHelper("orderAthletics", () => [
    "Acrobatics",
    "Athletics",
    "Climb",
    "Jump",
    "Ride",
    "Swim"
  ]);

  // Vigor
  Handlebars.registerHelper("orderVigor", () => [
    "Composure",
    "FeatsOfStrength",
    "WithstandPain"
  ]);

  // Perception
  Handlebars.registerHelper("orderPerception", () => [
    "Notice",
    "Search",
    "Track"
  ]);

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
}