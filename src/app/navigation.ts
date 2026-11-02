import { BedDouble, CalendarDays, Footprints, House, ListChecks, Plane, type LucideIcon } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Início', icon: House },
  { to: '/roteiro', label: 'Roteiro', icon: CalendarDays },
  { to: '/voos', label: 'Voos', icon: Plane },
  { to: '/hospedagens', label: 'Hospedagens', icon: BedDouble },
  { to: '/passeios', label: 'Passeios', icon: Footprints },
  { to: '/checklist', label: 'Checklist', icon: ListChecks },
]
