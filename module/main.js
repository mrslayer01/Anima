import { AbfActor } from "./actor/abf-actor.js";
import { AbfActorSheet } from "./actor/abf-actor-sheet.js";
import { AbfItem } from "./item/abf-item.js";
import { AbfItemSheet } from "./item/abf-item-sheet.js";
import { ABF_CLASSES } from "./config/classes.js";
import { ABF_ADVANTAGES } from "./config/advantages.js";
import { ABF_DISADVANTAGES } from "./config/disadvantages.js";

Hooks.once("init", function () {
  console.log("ABF | Initializing Anima Beyond Fantasy system");
  CONFIG.debug.compatibility = false;
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



  CONFIG.Actor.documentClass = AbfActor;
  CONFIG.Item.documentClass = AbfItem;

  //definie partials
  //Main Tab in Nav
  const navMainPartials = [
    "character",
    "details",
    "inventory"
  ];

  //Character Section
  const navMainCharacterPartials = [
    "aspects",
    "background",
    "classes",
    "dp",
    "experience",
    "presence"
  ];

  //Details Section
  const navMainDetailsPartials = [
    "advantages",
    "disadvantages",
    "elan",
    "languages",
    "titles"
  ];

  // //Inventory Section
  // const navMainInventoryPartials = [
  // ];

  const navSecondariesPartials = [
    "athletics",
    "secondaries",
    "vigor",
    "perception",
    "intellectual",
    "social",
    "subterfuge",
    "creative"
  ];

  const headerPartials = [
    "header",
    "portrait",
    "characteristics",
    "resistances",
    "life-fatigue-turn",
    "regeneration",
    "final-armor",
    "header-top",
    "movement"
  ];

  //register partials
  for (const p of headerPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/header/${p}.hbs`
    ]);
  }

  //nav
  
  //load the main nav partials
  for (const p of navMainPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/main/${p}.hbs`
    ]);
  }
  
  //nav main/character partials
  for (const p of navMainCharacterPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/main/character/${p}.hbs`
    ]);
  }

  //nav main/details partials
  for (const p of navMainDetailsPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/main/details/${p}.hbs`
    ]);
  }

  //nav main/inventory partials
  // for (const p of navMainInventoryPartials) {
  //   foundry.applications.handlebars.loadTemplates([
  //     `systems/abf-system/templates/actors/partials/nav/main/inventory/${p}.hbs`
  //   ]);
  // }

  //nav secondaries
  for (const p of navSecondariesPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/secondaries/${p}.hbs`
    ]);
  }

  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet("abf-system", AbfActorSheet, { makeDefault: true });

  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet("abf-system", AbfItemSheet, { makeDefault: true });
});