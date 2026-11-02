import { trip } from '../../data/trip'
import { CardGrid } from '../../shared/ui/CardGrid'
import { PageHeader } from '../../shared/ui/PageHeader'
import { StayCard } from './StayCard'

export function StaysPage() {
  return (
    <>
      <PageHeader title="Hospedagens">
        <p>{trip.stays.length} hospedagens. Horários locais.</p>
      </PageHeader>
      <CardGrid>
        {trip.stays.map((stay) => (
          <li key={stay.id}>
            <StayCard stay={stay} place={trip.places[stay.placeId]} />
          </li>
        ))}
      </CardGrid>
    </>
  )
}
