import { SageActions } from "./sage";

export type ActionType = "Ability" | "Spell";

export interface ReCast {
    // when job level is below the key, the recast time is the default
    default: number,
    // when job level is at least the key, the recast time is the value
    classJobLevel: Record<number, number>,
}

export interface Action {
    id: number,
    type: ActionType,
    classJobLevel: number,
    cast: number,
    recast: number | ReCast,
    
    icon: string,
    iconHD: string,
}

export const Actions: Record<string, Action[]> = {
    SGE: SageActions
}