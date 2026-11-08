import type { Ticket } from '../../domain/types'
import styles from './ActivityCard.module.css'

const rows: { key: keyof Omit<Ticket, 'product'>; label: string }[] = [
  { key: 'price', label: 'Valor' },
  { key: 'website', label: 'Site' },
  { key: 'select', label: 'Selecionar' },
  { key: 'purchase', label: 'Comprar' },
  { key: 'entrance', label: 'Portal' },
  { key: 'note', label: 'Obs.' },
]

export function TicketSection({ ticket }: { ticket: Ticket }) {
  return (
    <section className={styles.details} aria-label="Ingresso">
      <h3 className={styles.sectionTitle}>Ingresso</h3>
      <p className={styles.product}>{ticket.product}</p>
      <dl className={styles.ticketList}>
        {rows.map(({ key, label }) =>
          ticket[key] ? (
            <div key={key}>
              <dt>{label}</dt>
              <dd>{ticket[key]}</dd>
            </div>
          ) : null,
        )}
      </dl>
    </section>
  )
}
