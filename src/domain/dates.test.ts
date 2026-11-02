import { describe, expect, it } from 'vitest'
import {
  addDays,
  arrivalDayOffset,
  daysBetween,
  endOfDay,
  localDate,
  startOfDay,
  tripLengthInDays,
  utcOffsetMinutes,
} from './dates'

const BA = 'America/Argentina/Buenos_Aires'

describe('calendar arithmetic', () => {
  it('adds days across month boundaries', () => {
    expect(addDays('2026-11-30', 1)).toBe('2026-12-01')
    expect(addDays('2026-11-20', -1)).toBe('2026-11-19')
  })

  it('counts days between dates', () => {
    expect(daysBetween('2026-11-20', '2026-11-30')).toBe(10)
    expect(daysBetween('2026-11-30', '2026-11-20')).toBe(-10)
  })

  it('counts trip days inclusively', () => {
    expect(tripLengthInDays('2026-11-20', '2026-11-30')).toBe(11)
    expect(tripLengthInDays('2026-11-20', '2026-11-20')).toBe(1)
  })
})

describe('time zones', () => {
  it('reads the local calendar date, not the UTC one', () => {
    // 22:00 in Buenos Aires is already the next day in UTC.
    expect(localDate('2026-11-20T22:00-03:00', BA)).toBe('2026-11-20')
    expect(localDate('2026-11-20T22:00-03:00', 'UTC')).toBe('2026-11-21')
  })

  it('knows the UTC offset of Brazil and Argentina in November', () => {
    const instant = new Date('2026-11-20T12:00Z')
    expect(utcOffsetMinutes('America/Sao_Paulo', instant)).toBe(-180)
    expect(utcOffsetMinutes('America/Argentina/Ushuaia', instant)).toBe(-180)
    expect(utcOffsetMinutes('UTC', instant)).toBe(0)
  })

  it('finds the start and end of a local day', () => {
    expect(startOfDay('2026-11-20', BA).toISOString()).toBe('2026-11-20T03:00:00.000Z')
    expect(endOfDay('2026-11-20', BA).toISOString()).toBe('2026-11-21T03:00:00.000Z')
  })

  it('detects arrivals on the next local day', () => {
    expect(arrivalDayOffset('2026-11-29T20:55-03:00', BA, '2026-11-30T00:25-03:00', BA)).toBe(1)
    expect(arrivalDayOffset('2026-11-20T09:00-03:00', 'America/Sao_Paulo', '2026-11-20T12:00-03:00', BA)).toBe(0)
  })
})
