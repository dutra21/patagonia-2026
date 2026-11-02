import { RefreshCw } from 'lucide-react'
import styles from './UpdateBanner.module.css'

interface Props {
  needRefresh: boolean
  offlineReady: boolean
  onUpdate: () => void
  onDismiss: () => void
}

/**
 * Service worker messages. Updating is always the user's choice (no automatic reload).
 * The live region stays mounted so screen readers announce new messages.
 */
export function UpdateBanner({ needRefresh, offlineReady, onUpdate, onDismiss }: Props) {
  return (
    <output aria-live="polite" className={styles.region}>
      {needRefresh ? (
        <div className={styles.banner}>
          <p className={styles.text}>Nova versão disponível</p>
          <div className={styles.actions}>
            <button type="button" className={styles.primary} onClick={onUpdate}>
              <RefreshCw aria-hidden="true" size={16} />
              Atualizar
            </button>
            <button type="button" className={styles.secondary} onClick={onDismiss}>
              Depois
            </button>
          </div>
        </div>
      ) : offlineReady ? (
        <div className={styles.banner}>
          <p className={styles.text}>Pronto para usar sem internet.</p>
          <div className={styles.actions}>
            <button type="button" className={styles.secondary} onClick={onDismiss}>
              OK
            </button>
          </div>
        </div>
      ) : null}
    </output>
  )
}
