import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { UpdateBanner } from './UpdateBanner'

const noop = () => {}

describe('UpdateBanner', () => {
  it('is empty when there is nothing to say', () => {
    render(<UpdateBanner needRefresh={false} offlineReady={false} onUpdate={noop} onDismiss={noop} />)
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })

  it('offers the update and only updates when asked', async () => {
    const user = userEvent.setup()
    const onUpdate = vi.fn<() => void>()
    const onDismiss = vi.fn<() => void>()
    render(<UpdateBanner needRefresh offlineReady={false} onUpdate={onUpdate} onDismiss={onDismiss} />)

    expect(screen.getByRole('status')).toHaveTextContent('Nova versão disponível')
    expect(onUpdate).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: 'Depois' }))
    expect(onDismiss).toHaveBeenCalledOnce()
    expect(onUpdate).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: 'Atualizar' }))
    expect(onUpdate).toHaveBeenCalledOnce()
  })

  it('says when the app is ready offline', () => {
    render(<UpdateBanner needRefresh={false} offlineReady onUpdate={noop} onDismiss={noop} />)
    expect(screen.getByRole('status')).toHaveTextContent('Pronto para usar sem internet.')
  })
})
