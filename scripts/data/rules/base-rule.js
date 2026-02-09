export class BaseRule {
  Initialize(system) {
    //Init
  }

  Derived(system) {
    //Init
  }

  DetectChanged(updateData, oldSystem) {
    //Init
  }

  RecalcUpdated(system, name) {
    //Init
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
