import { describe, test } from 'vitest'
import { SortedArrayMap } from "../src/utils.js";

describe('SortedArrayMap', () => {
    test('sorted', () => {
        const map = new SortedArrayMap<number>()
        
        // random insertion
        for (let i = 0; i < 100; i++) {
            map.set(Math.floor(Math.random() * 100), i)
        }
    })
})