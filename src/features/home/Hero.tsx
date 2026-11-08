import cover1200avif from '../../assets/img/cover-1200.avif'
import cover1920avif from '../../assets/img/cover-1920.avif'
import cover1920webp from '../../assets/img/cover-1920.webp'
import cover1200webp from '../../assets/img/cover-1200.webp'
import cover720avif from '../../assets/img/cover-720.avif'
import cover720webp from '../../assets/img/cover-720.webp'
import type { TripPhase } from '../../domain/trip'
import type { Trip } from '../../domain/types'
import { formatDate } from '../../shared/lib/format'
import { travelerPhotos } from './travelerPhotos'
import styles from './Hero.module.css'

const SIZES = '100vw'
const names = new Intl.ListFormat('pt-BR', { type: 'conjunction' })

function phaseLabel(phase: TripPhase, totalDays: number): string {
  switch (phase.phase) {
    case 'before':
      return phase.daysUntil === 1 ? 'Falta 1 dia' : `Faltam ${phase.daysUntil} dias`
    case 'during':
      return `Dia ${phase.dayNumber} de ${totalDays}`
    case 'after':
      return 'Viagem concluída'
  }
}

export function Hero({ trip, phase, totalDays }: { trip: Trip; phase: TripPhase; totalDays: number }) {
  return (
    <div className={styles.hero}>
      <picture>
        <source type="image/avif" srcSet={`${cover720avif} 720w, ${cover1200avif} 1200w, ${cover1920avif} 1920w`} sizes={SIZES} />
        <source type="image/webp" srcSet={`${cover720webp} 720w, ${cover1200webp} 1200w, ${cover1920webp} 1920w`} sizes={SIZES} />
        <img
          className={styles.image}
          src={cover1200webp}
          alt="Glaciar Perito Moreno entre montanhas, com o lago azul-turquesa à frente"
          width={1200}
          height={675}
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className={styles.content}>
        <p className={styles.phase}>{phaseLabel(phase, totalDays)}</p>
        <h1 className={styles.title}>{trip.title}</h1>
        <p className={styles.meta}>
          <time dateTime={trip.start}>{formatDate(trip.start)}</time>
          <span aria-hidden="true"> → </span>
          <span className="visually-hidden"> a </span>
          <time dateTime={trip.end}>{formatDate(trip.end)}</time>
        </p>
        <p className={styles.meta}>
          São Paulo <span aria-hidden="true">→</span>
          <span className="visually-hidden">até a</span> Patagônia
        </p>

        <div className={styles.travelers}>
          <ul className={styles.avatars}>
            {trip.travelers.map((traveler) => {
              const photo = travelerPhotos[traveler.id]
              return photo ? (
                <li key={traveler.id}>
                  <img src={photo} alt="" width={48} height={48} className={styles.avatar} decoding="async" />
                </li>
              ) : null
            })}
          </ul>
          <p>{names.format(trip.travelers.map((traveler) => traveler.name))}</p>
        </div>
      </div>
    </div>
  )
}
