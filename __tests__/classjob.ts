import { describe, test, expect } from 'vitest'
import { ClassJob } from '../src/classjobs/classjob.js'

describe('ClassJob', () => {
    test('Sage', async () => {
        expect(ClassJob.isTank(ClassJob.Sage)).toBeFalsy()
        expect(ClassJob.isMeleeDPS(ClassJob.Sage)).toBeFalsy()
        expect(ClassJob.isPhysicalRangedDPS(ClassJob.Sage)).toBeFalsy()
        expect(ClassJob.isMagicRangedDPS(ClassJob.Sage)).toBeFalsy()
        expect(ClassJob.isDPS(ClassJob.Sage)).toBeFalsy()
        expect(ClassJob.isPureHealer(ClassJob.Sage)).toBeFalsy()
        expect(ClassJob.isBarrierHealer(ClassJob.Sage)).toBeTruthy()
        expect(ClassJob.isHealer(ClassJob.Sage)).toBeTruthy()
        expect(ClassJob.isNonTankPhysical(ClassJob.Sage)).toBeFalsy()
        expect(ClassJob.isMagical(ClassJob.Sage)).toBeTruthy()

        const details = await ClassJob.details(ClassJob.Sage)

        expect(details).toBeDefined()
        expect(details.Abbreviation).toEqual('SGE')
        expect(details.Name).toEqual('sage')

        expect(ClassJob.fromString('Sage')).toEqual(ClassJob.Sage)
        expect(ClassJob.fromString('sage')).toEqual(ClassJob.Sage)
        expect(ClassJob.fromString('s age ')).toEqual(ClassJob.Sage)
    })
})
