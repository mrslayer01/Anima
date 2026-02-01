export function calculateTotalLevel(system) {
  system.level = (system.classes || [])
    .reduce((total, cls) => total + (Number(cls.level) || 0), 0);
  }