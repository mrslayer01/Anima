export class DisadvantageInfoWindow extends Application {
  constructor(disName, disData, options = {}) {
    super(options);
    this.disName = disName;
    this.disData = disData;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "disadvantage-info-window",
      classes: ["abf-character-sheet", "disadvantage-info"],
      template: "systems/abf-system/templates/actors/apps/disadvantage-info.hbs",
      width: 500,
      height: "auto",
      title: "Disadvantage Details"
    });
  }

  getData() {
    return {
      disadvantageName: this.disName,
      disadvantageData: this.disData
    };
  }
}