import { RotateCcw } from 'lucide-react'
import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { pluralize } from '../../shared/lib/format'
import styles from './ResetChecklist.module.css'

/** Two-step reset: the destructive action needs an explicit confirmation. */
export function ResetChecklist({ checkedCount, onReset }: { checkedCount: number; onReset: () => void }) {
  const [confirming, setConfirming] = useState(false)
  const resetButton = useRef<HTMLButtonElement>(null)
  const cancelButton = useRef<HTMLButtonElement>(null)

  // Focus moves in the handlers: to the safe option when asking, back to the trigger when done.
  function open() {
    flushSync(() => setConfirming(true))
    cancelButton.current?.focus()
  }

  function close() {
    flushSync(() => setConfirming(false))
    // After a reset the button is disabled and cannot take focus: fall back to the page content.
    const target = resetButton.current?.disabled ? document.querySelector<HTMLElement>('main') : resetButton.current
    target?.focus()
  }

  if (confirming) {
    return (
      <fieldset className={styles.confirm}>
        <legend className={styles.question}>
          Desmarcar {pluralize(checkedCount, 'item', 'itens')}? Isso não pode ser desfeito.
        </legend>
        <div className={styles.actions}>
          <button ref={cancelButton} type="button" className={styles.secondary} onClick={close}>
            Cancelar
          </button>
          <button
            type="button"
            className={styles.danger}
            onClick={() => {
              onReset()
              close()
            }}
          >
            Sim, desmarcar tudo
          </button>
        </div>
      </fieldset>
    )
  }

  return (
    <div className={styles.wrapper}>
      <button ref={resetButton} type="button" className={styles.secondary} onClick={open} disabled={checkedCount === 0}>
        <RotateCcw aria-hidden="true" size={16} />
        Resetar checklist
      </button>
    </div>
  )
}
