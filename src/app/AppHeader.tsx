import { MountainSnow } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import { navItems } from './navigation'
import { OfflineIndicator } from './pwa/OfflineIndicator'
import { ThemeToggle } from './theme/ThemeToggle'
import styles from './AppHeader.module.css'

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link to="/" className={styles.brand}>
          <MountainSnow aria-hidden="true" size={24} />
          <span>Patagonia 2026</span>
        </Link>

        <nav aria-label="Principal" className={styles.nav}>
          <ul className={styles.list}>
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
                  <Icon aria-hidden="true" size={20} className={styles.icon} />
                  <span className={styles.label}>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.tools}>
          <OfflineIndicator />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
