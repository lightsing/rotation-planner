import { expect, test, describe } from "bun:test";
import { FFLogsClient } from "fflogs";

describe('FFLogsClient', () => {
    test('Savage', async () => {
        const client = new FFLogsClient(Bun.env.FFLOGS_API_KEY!, "https://cn.fflogs.com/v1");
        const fights = await client.getFights('HfrpNycxX2FvPKjW', true);
        // const fights = await client.getFights('fDvYH13qCTNBLbn2', true);

        const events = await client.getDamageEvents(fights, 0);
        expect(events).toBeArray();
        // console.log(JSON.stringify(events));
        events.forEach(e => console.log(e.length));
        console.log(JSON.stringify(events[0]));
    })

    // test('Ultimate', async () => {
    //     const client = new FFLogsClient(Bun.env.FFLOGS_API_KEY!, "https://cn.fflogs.com/v1");
    //     const fights = await client.getFights('CNMj7XrGfqJz9K6g', true);
    //     const fight = fights.fights[35];
    //     expect(fights.phases).toBeArray();
    //     expect(fight.phases).toBeArray();

    //     const events = await client.getDamageEvents('CNMj7XrGfqJz9K6g', fight, fights.friendlies);
    //     expect(events).toBeArray();
    //     // console.log(JSON.stringify(events));
    //     events.forEach(e => console.log(e.length));
    //     console.log(JSON.stringify(events[3]));
    // })
})