import { screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderRoute } from '../../test/renderRoute'

function setNow(iso: string) {
  vi.setSystemTime(new Date(iso))
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
})

afterEach(() => {
  vi.useRealTimers()
})

function section(name: string) {
  return screen.getByRole('region', { name })
}

describe('HomePage', () => {
  it('shows the trip summary before departure', () => {
    setNow('2026-11-02T12:00-03:00')
    renderRoute('/')

    expect(screen.getByRole('heading', { level: 1, name: 'Patagonia 2026' })).toBeInTheDocument()
    expect(screen.getByText('Faltam 18 dias')).toBeInTheDocument()
    expect(screen.getByText('Mariana, Duda, Márcia e Andréa')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Perito Moreno/ })).toBeInTheDocument()

    const stats = within(section('Resumo da viagem')).getAllByRole('listitem').map((item) => item.textContent)
    expect(stats).toEqual(['5Voos', '4Hospedagens', '4Cidades', '7Passeios', '11Dias'])

    expect(within(section('Rota')).getAllByRole('listitem')).toHaveLength(7)
  })

  it('lists the next steps starting with the first flight', () => {
    setNow('2026-11-02T12:00-03:00')
    renderRoute('/')

    const next = section('Próximos passos')
    const flights = within(next).getAllByText(/^[A-Z]{3} → [A-Z]{3}$/).map((el) => el.textContent)
    expect(flights).toEqual(['GRU → AEP', 'AEP → FTE'])
    expect(within(next).getByText('09:00 → 12:00')).toBeInTheDocument()
    expect(within(next).getByRole('link', { name: 'Ver roteiro completo' })).toHaveAttribute('href', '/roteiro')
  })

  it('follows the clock during the trip', () => {
    setNow('2026-11-26T12:30-03:00')
    renderRoute('/')

    expect(screen.getByText('Dia 7 de 11')).toBeInTheDocument()
    const next = section('Próximos passos')
    expect(within(next).getByText('FTE → USH')).toBeInTheDocument()
    expect(within(next).queryByText('Devolução do carro')).not.toBeInTheDocument()
  })

  it('says goodbye after the trip', () => {
    setNow('2026-12-01T09:00-03:00')
    renderRoute('/')

    expect(screen.getByText('Viagem concluída')).toBeInTheDocument()
    expect(screen.getByText('A viagem terminou. Até a próxima!')).toBeInTheDocument()
  })

  it('links every page preview', () => {
    setNow('2026-11-02T12:00-03:00')
    renderRoute('/')

    const previews = section('Páginas')
    for (const [name, href] of [
      ['Ver todos os voos', '/voos'],
      ['Ver roteiro completo', '/roteiro'],
      ['Ver todas as hospedagens', '/hospedagens'],
      ['Ver todos os passeios', '/passeios'],
      ['Ver checklist completo', '/checklist'],
    ] as const) {
      expect(within(previews).getByRole('link', { name })).toHaveAttribute('href', href)
    }
  })
})
