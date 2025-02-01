import { SageActions } from "./sage";
import { GetPropertyWithUpgradeValue, type PropertyWithUpgrade } from "../utils";
import { ClassJobKind } from "classjobs/classjob";

export type ActionType = "Ability" | "GCD";

export interface Action {
    id: PropertyWithUpgrade,
    type: ActionType,
    /// required class job level
    classJobLevel: number,
    /// cast time in 100ms
    cast: PropertyWithUpgrade,
    // recast time in 100ms
    recast: PropertyWithUpgrade,
}

export const Actions: Record<ClassJobKind, Action[]> = {
    [ClassJobKind.Astrologian]: [],
    [ClassJobKind.Bard]: [],
    [ClassJobKind.BlackMage]: [],
    [ClassJobKind.DarkKnight]: [],
    [ClassJobKind.Dragoon]: [],
    [ClassJobKind.Machinist]: [],
    [ClassJobKind.Monk]: [],
    [ClassJobKind.Ninja]: [],
    [ClassJobKind.Paladin]: [],
    [ClassJobKind.Scholar]: [],
    [ClassJobKind.Summoner]: [],
    [ClassJobKind.Warrior]: [],
    [ClassJobKind.WhiteMage]: [],
    [ClassJobKind.RedMage]: [],
    [ClassJobKind.Samurai]: [],
    [ClassJobKind.Dancer]: [],
    [ClassJobKind.Gunbreaker]: [],
    [ClassJobKind.Reaper]: [],
    [ClassJobKind.Sage]: SageActions,
    [ClassJobKind.Viper]: [],
    [ClassJobKind.Pictomancer]: [],
}

export interface ActionDetails {
    Icon: string,
    IconHD: string,

    Name: string,
    Description: string,
}

// use https://cafemaker.wakingsands.com for cn
export const GetActionDetails = (action: Action, jobLevel?: number, baseUrl: string = "https://xivapi.com"): Promise<ActionDetails> => {
    const id = GetPropertyWithUpgradeValue(action.id, jobLevel);
    const url = `${baseUrl}/Action/${id}`;

    return fetch(url).then(response => response.json());
}