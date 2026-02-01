//Only calculate characteristic modifier for the characteristic that changed and only if it changes.
export function detectChangedCharacteristics(data, oldSystem) {
  const changed = [];

  // Expand flattened update paths into nested objects
  const expanded = foundry.utils.expandObject(data);

  const updatedChars = expanded.system?.characteristics ?? {};

  for (const [charName, fields] of Object.entries(updatedChars)) {
    for (const [field, newValue] of Object.entries(fields)) {
      const oldValue = oldSystem.characteristics[charName][field];
      if (oldValue !== newValue) {
        changed.push(charName);
      }
    }
  }

  return changed;
}