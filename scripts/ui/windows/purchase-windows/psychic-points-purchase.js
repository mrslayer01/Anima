import { toNum } from "../../../utils/numbers.js";

export class PsychicPPSpendWindow extends Application {
  constructor(actor, options = {}) {
    super(options);
    this.actor = actor;

    // Wizard state: can be positive (increase) or negative (undo)
    this.state = {
      potentialSteps: 0
    };
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "psychic-pp-spend-window",
      title: "Spend Psychic Points",
      template:
        "systems/abf-system/templates/actors/apps/purchase-windows/psychic-points-purchase.hbs",
      classes: ["abf-character-sheet", "pp-spend-window"],
      width: 500,
      height: "auto",
      resizable: true
    });
  }

  getData() {
    const actor = this.actor;

    const freePP = actor.system.psychic.pp.remaining;

    const potential = actor.system.abilities.primary.Psychic.PsychicPotential;
    const currentBonus = toNum(potential.permanentBonus || 0);

    const steps = this.state.potentialSteps;

    const nextBonus = currentBonus + steps * 10;

    const totalCost = this.calculatePotentialCost(currentBonus, steps);

    return {
      freePP,
      totalCost,
      remainingPP: freePP - totalCost,
      currentBonus,
      nextBonus,
      steps
    };
  }

  calculatePotentialCost(currentBonus, steps) {
    let cost = 0;

    if (steps > 0) {
      // Increasing potential
      for (let i = 0; i < steps; i++) {
        const stepCost = costToIncreasePotential(currentBonus + i * 10);
        cost += stepCost;
      }
    } else if (steps < 0) {
      // Undoing potential
      for (let i = 0; i < Math.abs(steps); i++) {
        const stepCost = costToIncreasePotential(currentBonus - 10 - i * 10);
        cost -= stepCost; // refund
      }
    }

    return cost;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Add a +10 step
    html.find(".potential-add").on("click", () => {
      this.state.potentialSteps++;
      this.render(true);
    });

    // Remove a +10 step (undo)
    html.find(".potential-remove").on("click", () => {
      const potential = this.actor.system.abilities.primary.Psychic.PsychicPotential;
      const currentBonus = toNum(potential.permanentBonus || 0);

      // Prevent undoing below 0
      if (currentBonus + this.state.potentialSteps * 10 <= 0) return;

      this.state.potentialSteps--;
      this.render(true);
    });

    // Confirm and apply changes
    html.find(".pp-confirm").on("click", () => this.applyChanges());
  }

  async applyChanges() {
    const actor = this.actor;
    const steps = this.state.potentialSteps;

    if (steps === 0) {
      ui.notifications.warn("No changes selected.");
      return;
    }

    const potential = actor.system.abilities.primary.Psychic.PsychicPotential;
    const currentBonus = toNum(potential.permanentBonus || 0);

    const cost = this.calculatePotentialCost(currentBonus, steps);
    const freePP = actor.system.psychic.pp.remaining;

    // If cost is positive, check PP
    if (cost > 0 && freePP < cost) {
      ui.notifications.error("Not enough Psychic Points.");
      return;
    }

    const newBonus = currentBonus + steps * 10;

    // Apply updates
    await actor.update({
      "system.abilities.primary.Psychic.PsychicPotential.permanentBonus": newBonus,
      "system.psychic.pp.permanentSpent": actor.system.psychic.pp.permanentSpent + cost
    });

    // Log record
    const records = foundry.utils.duplicate(actor.system.psychic.pp.spentRecords);

    records.push({
      category: "Potential",
      name: steps > 0 ? `Increase to +${newBonus}` : `Undo to +${newBonus}`,
      amount: steps,
      cost
    });

    await actor.update({ "system.psychic.pp.spentRecords": records });

    ui.notifications.info(
      steps > 0
        ? `Increased Psychic Potential to +${newBonus}`
        : `Reverted Psychic Potential to +${newBonus}`
    );

    this.close();
  }
}

function costToIncreasePotential(currentBonus) {
  const currentSteps = currentBonus / 10;
  const nextStep = currentSteps + 1;
  return nextStep;
}
