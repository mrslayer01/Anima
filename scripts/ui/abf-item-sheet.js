export class AbfItemSheet extends foundry.appv1.sheets.ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["abf-system", "sheet", "item"],
      template: "systems/abf-system/templates/items/item-sheet.hbs",
      width: 540,
      height: 490,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "main"
        }
      ]
    });
  }

  getData(options) {
    const data = super.getData(options);
    data.system = foundry.utils.duplicate(this.item.system);
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
