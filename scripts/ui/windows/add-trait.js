import { ABF_ADVANTAGES } from "../../config/advantages.js";
import { ABF_DISADVANTAGES } from "../../config/disadvantages.js";
import { toNum } from "../../utils/numbers.js";

export class AddTraitWindow extends Application {
  constructor(options = {}) {
    super(options);
    this.actorId = options.actorId;

    this.search = "";
    this.filterType = options.initialFilter ?? "All";
    this.initialFilter = options.initialFilter ?? null;
    this.costOverrides = {};
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "trait-browser",
      title: "Trait Browser",
      classes: ["abf-character-sheet", "trait-browser"],
      template: "systems/abf-system/templates/actors/apps/trait-browser.hbs",
      width: 800,
      height: 700,
      resizable: true,
      scrollY: [".trait-list"]
    });
  }

  getData() {
    // Convert advantages
    let advantages = Object.entries(ABF_ADVANTAGES).map(([key, data]) => ({
      key,
      ...data,
      type: "Advantage"
    }));

    // Convert disadvantages
    let disadvantages = Object.entries(ABF_DISADVANTAGES).map(([key, data]) => ({
      key,
      ...data,
      type: "Disadvantage"
    }));

    // Merge
    let items = [...advantages, ...disadvantages];

    // Filter by type
    if (this.filterType !== "All") {
      items = items.filter((i) => i.type === this.filterType);
    }

    // Search
    if (this.search.trim().length > 0) {
      const s = this.search.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(s) ||
          (i.effects ?? "").toLowerCase().includes(s) ||
          (i.description ?? "").toLowerCase().includes(s)
      );
    }

    return {
      traits: items,
      search: this.search,
      filterType: this.filterType,
      types: this.initialFilter ? [this.initialFilter] : ["All", "Advantage", "Disadvantage"]
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Search
    html.find(".trait-search").on("change", (ev) => {
      this.search = ev.currentTarget.value;
      this.render(true);
    });

    // Filter
    html.find(".trait-filter").on("change", (ev) => {
      this.filterType = ev.currentTarget.value;
      this.render(true);
    });

    // Cost override
    html.find(".trait-cost-input").on("change", (ev) => {
      const key = ev.currentTarget.dataset.key;
      const value = toNum(ev.currentTarget.value) || 0;
      this.costOverrides[key] = value;
    });

    // Add trait
    html.find(".add-trait").on("click", async (ev) => {
      const key = ev.currentTarget.dataset.key;

      const base = ABF_ADVANTAGES[key] ?? ABF_DISADVANTAGES[key];

      const traitData = foundry.utils.duplicate(base);

      // Apply cost override
      if (this.costOverrides[key] !== undefined) {
        traitData.cost = this.costOverrides[key];
      }

      const actor = game.actors.get(this.actorId);

      // Determine path
      const path = ABF_ADVANTAGES[key] ? "system.advantages" : "system.disadvantages";

      const arr = foundry.utils.duplicate(getProperty(actor, path) ?? []);
      arr.push(traitData);

      await actor.update({ [path]: arr });

      ui.notifications.info(`Added ${traitData.name}`);
    });
  }
}
