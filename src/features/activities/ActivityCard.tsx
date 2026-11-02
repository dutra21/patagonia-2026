import type { Activity, Place } from '../../domain/types'
import { formatLongDate, formatTime } from '../../shared/lib/format'
import { Card } from '../../shared/ui/Card'
import { DifficultyBadge } from './DifficultyBadge'
import styles from './ActivityCard.module.css'

export function ActivityCard({ activity, place }: { activity: Activity; place: Place }) {
  const headingId = `passeio-${activity.id}`

  return (
    <Card as="article" aria-labelledby={headingId} className={styles.card}>
      <header className={styles.header}>
        <h2 id={headingId} className={styles.name}>
          {activity.name}
        </h2>
        <DifficultyBadge difficulty={activity.difficulty} />
      </header>
      <p className={styles.when}>
        <time dateTime={activity.date}>{formatLongDate(activity.date)}</time>
        {activity.start ? (
          <>
            {', às '}
            <time dateTime={activity.start}>{formatTime(activity.start, place.timeZone)}</time>
          </>
        ) : null}
        {` · ${place.name}`}
      </p>
      <p>{activity.description}</p>
      {activity.transport || activity.meetingPoint ? (
        <dl className={styles.details}>
          {activity.transport ? (
            <div>
              <dt>Transporte</dt>
              <dd>{activity.transport}</dd>
            </div>
          ) : null}
          {activity.meetingPoint ? (
            <div>
              <dt>Encontro</dt>
              <dd>{activity.meetingPoint}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
    </Card>
  )
}
