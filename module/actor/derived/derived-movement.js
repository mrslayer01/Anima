import { toNum } from "../lookup.js";

export function calculateMovement(system) {
    const MOVEMENT_DISTANCES = {
    1: "<3 ft",
    2: "15 ft",
    3: "25 ft",
    4: "50 ft",
    5: "65 ft",
    6: "70 ft",
    7: "80 ft",
    8: "90 ft",
    9: "105 ft",
    10: "115 ft",
    11: "130 ft",
    12: "160 ft",
    13: "250 ft",
    14: "500 ft",
    15: "800 ft",
    16: "1500 ft",
    17: "3000 ft",
    18: "3 miles",
    19: "15 miles",
    20: "Special"
    };

    const movement = toNum(system.characteristics.Agility.base) + toNum(system.movement.bonus);
    const hasInhuman = system.movement.inhuman;
    const hasZen = system.movement.zen;

    const cap = movementCap(hasInhuman, hasZen);
    system.movement.final = Math.min(movement, cap);
    system.movement.movePerTurn = MOVEMENT_DISTANCES[system.movement.final];


}

function requiredTierFor(mv) {
    const MOVEMENT_REQUIREMENTS = [
        { max: 10, requirement: null },
        { max: 13, requirement: "Inhuman" },
        { max: 20, requirement: "Zen" }
    ];
  return MOVEMENT_REQUIREMENTS.find(r => mv <= r.max).requirement;
}

function movementCap(hasInhuman, hasZen) {
  if (hasZen) return 20;
  if (hasInhuman) return 13;
  return 10;
}

