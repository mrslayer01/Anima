import { toNum } from "./numbers.js";
import { animaOpenRoll } from "./rolls.js";

export class AnimaCombat extends Combat {
  async rollInitiative(ids, { updateTurn = true, messageOptions = {} } = {}) {
    ids = typeof ids === "string" ? [ids] : ids;

    const updates = [];

    for (let id of ids) {
      const combatant = this.combatants.get(id);
      if (!combatant?.actor) continue;

      // Pull initiative value from actor
      const initValue = toNum(combatant.actor.system.initiative.final) || 0;

      // Perform your open roll
      const rollResult = await animaOpenRoll({
        value: initValue,
        label: "Initiative",
        actor: combatant.actor,
        undeveloped: false,
        mastery: false,
        capture: false
      });

      updates.push({
        _id: id,
        initiative: rollResult.final
      });
    }

    await this.updateEmbeddedDocuments("Combatant", updates);

    if (updateTurn) this.update({ turn: 0 });

    return this;
  }
}
