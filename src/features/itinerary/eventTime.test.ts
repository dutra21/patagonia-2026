import { describe, expect, it } from 'vitest'
import type { TripEvent } from '../../domain/types'
import { formatEventTime } from './eventTime'

const BA = 'America/Argentina/Buenos_Aires'
const event = (overrides: Partial<TripEvent>): TripEvent => ({
  id: 'x',
  kind: 'activity',
  date: '2026-11-20',
  title: 'x',
  timeZone: BA,
  endTimeZone: BA,
  ...overrides,
})

describe('formatEventTime', () => {
  it('shows departure and arrival for flights, with +1 when landing the next day', () => {
    expect(formatEventTime(event({ kind: 'flight', start: '2026-11-20T09:00-03:00', end: '2026-11-20T12:00-03:00' }))).toBe('09:00 → 12:00')
    expect(formatEventTime(event({ kind: 'flight', start: '2026-11-29T20:55-03:00', end: '2026-11-30T00:25-03:00' }))).toBe(
      '20:55 → 00:25 (+1 dia)',
    )
  })

  it('describes check-in windows and check-out deadlines', () => {
    expect(formatEventTime(event({ kind: 'check-in', start: '2026-11-22T14:00-03:00', end: '2026-11-22T20:30-03:00' }))).toBe('14:00–20:30')
    expect(formatEventTime(event({ kind: 'check-in', start: '2026-11-20T15:00-03:00' }))).toBe('a partir de 15:00')
    expect(formatEventTime(event({ kind: 'check-out', end: '2026-11-22T10:00-03:00' }))).toBe('até 10:00')
    expect(formatEventTime(event({ kind: 'check-out' }))).toBeUndefined()
  })

  it('shows the start time of other events, or nothing', () => {
    expect(formatEventTime(event({ start: '2026-11-27T08:30-03:00' }))).toBe('08:30')
    expect(formatEventTime(event({ kind: 'car' }))).toBeUndefined()
  })
})
