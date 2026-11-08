import type { ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './ChipNav.module.css'

export interface Chip {
  label: ReactNode
  /** Search string for this option, e.g. "?dia=3" or "" for "all". */
  search: string
  current: boolean
}

/** Filter/selection links stored in the URL search params. */
export function ChipNav({ label, chips }: { label: string; chips: Chip[] }) {
  return (
    <nav aria-label={label} className={styles.nav}>
      <ul className={styles.list}>
        {chips.map((chip) => (
          <li key={chip.search || 'all'}>
            <Link
              to={{ search: chip.search }}
              preventScrollReset
              replace
              aria-current={chip.current ? 'true' : undefined}
              className={chip.current ? `${styles.chip} ${styles.current}` : styles.chip}
            >
              {chip.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
