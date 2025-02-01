import { expect, test, describe } from "bun:test";
import { ClassJob } from "./classjob";

describe('ClassJob', () => {
    test('Sage', async () => {
        expect(ClassJob.isTank(ClassJob.Sage)).toBeFalse();
        expect(ClassJob.isMeleeDPS(ClassJob.Sage)).toBeFalse();
        expect(ClassJob.isPhysicalRangedDPS(ClassJob.Sage)).toBeFalse();
        expect(ClassJob.isMagicRangedDPS(ClassJob.Sage)).toBeFalse();
        expect(ClassJob.isDPS(ClassJob.Sage)).toBeFalse();
        expect(ClassJob.isPureHealer(ClassJob.Sage)).toBeFalse();
        expect(ClassJob.isBarrierHealer(ClassJob.Sage)).toBeTrue();
        expect(ClassJob.isHealer(ClassJob.Sage)).toBeTrue();
        expect(ClassJob.isNonTankPhysical(ClassJob.Sage)).toBeFalse();
        expect(ClassJob.isMagical(ClassJob.Sage)).toBeTrue();

        const details = await ClassJob.details(ClassJob.Sage);

        expect(details).toBeObject();
        expect(details.Abbreviation).toEqual("SGE");
        expect(details.Name).toEqual("Sage");
    })
})