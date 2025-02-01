import { ClassJob } from './classjobs/classjob.ts'

const MERGE_RESOLUTION = 500

export class FFLogsClient {
    private readonly baseUrl: string
    private readonly apiKey: string

    constructor(apiKey: string, baseUrl: string = 'https://www.fflogs.com/v1') {
        this.apiKey = apiKey
        this.baseUrl = baseUrl
    }

    // API: GET `/report/fights/{code}`
    async getFights(code: string, translate: boolean = false): Promise<Fights> {
        const url = `${this.baseUrl}/report/fights/${code}?api_key=${this.apiKey}&translate=${translate}`
        const response = await fetch(url)

        const data = await response.json()
        return {
            code: code,
            ...data,
        }
    }

    // API: GET `/report/events/{view}/{code}`
    async getDamageEvents(
        fights: Fights,
        index: number,
        mergeResolution: number = MERGE_RESOLUTION,
    ): Promise<DamageEvent[][]> {
        const fight = fights.fights[index]!
        const phases: FightPhase[] = fight.phases || [{ id: 1, startTime: fight.start_time }]

        const events: Map<string, DamageTakenEvent[]>[] = await Promise.all(
            phases.map(async (phase, idx) => {
                const endTime = phases[idx + 1] ? phases[idx + 1]!.startTime : fight.end_time
                let startTime = phase.startTime

                // fetch all events, merged into [alignedTime, sourceID, ability.guid] => events
                const events = new Map<string, DamageTakenEvent[]>()
                while (true) {
                    const url = `${this.baseUrl}/report/events/damage-taken/${fights.code}?start=${startTime}&end=${endTime}&api_key=${this.apiKey}`
                    const response = await fetch(url)
                    const data: DamageTakenEventsResponse = await response.json()

                    data.events.forEach((e) => {
                        if (e.type === 'damage' && !e.sourceIsFriendly && e.targetIsFriendly) {
                            const timeOffset = e.timestamp - phase.startTime
                            const alignedTime = Math.round(timeOffset / mergeResolution) * mergeResolution
                            const key = JSON.stringify([alignedTime, e.sourceID, e.ability.guid])

                            if (!events.has(key)) {
                                events.set(key, [])
                            }

                            events.get(key)!.push(e)
                        }
                    })

                    if (data.nextPageTimestamp) {
                        startTime = data.nextPageTimestamp
                    } else {
                        break
                    }
                }
                return events
            }),
        )

        const firstEventTime = events[0]!.values().next().value![0]!.timestamp

        return events.map((events) =>
            Array.from(events.values()).map((events) => {
                const firstEvent = events[0]!
                const timeOffset = firstEvent.timestamp - firstEventTime

                const ability = {
                    name: firstEvent.ability.name,
                    guid: firstEvent.ability.guid,
                    type: GetAbilityType(firstEvent.ability.type),
                    abilityIcon: firstEvent.ability.abilityIcon,
                }

                let amount: Record<TargetType, DamageAmount | undefined> = {
                    tank: undefined,
                    physical: undefined,
                    magical: undefined,
                }

                let totalDamage = 0

                events.forEach((e) => {
                    let damageAmount
                    if (!e.unmitigatedAmount) {
                        // shieled all the damage, can we estimate the amount?
                        damageAmount = Math.round(((e.absorbed || 0) + (e.blocked || 0)) / (e.multiplier || 1))
                    } else {
                        damageAmount = e.unmitigatedAmount
                    }
                    totalDamage += damageAmount
                    const targetType = GetTargetType(fights.friendlies.find((f) => f.id === e.targetID)!.type)
                    if (!amount[targetType]) {
                        amount[targetType] = { min: damageAmount, max: damageAmount, count: 1 }
                        return
                    }
                    amount[targetType].min = Math.min(amount[targetType].min, damageAmount)
                    amount[targetType].max = Math.max(amount[targetType].max, damageAmount)
                    amount[targetType].count += 1
                })

                return {
                    timeOffset: timeOffset,
                    sourceID: firstEvent.sourceID,
                    ability: ability,
                    amount: amount,
                    totalDamage: totalDamage,
                }
            }),
        )
    }
}

export interface Fights {
    code: string
    fights: Fight[]
    friendlies: Friendly[]
    phases: PhaseDefinition[]
}

export interface Fight {
    id: number
    boss: number
    start_time: number
    end_time: number
    name: string
    kill: boolean
    combatTime: number
    phases?: FightPhase[]
}

export interface FightPhase {
    id: number
    startTime: number
}

export interface Friendly {
    id: number
    type: string
}

export interface PhaseDefinition {
    boss: number
    separatesWipes: boolean
    phases: string[]
    intermissions: number[]
}

export type EventView = 'damage-taken'

export interface GetEventsParams {
    start?: number
    end?: number
}

interface DamageTakenEventsResponse {
    events: DamageTakenEvent[]
    nextPageTimestamp?: number
}

interface DamageTakenEvent {
    timestamp: number
    type: string
    sourceID: number
    sourceIsFriendly: boolean
    targetID: number
    targetIsFriendly: boolean
    ability: AbilityResponse
    blocked?: number
    absorbed?: number
    unmitigatedAmount?: number
    multiplier?: number
}

interface AbilityResponse {
    name: string
    guid: number
    type: number
    abilityIcon: string
}

export interface Ability {
    name: string
    guid: number
    type: AbilityType
    abilityIcon: string
}

export type AbilityType = 'physical' | 'magical' | 'other'

const GetAbilityType = (a: number): AbilityType => {
    if (a === 128) {
        return 'physical'
    } else if (a === 1024) {
        return 'magical'
    }
    return 'other'
}

export interface DamageEvent {
    timeOffset: number
    sourceID: number
    ability: Ability
    amount: Record<TargetType, DamageAmount | undefined>
    totalDamage: number
}

export interface DamageAmount {
    min: number
    max: number
    count: number
}

export type TargetType = 'tank' | 'physical' | 'magical'

const GetTargetType = (c: string): TargetType => {
    const classjob = ClassJob.fromString(c)
    if (ClassJob.isNonTankPhysical(classjob)) {
        return 'physical'
    } else if (ClassJob.isMagical(classjob)) {
        return 'magical'
    }
    // no matter the class is tank or we don't know, we treat it as tank
    return 'tank'
}
