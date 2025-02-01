import { describe, test, expect } from 'vitest'
import { FFLogsClient } from '../src/fflogs.js'

describe('FFLogsClient', () => {
    test('Savage', async () => {
        const client = new FFLogsClient(process.env.FFLOGS_API_KEY!, 'https://cn.fflogs.com/v1')
        const fights = await client.getFights('HfrpNycxX2FvPKjW', true)
        // const fights = await client.getFights('fDvYH13qCTNBLbn2', true);

        const events = await client.getDamageEvents(fights, 0)
        expect(events).toBeDefined()
        // console.log(JSON.stringify(events));
        events.forEach((e) => console.log(e.length))
    })

    test('Ultimate', async () => {
        const client = new FFLogsClient(process.env.FFLOGS_API_KEY!, "https://cn.fflogs.com/v1");
        const fights = await client.getFights('CNMj7XrGfqJz9K6g', true);
        expect(fights.phases).toBeDefined();

        const events = await client.getDamageEvents(fights, 35);
        expect(events).toBeDefined();
        events.forEach(e => console.log(e.length));
    }, {
        timeout: 10000,
    })
})
