const commonPartials = ["common", "description"];
const partials = ["weapon", "armor", "ammo", "spell", "technique"];

const weaponPartials = [
  "weapon-finals",
  "weapon-ammo",
  "weapon-melee",
  "weapon-projectile",
  "weapon-shield",
  "weapon-throwing"
];
const armorPartials = ["armor-finals"];

const spellPartials = ["spell-header"];

const techniquePartials = ["technique-header"];

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
  for (const p of spellPartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/items/partials/spell/${p}.hbs`
    ]);
  }
  for (const p of techniquePartials) {
    foundry.applications.handlebars.loadTemplates([
      `systems/abf-system/templates/items/partials/technique/${p}.hbs`
    ]);
  }
}
