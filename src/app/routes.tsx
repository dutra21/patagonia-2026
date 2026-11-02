import type { RouteObject } from 'react-router'
import { ActivitiesPage } from '../features/activities/ActivitiesPage'
import { ChecklistPage } from '../features/checklist/ChecklistPage'
import { FlightsPage } from '../features/flights/FlightsPage'
import { HomePage } from '../features/home/HomePage'
import { ItineraryPage } from '../features/itinerary/ItineraryPage'
import { StaysPage } from '../features/stays/StaysPage'
import { NotFoundPage } from './NotFoundPage'
import { RootLayout } from './RootLayout'
import { RouteError } from './RouteError'

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'roteiro', element: <ItineraryPage /> },
      { path: 'voos', element: <FlightsPage /> },
      { path: 'hospedagens', element: <StaysPage /> },
      { path: 'passeios', element: <ActivitiesPage /> },
      { path: 'checklist', element: <ChecklistPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
