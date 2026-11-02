import { describe, expect, it } from 'vitest'
import { trip } from '../data/trip'
import { eventEndsAt, getItinerary, getNextSteps, getRouteStops, getTripPhase, getTripStats } from './trip'

const at = (iso: string) => new Date(iso)

describe('getTripStats', () => {
  it('derives the counts from the data', () => {
    expect(getTripStats(trip)).toEqual({ flights: 5, stays: 4, cities: 4, activities: 7, days: 11 })
  })
})

describe('getItinerary', () => {
  it('numbers the days from 1', () => {
    const itinerary = getItinerary(trip)
    expect(itinerary).toHaveLength(11)
    expect(itinerary[0]?.number).toBe(1)
    expect(itinerary.at(-1)?.number).toBe(11)
  })

  it('resolves flights with airport codes and local time zones', () => {
    const [first] = getItinerary(trip)[0]?.events ?? []
    expect(first).toMatchObject({
      kind: 'flight',
      title: 'GRU → AEP',
      detail: 'LA8140',
      start: '2026-11-20T09:00-03:00',
      timeZone: 'America/Sao_Paulo',
      endTimeZone: 'America/Argentina/Buenos_Aires',
    })
  })
})

describe('eventEndsAt', () => {
  it('keeps a check-in without closing time relevant until the end of the day', () => {
    const checkIn = getItinerary(trip)[0]?.events.find((e) => e.id === 'check-in:calafate-airbnb')
    expect(checkIn).toBeDefined()
    if (!checkIn) return
    expect(eventEndsAt(checkIn).toISOString()).toBe('2026-11-21T03:00:00.000Z')
  })
})

describe('getNextSteps', () => {
  it('starts with the first flight before the trip', () => {
    const steps = getNextSteps(trip, at('2026-11-02T12:00-03:00'), 3)
    expect(steps.map((s) => s.id)).toEqual(['flight:gru-aep', 'flight:aep-fte', 'car-pickup:calafate-car'])
  })

  it('skips events that already ended', () => {
    const steps = getNextSteps(trip, at('2026-11-20T13:00-03:00'), 2)
    expect(steps.map((s) => s.id)).toEqual(['flight:aep-fte', 'car-pickup:calafate-car'])
  })

  it('keeps an event that is in progress', () => {
    const steps = getNextSteps(trip, at('2026-11-20T18:00-03:00'), 1)
    expect(steps[0]?.id).toBe('flight:aep-fte')
  })

  it('keeps untimed events for their whole day', () => {
    const steps = getNextSteps(trip, at('2026-11-21T22:00-03:00'), 1)
    expect(steps[0]?.id).toBe('activity:perito-moreno')
  })

  it('drops untimed events once the next timed event of the day has started', () => {
    // 26/11: check-out and drive have no time; the car drop-off is at 12:00.
    expect(getNextSteps(trip, at('2026-11-26T09:00-03:00'), 1)[0]?.id).toBe('check-out:chalten-ruta-40')
    expect(getNextSteps(trip, at('2026-11-26T12:30-03:00'), 1)[0]?.id).toBe('flight:fte-ush')
  })

  it('returns nothing after the trip', () => {
    expect(getNextSteps(trip, at('2026-12-01T10:00-03:00'))).toEqual([])
  })

  it('respects the limit', () => {
    expect(getNextSteps(trip, at('2026-11-02T12:00-03:00'), 5)).toHaveLength(5)
  })
})

describe('getTripPhase', () => {
  it('counts down before the trip', () => {
    expect(getTripPhase(trip, at('2026-11-02T23:30-03:00'))).toEqual({ phase: 'before', daysUntil: 18 })
    expect(getTripPhase(trip, at('2026-11-19T23:59-03:00'))).toEqual({ phase: 'before', daysUntil: 1 })
  })

  it('reports the day number during the trip', () => {
    expect(getTripPhase(trip, at('2026-11-20T00:00-03:00'))).toEqual({ phase: 'during', dayNumber: 1 })
    // 22:00 local is already the next day in UTC; the day number must not change.
    expect(getTripPhase(trip, at('2026-11-25T22:00-03:00'))).toEqual({ phase: 'during', dayNumber: 6 })
    expect(getTripPhase(trip, at('2026-11-30T23:59-03:00'))).toEqual({ phase: 'during', dayNumber: 11 })
  })

  it('reports when the trip is over', () => {
    expect(getTripPhase(trip, at('2026-12-01T00:00-03:00'))).toEqual({ phase: 'after' })
  })
})

describe('getRouteStops', () => {
  it('lists the route with nights per stay and the first Buenos Aires as a connection', () => {
    expect(getRouteStops(trip).map(({ name, role, nights }) => ({ name, role, nights }))).toEqual([
      { name: 'São Paulo', role: 'origin', nights: undefined },
      { name: 'Buenos Aires', role: 'connection', nights: undefined },
      { name: 'El Calafate', role: 'stay', nights: 2 },
      { name: 'El Chaltén', role: 'stay', nights: 4 },
      { name: 'Ushuaia', role: 'stay', nights: 3 },
      { name: 'Buenos Aires', role: 'stay', nights: 1 },
      { name: 'São Paulo', role: 'return', nights: undefined },
    ])
  })
})
