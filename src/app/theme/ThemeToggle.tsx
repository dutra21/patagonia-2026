import { Moon, Sun } from 'lucide-react'
import { useTheme } from './themeStore'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const [theme, setTheme] = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  const label = next === 'light' ? 'Ativar tema claro' : 'Ativar tema escuro'

  return (
    <button type="button" className={styles.button} onClick={() => setTheme(next)} aria-label={label} title={label}>
      {theme === 'dark' ? <Sun aria-hidden="true" size={20} /> : <Moon aria-hidden="true" size={20} />}
    </button>
  )
}
