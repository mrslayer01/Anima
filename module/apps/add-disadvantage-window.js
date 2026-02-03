import { ABF_DISADVANTAGES } from "../config/disadvantages.js";

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
      classes: ["abf-character-sheet"],
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
    }

    return { 
      disadvantageOptions,
      selectedDisadvantage: this.selectedDisadvantage,
      disadvantageData: ABF_DISADVANTAGES[this.selectedDisadvantage]
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

     const selector = html.find(".disadvantage-selector");

    selector.on("change", (event) => {
      this.selectedDisadvantage = event.target.value;
      this.render(true);
    });

    html.find(".confirm-add").click(async ev => {
      ev.preventDefault();
      
      if (!this.selectedDisadvantage)
        return ui.notifications.warn("Select an disadvantage first.");

      if (!this.disadvantageData)
        this.disadvantageData = ABF_DISADVANTAGES[this.selectedDisadvantage];

      const actor = game.actors.get(this.options.actorId);
      const disadvantages = foundry.utils.duplicate(actor.system.disadvantages ?? []);

      disadvantages.push(this.disadvantageData);

      await actor.update({ "system.disadvantages": disadvantages });

      this.close();
    });
  }
}