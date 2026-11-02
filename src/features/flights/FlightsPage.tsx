import { trip } from '../../data/trip'
import { CardGrid } from '../../shared/ui/CardGrid'
import { PageHeader } from '../../shared/ui/PageHeader'
import { FlightCard } from './FlightCard'

export function FlightsPage() {
  return (
    <>
      <PageHeader title="Voos">
        <p>{trip.flights.length} voos. Horários locais de cada aeroporto.</p>
      </PageHeader>
      <CardGrid>
        {trip.flights.map((flight) => (
          <li key={flight.id}>
            <FlightCard flight={flight} from={trip.places[flight.from]} to={trip.places[flight.to]} />
          </li>
        ))}
      </CardGrid>
    </>
  )
}
