import { checklistCategories, checklistItems } from '../../data/trip'
import { getChecklistProgress } from '../../domain/checklist'
import { useChecklist } from './checklistStore'
import styles from './ChecklistSummary.module.css'

/** Compact progress per category, for the home page. */
export function ChecklistSummary() {
  const { checked } = useChecklist()
  const progress = getChecklistProgress(checklistCategories, checklistItems, checked)

  return (
    <ul className={styles.rows}>
      {progress.categories.map(({ category, done, total }) => (
        <li key={category.id} className={styles.row}>
          <span className={styles.label}>{category.label}</span>
          <span className={styles.count}>
            <span aria-hidden="true">
              {done}/{total}
            </span>
            <span className="visually-hidden">
              {done} de {total} itens marcados
            </span>
          </span>
        </li>
      ))}
    </ul>
  )
}
