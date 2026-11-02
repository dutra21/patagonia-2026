import { useSearchParams } from 'react-router'
import { checklistCategories, checklistItems } from '../../data/trip'
import { getChecklistProgress } from '../../domain/checklist'
import { ChipNav } from '../../shared/ui/ChipNav'
import { PageHeader } from '../../shared/ui/PageHeader'
import { CategoryCard } from './CategoryCard'
import { useChecklist } from './checklistStore'
import { ResetChecklist } from './ResetChecklist'
import styles from './ChecklistPage.module.css'

export function ChecklistPage() {
  const [searchParams] = useSearchParams()
  const { checked, toggle, reset } = useChecklist()
  const progress = getChecklistProgress(checklistCategories, checklistItems, checked)

  const selected = progress.categories.find((c) => c.category.id === searchParams.get('categoria'))
  const visible = selected ? [selected] : progress.categories

  return (
    <>
      <PageHeader title="Checklist">
        <p>Salvo neste aparelho. Funciona sem internet.</p>
      </PageHeader>

      <div className={styles.summary}>
        <p className={styles.count} aria-live="polite">
          <strong>{progress.done}</strong> de {progress.total} itens prontos
        </p>
        <progress className={styles.bar} value={progress.done} max={progress.total} aria-label="Progresso do checklist" />
      </div>

      <ChipNav
        label="Filtrar por categoria"
        chips={[
          { label: 'Todas', search: '', current: !selected },
          ...progress.categories.map(({ category }) => ({
            label: category.label,
            search: `?categoria=${category.id}`,
            current: selected?.category.id === category.id,
          })),
        ]}
      />

      <div className={styles.categories}>
        {visible.map((categoryProgress) => (
          <CategoryCard key={categoryProgress.category.id} progress={categoryProgress} checked={checked} onToggle={toggle} />
        ))}
      </div>

      <ResetChecklist checkedCount={progress.done} onReset={reset} />
    </>
  )
}
