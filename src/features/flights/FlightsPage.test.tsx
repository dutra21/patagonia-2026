import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderRoute } from '../../test/renderRoute'

describe('FlightsPage', () => {
  it('lists the 5 flights in order', () => {
    renderRoute('/voos')
    const codes = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(codes).toEqual(['LA8140', 'AR1850', 'AR1894', 'AR1881', 'LA8139'])
  })

  it('shows local times, airports and duration', () => {
    renderRoute('/voos')
    const card = screen.getByRole('article', { name: 'LA8140' })
    expect(within(card).getByText('20/11/2026')).toBeInTheDocument()
    expect(within(card).getByText('09:00')).toBeInTheDocument()
    expect(within(card).getByText('12:00')).toBeInTheDocument()
    expect(within(card).getByText('GRU')).toBeInTheDocument()
    expect(within(card).getByText('AEP')).toBeInTheDocument()
    expect(within(card).getByText(/3h/)).toBeInTheDocument()
    expect(within(card).getByText('Aeroparque Jorge Newbery')).toBeInTheDocument()
  })
})
