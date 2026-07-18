import { ABF_NPC_ADVANTAGES, ABF_NPC_DISADVANTAGES } from "../../config/npcs.js";
import { toNum } from "../../utils/numbers.js";

export class AddNPCTraitWindow extends Application {
  constructor(options = {}) {
    super(options);
    this.actorId = options.actorId;

    this.search = "";
    this.filterType = "All"; // Essential / Magical / Psychic / Natural
    this.traitCategory = options.traitCategory ?? "Advantage"; // Advantage / Disadvantage
    this.costOverrides = {};
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "npc-trait-browser",
      title: "NPC Trait Browser",
      classes: ["abf-character-sheet", "npc-trait-browser"],
      template: "systems/abf-system/templates/actors/apps/npc-essential-ability-window.hbs",
      width: 800,
      height: 700,
      resizable: true,
      scrollY: [".trait-list"]
    });
  }

  getData() {
    // Convert NPC advantages into list
    let advantages = Object.entries(ABF_NPC_ADVANTAGES).map(([key, data]) => ({
      key,
      ...data,
      traitType: "Advantage",
      type: data.type ?? "Essential"
    }));

    // Convert NPC disadvantages into list
    let disadvantages = Object.entries(ABF_NPC_DISADVANTAGES).map(([key, data]) => ({
      key,
      ...data,
      traitType: "Disadvantage",
      type: data.type ?? "Natural"
    }));

    let items = [...advantages, ...disadvantages];

    // Filter by Advantage / Disadvantage
    if (this.traitCategory !== "All") {
      items = items.filter((i) => i.traitType === this.traitCategory);
    }

    // Filter by type
    if (this.filterType !== "All") {
      items = items.filter((i) => i.type === this.filterType);
    }

    // Search
    if (this.search.trim().length > 0) {
      const s = this.search.toLowerCase();
      items = items.filter(
        (i) => i.name.toLowerCase().includes(s) || (i.description ?? "").toLowerCase().includes(s)
      );
    }

    return {
      traits: items,
      search: this.search,
      filterType: this.filterType,
      types: ["All", "Essental", "Magical", "Psychic"]
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

    // Cost override (only for advantages)
    html.find(".trait-cost-input").on("change", (ev) => {
      const key = ev.currentTarget.dataset.key;
      const value = toNum(ev.currentTarget.value) || 0;
      this.costOverrides[key] = value;
    });

    // Add trait
    html.find(".npc-add-trait").on("click", async (ev) => {
      const key = ev.currentTarget.dataset.key;

      const base = ABF_NPC_ADVANTAGES[key] ?? ABF_NPC_DISADVANTAGES[key];

      const traitData = foundry.utils.duplicate(base);

      // Apply cost override
      if (this.costOverrides[key] !== undefined) {
        traitData.cost = this.costOverrides[key];
      }

      const actor = game.actors.get(this.actorId);

      // Determine path
      const path = ABF_NPC_ADVANTAGES[key] ? "system.npc.advantages" : "system.npc.disadvantages";

      const arr = foundry.utils.duplicate(foundry.utils.getProperty(actor, path) ?? []);
      arr.push(traitData);

      await actor.update({ [path]: arr });

      ui.notifications.info(`Added ${traitData.name}`);
    });
  }
}
