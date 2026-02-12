import {
  DEFAULT_ARMOR_DATA,
  DEFAULT_ITEM_DATA,
  DEFAULT_WEAPON_DATA
} from "../config/default-item-data.js";

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

    if (this.type === "armor") {
      foundry.utils.mergeObject(this.system, DEFAULT_ARMOR_DATA, {
        insertKeys: true,
        overwrite: false
      });
    }
  }

  prepareDerivedData() {
    super.prepareDerivedData();
  }
}
