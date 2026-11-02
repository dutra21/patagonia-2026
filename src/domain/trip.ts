import { daysBetween, endOfDay, localDate, startOfDay, tripLengthInDays } from './dates'
import type { ItineraryDay, ItineraryRef, Place, PlaceId, Stay, TransferMode, Trip, TripEvent } from './types'

function findById<T extends { id: string }>(items: readonly T[], id: string, label: string): T {
  const item = items.find((candidate) => candidate.id === id)
  if (!item) throw new Error(`${label} not found: ${id}`)
  return item
}

function placeLabel(place: Place): string {
  return place.airport?.code ?? place.name
}

function resolveRef(trip: Trip, day: ItineraryDay, ref: ItineraryRef): TripEvent {
  const place = (id: PlaceId) => trip.places[id]
  const base = { id: `${ref.kind}:${ref.id}`, date: day.date }

  switch (ref.kind) {
    case 'flight': {
      const flight = findById(trip.flights, ref.id, 'Flight')
      const from = place(flight.from)
      const to = place(flight.to)
      return {
        ...base,
        kind: 'flight',
        title: `${placeLabel(from)} → ${placeLabel(to)}`,
        detail: flight.code ?? 'Número do voo a confirmar',
        start: flight.departure,
        end: flight.arrival,
        timeZone: from.timeZone,
        endTimeZone: to.timeZone,
      }
    }
    case 'transfer': {
      const transfer = findById(trip.transfers, ref.id, 'Transfer')
      const from = place(transfer.from)
      return {
        ...base,
        kind: transfer.mode,
        title: `${from.name} → ${place(transfer.to).name}`,
        detail: transfer.mode === 'car' ? 'De carro' : 'De ônibus',
        ...(transfer.start ? { start: transfer.start } : {}),
        timeZone: from.timeZone,
        endTimeZone: from.timeZone,
      }
    }
    case 'activity': {
      const activity = findById(trip.activities, ref.id, 'Activity')
      const { timeZone } = place(activity.placeId)
      const detail = activity.meetingPoint ?? activity.transport
      return {
        ...base,
        kind: 'activity',
        title: activity.name,
        ...(detail ? { detail } : {}),
        ...(activity.start ? { start: activity.start } : {}),
        timeZone,
        endTimeZone: timeZone,
      }
    }
    case 'check-in':
    case 'check-out': {
      const stay = findById(trip.stays, ref.id, 'Stay')
      const { timeZone } = place(stay.placeId)
      // Check-in is a window ("from"–"until"); check-out is a deadline ("until").
      const start = ref.kind === 'check-in' ? stay.checkIn.from : undefined
      const end = ref.kind === 'check-in' ? stay.checkIn.until : stay.checkOut.until
      return {
        ...base,
        kind: ref.kind,
        title: `${ref.kind === 'check-in' ? 'Check-in' : 'Check-out'}: ${stay.name}`,
        detail: stay.address,
        ...(start ? { start } : {}),
        ...(end ? { end } : {}),
        timeZone,
        endTimeZone: timeZone,
      }
    }
    case 'car-pickup':
    case 'car-dropoff': {
      const rental = findById(trip.carRentals, ref.id, 'Car rental')
      const { timeZone } = place(rental.placeId)
      const step = ref.kind === 'car-pickup' ? rental.pickup : rental.dropoff
      return {
        ...base,
        kind: ref.kind,
        title: ref.kind === 'car-pickup' ? 'Retirada do carro' : 'Devolução do carro',
        detail: step.location,
        start: step.at,
        timeZone,
        endTimeZone: timeZone,
      }
    }
  }
}

export interface ResolvedDay {
  /** 1-based day number within the trip. */
  number: number
  day: ItineraryDay
  events: TripEvent[]
}

export function getItinerary(trip: Trip): ResolvedDay[] {
  return trip.days.map((day, index) => ({
    number: index + 1,
    day,
    events: day.items.map((ref) => resolveRef(trip, day, ref)),
  }))
}

