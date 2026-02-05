//General lookup tables for various calculations.

export const difficultyMap = {
  20: "Routine — Trivial actions anyone can do",
  40: "Easy — Familiar tasks most people can manage",
  80: "Moderate — Requires some skill or experience",
  120: "Difficult — Demanding for an average person",
  140: "Very Difficult — Near the limit of normal ability",
  180: "Absurd — Only elite or gifted can succeed",
  240: "Almost Impossible — Even experts usually fail",
  280: "Impossible — Barely within physical reality",
  320: "Inhuman — Beyond logic, requires supernatural ability",
  440: "Zen — Transcends reality, pure fiction without powers",
};

export const toNum = (v) => {
        const n = parseFloat(v);
        return Number.isFinite(n) ? n : 0;
};

