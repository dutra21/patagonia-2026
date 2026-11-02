/** ISO 8601 date-time with an explicit offset, e.g. "2026-11-20T09:00-03:00". */
export type IsoDateTime = string
/** ISO 8601 calendar date, e.g. "2026-11-20". */
export type IsoDate = string

export type PlaceId = 'sao-paulo' | 'buenos-aires' | 'el-calafate' | 'el-chalten' | 'ushuaia'

export interface Airport {
  code: string
  name: string
}

export interface Place {
  id: PlaceId
  name: string
  /** IANA time zone used to display local times. */
  timeZone: string
  airport?: Airport
}

export interface Traveler {
  id: string
  name: string
}

export interface Flight {
  id: string
  /** Flight number. Undefined while not confirmed. */
  code?: string
  from: PlaceId
  to: PlaceId
  departure: IsoDateTime
  arrival: IsoDateTime
}

export interface Stay {
  id: string
  placeId: PlaceId
  name: string
  address: string
  checkIn: { date: IsoDate; from?: IsoDateTime; until?: IsoDateTime }
  checkOut: { date: IsoDate; until?: IsoDateTime }
}

export type Difficulty = 'easy' | 'moderate' | 'hard'

export interface Activity {
  id: string
  name: string
  placeId: PlaceId
  date: IsoDate
  start?: IsoDateTime
  description: string
  /** How the group gets there. */
  transport?: string
  meetingPoint?: string
  /** Undefined while not confirmed. */
  difficulty?: Difficulty
}

export type TransferMode = 'car' | 'bus'

export interface Transfer {
  id: string
  mode: TransferMode
  from: PlaceId
  to: PlaceId
  date: IsoDate
  start?: IsoDateTime
}

export interface CarRental {
  id: string
  placeId: PlaceId
  pickup: { at: IsoDateTime; location: string }
  dropoff: { at: IsoDateTime; location: string }
}

/** Points to an entry in one of the trip collections. Order inside a day is authored. */
export type ItineraryRef =
  | { kind: 'flight'; id: string }
  | { kind: 'transfer'; id: string }
  | { kind: 'activity'; id: string }
  | { kind: 'check-in'; id: string }
  | { kind: 'check-out'; id: string }
  | { kind: 'car-pickup'; id: string }
  | { kind: 'car-dropoff'; id: string }

export interface ItineraryDay {
  date: IsoDate
  /** Where the group sleeps; null on the last day. */
  overnight: PlaceId | null
  title: string
  description: string
  items: ItineraryRef[]
}

export interface Trip {
  title: string
  start: IsoDate
  end: IsoDate
  origin: PlaceId
  route: PlaceId[]
  places: Record<PlaceId, Place>
  travelers: Traveler[]
  flights: Flight[]
  stays: Stay[]
  activities: Activity[]
  transfers: Transfer[]
  carRentals: CarRental[]
  days: ItineraryDay[]
}

export type TripEventKind =
  | 'flight'
  | 'car'
  | 'bus'
  | 'activity'
  | 'check-in'
  | 'check-out'
  | 'car-pickup'
  | 'car-dropoff'

/** A resolved itinerary entry, ready to display. Untimed events last the whole day. */
export interface TripEvent {
  id: string
  kind: TripEventKind
  date: IsoDate
  title: string
  detail?: string
  start?: IsoDateTime
  end?: IsoDateTime
  /** Time zone of `start`. */
  timeZone: string
  /** Time zone of `end` when it differs (flights). */
  endTimeZone: string
}

export type ChecklistCategoryId = 'clothes' | 'documents' | 'tech' | 'health' | 'other'

export interface ChecklistCategory {
  id: ChecklistCategoryId
  label: string
}

export interface ChecklistItem {
  id: string
  category: ChecklistCategoryId
  label: string
}