/**
 * When the event stops being relevant.
 * - Timed events: their end, or their start.
 * - Check-ins without a closing time: the end of the day.
 * - Untimed events: when the next timed event of the same day starts
 *   (`nextTimedStart`), otherwise the end of the day.
 */
export function eventEndsAt(event: TripEvent, nextTimedStart?: Date): Date {
  if (event.end) return new Date(event.end)
  if (event.start) return event.kind === 'check-in' ? endOfDay(event.date, event.timeZone) : new Date(event.start)
  return nextTimedStart ?? endOfDay(event.date, event.timeZone)
}

/** Upcoming or in-progress events after `now`, in itinerary order. */
export function getNextSteps(trip: Trip, now: Date, limit = 5): TripEvent[] {
  return getItinerary(trip)
    .flatMap(({ events }) =>
      events.filter((event, index) => {
        const nextTimed = events.slice(index + 1).find((later) => later.start)?.start
        return eventEndsAt(event, nextTimed ? new Date(nextTimed) : undefined).getTime() > now.getTime()
      }),
    )
    .slice(0, limit)
}

export interface TripStats {
  flights: number
  stays: number
  cities: number
  activities: number
  days: number
}

export function getTripStats(trip: Trip): TripStats {
  return {
    flights: trip.flights.length,
    stays: trip.stays.length,
    cities: new Set(trip.stays.map((stay) => stay.placeId)).size,
    activities: trip.activities.length,
    days: tripLengthInDays(trip.start, trip.end),
  }
}

export type TripPhase =
  | { phase: 'before'; daysUntil: number }
  | { phase: 'during'; dayNumber: number }
  | { phase: 'after' }

/** Where `now` falls relative to the trip, using the origin's calendar. */
export function getTripPhase(trip: Trip, now: Date): TripPhase {
  const { timeZone } = trip.places[trip.origin]
  if (now < startOfDay(trip.start, timeZone)) {
    return { phase: 'before', daysUntil: daysBetween(localDate(now, timeZone), trip.start) }
  }
  if (now >= endOfDay(trip.end, timeZone)) return { phase: 'after' }
  return { phase: 'during', dayNumber: daysBetween(trip.start, localDate(now, timeZone)) + 1 }
}

export function nightsOf(stay: Stay): number {
  return daysBetween(stay.checkIn.date, stay.checkOut.date)
}

export interface RouteStop {
  placeId: PlaceId
  name: string
  airportCode?: string
  role: 'origin' | 'stay' | 'connection' | 'return'
  /** Nights spent here, for `stay` stops. */
  nights?: number
}

/** The route as a list of stops, matching stays in order (a city visited twice can be a connection once). */
export function getRouteStops(trip: Trip): RouteStop[] {
  const pendingStays = [...trip.stays]
  const lastIndex = trip.route.length - 1

  return trip.route.map((placeId, index) => {
    const { name, airport } = trip.places[placeId]
    const base = { placeId, name, ...(airport ? { airportCode: airport.code } : {}) }
    if (index === 0) return { ...base, role: 'origin' }
    if (index === lastIndex) return { ...base, role: 'return' }

    const stay = pendingStays[0]
    if (stay?.placeId === placeId) {
      pendingStays.shift()
      return { ...base, role: 'stay', nights: nightsOf(stay) }
    }
    return { ...base, role: 'connection' }
  })
}

export interface RouteLeg {
  id: string
  from: PlaceId
  to: PlaceId
  mode: 'flight' | TransferMode
}

/** Every flight and ground transfer, in itinerary order. */
export function getRouteLegs(trip: Trip): RouteLeg[] {
  return trip.days.flatMap((day) =>
    day.items.flatMap((ref): RouteLeg[] => {
      if (ref.kind === 'flight') {
        const flight = findById(trip.flights, ref.id, 'Flight')
        return [{ id: ref.id, from: flight.from, to: flight.to, mode: 'flight' }]
      }
      if (ref.kind === 'transfer') {
        const transfer = findById(trip.transfers, ref.id, 'Transfer')
        return [{ id: ref.id, from: transfer.from, to: transfer.to, mode: transfer.mode }]
      }
      return []
    }),
  )
}
