import { useRegisterSW } from 'virtual:pwa-register/react'
import { UpdateBanner } from './UpdateBanner'

const HOUR = 60 * 60 * 1000

/** Registers the service worker and shows its messages. */
export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      // The app can stay open for days in standalone mode: look for updates hourly when online.
      if (!registration) return
      window.setInterval(() => {
        if (navigator.onLine) void registration.update()
      }, HOUR)
    },
  })

  return (
    <UpdateBanner
      needRefresh={needRefresh}
      offlineReady={offlineReady}
      onUpdate={() => void updateServiceWorker(true)}
      onDismiss={() => {
        setNeedRefresh(false)
        setOfflineReady(false)
      }}
    />
  )
}
