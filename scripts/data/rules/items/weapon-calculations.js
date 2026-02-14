export async function WeaponBaseCalculations(actor) {
  // Called when
  const strMod = actor.system.characteristics.Strength.final;

  for (const item of actor.items) {
    if (item.type !== "weapon") continue;

    const w = item.system;
    const baseDamage = Number(w.damage) || 0;

    await item.update({
      "system.finalDamage": baseDamage + strMod
    });
  }
}

export async function WeaponEquipped(actor) {
  // Apply weapon negatives/bonuses to initiative for now. More calculations are needed later.
}
