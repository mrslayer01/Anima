import { calculateDerivedValues } from "./derived/derived-claculations.js";
import { DEFAULT_ITEM_DATA } from "./config/definitions/default-item-data.js";
import { DEFAULT_WEAPON_DATA } from "./config/definitions/weapon-item-data.js";

export class AbfItem extends Item {
  prepareData() {
    super.prepareData();
    foundry.utils.mergeObject(this.system, DEFAULT_ITEM_DATA, {
      insertKeys: true,
      overwrite: false
    });

    if (this.type === "weapon") {
      foundry.utils.mergeObject(this.system, DEFAULT_WEAPON_DATA, {
        insertKeys: true,
        overwrite: false
      });
    }
  }

  prepareDerivedData() {
    super.prepareDerivedData();
  }
}
