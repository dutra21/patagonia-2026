import { arrivalDayOffset, localDate, minutesBetween } from '../../domain/dates'
import type { Flight, Place } from '../../domain/types'
import { formatDate, formatDuration, formatTime } from '../../shared/lib/format'
import { Card } from '../../shared/ui/Card'
import styles from './FlightCard.module.css'

interface Props {
  flight: Flight
  from: Place
  to: Place
}

export function FlightCard({ flight, from, to }: Props) {
  const headingId = `voo-${flight.id}`
  const date = localDate(flight.departure, from.timeZone)
  const dayOffset = arrivalDayOffset(flight.departure, from.timeZone, flight.arrival, to.timeZone)

  return (
    <Card as="article" aria-labelledby={headingId} className={styles.card}>
      <header className={styles.header}>
        <h2 id={headingId} className={styles.code}>
          {flight.code ?? 'Voo a confirmar'}
        </h2>
        <time dateTime={date} className={styles.date}>
          {formatDate(date)}
        </time>
      </header>

      <div className={styles.route}>
        <div className={styles.endpoint}>
          <p className={styles.time}>
            <time dateTime={flight.departure}>{formatTime(flight.departure, from.timeZone)}</time>
          </p>
          <p className={styles.airport}>{from.airport?.code}</p>
          <p className={styles.city}>{from.name}</p>
        </div>

        <p className={styles.duration}>
          <span className="visually-hidden">Duração: </span>
          {formatDuration(minutesBetween(flight.departure, flight.arrival))}
        </p>

        <div className={`${styles.endpoint} ${styles.arrival}`}>
          <p className={styles.time}>
            <time dateTime={flight.arrival}>{formatTime(flight.arrival, to.timeZone)}</time>
            {dayOffset > 0 ? <span className={styles.offset}> +{dayOffset} dia</span> : null}
          </p>
          <p className={styles.airport}>{to.airport?.code}</p>
          <p className={styles.city}>{to.name}</p>
        </div>
      </div>

      <dl className={styles.details}>
        <div>
          <dt>Partida</dt>
          <dd>{from.airport?.name}</dd>
        </div>
        <div>
          <dt>Chegada</dt>
          <dd>{to.airport?.name}</dd>
        </div>
      </dl>
    </Card>
  )
}
