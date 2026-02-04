import { toNum } from "../lookup.js";

export async function updateResistances(actor, changedNames) {
  const system = actor.system;
  const presence = toNum(system.presence.final);

  const updates = {};

  for (const name of changedNames) {
    const res = system.resistances[name];
    const linkedChar = res.characteristic;
    const charFinal = toNum(system.characteristics[linkedChar]?.final);

    const final = presence + charFinal + toNum(res.bonus);
    console.log("updateResistances called, final value: ", final, presence, res.bonus);

    updates[`system.resistances.${name}.final`] = final;
  }

  await actor.update(updates, { skipRecalc: true });

  delete actor._changedResistances;
}