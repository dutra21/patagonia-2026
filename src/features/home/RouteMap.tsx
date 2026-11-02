import { Plane } from 'lucide-react'
import type { RouteStop } from '../../domain/trip'
import { pluralize } from '../../shared/lib/format'
import { Card } from '../../shared/ui/Card'
import styles from './RouteMap.module.css'

function stopNote(stop: RouteStop): string {
  switch (stop.role) {
    case 'origin':
      return 'Partida'
    case 'connection':
      return 'Conexão'
    case 'return':
      return 'Volta para casa'
    case 'stay':
      return stop.nights ? pluralize(stop.nights, 'noite', 'noites') : 'Pernoite'
  }
}

/** Route as a styled list (no map library, no online tiles). */
export function RouteMap({ stops }: { stops: RouteStop[] }) {
  return (
    <Card>
      <ol className={styles.list}>
        {stops.map((stop, index) => (
          <li key={`${stop.placeId}-${index}`} className={styles.stop} data-role={stop.role}>
            <span className={styles.marker}>
              {stop.role === 'origin' || stop.role === 'return' ? <Plane aria-hidden="true" size={14} /> : null}
            </span>
            <span className={styles.name}>
              {stop.name}
              {stop.airportCode ? <span className={styles.code}> ({stop.airportCode})</span> : null}
            </span>
            <span className={styles.note}>{stopNote(stop)}</span>
          </li>
        ))}
      </ol>
    </Card>
  )
}
