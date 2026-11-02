import type { ChecklistCategory, ChecklistItem } from './types'

/** Checked item ids. Only `true` is stored; unchecking removes the key. */
export type CheckedItems = Readonly<Record<string, true>>

export interface CategoryProgress {
  category: ChecklistCategory
  items: ChecklistItem[]
  done: number
  total: number
}

export interface ChecklistProgress {
  done: number
  total: number
  categories: CategoryProgress[]
}

/** Progress per category and overall. Ids in `checked` that no longer exist are ignored. */
export function getChecklistProgress(
  categories: readonly ChecklistCategory[],
  items: readonly ChecklistItem[],
  checked: CheckedItems,
): ChecklistProgress {
  const perCategory = categories.map((category) => {
    const categoryItems = items.filter((item) => item.category === category.id)
    return {
      category,
      items: categoryItems,
      done: categoryItems.filter((item) => checked[item.id]).length,
      total: categoryItems.length,
    }
  })
  return {
    done: perCategory.reduce((sum, c) => sum + c.done, 0),
    total: perCategory.reduce((sum, c) => sum + c.total, 0),
    categories: perCategory,
  }
}

export function toggleItem(checked: CheckedItems, id: string): CheckedItems {
  if (checked[id]) {
    const { [id]: _removed, ...rest } = checked
    return rest
  }
  return { ...checked, [id]: true }
}

/** Accepts only `{ [id]: true }` objects; anything else becomes empty. */
export function parseCheckedItems(value: unknown): CheckedItems | undefined {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return undefined
  const entries = Object.entries(value).filter(([, v]) => v === true)
  return Object.fromEntries(entries.map(([k]) => [k, true as const]))
}
