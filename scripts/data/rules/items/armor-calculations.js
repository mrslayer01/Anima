export function CaclulateArmorDetails(actor, location) {
  // const newSection = {};
  // for (const key of Object.keys(actor.system.armor[location])) {
  //   newSection[key] = 0;
  // }
  // for (const armor of actor.system.items.armor) {
  //   if (armor.system.location !== location) continue;
  //   if (!armor.system.equipped) continue;
  //   for (const [type, value] of Object.entries(armor.system.armorType)) {
  //     newSection[type] += value;
  //   }
  // }
  // return actor.update({
  //   [`system.armor.${location}`]: newSection
  // });
}

export function CalculateEquippingArmor(actor) {
  //handles removing/equipping armor. Subtracting/Adding values to armor per section. Also removed currently equipped armor if is in current section.
  const newSection = {};
  for (const key of Object.keys(actor.system.armor[location])) {
    newSection[key] = 0;
  }

  for (const armor of actor.system.items.armor) {
    if (armor.system.location !== location) continue;
    if (!armor.system.equipped) continue;

    for (const [type, value] of Object.entries(armor.system.armorType)) {
      newSection[type] += value;
    }
  }

  return actor.update({
    [`system.armor.${location}`]: newSection
  });
}
