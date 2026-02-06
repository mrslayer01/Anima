import { registerSheetListeners } from "./listeners.js";

export class AbfItemSheet extends foundry.appv1.sheets.ItemSheet {
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
    data.system = foundry.utils.duplicate(this.item.system);
    return data;
  }

  async _onChangeInput(event) {
    const input = event.target;
    const name = input.name;

    if (input.type === "text") {
      const value = input.value;
      await this.item.update({ [name]: value });
      return;
    }

    if (input.tagName === "SELECT") return;

    let value = Number(input.value);

    const isCurrency = name.startsWith("system.cost.");

    if (isCurrency) {
      //Currency can't go negative
      if (name.endsWith(".copper") && value < 0) {
        value = 0;
        input.value = 0;
      }
      if (name.endsWith(".silver") && value < 0) {
        value = 0;
        input.value = 0;
      }
      if (name.endsWith(".gold") && value < 0) {
        value = 0;
        input.value = 0;
      }
    }

    await this.item.update({ [name]: value });
  }

  activateListeners(html) {
  super.activateListeners(html);

  registerSheetListeners(this, html);

  }
}