import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it } from 'vitest'
import { routes } from './routes'

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

const pages = [
  { path: '/', heading: 'Patagonia 2026', link: 'Início' },
  { path: '/roteiro', heading: 'Roteiro', link: 'Roteiro' },
  { path: '/voos', heading: 'Voos', link: 'Voos' },
  { path: '/hospedagens', heading: 'Hospedagens', link: 'Hospedagens' },
  { path: '/passeios', heading: 'Passeios', link: 'Passeios' },
  { path: '/checklist', heading: 'Checklist', link: 'Checklist' },
]

describe('routes', () => {
  it.each(pages)('$path renders one h1 and marks its link as current', ({ path, heading, link }) => {
    renderAt(path)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()

    const nav = screen.getByRole('navigation', { name: 'Principal' })
    const current = nav.querySelectorAll('[aria-current="page"]')
    expect(current).toHaveLength(1)
    expect(current[0]).toHaveAccessibleName(link)
  })

  it('has the landmarks and a skip link', () => {
    renderAt('/')
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pular para o conteúdo' })).toHaveAttribute('href', '#conteudo')
  })

  it('navigates with the menu and moves focus to the new page', async () => {
    const user = userEvent.setup()
    const router = renderAt('/')
    await user.click(screen.getByRole('link', { name: 'Voos' }))
    expect(router.state.location.pathname).toBe('/voos')
    expect(screen.getByRole('heading', { level: 1, name: 'Voos' })).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('shows a not-found page for unknown paths', () => {
    renderAt('/nao-existe')
    expect(screen.getByRole('heading', { level: 1, name: 'Página não encontrada' })).toBeInTheDocument()
  })
})
