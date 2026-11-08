import { describe, expect, it } from 'vitest'
import { getChecklistProgress, parseCheckedItems, toggleItem } from './checklist'
import type { ChecklistCategory, ChecklistItem } from './types'

const categories: ChecklistCategory[] = [
  { id: 'clothes', label: 'Roupas' },
  { id: 'documents', label: 'Documentos' },
]
const items: ChecklistItem[] = [
  { id: 'a', category: 'clothes', label: 'A' },
  { id: 'b', category: 'clothes', label: 'B' },
  { id: 'c', category: 'documents', label: 'C' },
]

describe('getChecklistProgress', () => {
  it('counts per category and overall', () => {
    const progress = getChecklistProgress(categories, items, { a: true, c: true })
    expect(progress.done).toBe(2)
    expect(progress.total).toBe(3)
    expect(progress.categories.map((c) => [c.category.id, c.done, c.total])).toEqual([
      ['clothes', 1, 2],
      ['documents', 1, 1],
    ])
  })

  it('ignores ids that are no longer in the list', () => {
    expect(getChecklistProgress(categories, items, { removed: true }).done).toBe(0)
  })
})

describe('toggleItem', () => {
  it('checks and unchecks without mutating', () => {
    const empty = {}
    const checked = toggleItem(empty, 'a')
    expect(checked).toEqual({ a: true })
    expect(empty).toEqual({})
    expect(toggleItem(checked, 'a')).toEqual({})
  })
})

describe('parseCheckedItems', () => {
  it('keeps only true values', () => {
    expect(parseCheckedItems({ a: true, b: false, c: 'yes' })).toEqual({ a: true })
  })

  it('rejects non-objects', () => {
    expect(parseCheckedItems(null)).toBeUndefined()
    expect(parseCheckedItems(['a'])).toBeUndefined()
    expect(parseCheckedItems('a')).toBeUndefined()
  })
})
