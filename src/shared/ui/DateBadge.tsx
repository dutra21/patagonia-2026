import { dateBadge, formatLongDate } from '../lib/format'
import styles from './DateBadge.module.css'

/** Compact "20 NOV" block. Screen readers get the full date. */
export function DateBadge({ date }: { date: string }) {
  const { day, month } = dateBadge(date)
  return (
    <time dateTime={date} className={styles.badge}>
      <span aria-hidden="true" className={styles.day}>
        {day}
      </span>
      <span aria-hidden="true" className={styles.month}>
        {month}
      </span>
      <span className="visually-hidden">{formatLongDate(date)}</span>
    </time>
  )
}
