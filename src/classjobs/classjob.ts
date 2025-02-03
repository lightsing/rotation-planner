/**
 * Class jobs used
 *
 * @public
 */
export enum ClassJobKind {
    Paladin = 19,
    Monk = 20,
    Warrior = 21,
    Dragoon = 22,
    Bard = 23,
    WhiteMage = 24,
    BlackMage = 25,
    Summoner = 27,
    Scholar = 28,
    Ninja = 30,
    Machinist = 31,
    DarkKnight = 32,
    Astrologian = 33,
    Samurai = 34,
    RedMage = 35,
    Gunbreaker = 37,
    Dancer = 38,
    Reaper = 39,
    Sage = 40,
    Viper = 41,
    Pictomancer = 42,
}

/**
 * Details of a class job from the xivapi
 *
 * @public
 */
export interface ClassJobDetails {
    /**
     * 3-letter abbreviation of the class job
     */
    Abbreviation: string
    /**
     * The icon of the class job
     *
     * @remarks Needs to be concatenated with the xivapi base url to fetch the icon.
     */
    Icon: string
    /**
     * The name of the class job
     */
    Name: string
}

export const ClassJob = {
    ...ClassJobKind,

    /**
     * Check if the class job is a tank
     * @param c {@link ClassJobKind} to check
     * @returns Whether the class job is a tank
     *
     * @public
     */
    isTank: (c: ClassJobKind): boolean =>
        c === ClassJobKind.Paladin ||
        c === ClassJobKind.Warrior ||
        c === ClassJobKind.DarkKnight ||
        c === ClassJobKind.Gunbreaker,

    /**
     * Check if the class job is a melee DPS
     * @param c {@link ClassJobKind} to check
     * @returns Whether the class job is a melee DPS
     *
     * @public
     */
    isMeleeDPS: (c: ClassJobKind): boolean =>
        c === ClassJobKind.Monk ||
        c === ClassJobKind.Dragoon ||
        c === ClassJobKind.Ninja ||
        c === ClassJobKind.Samurai ||
        c === ClassJobKind.Reaper ||
        c === ClassJobKind.Viper,

    /**
     * Check if the class job is a physical ranged DPS
     * @param c {@link ClassJobKind} to check
     * @returns Whether the class job is a physical ranged DPS
     *
     * @public
     */
    isPhysicalRangedDPS: (c: ClassJobKind): boolean =>
        c === ClassJobKind.Bard || c === ClassJobKind.Machinist || c === ClassJobKind.Dancer,

    /**
     * Check if the class job is a magic ranged DPS
     * @param c {@link ClassJobKind} to check
     * @returns Whether the class job is a magic ranged DPS
     *
     * @public
     */
    isMagicRangedDPS: (c: ClassJobKind): boolean =>
        c === ClassJobKind.BlackMage ||
        c === ClassJobKind.Summoner ||
        c === ClassJobKind.RedMage ||
        c === ClassJobKind.Pictomancer,

    /**
     * Check if the class job is a DPS
     * @param c {@link ClassJobKind} to check
     * @returns Whether the class job is a DPS
     *
     * @public
     */
    isDPS: (c: ClassJobKind): boolean =>
        ClassJob.isMeleeDPS(c) || ClassJob.isPhysicalRangedDPS(c) || ClassJob.isMagicRangedDPS(c),

    /**
     * Check if the class job is a pure healer
     * @param c {@link ClassJobKind} to check
     * @returns Whether the class job is a pure healer
     *
     * @public
     */
    isPureHealer: (c: ClassJobKind): boolean => c === ClassJobKind.WhiteMage || c === ClassJobKind.Astrologian,

    /**
     * Check if the class job is a barrier healer
     * @param c {@link ClassJobKind} to check
     * @returns Whether the class job is a barrier healer
     *
     * @public
     */
    isBarrierHealer: (c: ClassJobKind): boolean => c === ClassJobKind.Scholar || c === ClassJobKind.Sage,

    /**
     * Check if the class job is a healer
     * @param c {@link ClassJobKind} to check
     * @returns Whether the class job is a healer
     *
     * @public
     */
    isHealer: (c: ClassJobKind): boolean => ClassJob.isPureHealer(c) || ClassJob.isBarrierHealer(c),

    /**
     * Check if the class job is a non-tank physical job
     * @param c {@link ClassJobKind} to check
     * @returns Whether the class job is a non-tank physical job
     *
     * @public
     */
    isNonTankPhysical: (c: ClassJobKind): boolean => ClassJob.isMeleeDPS(c) || ClassJob.isPhysicalRangedDPS(c),

    /**
     * Check if the class job is a magical job
     * @param c {@link ClassJobKind} to check
     * @returns Whether the class job is a magical job
     *
     * @public
     */
    isMagical: (c: ClassJobKind): boolean => ClassJob.isMagicRangedDPS(c) || ClassJob.isHealer(c),

    /**
     * Gets the details of an class job from the xivapi.
     *
     * @remarks You should cache the result of this function to avoid unnecessary API requests.
     *
     * @param c The {@link ClassJobKind} to get the details of.
     * @param baseUrl The base url of the xivapi, defaults to {@link https://xivapi.com }.
     * @param full Whether to get the full details of the action, defaults to false, only gets the Abbreviation, Icon, and Name.
     * @param language This will tell the API to handle the request and the response in the specified language.
     *                 For Chinese, please refer to {@link https://github.com/thewakingsands/cafemaker/wiki | Waking Sands }
     *                 for the correct base url and omit the language parameter.
     *                 Supported languages are: en, ja, de, fr
     * @returns details of the action.
     *
     * @public
     */
    details: (
        c: ClassJobKind,
        baseUrl: string = 'https://xivapi.com',
        full: boolean = false,
        language?: string,
    ): Promise<ClassJobDetails> => {
        const url = new URL(`/ClassJob/${c}`, baseUrl)
        if (!full) {
            url.searchParams.append('columns', 'Abbreviation,Icon,Name')
        }
        if (language) {
            url.searchParams.set('language', language)
        }

        return fetch(url).then((response) => response.json())
    },

    /**
     * Parses a string to a {@link ClassJobKind}
     * @param s The string to parse
     * @returns The {@link ClassJobKind} parsed from the string
     * @throws Error if the string is not a valid class job
     *
     * @public
     */
    fromString(s: string): ClassJobKind {
        switch (s.toLowerCase().replace(/\s/g, '')) {
            case 'paladin':
                return ClassJobKind.Paladin
            case 'monk':
                return ClassJobKind.Monk
            case 'warrior':
                return ClassJobKind.Warrior
            case 'dragoon':
                return ClassJobKind.Dragoon
            case 'bard':
                return ClassJobKind.Bard
            case 'whitemage':
                return ClassJobKind.WhiteMage
            case 'blackmage':
                return ClassJobKind.BlackMage
            case 'summoner':
                return ClassJobKind.Summoner
            case 'scholar':
                return ClassJobKind.Scholar
            case 'ninja':
                return ClassJobKind.Ninja
            case 'machinist':
                return ClassJobKind.Machinist
            case 'darkknight':
                return ClassJobKind.DarkKnight
            case 'astrologian':
                return ClassJobKind.Astrologian
            case 'samurai':
                return ClassJobKind.Samurai
            case 'redmage':
                return ClassJobKind.RedMage
            case 'gunbreaker':
                return ClassJobKind.Gunbreaker
            case 'dancer':
                return ClassJobKind.Dancer
            case 'reaper':
                return ClassJobKind.Reaper
            case 'sage':
                return ClassJobKind.Sage
            case 'viper':
                return ClassJobKind.Viper
            case 'pictomancer':
                return ClassJobKind.Pictomancer
            default:
                throw new Error(`Unknown class job: ${s}`)
        }
    },
}
