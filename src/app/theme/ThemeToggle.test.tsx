import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { THEME_STORAGE_KEY } from './themeStore'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  it('switches the theme on <html> and remembers it', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(screen.getByRole('button', { name: 'Ativar tema claro' }))
    expect(document.documentElement.dataset['theme']).toBe('light')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('"light"')

    await user.click(screen.getByRole('button', { name: 'Ativar tema escuro' }))
    expect(document.documentElement.dataset['theme']).toBe('dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('"dark"')
  })
})
