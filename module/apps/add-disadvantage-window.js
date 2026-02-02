import { ABF_DISADVANTAGES } from "../config/disadvantages.js";
import { DisadvantageInfoWindow } from "../apps/disadvantage-info.js";

export class AddDisadvantageWindow extends Application {
  constructor(options = {}) {
    super(options);
    this.selectedDisadvantage = null;
    this.disadvantageData = null;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "add-disadvantage-window",
      title: "Add Disadvantage",
      template: "systems/abf-system/templates/apps/add-disadvantage.hbs",
      width: 300,
      height: "auto",
      resizable: false,
    });
  }

  getData() {
    const disadvantageOptions = Object.keys(ABF_DISADVANTAGES).sort();

    if (!this.selectedDisadvantage) {
      this.selectedDisadvantage = disadvantageOptions[0];
      this.disadvantageData = ABF_DISADVANTAGES[this.selectedDisadvantage];
    }

    return { disadvantageOptions };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".disadvantage-selector").on("change", (event) => {
      this.selectedDisadvantage = event.target.value;
      this.disadvantageData = ABF_DISADVANTAGES[this.selectedDisadvantage];

      for (let app of Object.values(ui.windows)) {
        if (app instanceof DisadvantageInfoWindow) {
          app.disName = this.disadvantageData.name;
          app.disData = this.disadvantageData;
          app.render(true);
        }
      }
    });

    html.find(".disadvantage-info-icon").click((ev) => {
      ev.preventDefault();
      new DisadvantageInfoWindow(
        this.disadvantageData.name,
        this.disadvantageData
      ).render(true);
    });

    html.find(".confirm-add").click(async () => {
      if (!this.selectedDisadvantage)
        return ui.notifications.warn("Select a disadvantage first.");

      if (!this.disadvantageData)
        this.disadvantageData = ABF_DISADVANTAGES[this.selectedDisadvantage];

      const actor = game.actors.get(this.options.actorId);
      const disadvantages = foundry.utils.duplicate(actor.system.disadvantages ?? []);
      disadvantages.push(this.disadvantageData);

      await actor.update({ "system.disadvantages": disadvantages });

      for (let app of Object.values(ui.windows)) {
        if (app instanceof DisadvantageInfoWindow) app.close();
      }

      this.close();
    });
  }
}