import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <>
      <title>Página não encontrada · Patagonia 2026</title>
      <h1>Página não encontrada</h1>
      <p>
        <Link to="/">Voltar para o início</Link>
      </p>
    </>
  )
}
