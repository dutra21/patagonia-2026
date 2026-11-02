import { describe, expect, it } from 'vitest'
import { addDays, localDate, tripLengthInDays } from '../domain/dates'
import { getItinerary } from '../domain/trip'
import { checklistCategories, checklistItems, trip } from './trip'

const ISO_DATE_TIME_WITH_OFFSET = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?[+-]\d{2}:\d{2}$/
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function collectDateTimes(value: unknown, path = 'trip'): [string, string][] {
  if (typeof value === 'string') return value.includes('T') && /^\d{4}-/.test(value) ? [[path, value]] : []
  if (Array.isArray(value)) return value.flatMap((item, i) => collectDateTimes(item, `${path}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => collectDateTimes(item, `${path}.${key}`))
  }
  return []
}

function expectUniqueIds(items: readonly { id: string }[]) {
  const ids = items.map((item) => item.id)
  expect(new Set(ids).size).toBe(ids.length)
}

describe('trip data', () => {
  it('uses ISO 8601 date-times with an explicit offset everywhere', () => {
    const dateTimes = collectDateTimes(trip)
    expect(dateTimes.length).toBeGreaterThan(10)
    for (const [path, value] of dateTimes) {
      expect(value, path).toMatch(ISO_DATE_TIME_WITH_OFFSET)
    }
  })

  it('has one itinerary day per trip day, in order', () => {
    expect(trip.days).toHaveLength(tripLengthInDays(trip.start, trip.end))
    trip.days.forEach((day, i) => {
      expect(day.date).toMatch(ISO_DATE)
      expect(day.date).toBe(addDays(trip.start, i))
    })
  })

  it('has unique ids in every collection', () => {
    expectUniqueIds(trip.flights)
    expectUniqueIds(trip.stays)
    expectUniqueIds(trip.activities)
    expectUniqueIds(trip.transfers)
    expectUniqueIds(trip.carRentals)
    expectUniqueIds(checklistItems)
  })

  it('references only existing entries', () => {
    expect(() => getItinerary(trip)).not.toThrow()
  })

  it('places each timed event on its itinerary day, in local time', () => {
    const timed = getItinerary(trip).flatMap(({ day, events }) =>
      events.flatMap((event) => (event.start ? [{ day, event, start: event.start }] : [])),
    )
    expect(timed.length).toBeGreaterThan(10)
    for (const { day, event, start } of timed) {
      expect(localDate(start, event.timeZone), event.id).toBe(day.date)
    }
  })

  it('lists timed events of a day in chronological order', () => {
    for (const { events } of getItinerary(trip)) {
      const starts = events.flatMap((e) => (e.start && e.kind !== 'check-in' ? [Date.parse(e.start)] : []))
      expect(starts).toEqual([...starts].sort((a, b) => a - b))
    }
  })

  it('schedules every flight, activity, transfer and stay in the itinerary', () => {
    const ids = new Set(trip.days.flatMap((day) => day.items.map((item) => `${item.kind}:${item.id}`)))
    for (const flight of trip.flights) expect(ids, flight.id).toContain(`flight:${flight.id}`)
    for (const activity of trip.activities) expect(ids, activity.id).toContain(`activity:${activity.id}`)
    for (const transfer of trip.transfers) expect(ids, transfer.id).toContain(`transfer:${transfer.id}`)
    for (const stay of trip.stays) {
      expect(ids, stay.id).toContain(`check-in:${stay.id}`)
      expect(ids, stay.id).toContain(`check-out:${stay.id}`)
    }
  })

  it('has flights that land after they take off', () => {
    for (const flight of trip.flights) {
      expect(Date.parse(flight.arrival), flight.id).toBeGreaterThan(Date.parse(flight.departure))
    }
  })

  it('assigns every checklist item to a known category', () => {
    const categories = new Set(checklistCategories.map((c) => c.id))
    for (const item of checklistItems) expect(categories, item.id).toContain(item.category)
  })
})
