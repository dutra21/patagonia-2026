import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { AppHeader } from './AppHeader'
import { UpdatePrompt } from './pwa/UpdatePrompt'
import styles from './RootLayout.module.css'

export function RootLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)

  // Move focus to the new page after client-side navigation, so screen readers announce it.
  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <>
      <a href="#conteudo" className={styles.skipLink}>
        Pular para o conteúdo
      </a>
      <AppHeader />
      <main id="conteudo" ref={mainRef} tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <UpdatePrompt />
      <ScrollRestoration />
    </>
  )
}
