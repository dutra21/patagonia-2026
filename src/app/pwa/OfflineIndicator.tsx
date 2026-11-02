import { WifiOff } from 'lucide-react'
import { useOnlineStatus } from './useOnlineStatus'
import styles from './OfflineIndicator.module.css'

/** Discreet "Offline" pill. The live region is always present so the change is announced. */
export function OfflineIndicator() {
  const online = useOnlineStatus()
  return (
    <output aria-live="polite" className={styles.status}>
      {online ? null : (
        <span className={styles.pill} title="Sem internet. Tudo continua funcionando.">
          <WifiOff aria-hidden="true" size={14} />
          Offline
        </span>
      )}
    </output>
  )
}
