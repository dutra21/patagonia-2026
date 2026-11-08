import type { Difficulty } from '../../domain/types'
import { Badge, type BadgeTone } from '../../shared/ui/Badge'

const DIFFICULTY: Record<Difficulty, { label: string; tone: BadgeTone }> = {
  easy: { label: 'Fácil', tone: 'success' },
  moderate: { label: 'Moderado', tone: 'warning' },
  hard: { label: 'Difícil', tone: 'danger' },
}

/** The text always carries the meaning; color only reinforces it. */
export function DifficultyBadge({ difficulty }: { difficulty: Difficulty | undefined }) {
  const { label, tone } = difficulty ? DIFFICULTY[difficulty] : { label: 'A confirmar', tone: 'neutral' as const }
  return (
    <Badge tone={tone}>
      <span className="visually-hidden">Dificuldade: </span>
      {label}
    </Badge>
  )
}
