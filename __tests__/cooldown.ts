import { describe, test, expect } from 'vitest'
import { CooldownManager } from '../src/cooldown.js'
import { Pneuma } from '../src/classjobs/actions/sage.js'

describe('CooldownManager', () => {
    test('atLeastAvailableAt', () => {
        const manager = new CooldownManager(80)

        expect(manager.atLeastAvailableAt(Pneuma)).toBe(0)
        expect(manager.use(Pneuma, 0).success).toBeTruthy()

        expect(manager.atLeastAvailableAt(Pneuma)).toBe(1200)
        expect(manager.use(Pneuma, 1000).success).toBeFalsy()
    })
})