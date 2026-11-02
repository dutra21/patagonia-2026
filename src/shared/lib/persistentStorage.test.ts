import { afterEach, describe, expect, it, vi } from 'vitest'
import { requestPersistentStorage } from './persistentStorage'

function stubStorage(storage: unknown) {
  vi.stubGlobal('navigator', { ...navigator, storage })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('requestPersistentStorage', () => {
  it('reports granted', async () => {
    stubStorage({ persisted: () => Promise.resolve(false), persist: () => Promise.resolve(true) })
    expect(await requestPersistentStorage()).toBe('granted')
  })

  it('reports a refusal', async () => {
    stubStorage({ persisted: () => Promise.resolve(false), persist: () => Promise.resolve(false) })
    expect(await requestPersistentStorage()).toBe('denied')
  })

  it('treats errors as a refusal', async () => {
    stubStorage({ persisted: () => Promise.reject(new Error('nope')), persist: () => Promise.resolve(true) })
    expect(await requestPersistentStorage()).toBe('denied')
  })

  it('handles browsers without the API', async () => {
    stubStorage(undefined)
    expect(await requestPersistentStorage()).toBe('unsupported')
  })

  it('asks only once per session', async () => {
    const persist = vi.fn<() => Promise<boolean>>().mockResolvedValue(true)
    stubStorage({ persisted: () => Promise.resolve(false), persist })
    await requestPersistentStorage()
    await requestPersistentStorage()
    expect(persist).toHaveBeenCalledOnce()
  })
})
