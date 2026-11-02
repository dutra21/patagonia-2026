import { describe, expect, it } from 'vitest'
import { dateBadge, formatDate, formatDayMonth, formatLongDate, formatTime } from './format'

describe('formatTime', () => {
  it('shows the local time of the event, not the runtime time zone', () => {
    expect(formatTime('2026-11-20T09:00-03:00', 'America/Sao_Paulo')).toBe('09:00')
    expect(formatTime('2026-11-29T20:55-03:00', 'America/Argentina/Ushuaia')).toBe('20:55')
  })

  it('uses 24h time after midnight', () => {
    expect(formatTime('2026-11-30T00:25-03:00', 'America/Argentina/Buenos_Aires')).toBe('00:25')
  })
})

describe('calendar dates', () => {
  it('formats the day without shifting it', () => {
    expect(formatDate('2026-11-20')).toBe('20/11/2026')
    expect(formatDayMonth('2026-11-30')).toBe('30/11')
  })

  it('formats long dates in Portuguese', () => {
    expect(formatLongDate('2026-11-20')).toBe('sexta-feira, 20 de novembro')
  })

  it('builds a compact badge', () => {
    expect(dateBadge('2026-11-22')).toEqual({ day: '22', month: 'nov', weekday: 'dom' })
  })
})
