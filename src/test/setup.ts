import '@testing-library/jest-dom/vitest'
import { act, cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { resetPersistentStorageRequest } from '../shared/lib/persistentStorage'

afterEach(() => {
  // Clear storage and send the same signal another tab sends after clearing it, while
  // components are still mounted, so module-level stores drop their cached values.
  act(() => {
    localStorage.clear()
    window.dispatchEvent(new StorageEvent('storage', { key: null }))
  })
  cleanup()
  resetPersistentStorageRequest()
  delete document.documentElement.dataset['theme']
})
