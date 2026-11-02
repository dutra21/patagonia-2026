import { useSyncExternalStore } from 'react'
import { createLocalStorageStore } from '../../shared/lib/createLocalStorageStore'

export type Theme = 'dark' | 'light'

/** Keep in sync with the inline script in index.html. */
export const THEME_STORAGE_KEY = 'patagonia-2026:theme'

const THEME_COLORS: Record<Theme, string> = { dark: '#020617', light: '#f8fafc' }

function applyTheme(theme: Theme) {
  document.documentElement.dataset['theme'] = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
}

export const themeStore = createLocalStorageStore<Theme>({
  key: THEME_STORAGE_KEY,
  fallback: 'dark',
  parse: (value) => (value === 'dark' || value === 'light' ? value : undefined),
  onChange: applyTheme,
})

export function useTheme(): [Theme, (theme: Theme) => void] {
  const theme = useSyncExternalStore(themeStore.subscribe, themeStore.getSnapshot, () => 'dark' as const)
  return [theme, themeStore.set]
}
