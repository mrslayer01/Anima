import { ABF_CLASSES } from "../config/classes.js";

export class ClassInfoWindow extends Application {
  constructor(className, options = {}) {
    super(options);
    this.className = className;
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
  // Normalize class name for lookup
  const rawName = this.className;
  const className = rawName.replace(/\s+/g, ""); // remove ALL spaces
  const classData = ABF_CLASSES[className];
  return { className: rawName, classData };

  }
}
