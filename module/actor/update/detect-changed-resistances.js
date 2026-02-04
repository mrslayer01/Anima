export function detectChangedResistances(data, oldSystem) {
  const changed = [];
  const expanded = foundry.utils.expandObject(data);

  const updated = expanded.system?.resistances ?? {};

  for (const [resName, fields] of Object.entries(updated)) {
    for (const [field, newValue] of Object.entries(fields)) {
      const oldValue = oldSystem.resistances[resName][field];
      if (oldValue !== newValue) {
        changed.push(resName);
        break;
      }
    }
  }

  return changed;
}