export function InitializeNavMainPartials() {
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
  for (const p of navMainInventoryPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/actors/partials/nav/main/inventory/${p}.hbs`
    ]);
  }
}

const navMainPartials = ["character", "details", "inventory"];

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
  "titles",
  "contacts",
  "notes"
];

//Inventory Section
const navMainInventoryPartials = ["currency", "items"];
