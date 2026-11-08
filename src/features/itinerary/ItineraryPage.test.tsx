import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderRoute } from '../../test/renderRoute'

afterEach(() => {
  vi.useRealTimers()
})

describe('ItineraryPage', () => {
  it('shows all 11 days by default', () => {
    renderRoute('/roteiro')
    expect(screen.getAllByRole('article')).toHaveLength(11)
    expect(screen.getByRole('heading', { level: 2, name: 'Chegada em El Calafate' })).toBeInTheDocument()
  })

  it('selects a day through the URL and back to all', async () => {
    const user = userEvent.setup()
    const router = renderRoute('/roteiro')
    const picker = screen.getByRole('navigation', { name: 'Escolher dia' })

    await user.click(within(picker).getByRole('link', { name: 'Dia 3' }))

    expect(router.state.location.search).toBe('?dia=3')
    const [day] = screen.getAllByRole('article')
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(within(day as HTMLElement).getByRole('heading', { name: 'Estrada para El Chaltén + Chorrillo e Miradores' })).toBeInTheDocument()
    expect(within(day as HTMLElement).getByText('Pernoite em El Chaltén')).toBeInTheDocument()
    expect(within(picker).getByRole('link', { name: 'Dia 3' })).toHaveAttribute('aria-current', 'true')

    await user.click(within(picker).getByRole('link', { name: 'Todos' }))
    expect(screen.getAllByRole('article')).toHaveLength(11)
  })

  it('ignores an invalid day in the URL', () => {
    renderRoute('/roteiro?dia=99')
    expect(screen.getAllByRole('article')).toHaveLength(11)
  })

  it('shows local times for each event', () => {
    renderRoute('/roteiro?dia=1')
    const day = screen.getByRole('article')
    expect(within(day).getByText('16:40 → 20:00')).toBeInTheDocument()
    expect(within(day).getByText('Retirada do carro')).toBeInTheDocument()
    expect(within(day).getByText('21:00')).toBeInTheDocument()
    expect(within(day).getByText('a partir de 15:00')).toBeInTheDocument()
  })

  it('highlights today during the trip', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-23T08:00-03:00'))
    renderRoute('/roteiro')
    const today = screen.getByRole('article', { name: 'Glaciar Piedras Blancas e Laguna de los Tres' })
    expect(within(today).getByText('Hoje')).toBeInTheDocument()
  })
})
