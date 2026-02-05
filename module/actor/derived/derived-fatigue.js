import { toNum } from "../helpers/lookup.js";

//Calculates Final fatigue and action penalty
export function calculateFinalFatigue(system) {
    const fatiguePenalty = {
        0: -120,
        1: -80,
        2: -40,
        3: -20,
        4: -10
    };

    system.fatigue.final = toNum(system.characteristics.Constitution.base);


    if(toNum(system.fatigue.final) <= 4) {
        //If has a fatigue of 4 or lower, don't start calculating until current does not match final
        if(toNum(system.fatigue.current) < toNum(system.fatigue.final)) {
            //Has spent fatigue and will start getting penalties
            system.fatigue.actionPenalty = fatiguePenalty[toNum(system.fatigue.current)];
        } else {
            system.fatigue.actionPenalty = 0;
        }
    } else {
        //If has a higher that 4 fatigue, calculate normally.
        system.fatigue.actionPenalty = fatiguePenalty[toNum(system.fatigue.current)] ?? 0;
    }
    //
}