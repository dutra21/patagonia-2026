import { BedDouble, Bus, Car, CarFront, DoorOpen, Footprints, KeyRound, Plane, type LucideIcon } from 'lucide-react'
import type { TripEventKind } from '../../domain/types'

export const eventIcons: Record<TripEventKind, LucideIcon> = {
  flight: Plane,
  car: Car,
  bus: Bus,
  activity: Footprints,
  'check-in': BedDouble,
  'check-out': DoorOpen,
  'car-pickup': KeyRound,
  'car-dropoff': CarFront,
}
