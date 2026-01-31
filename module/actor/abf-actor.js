import {calculateCharacteristicFinal} from "./characteristics.js";
import { calculateXpToNextLevel } from "./xp-to-next-level.js";


export class AbfActor extends Actor {
  prepareData() {
    super.prepareData();
    const system = this.system;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    const system = this.system;

    this.calculateTotalLevel(system);
    this.calculatePresence();
    calculateCharacteristicFinal(system);
    calculateXpToNextLevel(system);
  }

  calculateTotalLevel(system) {
    system.level = (system.classes || []).reduce(
      (total, cls) => total + (Number(cls.level) || 0),
      0
    );
  }
  
  calculatePresence() {
    const system = this.system;
    const lvl = system.level || 0;
    if (lvl == 0) {
      system.system.presence.final = 20 + system.system.presence.bonus;
    } else {
      system.system.presence.final = 25 + (lvl * 5) + system.system.presence.bonus;
    }
  }
}
