import type { TripEvent } from '../../domain/types'
import { EventItem } from './EventItem'
import styles from './EventList.module.css'

export function EventList({ events }: { events: TripEvent[] }) {
  return (
    <ol className={styles.list}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ol>
  )
}
