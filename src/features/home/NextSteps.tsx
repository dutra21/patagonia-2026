import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import type { TripEvent } from '../../domain/types'
import { Card } from '../../shared/ui/Card'
import { DateBadge } from '../../shared/ui/DateBadge'
import { EventList } from '../itinerary/EventList'
import styles from './NextSteps.module.css'

function groupByDate(events: TripEvent[]): { date: string; events: TripEvent[] }[] {
  const groups: { date: string; events: TripEvent[] }[] = []
  for (const event of events) {
    const last = groups.at(-1)
    if (last?.date === event.date) last.events.push(event)
    else groups.push({ date: event.date, events: [event] })
  }
  return groups
}

export function NextSteps({ events }: { events: TripEvent[] }) {
  return (
    <Card className={styles.card}>
      {events.length === 0 ? (
        <p>A viagem terminou. Até a próxima!</p>
      ) : (
        <ol className={styles.groups}>
          {groupByDate(events).map((group) => (
            <li key={group.date} className={styles.group}>
              <DateBadge date={group.date} />
              <EventList events={group.events} />
            </li>
          ))}
        </ol>
      )}
      <Link to="/roteiro" className={styles.more}>
        Ver roteiro completo <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </Card>
  )
}
