export type PersistResult = 'granted' | 'denied' | 'unsupported'

let request: Promise<PersistResult> | undefined

/**
 * Asks the browser not to evict our localStorage (iOS/Android may clear it under pressure).
 * Asked once per session; a refusal or error is fine: data still saves, it just isn't guaranteed.
 */
export function requestPersistentStorage(): Promise<PersistResult> {
  request ??= (async () => {
    try {
      if (!navigator.storage?.persist) return 'unsupported'
      if (await navigator.storage.persisted()) return 'granted'
      return (await navigator.storage.persist()) ? 'granted' : 'denied'
    } catch {
      return 'denied'
    }
  })()
  return request
}

/** Test helper: forget the previous request. */
export function resetPersistentStorageRequest() {
  request = undefined
}
