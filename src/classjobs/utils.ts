export interface PropertyWithUpgrade {
    // the default value of the property
    default: number,
    // when job level is at least the key, the value is the upgraded value
    upgrades?: Record<number, number>,
}

export const GetPropertyWithUpgradeValue = (property: PropertyWithUpgrade, jobLevel?: number) => {
    if (property.upgrades) {
        if (jobLevel) {
            for (let level in property.upgrades) {
                if (jobLevel >= parseInt(level)) {
                    return property.upgrades[level];
                }
            }
        }
    }
    return property.default;
}