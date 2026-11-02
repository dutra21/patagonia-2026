import type { ReactNode } from 'react'
import styles from './PageHeader.module.css'

export function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className={styles.header}>
      <title>{`${title} · Patagonia 2026`}</title>
      <h1 className={styles.title}>{title}</h1>
      {children ? <div className={styles.lead}>{children}</div> : null}
    </div>
  )
}
