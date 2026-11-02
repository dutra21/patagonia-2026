import type { IsoDate, IsoDateTime } from './types'

const MS_PER_DAY = 86_400_000
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

function parseIsoDate(date: IsoDate): number {
  const match = ISO_DATE.exec(date)
  if (!match) throw new Error(`Invalid ISO date: ${date}`)
  return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
}

function toIsoDate(utcMs: number): IsoDate {
  return new Date(utcMs).toISOString().slice(0, 10)
}

export function addDays(date: IsoDate, days: number): IsoDate {
  return toIsoDate(parseIsoDate(date) + days * MS_PER_DAY)
}

/** Whole calendar days from `from` to `to` (negative if `to` is earlier). */
export function daysBetween(from: IsoDate, to: IsoDate): number {
  return Math.round((parseIsoDate(to) - parseIsoDate(from)) / MS_PER_DAY)
}

/** Calendar date of an instant as seen in `timeZone`. */
export function localDate(instant: IsoDateTime | Date, timeZone: string): IsoDate {
  const date = typeof instant === 'string' ? new Date(instant) : instant
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value
  return `${get('year')}-${get('month')}-${get('day')}`
}

/** Offset from UTC, in minutes, of `timeZone` at `instant` (e.g. -180 for UTC-3). */
export function utcOffsetMinutes(timeZone: string, instant: Date): number {
  const name =
    new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
      .formatToParts(instant)
      .find((p) => p.type === 'timeZoneName')?.value ?? 'GMT'
  const match = /GMT([+-])(\d{2}):(\d{2})/.exec(name)
  if (!match) return 0
  const minutes = Number(match[2]) * 60 + Number(match[3])
  return match[1] === '-' ? -minutes : minutes
}

/** First instant of `date` in `timeZone`. */
export function startOfDay(date: IsoDate, timeZone: string): Date {
  const utcMidnight = parseIsoDate(date)
  const offset = utcOffsetMinutes(timeZone, new Date(utcMidnight))
  return new Date(utcMidnight - offset * 60_000)
}

/** First instant of the day after `date` in `timeZone`. */
export function endOfDay(date: IsoDate, timeZone: string): Date {
  return startOfDay(addDays(date, 1), timeZone)
}

/** Number of days in an inclusive date range: 20/11 → 30/11 is 11 days. */
export function tripLengthInDays(start: IsoDate, end: IsoDate): number {
  return daysBetween(start, end) + 1
}

/** How many calendar days later the arrival lands, in local time ("+1"). */
export function arrivalDayOffset(
  departure: IsoDateTime,
  departureTimeZone: string,
  arrival: IsoDateTime,
  arrivalTimeZone: string,
): number {
  return daysBetween(localDate(departure, departureTimeZone), localDate(arrival, arrivalTimeZone))
}

/** Minutes between two instants (time zones do not matter: offsets are explicit). */
export function minutesBetween(start: IsoDateTime, end: IsoDateTime): number {
  return Math.round((Date.parse(end) - Date.parse(start)) / 60_000)
}
