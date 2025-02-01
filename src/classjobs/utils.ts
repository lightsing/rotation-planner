export interface PropertyWithUpgrade<V = number> {
    // the default value of the property
    default: V
    // when job level is at least the key, the value is the upgraded value
    upgrades?: Record<number, V>
}

/**
 * Get the property value with the upgrade value if the job level is high enough
 * @param property The {@link PropertyWithUpgrade} to get the value of
 * @param jobLevel The level of the job to get the property value for, omit to get the base property value
 * @returns The property value
 *
 * @public
 */
export const GetPropertyWithUpgradeValue = <V>(property: PropertyWithUpgrade<V>, jobLevel?: number): V => {
    if (property.upgrades) {
        if (jobLevel) {
            for (let level in property.upgrades) {
                if (jobLevel >= parseInt(level)) {
                    return property.upgrades[level]!
                }
            }
        }
    }
    return property.default
}
