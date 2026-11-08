import type { ReactNode } from 'react'
import styles from './HomeSection.module.css'

export function HomeSection({ id, title, children, className }: { id: string; title: string; children: ReactNode; className?: string }) {
  return (
    <section aria-labelledby={id} className={className ? `${styles.section} ${className}` : styles.section}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {children}
    </section>
  )
}
