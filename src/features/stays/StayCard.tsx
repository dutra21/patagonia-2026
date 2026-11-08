import { MapPin } from 'lucide-react'
import { nightsOf } from '../../domain/trip'
import type { Place, Stay } from '../../domain/types'
import { formatDayMonth, formatTime, pluralize } from '../../shared/lib/format'
import { Card } from '../../shared/ui/Card'
import styles from './StayCard.module.css'

function mapsUrl(stay: Stay): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${stay.name}, ${stay.address}`)}`
}

export function StayCard({ stay, place }: { stay: Stay; place: Place }) {
  const headingId = `hospedagem-${stay.id}`
  const { checkIn, checkOut } = stay
  const checkInTime = checkIn.from
    ? checkIn.until
      ? `${formatTime(checkIn.from, place.timeZone)}–${formatTime(checkIn.until, place.timeZone)}`
      : `a partir de ${formatTime(checkIn.from, place.timeZone)}`
    : 'horário a confirmar'
  const checkOutTime = checkOut.until ? `até ${formatTime(checkOut.until, place.timeZone)}` : 'horário a confirmar'

  return (
    <Card as="article" aria-labelledby={headingId} className={styles.card}>
      <p className={styles.city}>{place.name}</p>
      <h2 id={headingId} className={styles.name}>
        {stay.name}
      </h2>
      <p className={stay.payment.paid ? styles.paid : styles.unpaid}>
        {stay.payment.paid ? 'Pago' : `Não pago · ${stay.payment.amount}`}
      </p>
      <p className={styles.dates}>
        <time dateTime={checkIn.date}>{formatDayMonth(checkIn.date)}</time>
        {' → '}
        <time dateTime={checkOut.date}>{formatDayMonth(checkOut.date)}</time>
        {' · '}
        {pluralize(nightsOf(stay), 'noite', 'noites')}
      </p>

      <dl className={styles.details}>
        <div>
          <dt>Check-in</dt>
          <dd>{checkInTime}</dd>
        </div>
        <div>
          <dt>Check-out</dt>
          <dd>{checkOutTime}</dd>
        </div>
        <div className={styles.address}>
          <dt>Endereço</dt>
          <dd>{stay.address}</dd>
        </div>
      </dl>

      <a className={styles.map} href={mapsUrl(stay)} target="_blank" rel="noreferrer">
        <MapPin aria-hidden="true" size={16} />
        Abrir no mapa<span className="visually-hidden"> ({stay.name}, abre em nova aba; precisa de internet)</span>
      </a>
    </Card>
  )
}
