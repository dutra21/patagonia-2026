import { trip } from '../../data/trip'
import { getItinerary, getNextSteps, getRouteStops, getTripPhase, getTripStats } from '../../domain/trip'
import { useNow } from '../../shared/lib/useNow'
import { Hero } from './Hero'
import { HomeSection } from './HomeSection'
import { NextSteps } from './NextSteps'
import { PagePreviews } from './PagePreviews'
import { RouteMap } from './RouteMap'
import { TripStats } from './TripStats'
import styles from './HomePage.module.css'

// Static data: computed once.
const stats = getTripStats(trip)
const stops = getRouteStops(trip)
const itinerary = getItinerary(trip)

export function HomePage() {
  const now = useNow()

  return (
    <>
      <title>Patagonia 2026</title>
      <Hero trip={trip} phase={getTripPhase(trip, now)} totalDays={stats.days} />

      <div className={styles.page}>

      <HomeSection id="resumo" title="Resumo da viagem">
        <TripStats stats={stats} />
      </HomeSection>

      <div className={styles.columns}>
        <HomeSection id="mapa" title="Mapa do roteiro">
          <RouteMap trip={trip} stops={stops} />
        </HomeSection>
        <HomeSection id="proximos-passos" title="Próximos passos">
          <NextSteps events={getNextSteps(trip, now, 5)} />
        </HomeSection>
      </div>

      <HomeSection id="paginas" title="Páginas">
        <PagePreviews trip={trip} days={itinerary} />
      </HomeSection>
      </div>
    </>
  )
}
