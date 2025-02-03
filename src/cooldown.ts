import { GetPropertyWithUpgradeValue, type Action } from "./classjobs";
import { SortedArraySet } from "./utils";

/**
 * The result of using an action.
 * 
 * @public
 */
export type UseActionResult = UseActionWaitSuccess | UseActionWaitCooldownResult;

/**
 * The result of successfully using an action.
 * 
 * @public
 */
export interface UseActionWaitSuccess {
    success: true
}

/**
 * The result of trying to use an action that is on cooldown.
 * 
 * @public
 */
export interface UseActionWaitCooldownResult {
    success: false,
    atLeastAvailableAt: number
}

/**
 * A manager for handling cooldowns of actions.
 * 
 * @public
 */
export class CooldownManager {
    private classjobLevel: number

    private cooldowns: Map<number, SortedArraySet> = new Map()

    constructor(classjobLevel: number) {
        this.classjobLevel = classjobLevel
    }

    /**
     * Get the time at which the action will be available.
     * @param action {@link Action} The action to check.
     * @returns the time at which the action will be available.
     * 
     * @public
     */
    public atLeastAvailableAt(action: Action): number {
        const id = GetPropertyWithUpgradeValue(action.id, this.classjobLevel)
        const recast = GetPropertyWithUpgradeValue(action.recast, this.classjobLevel)

        if (!this.cooldowns.has(id)) {
            this.cooldowns.set(id, new SortedArraySet())
        }

        const cooldowns = this.cooldowns.get(id)!
        const lastUse = cooldowns.last()

        return lastUse !== undefined ? lastUse + recast : 0
    }

    /**
     * Use an action and return the result.
     * @param action {@link Action} The action to use.
     * @param time 100ms The time at which the action is used.
     * @returns the result of the use.
     * 
     * @public
     */
    public use(action: Action, time: number): UseActionResult {
        const atLeastAvailableAt = this.atLeastAvailableAt(action)
        if (atLeastAvailableAt > time) {
            return {
                success: false,
                atLeastAvailableAt
            }
        }

        const id = GetPropertyWithUpgradeValue(action.id, this.classjobLevel)
        this.cooldowns.get(id)!.add(time)
        return {
            success: true
        }
    }

    /**
     * Remove the use of an action.
     * @param action {@link Action} The action to remove.
     * @param time 100ms The time at which the action was used.
     * @returns returns true if the action was removed, false if it was not present.
     * @public
     */
    public removeUse(action: Action, time: number): boolean {
        const id = GetPropertyWithUpgradeValue(action.id, this.classjobLevel)
        return this.cooldowns.get(id)!.delete(time)
    }

    /**
     * Get all actions that have been used.
     * @returns an array of all actions that have been used.
     */
    public getActions(): number[] {
        return Array.from(this.cooldowns.keys()).sort((a, b) => a - b)
    }

    /**
     * Get all times of the uses of an action.
     * @param action {@link Action} The action to get the uses of.
     * @returns an array of all times the action was used.
     * @public
     */
    public getUses(action: Action): number[] {
        const id = GetPropertyWithUpgradeValue(action.id, this.classjobLevel)
        const cooldowns = this.cooldowns.get(id)
        return cooldowns ? Array.from(cooldowns) : []
    }
}

