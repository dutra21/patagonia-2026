import { arrivalDayOffset } from '../../domain/dates'
import type { TripEvent } from '../../domain/types'
import { formatTime } from '../../shared/lib/format'

/** Local time label for an event, or undefined when it has no time. */
export function formatEventTime(event: TripEvent): string | undefined {
  const start = event.start ? formatTime(event.start, event.timeZone) : undefined
  const end = event.end ? formatTime(event.end, event.endTimeZone) : undefined

  switch (event.kind) {
    case 'flight': {
      if (!event.start || !event.end) return start
      const offset = arrivalDayOffset(event.start, event.timeZone, event.end, event.endTimeZone)
      return `${start} → ${end}${offset > 0 ? ` (+${offset} dia)` : ''}`
    }
    case 'check-in':
      if (start && end) return `${start}–${end}`
      return start ? `a partir de ${start}` : undefined
    case 'check-out':
      return end ? `até ${end}` : undefined
    default:
      return start
  }
}
