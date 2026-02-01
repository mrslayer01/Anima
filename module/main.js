import { AbfActor } from "./actor/abf-actor.js";
import { AbfActorSheet } from "./actor/abf-actor-sheet.js";
import { AbfItem } from "./item/abf-item.js";
import { AbfItemSheet } from "./item/abf-item-sheet.js";

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

  CONFIG.Actor.documentClass = AbfActor;
  CONFIG.Item.documentClass = AbfItem;

  //definie partials
  const navMainCharacterPartials = [
    "aspects",
    "background",
    "character",
    "classes",
    "dp",
    "experience",
    "presence"
  ];
    const navMainSecondariesPartials = [
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
    "modifiers",
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

  for (const p of navMainCharacterPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/main/character/${p}.hbs`
    ]);
  }

    for (const p of navMainSecondariesPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/main/secondaries/${p}.hbs`
    ]);
  }

  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet("abf-system", AbfActorSheet, { makeDefault: true });

  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet("abf-system", AbfItemSheet, { makeDefault: true });
});