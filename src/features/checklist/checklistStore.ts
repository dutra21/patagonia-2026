import { useSyncExternalStore } from 'react'
import { parseCheckedItems, toggleItem, type CheckedItems } from '../../domain/checklist'
import { createLocalStorageStore } from '../../shared/lib/createLocalStorageStore'
import { requestPersistentStorage } from '../../shared/lib/persistentStorage'

export const CHECKLIST_STORAGE_KEY = 'patagonia-2026:checklist'

const EMPTY: CheckedItems = {}

const store = createLocalStorageStore<CheckedItems>({
  key: CHECKLIST_STORAGE_KEY,
  fallback: EMPTY,
  parse: parseCheckedItems,
})

export interface Checklist {
  checked: CheckedItems
  toggle: (id: string) => void
  reset: () => void
}

/** Checked items, persisted locally and kept in sync across tabs. Writes only happen in handlers. */
export function useChecklist(): Checklist {
  const checked = useSyncExternalStore(store.subscribe, store.getSnapshot, () => EMPTY)
  return {
    checked,
    toggle(id) {
      store.set(toggleItem(store.getSnapshot(), id))
      void requestPersistentStorage()
    },
    reset() {
      store.set(EMPTY)
    },
  }
}
