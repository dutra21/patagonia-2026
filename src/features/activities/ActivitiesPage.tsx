import { useSearchParams } from 'react-router'
import { trip } from '../../data/trip'
import type { PlaceId } from '../../domain/types'
import { ChipNav } from '../../shared/ui/ChipNav'
import { CardGrid } from '../../shared/ui/CardGrid'
import { PageHeader } from '../../shared/ui/PageHeader'
import { ActivityCard } from './ActivityCard'

const cities = [...new Set(trip.activities.map((activity) => activity.placeId))]

export function ActivitiesPage() {
  const [searchParams] = useSearchParams()
  const city = cities.find((placeId) => placeId === searchParams.get('cidade')) satisfies PlaceId | undefined
  const visible = city ? trip.activities.filter((activity) => activity.placeId === city) : trip.activities

  return (
    <>
      <PageHeader title="Passeios">
        <p>
          {visible.length} de {trip.activities.length} passeios.
        </p>
      </PageHeader>

      <ChipNav
        label="Filtrar por cidade"
        chips={[
          { label: 'Todas as cidades', search: '', current: !city },
          ...cities.map((placeId) => ({
            label: trip.places[placeId].name,
            search: `?cidade=${placeId}`,
            current: city === placeId,
          })),
        ]}
      />

      <CardGrid>
        {visible.map((activity) => (
          <li key={activity.id}>
            <ActivityCard activity={activity} place={trip.places[activity.placeId]} />
          </li>
        ))}
      </CardGrid>
    </>
  )
}
