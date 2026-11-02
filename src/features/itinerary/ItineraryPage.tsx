import { useSearchParams } from 'react-router'
import { trip } from '../../data/trip'
import { getItinerary, getTripPhase } from '../../domain/trip'
import { useNow } from '../../shared/lib/useNow'
import { ChipNav } from '../../shared/ui/ChipNav'
import { PageHeader } from '../../shared/ui/PageHeader'
import { DayCard } from './DayCard'
import styles from './ItineraryPage.module.css'

const itinerary = getItinerary(trip)

export function ItineraryPage() {
  const [searchParams] = useSearchParams()
  const now = useNow()
  const phase = getTripPhase(trip, now)
  const today = phase.phase === 'during' ? phase.dayNumber : undefined

  const selected = Number(searchParams.get('dia'))
  const selectedDay = itinerary.find((resolved) => resolved.number === selected)
  const visible = selectedDay ? [selectedDay] : itinerary

  return (
    <>
      <PageHeader title="Roteiro">
        <p>{itinerary.length} dias, de São Paulo à Patagônia e de volta.</p>
      </PageHeader>

      <ChipNav
        label="Escolher dia"
        chips={[
          { label: 'Todos', search: '', current: !selectedDay },
          ...itinerary.map(({ number }) => ({
            label: (
              <>
                <span className="visually-hidden">Dia</span>{' '}
                {number}
                {number === today ? ' · hoje' : null}
              </>
            ),
            search: `?dia=${number}`,
            current: selectedDay?.number === number,
          })),
        ]}
      />

      <div className={styles.days}>
        {visible.map((resolved) => (
          <DayCard key={resolved.day.date} resolved={resolved} trip={trip} isToday={resolved.number === today} />
        ))}
      </div>
    </>
  )
}
