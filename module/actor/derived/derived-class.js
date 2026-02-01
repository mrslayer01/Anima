//updates class values when the level for that class changes.
// Apply Innate bonuses to both primary and secondary abilities if they are listed. class.innateBonuses.primaryAbilities[x].innateBonus * class.level & class.innateBonuses.secondaryAbilities[x].innateBonus * class.level
// Apply LP per level. class.totalLifePoints = class.lifePointsPerLevel * class.level
// Apply initative per level. class.totalInitiative = class.initiativePerLevel * class.level
// Apply martial kknowledge per level. class.totalMartialKnowledge = class.martialKnowledgePerLevel * class.level
// Apply Psychic Points Per level inverval. class.psychicPointsPerLevel * Math.floor(class.level / class.psychicPointsPerLevelInterval)