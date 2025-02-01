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

export interface ClassJobDetails {
    // 3-letter abbreviation of the class job
    Abbreviation: string
    ID: number
    // the icon url of the class job, concatenated with the xivapi base url to fetch the icon
    Icon: string
    Name: string
}

export const ClassJob = {
    ...ClassJobKind,

    isTank: (c: ClassJobKind): boolean =>
        c === ClassJobKind.Paladin ||
        c === ClassJobKind.Warrior ||
        c === ClassJobKind.DarkKnight ||
        c === ClassJobKind.Gunbreaker,

    isMeleeDPS: (c: ClassJobKind): boolean =>
        c === ClassJobKind.Monk ||
        c === ClassJobKind.Dragoon ||
        c === ClassJobKind.Ninja ||
        c === ClassJobKind.Samurai ||
        c === ClassJobKind.Reaper ||
        c === ClassJobKind.Viper,

    isPhysicalRangedDPS: (c: ClassJobKind): boolean =>
        c === ClassJobKind.Bard || c === ClassJobKind.Machinist || c === ClassJobKind.Dancer,

    isMagicRangedDPS: (c: ClassJobKind): boolean =>
        c === ClassJobKind.BlackMage ||
        c === ClassJobKind.Summoner ||
        c === ClassJobKind.RedMage ||
        c == ClassJobKind.Pictomancer,

    isDPS: (c: ClassJobKind): boolean =>
        ClassJob.isMeleeDPS(c) || ClassJob.isPhysicalRangedDPS(c) || ClassJob.isMagicRangedDPS(c),

    isPureHealer: (c: ClassJobKind): boolean => c === ClassJobKind.WhiteMage || c === ClassJobKind.Astrologian,

    isBarrierHealer: (c: ClassJobKind): boolean => c === ClassJobKind.Scholar || c === ClassJobKind.Sage,

    isHealer: (c: ClassJobKind): boolean => ClassJob.isPureHealer(c) || ClassJob.isBarrierHealer(c),

    isNonTankPhysical: (c: ClassJobKind): boolean => ClassJob.isMeleeDPS(c) || ClassJob.isPhysicalRangedDPS(c),

    isMagical: (c: ClassJobKind): boolean => ClassJob.isMagicRangedDPS(c) || ClassJob.isHealer(c),

    // use https://cafemaker.wakingsands.com for cn
    details: (c: ClassJobKind, baseUrl: string = 'https://xivapi.com'): Promise<ClassJobDetails> =>
        fetch(`${baseUrl}/ClassJob/${c}`).then((response) => response.json()),

    fromString(s: string): ClassJobKind {
        switch (s) {
            case 'Paladin':
                return ClassJobKind.Paladin
            case 'Monk':
                return ClassJobKind.Monk
            case 'Warrior':
                return ClassJobKind.Warrior
            case 'Dragoon':
                return ClassJobKind.Dragoon
            case 'Bard':
                return ClassJobKind.Bard
            case 'WhiteMage':
                return ClassJobKind.WhiteMage
            case 'BlackMage':
                return ClassJobKind.BlackMage
            case 'Summoner':
                return ClassJobKind.Summoner
            case 'Scholar':
                return ClassJobKind.Scholar
            case 'Ninja':
                return ClassJobKind.Ninja
            case 'Machinist':
                return ClassJobKind.Machinist
            case 'DarkKnight':
                return ClassJobKind.DarkKnight
            case 'Astrologian':
                return ClassJobKind.Astrologian
            case 'Samurai':
                return ClassJobKind.Samurai
            case 'RedMage':
                return ClassJobKind.RedMage
            case 'Gunbreaker':
                return ClassJobKind.Gunbreaker
            case 'Dancer':
                return ClassJobKind.Dancer
            case 'Reaper':
                return ClassJobKind.Reaper
            case 'Sage':
                return ClassJobKind.Sage
            case 'Viper':
                return ClassJobKind.Viper
            case 'Pictomancer':
                return ClassJobKind.Pictomancer
            default:
                throw new Error(`Unknown class job: ${s}`)
        }
    },
}
