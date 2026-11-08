import type { ReactNode } from 'react'
import { Card } from '../../shared/ui/Card'
import styles from './StatCard.module.css'

/** `children` is the icon. */
export function StatCard({ value, label, children }: { value: number; label: string; children: ReactNode }) {
  return (
    <Card className={styles.card}>
      <span className={styles.icon}>{children}</span>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </Card>
  )
}
