import {
  DEFAULT_AMMO_DATA,
  DEFAULT_ARMOR_DATA,
  DEFAULT_ITEM_DATA,
  DEFAULT_WEAPON_DATA
} from "../config/default-item-data.js";

export class AbfItem extends Item {
  prepareBaseData() {
    super.prepareBaseData();

    // Only apply if the item has no custom icon
    if (!this.img || this.img === "icons/svg/item-bag.svg") {
      if (this.type === "weapon") {
        this.updateSource({ img: "icons/svg/sword.svg" });
      }
      if (this.type === "armor") {
        this.updateSource({ img: "icons/svg/shield.svg" });
      }
    }
  }

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

    if (this.type === "ammo") {
      foundry.utils.mergeObject(this.system, DEFAULT_AMMO_DATA, {
        insertKeys: true,
        overwrite: false
      });
    }
  }

  prepareDerivedData() {
    super.prepareDerivedData();
  }
}
