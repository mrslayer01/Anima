import { ABF_PSYCHIC_DISCIPLINES } from "../../config/psychic-diciplines.js";
import { MentalPowerPurchaseWindow } from "./psychic-powers-browser.js";

export class DisciplineBrowser extends Application {
  constructor(options = {}) {
    super(options);
    this.actorId = options.actorId;

    this.search = "";
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "discipline-browser",
      title: "Psychic Discipline Browser",
      classes: ["abf-character-sheet", "discipline-browser"],
      template: "systems/abf-system/templates/actors/apps/discipline-browser.hbs",
      width: 900,
      height: 650,
      resizable: true,
      scrollY: [".discipline-grid"]
    });
  }

  getData() {
    const actor = game.actors.get(this.actorId);
    const owned = actor.system.psychic.disciplines?.map((d) => d.name) || [];

    // Start with all disciplines from the registry
    let disciplines = Object.entries(ABF_PSYCHIC_DISCIPLINES).map(([key, data]) => ({
      key,
      ...data
    }));

    // Filter out already-owned disciplines and Matrix Powers
    disciplines = disciplines.filter((d) => !owned.includes(d.name));

    console.log(disciplines);

    // Apply search filter
    if (this.search.trim().length > 0) {
      const s = this.search.toLowerCase();
      disciplines = disciplines.filter((d) => d.name.toLowerCase().includes(s));
    }

    return {
      disciplines,
      search: this.search
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".discipline-search").on("change", (ev) => {
      this.search = ev.currentTarget.value;
      this.render(true);
    });

    // BUY DISCIPLINE
    html.find(".buy-discipline").on("click", async (ev) => {
      const key = ev.currentTarget.dataset.key;
      const source = ABF_PSYCHIC_DISCIPLINES[key];

      const actor = game.actors.get(this.actorId);

      // VALIDATION
      const error = this.validateDisciplinePurchase(actor, source);
      if (error) {
        ui.notifications.warn(error);
        return;
      }

      // If valid, proceed
      const owned = foundry.utils.duplicate(actor.system.psychic.disciplines || []);

      const newDiscipline = {
        name: source.name,
        description: source.description,
        modifiers: source.modifiers
      };

      owned.push(newDiscipline);

      await actor.update({ "system.psychic.disciplines": owned });

      ui.notifications.info(`Learned Discipline: ${source.name}`);

      this.close();
    });
  }
  validateDisciplinePurchase(actor, discipline) {
    const system = actor.system;

    // 1. Already owned
    const owned = system.psychic.disciplines?.map((d) => d.name) || [];
    if (owned.includes(discipline.name)) {
      return "You already have this Discipline.";
    }

    // 2. PP availability
    const ppRemaining = Number(system.psychic.pp.remaining) || 0;
    const cost = 4; // Affinity cost per discipline (from your PP rules)

    if (ppRemaining < cost) {
      return `Not enough PP. Requires ${cost} PP, but you only have ${ppRemaining}.`;
    }

    return null;
  }
}
