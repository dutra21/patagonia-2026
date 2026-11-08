import { useMemo, useSyncExternalStore } from 'react'

const MINUTE = 60_000

function currentMinute(): number {
  return Math.floor(Date.now() / MINUTE)
}

function subscribe(onChange: () => void): () => void {
  // Checks often but only re-renders when the minute changes (the snapshot is a number).
  const id = window.setInterval(onChange, MINUTE / 4)
  document.addEventListener('visibilitychange', onChange)
  return () => {
    window.clearInterval(id)
    document.removeEventListener('visibilitychange', onChange)
  }
}

/** Current time, precise to the minute. */
export function useNow(): Date {
  const minute = useSyncExternalStore(subscribe, currentMinute, currentMinute)
  return useMemo(() => new Date(minute * MINUTE), [minute])
}
