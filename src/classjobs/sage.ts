import type { Action } from "classjobs";

// 自生
export const Physis: Action = {
    id: 24288,
    type: "Ability",
    classJobLevel: 20,
    cast: 0,
    recast: 600,

    icon: "/i/003000/003656.png",
    iconHD: "/i/003000/003656_hr1.png",
};

// 坚角清汁
export const Kerachole: Action = {
    id: 24298,
    type: "Ability",
    classJobLevel: 50,
    cast: 0,
    recast: 300,

    icon: "/i/003000/003666.png",
    iconHD: "/i/003000/003666_hr1.png",
};

// 寄生清汁
export const Ixochole: Action = {
    id: 24299,
    type: "Ability",
    classJobLevel: 52,
    cast: 0,
    recast: 300,
    
    icon: "/i/003000/003667.png",
    iconHD: "/i/003000/003667_hr1.png",
};

// 活化
export const Zoe: Action = {
    id: 24300,
    type: "Ability",
    classJobLevel: 56,
    cast: 0,
    recast: {
        default: 1200,
        classJobLevel: {
            88: 900,
        }
    },

    icon: "/i/003000/003668.png",
    iconHD: "/i/003000/003668_hr1.png",
};

// 白牛清汁
export const Taurochole: Action = {
    id: 24303,
    type: "Ability",
    classJobLevel: 62,
    cast: 0,
    recast: 450,

    icon: "/i/003000/003671.png",
    iconHD: "/i/003000/003671_hr1.png",
};

// 输血
export const Haima: Action = {
    id: 24305,
    type: "Ability",
    classJobLevel: 70,
    cast: 0,
    recast: 1200,

    icon: "/i/003000/003673.png",
    iconHD: "/i/003000/003673_hr1.png",
};

// 整体论
export const Holos: Action = {
    id: 24310,
    type: "Ability",
    classJobLevel: 76,
    cast: 0,
    recast: 1200,

    icon: "/i/003000/003678.png",
    iconHD: "/i/003000/003678_hr1.png",
};

// 泛输血
export const Panhaima: Action = {
    id: 24311,
    type: "Ability",
    classJobLevel: 80,
    cast: 0,
    recast: 1200,

    icon: "/i/003000/003679.png",
    iconHD: "/i/003000/003679_hr1.png",
};

// 魂灵风息
export const Pneuma: Action = {
    id: 24318,
    type: "Spell",
    classJobLevel: 90,
    cast: 15,
    recast: 1200,

    icon: "/i/003000/003686.png",
    iconHD: "/i/003000/003686_hr1.png",
}

// 智慧之爱
export const Philosophia: Action = {
    id: 37035,
    type: "Ability",
    classJobLevel: 100,
    cast: 0,
    recast: 180,

    icon: "/i/003000/003690.png",
    iconHD: "/i/003000/003690_hr1.png",
}

export const SageActions: Action[] = [
    Physis,
    Kerachole,
    Ixochole,
    Zoe,
    Taurochole,
    Haima,
    Holos,
    Panhaima,
    Pneuma,
    Philosophia
]