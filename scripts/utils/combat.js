import { COMBAT_SITUATIONAL_MODIFIERS } from "./lookup.js";
import { toNum } from "./numbers.js";
import { animaOpenRoll } from "./rolls.js";

export class AnimaCombat extends Combat {
  async rollInitiative(ids, { updateTurn = true, messageOptions = {} } = {}) {
    ids = typeof ids === "string" ? [ids] : ids;

    for (let id of ids) {
      const combatant = this.combatants.get(id);
      if (!combatant?.actor) continue;

      const actor = combatant.actor;
      const userId = getInitiativeUserForActor(actor);

      // If this user should roll → do it locally
      if (userId === game.user.id) {
        const modifier = await promptInitiativeModifierWindow(actor);

        const baseInit = toNum(actor.system.initiative.final) || 0;

        const rollResult = await animaOpenRoll({
          value: baseInit + modifier.final,
          label: "Initiative",
          actor,
          undeveloped: false,
          mastery: false,
          capture: false,
          hideDice: true,
          timeout: 0
        });

        // If GM → update immediately
        if (game.user.isGM) {
          await this.updateEmbeddedDocuments("Combatant", [
            { _id: id, initiative: rollResult.final }
          ]);
        }
        // If player → send result to GM
        else {
          game.socket.emit("system.abf-system", {
            type: "initiative:result",
            combatId: this.id,
            combatantId: id,
            total: rollResult.final
          });
        }
      }

      // If this user is NOT the roller → do nothing
      // The GM will update initiative when the result arrives
    }

    if (updateTurn && game.user.isGM) {
      this.update({ turn: 0 });
    }

    return this;
  }
}

export function promptInitiativeModifierWindow(actor) {
  const options = INITIATIVE_OPTIONS;

  const selectHtml = `
    <div style="margin-bottom: 1em;">
      <label><b>Situational Modifier:</b></label>
      <select id="combatMod" style="width: 100%;">
        ${options
          .map(
            (o) =>
              `<option value="${o.value}">${o.label} (${o.value >= 0 ? "+" : ""}${o.value})</option>`
          )
          .join("")}
      </select>
    </div>
  `;

  return new Promise((resolve) => {
    new Dialog({
      title: `Initiative Modifier for: ${actor.name}`,
      content: `
        <div style="margin-bottom: 1em;">
          <label><b>Custom Modifier:</b></label>
          <input type="number" id="mod" value="0" style="width: 100%;" />
        </div>

        ${selectHtml}
      `,
      buttons: {
        roll: {
          label: "Roll",
          callback: (html) => {
            const mod = toNum(html.find("#mod").val()) || 0;
            const situational = toNum(html.find("#combatMod").val()) || 0;

            const final = mod + situational;

            resolve({
              mod,
              situational,
              final
            });
          }
        }
      },
      default: "roll"
    }).render(true);
  });
}

function getInitiativeUserForActor(actor) {
  const ownership = actor.ownership;

  const nonGMOwners = game.users.filter(
    (u) => !u.isGM && u.active && ownership[u.id] === CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER
  );

  if (nonGMOwners.length > 0) return nonGMOwners[0].id;

  const gm = game.users.find((u) => u.isGM && u.active);
  return gm?.id ?? null;
}

const INITIATIVE_OPTIONS = Object.entries(COMBAT_SITUATIONAL_MODIFIERS)
  .filter(([name, data]) => name === "None" || data.initiative !== 0)
  .map(([name, data]) => ({
    name,
    label: name.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
    value: data.initiative
  }));
