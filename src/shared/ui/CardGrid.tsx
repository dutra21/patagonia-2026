import type { ReactNode } from 'react'
import styles from './CardGrid.module.css'

/** Responsive ordered list of cards. Children must be <li> elements. */
export function CardGrid({ children }: { children: ReactNode }) {
  return <ol className={styles.list}>{children}</ol>
}
