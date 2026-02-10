import { BaseRule } from "./base-rule.js";
import { toNum } from "../../utils/numbers.js";

export class ArmorRule extends BaseRule {
  Initialize(system) {
    //Init cut, imp, thr, hea, ele, col, ene for armor.body/head/special and total.
    // Body
    if (system.armor.body.cut === undefined) system.armor.body.cut = 0;
    if (system.armor.body.imp === undefined) system.armor.body.imp = 0;
    if (system.armor.body.thr === undefined) system.armor.body.thr = 0;
    if (system.armor.body.hea === undefined) system.armor.body.hea = 0;
    if (system.armor.body.ele === undefined) system.armor.body.ele = 0;
    if (system.armor.body.col === undefined) system.armor.body.col = 0;
    if (system.armor.body.ene === undefined) system.armor.body.ene = 0;
    // Head
    if (system.armor.head.cut === undefined) system.armor.head.cut = 0;
    if (system.armor.head.imp === undefined) system.armor.head.imp = 0;
    if (system.armor.head.thr === undefined) system.armor.head.thr = 0;
    if (system.armor.head.hea === undefined) system.armor.head.hea = 0;
    if (system.armor.head.ele === undefined) system.armor.head.ele = 0;
    if (system.armor.head.col === undefined) system.armor.head.col = 0;
    if (system.armor.head.ene === undefined) system.armor.head.ene = 0;
    // Special
    if (system.armor.special.cut === undefined) system.armor.special.cut = 0;
    if (system.armor.special.imp === undefined) system.armor.special.imp = 0;
    if (system.armor.special.thr === undefined) system.armor.special.thr = 0;
    if (system.armor.special.hea === undefined) system.armor.special.hea = 0;
    if (system.armor.special.ele === undefined) system.armor.special.ele = 0;
    if (system.armor.special.col === undefined) system.armor.special.col = 0;
    if (system.armor.special.ene === undefined) system.armor.special.ene = 0;
    // Total
    if (system.armor.total.cut === undefined) system.armor.total.cut = 0;
    if (system.armor.total.imp === undefined) system.armor.total.imp = 0;
    if (system.armor.total.thr === undefined) system.armor.total.thr = 0;
    if (system.armor.total.hea === undefined) system.armor.total.hea = 0;
    if (system.armor.total.ele === undefined) system.armor.total.ele = 0;
    if (system.armor.total.col === undefined) system.armor.total.col = 0;
    if (system.armor.total.ene === undefined) system.armor.total.ene = 0;
  }

  Derived(system) {
    this.Initialize(system);
    // Body
    const bodyCut = toNum(system.armor.body.cut);
    const bodyImp = toNum(system.armor.body.imp);
    const bodyThr = toNum(system.armor.body.thr);
    const bodyHea = toNum(system.armor.body.hea);
    const bodyEle = toNum(system.armor.body.ele);
    const bodyCol = toNum(system.armor.body.col);
    const bodyEne = toNum(system.armor.body.ene);
    // Head
    const headCut = toNum(system.armor.head.cut);
    const headImp = toNum(system.armor.head.imp);
    const headThr = toNum(system.armor.head.thr);
    const headHea = toNum(system.armor.head.hea);
    const headEle = toNum(system.armor.head.ele);
    const headCol = toNum(system.armor.head.col);
    const headEne = toNum(system.armor.head.ene);
    // Special
    const specialCut = toNum(system.armor.special.cut);
    const specialImp = toNum(system.armor.special.imp);
    const specialThr = toNum(system.armor.special.thr);
    const specialHea = toNum(system.armor.special.hea);
    const specialEle = toNum(system.armor.special.ele);
    const specialCol = toNum(system.armor.special.col);
    const specialEne = toNum(system.armor.special.ene);

    // Total Armor
    system.armor.total.cut = bodyCut + headCut + specialCut;
    system.armor.total.imp = bodyImp + headImp + specialImp;
    system.armor.total.thr = bodyThr + headThr + specialThr;
    system.armor.total.hea = bodyHea + headHea + specialHea;
    system.armor.total.ele = bodyEle + headEle + specialEle;
    system.armor.total.col = bodyCol + headCol + specialCol;
    system.armor.total.ene = bodyEne + headEne + specialEne;
  }

