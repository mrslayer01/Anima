import { ABF_CLASSES } from "../config/classes.js";

export class ClassInfoWindow extends Application {
  constructor(className, options = {}) {
    super(options);
    this.className = className;
    this.classData = options.classData;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "class-info-window",
      title: "Class Details",
      template: "systems/abf-system/templates/apps/class-info.hbs",
      width: 400,
      height: "auto",
      resizable: true,
    });
  }

  getData() {
    const className = this.className;
    const classData = ABF_CLASSES[className];
    return { className, classData };
  }
}
