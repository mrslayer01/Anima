import { calculateDerivedValues } from "./derived/derived-claculations.js";
import { DEFAULT_ITEM_DATA } from "./defaults/default-item-data.js";

export class AbfItem extends Item {
  prepareData() {
    super.prepareData();
    foundry.utils.mergeObject(this.system, DEFAULT_ITEM_DATA, {
      insertKeys: true,
      overwrite: false
    });

    // if (this.type === "weapon") {
    //   foundry.utils.mergeObject(this.system, DEFAULT_WEAPON_DATA, {
    //     insertKeys: true,
    //     overwrite: false
    //   });
    // }

    // if (this.type === "commonGood") {
    //   foundry.utils.mergeObject(this.system, DEFAULT_COMMON_GOOD_DATA, {
    //     insertKeys: true,
    //     overwrite: false
    //   });
    // }

  }

  prepareDerivedData() {
    super.prepareDerivedData();

    calculateDerivedValues(this.system, this);
  }
}