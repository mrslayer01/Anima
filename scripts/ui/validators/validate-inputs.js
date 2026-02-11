// Makes sure inputs can't go above/below specified limit.
// Called from abf-actor-sheet.js

export function ValidateInputs(name, value, input) {
  const isCharacteristic = name.startsWith("system.characteristics.");
  const isResistance = name.startsWith("system.resistances.");
  const isAbility =
    name.startsWith("system.abilities.secondary.") || name.startsWith("system.abilities.primary.");
  const isCurrency = name.startsWith("system.currency.");
  const isCore = name.startsWith("system.core.");

  const bonusFields = name.startsWith("system.");

  if (isCharacteristic) {
    // Characteristic can't go above 20 or below 0
    if (name.endsWith(".base") && value < 1) {
      value = 1;
      input.value = 1;
    }

    if (value > 20) {
      value = 20;
      input.value = 20;
    }
  }

  if (isAbility) {
    // Base cannot go below 1
    if (value < 0) {
      value = 0;
      input.value = 0;
    }
  }

  if (isCurrency) {
    // Currency cannot go below 0
    if (value < 0) {
      value = 0;
      input.value = 0;
    }
  }

  if (isCore) {
    if (value < 0) {
      value = 0;
      input.value = 0;
    }
  }

  if (isResistance) {
    // resistance cannot go below 0
    if (value < 0) {
      value = 0;
      input.value = 0;
    }
  }

  if (bonusFields) {
    // resistance cannot go below 0
    if (name.endsWith(".bonus") && value < 0) {
      value = 0;
      input.value = 0;
    }
  }

  return value;
}
