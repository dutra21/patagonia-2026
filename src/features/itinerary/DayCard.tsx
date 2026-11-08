import type { ResolvedDay } from '../../domain/trip'
import type { Trip } from '../../domain/types'
import { Badge } from '../../shared/ui/Badge'
import { Card } from '../../shared/ui/Card'
import { DateBadge } from '../../shared/ui/DateBadge'
import { EventList } from './EventList'
import styles from './DayCard.module.css'

export function DayCard({ resolved, trip, isToday }: { resolved: ResolvedDay; trip: Trip; isToday: boolean }) {
  const { number, day, events } = resolved
  const headingId = `dia-${number}-titulo`

  return (
    <Card as="article" aria-labelledby={headingId} className={isToday ? `${styles.card} ${styles.today}` : styles.card}>
      <header className={styles.header}>
        <DateBadge date={day.date} />
        <div className={styles.heading}>
          <p className={styles.eyebrow}>
            Dia {number}
            {isToday ? <Badge tone="accent">Hoje</Badge> : null}
          </p>
          <h2 id={headingId} className={styles.title}>
            {day.title}
          </h2>
          <p className={styles.overnight}>{day.overnight ? `Pernoite em ${trip.places[day.overnight].name}` : 'Sem pernoite'}</p>
        </div>
      </header>
      <p className={styles.description}>{day.description}</p>
      <EventList events={events} />
    </Card>
  )
}
