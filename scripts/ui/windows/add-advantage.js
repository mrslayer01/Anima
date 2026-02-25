import { ABF_ADVANTAGES } from "../../config/advantages.js";
import { toNum } from "../../utils/numbers.js";

export class AddAdvantageWindow extends Application {
  constructor(options = {}) {
    super(options);
    this.selectedAdvantage = null;
    this.advantageData = null;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "add-advantage-window",
      title: "Add Advantage",
      classes: ["abf-character-sheet"],
      template: "systems/abf-system/templates/actors/apps/add-advantage.hbs",
      width: 300,
      height: "auto",
      resizable: false
    });
  }

  getData() {
    const advantageOptions = Object.keys(ABF_ADVANTAGES).sort();

    if (!this.selectedAdvantage) {
      this.selectedAdvantage = advantageOptions[0];
    }

    return {
      advantageOptions,
      selectedAdvantage: this.selectedAdvantage,
      advantageData: ABF_ADVANTAGES[this.selectedAdvantage]
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    const selector = html.find(".advantage-selector");

    selector.on("change", (event) => {
      this.selectedAdvantage = event.target.value;
      this.render(true);
    });

    html.find(".confirm-add").click(async (ev) => {
      ev.preventDefault();

      if (!this.selectedAdvantage) return ui.notifications.warn("Select an advantage first.");

      if (!this.advantageData) this.advantageData = ABF_ADVANTAGES[this.selectedAdvantage];

      const actor = game.actors.get(this.options.actorId);
      const advantages = foundry.utils.duplicate(actor.system.advantages ?? []);

      advantages.push(this.advantageData);

      await actor.update({ "system.advantages": advantages });

      this.close();
    });

    html.find(".advantage-cost-input").off("change");
    html.find(".advantage-cost-input").on("change", async (event) => {
      const newLevel = toNum(event.currentTarget.value) || 0;

      if (!this.advantageData)
        this.advantageData = foundry.utils.duplicate(ABF_ADVANTAGES[this.selectedAdvantage]);

      this.advantageData.cost = newLevel;
    });
  }
}