  DetectChanged(updateData, oldSystem) {
    const changed = [];
    // watches cut/imp/thr/hea/ele/col/ene for body/head and special
    // Body
    const newbodyCut = foundry.utils.getProperty(updateData, "system.armor.body.cut");
    const newbodyImp = foundry.utils.getProperty(updateData, "system.armor.body.imp");
    const newbodyThr = foundry.utils.getProperty(updateData, "system.armor.body.thr");
    const newbodyHea = foundry.utils.getProperty(updateData, "system.armor.body.hea");
    const newbodyEle = foundry.utils.getProperty(updateData, "system.armor.body.ele");
    const newbodyCol = foundry.utils.getProperty(updateData, "system.armor.body.col");
    const newbodyEne = foundry.utils.getProperty(updateData, "system.armor.body.ene");

    if (newbodyCut !== undefined && newbodyCut !== oldSystem.armor.body.cut) changed.push("cut");
    if (newbodyImp !== undefined && newbodyImp !== oldSystem.armor.body.imp) changed.push("imp");
    if (newbodyThr !== undefined && newbodyThr !== oldSystem.armor.body.thr) changed.push("thr");
    if (newbodyHea !== undefined && newbodyHea !== oldSystem.armor.body.hea) changed.push("hea");
    if (newbodyEle !== undefined && newbodyEle !== oldSystem.armor.body.ele) changed.push("ele");
    if (newbodyCol !== undefined && newbodyCol !== oldSystem.armor.body.col) changed.push("col");
    if (newbodyEne !== undefined && newbodyEne !== oldSystem.armor.body.ene) changed.push("ene");

    // Head
    const newheadCut = foundry.utils.getProperty(updateData, "system.armor.head.cut");
    const newheadImp = foundry.utils.getProperty(updateData, "system.armor.head.imp");
    const newheadThr = foundry.utils.getProperty(updateData, "system.armor.head.thr");
    const newheadHea = foundry.utils.getProperty(updateData, "system.armor.head.hea");
    const newheadEle = foundry.utils.getProperty(updateData, "system.armor.head.ele");
    const newheadCol = foundry.utils.getProperty(updateData, "system.armor.head.col");
    const newheadEne = foundry.utils.getProperty(updateData, "system.armor.head.ene");

    if (newheadCut !== undefined && newheadCut !== oldSystem.armor.head.cut) changed.push("cut");
    if (newheadImp !== undefined && newheadImp !== oldSystem.armor.head.imp) changed.push("imp");
    if (newheadThr !== undefined && newheadThr !== oldSystem.armor.head.thr) changed.push("thr");
    if (newheadHea !== undefined && newheadHea !== oldSystem.armor.head.hea) changed.push("hea");
    if (newheadEle !== undefined && newheadEle !== oldSystem.armor.head.ele) changed.push("ele");
    if (newheadCol !== undefined && newheadCol !== oldSystem.armor.head.col) changed.push("col");
    if (newheadEne !== undefined && newheadEne !== oldSystem.armor.head.ene) changed.push("ene");

    // Special
    const newspecialCut = foundry.utils.getProperty(updateData, "system.armor.special.cut");
    const newspecialImp = foundry.utils.getProperty(updateData, "system.armor.special.imp");
    const newspecialThr = foundry.utils.getProperty(updateData, "system.armor.special.thr");
    const newspecialHea = foundry.utils.getProperty(updateData, "system.armor.special.hea");
    const newspecialEle = foundry.utils.getProperty(updateData, "system.armor.special.ele");
    const newspecialCol = foundry.utils.getProperty(updateData, "system.armor.special.col");
    const newspecialEne = foundry.utils.getProperty(updateData, "system.armor.special.ene");

    if (newspecialCut !== undefined && newspecialCut !== oldSystem.armor.special.cut)
      changed.push("cut");
    if (newspecialImp !== undefined && newspecialImp !== oldSystem.armor.special.imp)
      changed.push("imp");
    if (newspecialThr !== undefined && newspecialThr !== oldSystem.armor.special.thr)
      changed.push("thr");
    if (newspecialHea !== undefined && newspecialHea !== oldSystem.armor.special.hea)
      changed.push("hea");
    if (newspecialEle !== undefined && newspecialEle !== oldSystem.armor.special.ele)
      changed.push("ele");
    if (newspecialCol !== undefined && newspecialCol !== oldSystem.armor.special.col)
      changed.push("col");
    if (newspecialEne !== undefined && newspecialEne !== oldSystem.armor.special.ene)
      changed.push("ene");

    return changed;
  }

  RecalcUpdated(system, name) {
    // Body
    const bodyCut = toNum(system.armor.body.cut);
    const bodyImp = toNum(system.armor.body.imp);
    const bodyThr = toNum(system.armor.body.thr);
    const bodyHea = toNum(system.armor.body.hea);
    const bodyEle = toNum(system.armor.body.ele);
    const bodyCol = toNum(system.armor.body.col);
    const bodyEne = toNum(system.armor.body.ene);
    // Head
    const headCut = toNum(system.armor.head.cut);
    const headImp = toNum(system.armor.head.imp);
    const headThr = toNum(system.armor.head.thr);
    const headHea = toNum(system.armor.head.hea);
    const headEle = toNum(system.armor.head.ele);
    const headCol = toNum(system.armor.head.col);
    const headEne = toNum(system.armor.head.ene);
    // Special
    const specialCut = toNum(system.armor.special.cut);
    const specialImp = toNum(system.armor.special.imp);
    const specialThr = toNum(system.armor.special.thr);
    const specialHea = toNum(system.armor.special.hea);
    const specialEle = toNum(system.armor.special.ele);
    const specialCol = toNum(system.armor.special.col);
    const specialEne = toNum(system.armor.special.ene);

    // Total Armor
    system.armor.total.cut = bodyCut + headCut + specialCut;
    system.armor.total.imp = bodyImp + headImp + specialImp;
    system.armor.total.thr = bodyThr + headThr + specialThr;
    system.armor.total.hea = bodyHea + headHea + specialHea;
    system.armor.total.ele = bodyEle + headEle + specialEle;
    system.armor.total.col = bodyCol + headCol + specialCol;
    system.armor.total.ene = bodyEne + headEne + specialEne;
  }

  Update(updateData, oldSystem, newSystem) {
    const changed = this.DetectChanged(updateData, oldSystem);

    for (const name of changed) {
      this.RecalcUpdated(newSystem, name);
    }

    return changed;
  }
}
