export type Class = "Astrologian" | "Bard" | "Black Mage" | "Dark Knight" | "Dragoon" | "Machinist" | "Monk" | "Ninja" | "Paladin" | "Scholar" | "Summoner" | "Warrior" | "White Mage" | "Red Mage" | "Samurai" | "Dancer" | "Gunbreaker" | "Reaper" | "Sage" | "Viper" | "Pictomancer";

export const IsTankClass = (c: Class): boolean => c === "Paladin" || c === "Warrior" || c === "Dark Knight" || c === "Gunbreaker";

export const IsMeleeDPSClass = (c: Class): boolean => c === "Monk" || c === "Dragoon" || c === "Ninja" || c === "Samurai" || c === "Reaper" || c === "Viper";

export const IsPhysicalRangedDPSClass = (c: Class): boolean => c === "Bard" || c === "Machinist" || c === "Dancer";

export const IsMagicRangedDPSClass = (c: Class): boolean => c === "Black Mage" || c === "Summoner" || c === "Red Mage" || c == "Pictomancer";

export const IsHealerClass = (c: Class): boolean => c === "White Mage" || c === "Scholar" || c === "Astrologian" || c === "Sage";

