import { ABF_ADVANTAGES } from "../config/advantages.js";
import { AdvantageInfoWindow } from "../apps/advantage-info.js";

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
      template: "systems/abf-system/templates/apps/add-advantage.hbs",
      width: 300,
      height: "auto",
      resizable: false,
    });
  }

  getData() {
    const advantageOptions = Object.keys(ABF_ADVANTAGES).sort();

    if (!this.selectedAdvantage) {
      this.selectedAdvantage = advantageOptions[0];
      this.advantageData = ABF_ADVANTAGES[this.selectedAdvantage];
    }

    return { advantageOptions };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".advantage-selector").on("change", (event) => {
      this.selectedAdvantage = event.target.value;
      this.advantageData = ABF_ADVANTAGES[this.selectedAdvantage];

      for (let app of Object.values(ui.windows)) {
        if (app instanceof AdvantageInfoWindow) {
          app.advName = this.advantageData.name;
          app.advData = this.advantageData;
          app.render(true);
        }
      }
    });

    html.find(".advantage-info-icon").click((ev) => {
      ev.preventDefault();
      new AdvantageInfoWindow(
        this.advantageData.name,
        this.advantageData
      ).render(true);
    });

    html.find(".confirm-add").click(async () => {
      if (!this.selectedAdvantage)
        return ui.notifications.warn("Select an advantage first.");

      if (!this.advantageData)
        this.advantageData = ABF_ADVANTAGES[this.selectedAdvantage];

      const actor = game.actors.get(this.options.actorId);
      const advantages = foundry.utils.duplicate(actor.system.advantages ?? []);
      advantages.push(this.advantageData);

      await actor.update({ "system.advantages": advantages });

      for (let app of Object.values(ui.windows)) {
        if (app instanceof AdvantageInfoWindow) app.close();
      }

      this.close();
    });
  }
}