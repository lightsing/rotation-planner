import { ClassJobKind } from '../classjob.ts'
import { GetPropertyWithUpgradeValue, type PropertyWithUpgrade } from '../utils.ts'
import { SageActions } from './sage.ts'

/**
 * The type of an action.
 *
 * @public
 */
export type ActionType = 'Ability' | 'GCD'

/**
 * An action is an ability or spell that a job can use.
 *
 * @public
 */
export interface Action {
    /**
     * The ID of the action.
     */
    id: PropertyWithUpgrade
    /**
     * The type of the action.
     */
    type: ActionType
    /**
     * The level required to use the action.
     */
    classJobLevel: number
    /**
     * The cast time in 100ms
     */
    cast: PropertyWithUpgrade
    /**
     * The recast time in 100ms
     */
    recast: PropertyWithUpgrade
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

/**
 * The details of an action. Retrieved from the xivapi.
 *
 * @public
 */
export interface ActionDetails {
    /**
     * The icon path of the action.
     *
     * @remarks Needs to be concatenated with the xivapi base url to fetch the icon.
     */
    Icon: string
    /**
     * The HD icon path of the action.
     *
     * @remarks Needs to be concatenated with the xivapi base url to fetch the icon.
     */
    IconHD: string
    /**
     * The name of the action.
     */
    Name: string
    /**
     * The description of the action.
     */
    Description: string
}

/**
 * Gets the details of an action from the xivapi.
 *
 * @remarks You should cache the result of this function to avoid unnecessary API requests.
 *
 * @param action The {@link Action} to get the details of.
 * @param jobLevel The level of the job to get the action details for, omit to get the base action details.
 * @param baseUrl The base url of the xivapi, defaults to {@link https://xivapi.com }.
 * @param full Whether to get the full details of the action, defaults to false, only gets the Icon, IconHD, Name, and Description.
 * @param language This will tell the API to handle the request and the response in the specified language.
 *                 For Chinese, please refer to {@link https://github.com/thewakingsands/cafemaker/wiki | Waking Sands }
 *                 for the correct base url and omit the language parameter.
 *                 Supported languages are: en, ja, de, fr
 * @returns {@link ActionDetails} of the action.
 */
export const GetActionDetails = (
    action: Action,
    jobLevel?: number,
    baseUrl: string = 'https://xivapi.com',
    full: boolean = false,
    language?: string,
): Promise<ActionDetails> => {
    const id = GetPropertyWithUpgradeValue(action.id, jobLevel)
    const url = new URL(`/Action/${id}`, baseUrl)
    if (!full) {
        url.searchParams.set('columns', 'Icon,IconHD,Name,Description')
    }
    if (language) {
        url.searchParams.set('language', language)
    }

    return fetch(url).then((response) => response.json())
}
