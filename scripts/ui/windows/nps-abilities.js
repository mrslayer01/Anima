import { ABF_NPC_POWERS } from "../../config/npcs.js";
import { toNum } from "../../utils/numbers.js";
import { ValidateNPCPowerDP } from "../validators/validate-dp-abilities.js";

export class NpcAbilitiesWindow extends Application {
  constructor(abilityName, abilityData, options = {}) {
    super(options);
    this.abilityName = abilityName;
    this.abilityData = abilityData;
    this.actorId = options.actorId;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "npc-abilities-window",
      title: "NPC Ability Details",
      classes: ["abf-character-sheet", "npc-abilities"],
      template: "systems/abf-system/templates/actors/apps/npc-abilities.hbs",
      width: 1350,
      height: "auto"
    });
  }

  getData() {
    const purchased = this.abilityData.purchasedAbilities ?? [];

    // Filter out purchased effects
    const available = this.abilityData.effects.filter(
      (eff) => !purchased.some((p) => p.name === eff.name)
    );

    return {
      powerName: this.abilityName,
      powerData: this.abilityData,
      availableEffects: available,
      purchasedEffects: purchased
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".npc-power-select").on("change", (event) => {
      const key = event.currentTarget.value;

      if (!key) return;

      this.abilityName = key;
      this.abilityData = ABF_NPC_POWERS[key];

      this.render(true);
    });

    html.find(".buy-ability").on("click", (event) => {
      const name = event.currentTarget.dataset.effect;
      const effect = this.abilityData.effects.find((e) => e.name === name);

      new Dialog({
        title: "Purchase Effect",
        content: `<p>Purchase <strong>${effect.name}</strong>?</p>`,
        buttons: {
          yes: { label: "Yes", callback: () => this._purchaseAbility(name) },
          no: { label: "No" }
        }
      }).render(true);
    });

    html.find(".remove-ability").on("click", (event) => {
      const index = toNum(event.currentTarget.dataset.effect);
      const effect = this.abilityData.purchasedAbilities[index];

      new Dialog({
        title: "Remove Effect",
        content: `<p>Remove <strong>${effect.name}</strong>?</p>`,
        buttons: {
          yes: { label: "Yes", callback: () => this._removeAbility(index) },
          no: { label: "No" }
        }
      }).render(true);
    });
  }

  async _removeAbility(index) {
    const actor = game.actors.get(this.actorId);
    const abilities = foundry.utils.duplicate(actor.system.npc.abilities);

    const ability = abilities.find((a) => a.name === this.abilityName);
    if (!ability) return;

    ability.purchasedAbilities.splice(index, 1);

    await actor.update({ "system.npc.abilities": abilities });

    this.abilityData = ability;
    this.render(true);
  }

  async _purchaseAbility(effectName) {
    const actor = game.actors.get(this.actorId);
    const abilities = foundry.utils.duplicate(actor.system.npc.abilities);

    // Find the power object
    const ability = abilities.find((a) => a.name === this.abilityName);
    if (!ability) return;

    // Ensure purchasedAbilities exists
    if (!Array.isArray(ability.purchasedAbilities)) ability.purchasedAbilities = [];

    // Find the effect by name (safe even if availableEffects is filtered)
    const effect = this.abilityData.effects.find((e) => e.name === effectName);
    if (!effect) {
      ui.notifications.error("Effect not found.");
      return;
    }

    // Prevent duplicate purchases
    if (ability.purchasedAbilities.some((e) => e.name === effect.name)) {
      ui.notifications.warn("Already purchased.");
      return;
    }

    const dpCost = effect.cost;

    // Validate DP
    if (!ValidateNPCPowerDP(dpCost, actor)) {
      ui.notifications.error("Not enough Development Points.");
      return;
    }

    // Add the effect
    ability.purchasedAbilities.push(effect);

    // Update actor — DP recalculates automatically via your DP rule
    await actor.update({
      "system.npc.abilities": abilities
    });

    // Refresh UI
    this.abilityData = ability;
    this.render(true);
  }
}
