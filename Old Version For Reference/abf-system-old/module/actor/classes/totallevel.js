export function calculateTotalLevel(system) {
  system.derived ??= {};
  system.derived.totalLevel =
    (system.classes || []).reduce((t, c) => t + (toNum(c.level) || 0), 0);
}

