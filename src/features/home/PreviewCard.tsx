import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Card } from '../../shared/ui/Card'
import styles from './PreviewCard.module.css'

interface Props {
  title: string
  /** The icon shown next to the title. */
  icon: ReactNode
  to: string
  linkLabel: string
  children: ReactNode
}

export function PreviewCard({ title, icon, to, linkLabel, children }: Props) {
  return (
    <Card as="article" className={styles.card}>
      <h3 className={styles.title}>
        <span className={styles.icon}>{icon}</span>
        {title}
      </h3>
      <div className={styles.body}>{children}</div>
      <Link to={to} className={styles.more}>
        {linkLabel} <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </Card>
  )
}
