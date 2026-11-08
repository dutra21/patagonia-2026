import type { IsoDate, IsoDateTime } from '../../domain/types'

const LOCALE = 'pt-BR'
const formatters = new Map<string, Intl.DateTimeFormat>()

function formatter(options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const key = JSON.stringify(options)
  let cached = formatters.get(key)
  if (!cached) {
    cached = new Intl.DateTimeFormat(LOCALE, options)
    formatters.set(key, cached)
  }
  return cached
}

/** Calendar dates have no time zone: anchor them at noon UTC and format in UTC. */
function calendarDate(date: IsoDate): Date {
  return new Date(`${date}T12:00:00Z`)
}

/** "09:00" — local time of the event in `timeZone`. */
export function formatTime(instant: IsoDateTime, timeZone: string): string {
  return formatter({ timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(instant))
}

/** "20/11/2026" */
export function formatDate(date: IsoDate): string {
  return formatter({ timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric' }).format(calendarDate(date))
}

/** "20/11" */
export function formatDayMonth(date: IsoDate): string {
  return formatter({ timeZone: 'UTC', day: '2-digit', month: '2-digit' }).format(calendarDate(date))
}

/** "sexta-feira, 20 de novembro" */
export function formatLongDate(date: IsoDate): string {
  return formatter({ timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' }).format(calendarDate(date))
}

/** { day: "20", month: "nov", weekday: "sex" } — for compact date badges. */
export function dateBadge(date: IsoDate): { day: string; month: string; weekday: string } {
  const d = calendarDate(date)
  const clean = (value: string) => value.replace('.', '')
  return {
    day: formatter({ timeZone: 'UTC', day: '2-digit' }).format(d),
    month: clean(formatter({ timeZone: 'UTC', month: 'short' }).format(d)),
    weekday: clean(formatter({ timeZone: 'UTC', weekday: 'short' }).format(d)),
  }
}

/** "3h", "1h 20min", "45min" */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours === 0) return `${rest}min`
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}min`
}

/** "1 noite", "4 noites" */
export function pluralize(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`
}
