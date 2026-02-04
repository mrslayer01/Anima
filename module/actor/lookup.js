//General lookup tables for various calculations.

export const difficultyMap = {
  20: "Routine — trivial actions anyone can do",
  40: "Easy — familiar tasks most people can manage",
  80: "Moderate — requires some skill or experience",
  120: "Difficult — demanding for an average person",
  140: "Very Difficult — near the limit of normal ability",
  180: "Absurd — only elite or gifted can succeed",
  240: "Almost Impossible — even experts usually fail",
  280: "Impossible — barely within physical reality",
  320: "Inhuman — beyond logic, requires supernatural ability",
  440: "Zen — transcends reality, pure fiction without powers",
};

export const toNum = (v) => {
        const n = parseFloat(v);
        return Number.isFinite(n) ? n : 0;
};

