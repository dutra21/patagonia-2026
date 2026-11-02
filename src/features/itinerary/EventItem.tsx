import type { TripEvent } from '../../domain/types'
import { eventIcons } from './eventIcons'
import { formatEventTime } from './eventTime'
import styles from './EventItem.module.css'

export function EventItem({ event }: { event: TripEvent }) {
  const Icon = eventIcons[event.kind]
  const time = formatEventTime(event)

  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon aria-hidden="true" size={20} />
      </span>
      <div className={styles.body}>
        <p className={styles.title}>{event.title}</p>
        {time ? <p className={styles.time}>{time}</p> : null}
        {event.detail ? <p className={styles.detail}>{event.detail}</p> : null}
      </div>
    </li>
  )
}
