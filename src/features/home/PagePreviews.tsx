import { BedDouble, CalendarDays, Footprints, ListChecks, Plane } from 'lucide-react'
import { checklistCategories, checklistItems } from '../../data/trip'
import { localDate } from '../../domain/dates'
import type { ResolvedDay } from '../../domain/trip'
import type { Trip } from '../../domain/types'
import { formatDayMonth, formatTime, pluralize } from '../../shared/lib/format'
import { DifficultyBadge } from '../activities/DifficultyBadge'
import { PreviewCard } from './PreviewCard'
import styles from './PagePreviews.module.css'

const ICON_SIZE = 20

export function PagePreviews({ trip, days }: { trip: Trip; days: ResolvedDay[] }) {
  return (
    <ul className={styles.grid}>
      <li>
        <PreviewCard title="Voos" icon={<Plane aria-hidden="true" size={ICON_SIZE} />} to="/voos" linkLabel="Ver todos os voos">
          <ul className={styles.rows}>
            {trip.flights.map((flight) => {
              const from = trip.places[flight.from]
              const to = trip.places[flight.to]
              return (
                <li key={flight.id} className={styles.row}>
                  <span className={styles.primary}>{flight.code ?? 'A confirmar'}</span>
                  <span className={styles.secondary}>
                    {formatDayMonth(localDate(flight.departure, from.timeZone))} · {from.airport?.code} → {to.airport?.code} ·{' '}
                    {formatTime(flight.departure, from.timeZone)}
                  </span>
                </li>
              )
            })}
          </ul>
        </PreviewCard>
      </li>

      <li>
        <PreviewCard title="Roteiro" icon={<CalendarDays aria-hidden="true" size={ICON_SIZE} />} to="/roteiro" linkLabel="Ver roteiro completo">
          <ul className={styles.rows}>
            {days.slice(0, 5).map(({ number, day }) => (
              <li key={day.date} className={styles.row}>
                <span className={styles.primary}>{day.title}</span>
                <span className={styles.secondary}>
                  Dia {number} · {formatDayMonth(day.date)}
                </span>
              </li>
            ))}
          </ul>
        </PreviewCard>
      </li>

      <li>
        <PreviewCard
          title="Hospedagens"
          icon={<BedDouble aria-hidden="true" size={ICON_SIZE} />}
          to="/hospedagens"
          linkLabel="Ver todas as hospedagens"
        >
          <ul className={styles.rows}>
            {trip.stays.map((stay) => (
              <li key={stay.id} className={styles.row}>
                <span className={styles.primary}>{stay.name}</span>
                <span className={styles.secondary}>
                  {trip.places[stay.placeId].name} · {formatDayMonth(stay.checkIn.date)} → {formatDayMonth(stay.checkOut.date)}
                </span>
              </li>
            ))}
          </ul>
        </PreviewCard>
      </li>

      <li>
        <PreviewCard title="Passeios" icon={<Footprints aria-hidden="true" size={ICON_SIZE} />} to="/passeios" linkLabel="Ver todos os passeios">
          <ul className={styles.rows}>
            {trip.activities.map((activity) => (
              <li key={activity.id} className={styles.rowWithBadge}>
                <span className={styles.primary}>{activity.name}</span>
                <DifficultyBadge difficulty={activity.difficulty} />
              </li>
            ))}
          </ul>
        </PreviewCard>
      </li>

      <li>
        <PreviewCard title="Checklist" icon={<ListChecks aria-hidden="true" size={ICON_SIZE} />} to="/checklist" linkLabel="Ver checklist completo">
          <ul className={styles.rows}>
            {checklistCategories.map((category) => (
              <li key={category.id} className={styles.rowWithBadge}>
                <span className={styles.primary}>{category.label}</span>
                <span className={styles.secondary}>
                  {pluralize(checklistItems.filter((item) => item.category === category.id).length, 'item', 'itens')}
                </span>
              </li>
            ))}
          </ul>
        </PreviewCard>
      </li>
    </ul>
  )
}
