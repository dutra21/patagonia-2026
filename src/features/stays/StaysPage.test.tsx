import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderRoute } from '../../test/renderRoute'

describe('StaysPage', () => {
  it('shows city, name, dates and address for each stay', () => {
    renderRoute('/hospedagens')
    expect(screen.getAllByRole('article')).toHaveLength(4)

    const card = screen.getByRole('article', { name: 'Apart Ruta 40' })
    expect(within(card).getByText('El Chaltén')).toBeInTheDocument()
    expect(within(card).getByText(/4 noites/)).toBeInTheDocument()
    expect(within(card).getByText('14:00–20:30')).toBeInTheDocument()
    expect(within(card).getByText('até 10:00')).toBeInTheDocument()
    expect(within(card).getByText('Comandante Arrua, El Chaltén, Argentina')).toBeInTheDocument()
  })

  it('links each address to a map', () => {
    renderRoute('/hospedagens')
    const card = screen.getByRole('article', { name: 'Hotel Regis' })
    expect(within(card).getByRole('link', { name: /Abrir no mapa/ })).toHaveAttribute(
      'href',
      expect.stringContaining('Lavalle%20813'),
    )
  })
})
