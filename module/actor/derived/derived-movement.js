export function calculateFinalMovement(system) {
    system.movement.final = system.characteristics.Agility.base + system.movement.bonus;
}