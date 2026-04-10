import { ABF_MENTAL_POWERS } from "../../config/psychic-diciplines.js";

export class MentalPowerPurchaseWindow extends Application {
  constructor(options = {}) {
    super(options);
    this.actorId = options.actorId;
    this.activeTab = "available-tab";
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "mental-power-purchase-window",
      title: "Mental Powers",
      classes: ["abf-character-sheet", "mental-power-window"],
      template: "systems/abf-system/templates/actors/apps/mental-power-window.hbs",
      width: 1200,
      height: 900,
      resizable: true
    });
  }

  getData() {
    const actor = game.actors.get(this.actorId);

    // Actor’s learned disciplines
    const actorDisciplines = Object.values(actor.system.psychic.disciplines)
      .map((d) => d.name)
      .filter((n) => !!n);

    const owned = actor.system.psychic.mentalPowers;

    const allRegistryPowers = Object.entries(ABF_MENTAL_POWERS).map(([key, data]) => ({
      key,
      ...data
    }));

    // Matrix Powers are always eligible
    const eligible = allRegistryPowers.filter(
      (p) => p.discipline === "Matrix Powers" || actorDisciplines.includes(p.discipline)
    );

    const available = eligible.filter((p) => !owned.some((o) => o.name === p.name));

    const disciplinesForFilter = [...new Set([...actorDisciplines, "Matrix Powers"])];

    return {
      available,
      disciplines: disciplinesForFilter
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // SEARCH + FILTER
    html.find(".power-search, .power-filter-discipline").on("input change", (ev) => {
      const search = html.find(".power-search").val().toLowerCase();
      const filterDisc = html.find(".power-filter-discipline").val();

      html.find(".power-card").each((i, el) => {
        const card = $(el);
        const name = card.find("h4").text().toLowerCase();
        const disc = card.find(".power-discipline").text().replace("Discipline:", "").trim();

        const matchesSearch = name.includes(search);
        const matchesDisc = !filterDisc || disc === filterDisc;

        card.toggle(matchesSearch && matchesDisc);
      });
    });

    // BUY POWER
    html.find(".buy-power").on("click", async (ev) => {
      const key = ev.currentTarget.dataset.key;
      const source = ABF_MENTAL_POWERS[key];

      const actor = game.actors.get(this.actorId);

      // VALIDATION
      const error = this.validatePowerPurchase(actor, source);
      if (error) {
        ui.notifications.warn(error);
        return;
      }

      // If valid, proceed
      const powers = foundry.utils.duplicate(actor.system.psychic.mentalPowers);

      powers.push({
        ...source,
        mastered: false,
        innate: false,
        strengthen: 0,
        isActive: false,
        maintenance: false
      });

      await actor.update({ "system.psychic.mentalPowers": powers });

      ui.notifications.info(`Learned Mental Power: ${source.name}`);

      this.render(true);
    });
  }

  validatePowerPurchase(actor, power) {
    const system = actor.system;

    // 1. Already owned
    const owned = system.psychic.mentalPowers?.map((p) => p.name) || [];
    if (owned.includes(power.name)) {
      return "You already know this Mental Power.";
    }

    // 2. PP availability
    const ppRemaining = Number(system.psychic.pp.remaining) || 0;
    const cost = 1; // cost per mental power

    if (ppRemaining < cost) {
      return `Not enough PP. Requires ${cost} PP, but you only have ${ppRemaining}.`;
    }

    return null; // ✔ valid
  }
}
