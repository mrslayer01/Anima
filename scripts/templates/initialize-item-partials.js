const commonPartials = ["common", "description"];
const partials = ["weapon", "armor"];

const weaponPartials = ["weapon-finals"];
const armorPartials = ["armor-finals"];

export function InitalizeAllItemPartials() {
  for (const p of commonPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/items/partials/common/${p}.hbs`
    ]);
  }

  for (const p of partials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/items/partials/${p}.hbs`
    ]);
  }
  for (const p of weaponPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/items/partials/weapon/${p}.hbs`
    ]);
  }
  for (const p of armorPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/items/partials/armor/${p}.hbs`
    ]);
  }
}
