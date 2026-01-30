export class AbfItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["abf-system", "sheet", "item"],
      template: "systems/abf-system/templates/items/item-sheet.hbs",
      width: 500,
      height: 400
    });
  }

  getData(options) {
    const data = super.getData(options);
    data.system = this.item.system;
    return data;
  }
}