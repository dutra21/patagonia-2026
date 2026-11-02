import { act, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderRoute } from '../../test/renderRoute'
import { CHECKLIST_STORAGE_KEY } from './checklistStore'

const stored = () => JSON.parse(localStorage.getItem(CHECKLIST_STORAGE_KEY) ?? 'null') as unknown
const category = (name: string) => screen.getByRole('region', { name })

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ChecklistPage', () => {
  it('shows the five categories with their counters', () => {
    renderRoute('/checklist')
    for (const name of ['Roupas', 'Documentos', 'Tecnologia', 'Saúde', 'Outros']) {
      expect(category(name)).toBeInTheDocument()
    }
    expect(within(category('Documentos')).getByText('0 de 6 itens marcados')).toBeInTheDocument()
    expect(screen.getByText(/de 32 itens prontos/)).toHaveTextContent('0 de 32 itens prontos')
  })

  it('checks an item, updates the counters and saves it', async () => {
    const user = userEvent.setup()
    renderRoute('/checklist')

    const box = screen.getByRole('checkbox', { name: 'Seguro viagem' })
    await user.click(box)

    expect(box).toBeChecked()
    expect(within(category('Documentos')).getByText('1 de 6 itens marcados')).toBeInTheDocument()
    expect(screen.getByText(/de 32 itens prontos/)).toHaveTextContent('1 de 32 itens prontos')
    expect(stored()).toEqual({ insurance: true })

    await user.click(box)
    expect(box).not.toBeChecked()
    expect(stored()).toEqual({})
  })

  it('restores saved items on load', () => {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify({ boots: true }))
    act(() => window.dispatchEvent(new StorageEvent('storage', { key: CHECKLIST_STORAGE_KEY })))
    renderRoute('/checklist')
    expect(screen.getByRole('checkbox', { name: 'Bota de trilha já amaciada' })).toBeChecked()
  })

  it('follows changes made in another tab', () => {
    renderRoute('/checklist')
    const box = screen.getByRole('checkbox', { name: 'Power bank' })
    expect(box).not.toBeChecked()

    act(() => {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify({ 'power-bank': true }))
      window.dispatchEvent(new StorageEvent('storage', { key: CHECKLIST_STORAGE_KEY }))
    })

    expect(box).toBeChecked()
  })

  it('asks for confirmation before resetting', async () => {
    const user = userEvent.setup()
    renderRoute('/checklist')
    const reset = screen.getByRole('button', { name: 'Resetar checklist' })
    expect(reset).toBeDisabled()

    await user.click(screen.getByRole('checkbox', { name: 'Protetor solar' }))
    await user.click(screen.getByRole('checkbox', { name: 'Garrafa de água' }))
    await user.click(screen.getByRole('button', { name: 'Resetar checklist' }))

    const confirm = screen.getByRole('group', { name: 'Desmarcar 2 itens? Isso não pode ser desfeito.' })
    expect(within(confirm).getByRole('button', { name: 'Cancelar' })).toHaveFocus()

    await user.click(within(confirm).getByRole('button', { name: 'Cancelar' }))
    expect(screen.getByRole('checkbox', { name: 'Protetor solar' })).toBeChecked()
    expect(screen.getByRole('button', { name: 'Resetar checklist' })).toHaveFocus()

    await user.click(screen.getByRole('button', { name: 'Resetar checklist' }))
    await user.click(screen.getByRole('button', { name: 'Sim, desmarcar tudo' }))
    expect(screen.getByRole('checkbox', { name: 'Protetor solar' })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Garrafa de água' })).not.toBeChecked()
    expect(stored()).toEqual({})
    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('filters by category through the URL', async () => {
    const user = userEvent.setup()
    const router = renderRoute('/checklist')
    await user.click(within(screen.getByRole('navigation', { name: 'Filtrar por categoria' })).getByRole('link', { name: 'Saúde' }))
    expect(router.state.location.search).toBe('?categoria=health')
    expect(screen.getAllByRole('region')).toHaveLength(1)
    expect(category('Saúde')).toBeInTheDocument()
  })

  it('asks the browser to keep the data, and keeps working if it refuses', async () => {
    const persist = vi.fn<() => Promise<boolean>>().mockRejectedValue(new Error('denied'))
    vi.stubGlobal('navigator', { ...navigator, storage: { persisted: () => Promise.resolve(false), persist } })
    const user = userEvent.setup()
    renderRoute('/checklist')

    const box = screen.getByRole('checkbox', { name: 'Lanterna de cabeça' })
    await user.click(box)

    expect(persist).toHaveBeenCalledOnce()
    expect(box).toBeChecked()
    expect(stored()).toEqual({ headlamp: true })
  })
})
