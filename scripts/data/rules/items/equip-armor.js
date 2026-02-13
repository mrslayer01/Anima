import { toNum } from "../../../utils/numbers.js";
import { BaseRule } from "../base-rule.js";

export class EquipArmorRule extends BaseRule {
  Derived(system) {
    // if (system?.equipped) {
    //   console.log("New Item Equipped.");
    //   //Add the item's values to their respective location values
    //   const armor = system.items.armor.find((i) => i._id === name._id);
    //   const armorTypeValues = armor.system.armorType;
    //   const sectionToAddTo = armor.system.location;
    //   for (const [name, value] of Object.entries(armorTypeValues)) {
    //     system.armor[sectionToAddTo][name] += value;
    //   }
    // } else if (system?.equipped) {
    //   console.log("Item Unequipped.");
    //   //Remove the item's values to their respective location values
    //   const armor = system.items.armor.find((i) => i._id === name._id);
    //   const armorTypeValues = armor.system.armorType;
    //   const sectionToRemoveFrom = armor.system.location;
    //   for (const [name, value] of Object.entries(armorTypeValues)) {
    //     system.armor[sectionToRemoveFrom][name] -= value;
    //   }
    // }
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    console.log(updateData, oldSystem);
    let newEquip = false;
    let armorId = "";
    for (const [name, object] of Object.entries(updateData)) {
      if (name !== "system") {
        // armorId = object._id;
        //console.log(object._id);
        armorId = object._id;
      } else {
        //newEquip = object.system.equipped;
        //console.log(object.equipped);
        newEquip = object.equipped;
      }
    }

    console.log(newEquip, armorId);

    //const oldArmorEquipped = oldSystem.items.armor.find((i) => i._id === armorId);
    //if (oldArmorEquipped === undefined) changed;

    console.log(newEquip, oldSystem);

    // for (const [name, object] of Object.entries(updateData)) {
    //   const newEquip = object.equipped;
    //   console.log(name, object);
    //   if (newEquip === undefined) continue;

    //   const armorChangedId = object._id;

    //   // Check current Armor, if any.
    //   const oldArmorEquipped = oldSystem.items.armor.find((i) => i._id === armorChangedId).equipped;
    //   if (oldArmorEquipped === undefined) continue;

    //   console.log(newEquip, oldArmorEquipped);
    //   if (newEquip != oldArmorEquipped) {
    //     changed.push(armorId);
    //   }

    //   const newEquip = diff.system?.equipped;
    //   if (newEquip === undefined) continue;

    //   const oldItem = oldSystem.items.armor.find((i) => i._id === itemId);
    //   if (!oldItem) continue;

    //   const oldEquip = oldItem.system.equipped;

    //   console.log(newEquip, oldEquip);

    //   if (newEquip !== oldEquip) {
    //     changed.push(diff);
    //   }
    //}
    console.log(changed);

    return changed;
  }

  RecalcUpdated(system, name) {
    if (name?.system?.equipped) {
      console.log("New Item Equipped.");
      //Add the item's values to their respective location values
      const armor = system.items.armor.find((i) => i._id === name._id);
      const armorTypeValues = armor.system.armorType;
      const sectionToAddTo = armor.system.location;
      for (const [name, value] of Object.entries(armorTypeValues)) {
        system.armor[sectionToAddTo][name] += value;
      }
    } else {
      console.log("Item Unequipped.");
      //Remove the item's values to their respective location values
      const armor = system.items.armor.find((i) => i._id === name._id);
      const armorTypeValues = armor.system.armorType;
      const sectionToRemoveFrom = armor.system.location;

      for (const [name, value] of Object.entries(armorTypeValues)) {
        system.armor[sectionToRemoveFrom][name] -= value;
      }
    }
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
