/**
 * A tiny external store backed by localStorage, for useSyncExternalStore.
 *
 * - Reads storage once, lazily, on the first snapshot.
 * - Writes happen only in `set` (called from event handlers).
 * - Other tabs are picked up through the `storage` event.
 * - If storage is unavailable (private mode, quota), the value still lives in memory.
 */
export interface LocalStorageStore<T> {
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => T
  set: (value: T) => void
}

interface Options<T> {
  key: string
  fallback: T
  /** Validates parsed JSON. Return undefined to fall back. */
  parse: (value: unknown) => T | undefined
  /** Runs after every change, local or from another tab. */
  onChange?: (value: T) => void
}

export function createLocalStorageStore<T>({ key, fallback, parse, onChange }: Options<T>): LocalStorageStore<T> {
  let value = fallback
  let loaded = false
  const listeners = new Set<() => void>()
  let listening = false

  function readStorage(): T {
    try {
      const raw = localStorage.getItem(key)
      if (raw === null) return fallback
      return parse(JSON.parse(raw)) ?? fallback
    } catch {
      return fallback
    }
  }

  function emit() {
    for (const listener of listeners) listener()
  }

  function handleStorage(event: StorageEvent) {
    if (event.key !== key && event.key !== null) return
    value = readStorage()
    loaded = true
    onChange?.(value)
    emit()
  }

  return {
    subscribe(listener) {
      listeners.add(listener)
      // Keep listening even with no subscribers, so the cache never goes stale
      // while the page that shows this value is not mounted (stores are app-lifetime singletons).
      if (!listening) {
        window.addEventListener('storage', handleStorage)
        listening = true
      }
      return () => {
        listeners.delete(listener)
      }
    },
    getSnapshot() {
      if (!loaded) {
        value = readStorage()
        loaded = true
      }
      return value
    },
    set(next) {
      value = next
      loaded = true
      try {
        localStorage.setItem(key, JSON.stringify(next))
      } catch {
        // Storage unavailable: keep the in-memory value for this session.
      }
      onChange?.(next)
      emit()
    },
  }
}
