import { BedDouble, CalendarDays, Footprints, MapPinned, Plane, type LucideIcon } from 'lucide-react'
import type { TripStats as Stats } from '../../domain/trip'
import { StatCard } from './StatCard'
import styles from './TripStats.module.css'

const items: { key: keyof Stats; label: string; icon: LucideIcon }[] = [
  { key: 'flights', label: 'Voos', icon: Plane },
  { key: 'stays', label: 'Hospedagens', icon: BedDouble },
  { key: 'cities', label: 'Cidades', icon: MapPinned },
  { key: 'activities', label: 'Passeios', icon: Footprints },
  { key: 'days', label: 'Dias', icon: CalendarDays },
]

export function TripStats({ stats }: { stats: Stats }) {
  return (
    <ul className={styles.list}>
      {items.map(({ key, label, icon: Icon }) => (
        <li key={key}>
          <StatCard value={stats[key]} label={label}>
            <Icon aria-hidden="true" size={22} />
          </StatCard>
        </li>
      ))}
    </ul>
  )
}
