import { toNum } from "../helpers/lookup.js";

export function calculateElanFinal(system) {
    if (!Array.isArray(system.elans)) return;

    for (const elans of system.elans) {
        if (!elans.elan) elans.elan = {};
        
        const current = toNum(elans.elan.current);
        const special = toNum(elans.elan.special);
        const bonus = toNum(elans.elan.bonus);
        const spent = toNum(elans.elan.spent);
        
        elans.elan.final = current + special;

        elans.elan.remaining = current + bonus - spent;
    }
}
