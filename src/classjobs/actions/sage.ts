import type { Action } from './index.ts'

// 注药
export const Dosis: Action = {
    id: {
        default: 24283,
        upgrades: {
            72: 24306,
        },
    },
    type: 'GCD',
    classJobLevel: 1,
    cast: { default: 15 },
    recast: { default: 250 },
}

// 自生
export const Physis: Action = {
    id: {
        default: 24288,
        upgrades: {
            60: 24302,
        },
    },
    type: 'Ability',
    classJobLevel: 20,
    cast: { default: 0 },
    recast: { default: 600 },
}

// 坚角清汁
export const Kerachole: Action = {
    id: { default: 24298 },
    type: 'Ability',
    classJobLevel: 50,
    cast: { default: 0 },
    recast: { default: 300 },
}

// 寄生清汁
export const Ixochole: Action = {
    id: { default: 24299 },
    type: 'Ability',
    classJobLevel: 52,
    cast: { default: 0 },
    recast: { default: 300 },
}

// 活化
export const Zoe: Action = {
    id: { default: 24300 },
    type: 'Ability',
    classJobLevel: 56,
    cast: { default: 0 },
    recast: {
        default: 1200,
        upgrades: {
            88: 900,
        },
    },
}

// 白牛清汁
export const Taurochole: Action = {
    id: { default: 24303 },
    type: 'Ability',
    classJobLevel: 62,
    cast: { default: 0 },
    recast: { default: 450 },
}

// 输血
export const Haima: Action = {
    id: { default: 24305 },
    type: 'Ability',
    classJobLevel: 70,
    cast: { default: 0 },
    recast: { default: 1200 },
}

// 整体论
export const Holos: Action = {
    id: { default: 24310 },
    type: 'Ability',
    classJobLevel: 76,
    cast: { default: 0 },
    recast: { default: 1200 },
}

// 泛输血
export const Panhaima: Action = {
    id: { default: 24311 },
    type: 'Ability',
    classJobLevel: 80,
    cast: { default: 0 },
    recast: { default: 1200 },
}

// 魂灵风息
export const Pneuma: Action = {
    id: { default: 24318 },
    type: 'GCD',
    classJobLevel: 90,
    cast: { default: 15 },
    recast: { default: 1200 },
}

// 智慧之爱
export const Philosophia: Action = {
    id: { default: 37035 },
    type: 'Ability',
    classJobLevel: 100,
    cast: { default: 0 },
    recast: { default: 180 },
}

export const SageActions: Action[] = [
    Dosis,
    Physis,
    Kerachole,
    Ixochole,
    Zoe,
    Taurochole,
    Haima,
    Holos,
    Panhaima,
    Pneuma,
    Philosophia,
]
