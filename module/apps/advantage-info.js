export class AdvantageInfoWindow extends Application {
  constructor(advName, advData, options = {}) {
    super(options);
    this.advName = advName;
    this.advData = advData;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "advantage-info-window",
      classes: ["abf", "advantage-info"],
      template: "systems/abf-system/templates/apps/advantage-info.hbs",
      width: 500,
      height: "auto",
      title: "Advantage Details"
    });
  }

  getData() {
    return {
      advantageName: this.advName,
      advantageData: this.advData
    };
  }
}