import { registerItemSheetListeners } from "./listeners.js";

export class AbfItemSheet extends foundry.appv1.sheets.ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["abf-system", "sheet", "item"],
      template: "systems/abf-system/templates/items/item-sheet.hbs",
      width: 650,
      height: 650,
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

    const isCurrency = name.startsWith("system.cost.value");

    if (name.startsWith("system.cost.value") && value < 0) {
      //currency can't go negative
      value = 0;
      input.value = 0;
    }

    await this.item.update({ [name]: value });
  }

  activateListeners(html) {
    super.activateListeners(html);

    registerItemSheetListeners(this, html);
  }
}
