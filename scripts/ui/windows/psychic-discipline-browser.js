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

    // Filter out already-owned disciplines
    disciplines = disciplines.filter((d) => !owned.includes(d.name));

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
      const owned = foundry.utils.duplicate(actor.system.psychic.disciplines || []);

      // Prevent duplicates
      if (owned.some((d) => d.name === source.name)) {
        ui.notifications.warn("You already have this Discipline.");
        return;
      }

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
}
