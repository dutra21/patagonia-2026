import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { OfflineIndicator } from './OfflineIndicator'

function goOffline(offline: boolean) {
  vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(!offline)
  act(() => window.dispatchEvent(new Event(offline ? 'offline' : 'online')))
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('OfflineIndicator', () => {
  it('shows "Offline" only without connection', () => {
    render(<OfflineIndicator />)
    expect(screen.getByRole('status')).toBeEmptyDOMElement()

    goOffline(true)
    expect(screen.getByRole('status')).toHaveTextContent('Offline')

    goOffline(false)
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })
})
