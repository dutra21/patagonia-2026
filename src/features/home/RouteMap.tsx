import type { RouteStop } from '../../domain/trip'
import type { PlaceId, Trip } from '../../domain/types'
import { pluralize } from '../../shared/lib/format'
import { Card } from '../../shared/ui/Card'
import { projectMercator } from './projectMercator'
import { argentinaPath, landPath, mapSize } from './routeMapGeometry'
import styles from './RouteMap.module.css'

/** Which side of the dot each label goes, so neighbors (El Calafate / El Chaltén) don't collide. */
const LABEL_SIDE: Record<PlaceId, 'left' | 'right'> = {
  'sao-paulo': 'left',
  'buenos-aires': 'right',
  'el-calafate': 'right',
  'el-chalten': 'right',
  ushuaia: 'right',
}
const LABEL_NUDGE_Y: Partial<Record<PlaceId, number>> = { 'el-chalten': -6, 'el-calafate': 6 }

function stopNote(stop: RouteStop): string | undefined {
  if (stop.role === 'stay' && stop.nights) return pluralize(stop.nights, 'noite', 'noites')
  return undefined
}

/** Quadratic curve bent to the left of the direction of travel, so legs between the same cities don't overlap. */
function curve([x1, y1]: [number, number], [x2, y2]: [number, number]): string {
  const dx = x2 - x1
  const dy = y2 - y1
  const length = Math.hypot(dx, dy)
  const bend = Math.min(40, Math.max(8, length * 0.18))
  const cx = (x1 + x2) / 2 + (dy / length) * bend
  const cy = (y1 + y2) / 2 - (dx / length) * bend
  return `M${x1.toFixed(1)},${y1.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`
}

/**
 * Static route map: local outline (Natural Earth) + projected cities. No map library, no tiles.
 * Like the layout, it draws the route one way only: the flight home is left out.
 */
export function RouteMap({ trip, stops }: { trip: Trip; stops: RouteStop[] }) {
  const point = (id: PlaceId) => projectMercator(trip.places[id].coords)
  const drawn = stops.filter((stop) => stop.role !== 'return')
  const segments = drawn.slice(1).flatMap((stop, index) => {
    const previous = drawn[index]
    return previous ? [{ id: `${previous.placeId}-${stop.placeId}-${index}`, from: previous.placeId, to: stop.placeId }] : []
  })

  // One label per city; a city visited twice shows its overnight stop if any.
  const labels = new Map<PlaceId, RouteStop>()
  for (const stop of stops) {
    const existing = labels.get(stop.placeId)
    if (!existing || stop.role === 'stay') labels.set(stop.placeId, stop)
  }

  const summary = stops
    .map((stop) => {
      const note = stopNote(stop)
      return note ? `${stop.name} (${note})` : stop.name
    })
    .join(', depois ')

  return (
    <Card className={styles.card}>
      <figure className={styles.figure}>
        {/* Inline SVG (themeable via CSS) exposed as one image: role="img" is the standard pattern here. */}
        <svg
          viewBox={`0 0 ${mapSize.width} ${mapSize.height}`}
          className={styles.svg}
          role="img"
          aria-labelledby="mapa-rota-legenda"
        >
          <path d={landPath} className={styles.land} />
          <path d={argentinaPath} className={styles.argentina} />

          {segments.map((segment) => (
            <path key={segment.id} d={curve(point(segment.from), point(segment.to))} className={styles.route} />
          ))}

          {[...labels.values()].map((stop) => {
            const [x, y] = point(stop.placeId)
            const side = LABEL_SIDE[stop.placeId]
            const dx = side === 'right' ? 10 : -10
            const ty = y + (LABEL_NUDGE_Y[stop.placeId] ?? 0)
            const note = stopNote(stop)
            return (
              <g key={stop.placeId}>
                <circle cx={x} cy={y} r={5} className={styles.dot} />
                <text x={x + dx} y={ty} textAnchor={side === 'right' ? 'start' : 'end'} className={styles.label}>
                  <tspan>
                    {stop.name}
                    {stop.airportCode ? ` (${stop.airportCode})` : ''}
                  </tspan>
                  {note ? (
                    <tspan x={x + dx} dy="1.2em" className={styles.note}>
                      {note}
                    </tspan>
                  ) : null}
                </text>
              </g>
            )
          })}
        </svg>
        <figcaption id="mapa-rota-legenda" className="visually-hidden">
          Mapa da rota: {summary}.
        </figcaption>
      </figure>
    </Card>
  )
}
