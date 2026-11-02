import { Check } from 'lucide-react'
import type { CategoryProgress, CheckedItems } from '../../domain/checklist'
import { Card } from '../../shared/ui/Card'
import styles from './CategoryCard.module.css'

interface Props {
  progress: CategoryProgress
  checked: CheckedItems
  onToggle: (id: string) => void
}

export function CategoryCard({ progress, checked, onToggle }: Props) {
  const { category, items, done, total } = progress
  const headingId = `categoria-${category.id}`
  const complete = done === total

  return (
    <Card as="section" aria-labelledby={headingId} className={styles.card}>
      <header className={styles.header}>
        <h2 id={headingId} className={styles.title}>
          {category.label}
        </h2>
        <p className={complete ? `${styles.counter} ${styles.complete}` : styles.counter}>
          {complete ? <Check aria-hidden="true" size={14} /> : null}
          <span aria-hidden="true">
            {done}/{total}
          </span>
          <span className="visually-hidden">
            {done} de {total} itens marcados
          </span>
        </p>
      </header>

      <ul className={styles.items}>
        {items.map((item) => {
          const id = `item-${item.id}`
          return (
            <li key={item.id}>
              <input
                id={id}
                type="checkbox"
                className={styles.checkbox}
                checked={Boolean(checked[item.id])}
                onChange={() => onToggle(item.id)}
              />
              <label htmlFor={id} className={styles.label}>
                {item.label}
              </label>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
