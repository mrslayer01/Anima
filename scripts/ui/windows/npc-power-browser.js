import { ABF_NPC_POWERS } from "../../config/npcs.js";
import { NpcAbilitiesWindow } from "./nps-abilities.js";

export class NpcPowerBrowser extends Application {
  constructor(options = {}) {
    super(options);
    this.actorId = options.actorId;

    this.search = "";
    this.filterType = "All";
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "npc-power-browser",
      title: "NPC Power Browser",
      classes: ["abf-character-sheet", "npc-power-browser"],
      template: "systems/abf-system/templates/actors/apps/npc-power-browser.hbs",
      width: 800,
      height: 700,
      resizable: true,
      scrollY: [".power-list"]
    });
  }

  getData() {
    const allPowers = ABF_NPC_POWERS;

    // Convert registry into array
    let powers = Object.entries(allPowers).map(([key, data]) => ({
      key,
      ...data
    }));

    // Filter by type
    if (this.filterType !== "All") {
      powers = powers.filter((p) => p.type === this.filterType);
    }

    // Search filter
    if (this.search.trim().length > 0) {
      const s = this.search.toLowerCase();
      powers = powers.filter((p) => p.name.toLowerCase().includes(s));
    }

    return {
      powers,
      search: this.search,
      filterType: this.filterType,
      types: [
        "All",
        "Offensive",
        "Movement",
        "Resistances",
        "Immunities",
        "Armor",
        "Souls",
        "Innate",
        "Perceptions"
      ]
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Search
    html.find(".npc-power-search").on("change", (ev) => {
      this.search = ev.currentTarget.value;
      this.render(true);
    });

    // Type filter
    html.find(".npc-power-filter").on("change", (ev) => {
      this.filterType = ev.currentTarget.value;
      this.render(true);
    });

    // Add power
    html.find(".add-power").on("click", async (ev) => {
      const key = ev.currentTarget.dataset.key;
      const power = ABF_NPC_POWERS[key];

      const actor = game.actors.get(this.actorId);
      const abilities = foundry.utils.duplicate(actor.system.npc.abilities);

      if (abilities.some((a) => a.name === power.name)) {
        ui.notifications.warn("This NPC already has that power.");
        return;
      }

      abilities.push(foundry.utils.duplicate(power));

      await actor.update({ "system.npc.abilities": abilities });
      ui.notifications.info(`Added ${power.name} to NPC.`);
    });

    // Open details window
    html.find(".open-power").on("click", (ev) => {
      const key = ev.currentTarget.dataset.key;
      const power = ABF_NPC_POWERS[key];

      const content = `
    <h2>${power.name} - Effects</h2>
    <ul>
      ${power.effects
        .map(
          (e) => `
        <li>
          <strong>${e.name}</strong>
          ${e.cost ? ` – Cost: ${e.cost}` : ""}
          – Min Gnosis: ${e.gnosisMin}
        </li>`
        )
        .join("")}
    </ul>
  `;

      new Dialog({
        title: `${power.name} – Details`,
        classes: ["abf-character-sheet", "npc-power-preview"],
        content,
        buttons: {
          ok: {
            label: "OK"
          }
        }
      }).render(true);
    });
  }
}
