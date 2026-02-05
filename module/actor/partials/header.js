export function header() {
  const headerPartials = [
    "header",
    "portrait",
    "characteristics",
    "resistances",
    "life-fatigue-turn",
    "regeneration",
    "final-armor",
    "header-top",
    "movement",
  ];

  //register partials
  for (const p of headerPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/header/${p}.hbs`,
    ]);
  }
}
