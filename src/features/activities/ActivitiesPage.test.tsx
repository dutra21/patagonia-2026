import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderRoute } from '../../test/renderRoute'

describe('ActivitiesPage', () => {
  it('lists every activity with a difficulty in text', () => {
    renderRoute('/passeios')
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(7)
    for (const card of cards) expect(within(card).getByText(/^(Fácil|Moderado|Difícil|A confirmar)$/)).toBeInTheDocument()
  })

  it('shows the meeting point and time of the Beagle trip', () => {
    renderRoute('/passeios')
    const card = screen.getByRole('article', { name: 'Navegação no Canal de Beagle' })
    expect(within(card).getByText('08:30')).toBeInTheDocument()
    expect(within(card).getByText(/Piratour/)).toBeInTheDocument()
  })

  it('filters by city through the URL', async () => {
    const user = userEvent.setup()
    const router = renderRoute('/passeios')
    const filters = screen.getByRole('navigation', { name: 'Filtrar por cidade' })

    await user.click(within(filters).getByRole('link', { name: 'Ushuaia' }))

    expect(router.state.location.search).toBe('?cidade=ushuaia')
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByText('2 de 7 passeios.')).toBeInTheDocument()
  })

  it('ignores an unknown city', () => {
    renderRoute('/passeios?cidade=lisboa')
    expect(screen.getAllByRole('article')).toHaveLength(7)
  })
})
