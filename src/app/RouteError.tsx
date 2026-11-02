import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import styles from './RouteError.module.css'

export function RouteError() {
  const error = useRouteError()
  const notFound = isRouteErrorResponse(error) && error.status === 404

  return (
    <main id="conteudo" className={styles.main}>
      <title>{notFound ? 'Página não encontrada · Patagonia 2026' : 'Erro · Patagonia 2026'}</title>
      <h1>{notFound ? 'Página não encontrada' : 'Algo deu errado'}</h1>
      <p>
        <Link to="/">Voltar para o início</Link>
      </p>
    </main>
  )
}
