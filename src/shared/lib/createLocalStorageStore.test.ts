import { describe, expect, it, vi } from 'vitest'
import { createLocalStorageStore } from './createLocalStorageStore'

const KEY = 'test:value'
const parse = (value: unknown) => (typeof value === 'number' ? value : undefined)
const makeStore = (onChange?: (value: number) => void) =>
  createLocalStorageStore({ key: KEY, fallback: 0, parse, ...(onChange ? { onChange } : {}) })

describe('createLocalStorageStore', () => {
  it('returns the fallback when nothing is stored', () => {
    expect(makeStore().getSnapshot()).toBe(0)
  })

  it('reads a stored value', () => {
    localStorage.setItem(KEY, '42')
    expect(makeStore().getSnapshot()).toBe(42)
  })

  it('ignores invalid or unexpected stored data', () => {
    localStorage.setItem(KEY, '{not json')
    expect(makeStore().getSnapshot()).toBe(0)
    localStorage.setItem(KEY, '"text"')
    expect(makeStore().getSnapshot()).toBe(0)
  })

  it('persists and notifies on set', () => {
    const onChange = vi.fn<(value: number) => void>()
    const store = makeStore(onChange)
    const listener = vi.fn<() => void>()
    store.subscribe(listener)
    store.set(7)
    expect(store.getSnapshot()).toBe(7)
    expect(localStorage.getItem(KEY)).toBe('7')
    expect(listener).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith(7)
  })

  it('returns the same snapshot until something changes', () => {
    const store = createLocalStorageStore({ key: KEY, fallback: {}, parse: (v) => (typeof v === 'object' && v ? v : undefined) })
    expect(store.getSnapshot()).toBe(store.getSnapshot())
  })

  it('picks up changes from another tab', () => {
    const store = makeStore()
    const listener = vi.fn<() => void>()
    store.subscribe(listener)
    expect(store.getSnapshot()).toBe(0)

    localStorage.setItem(KEY, '5')
    window.dispatchEvent(new StorageEvent('storage', { key: KEY }))

    expect(listener).toHaveBeenCalledOnce()
    expect(store.getSnapshot()).toBe(5)
  })

  it('keeps working in memory when storage throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('quota', 'QuotaExceededError')
    })
    const store = makeStore()
    store.set(3)
    expect(store.getSnapshot()).toBe(3)
  })
})

describe('createLocalStorageStore while nothing is subscribed', () => {
  it('still picks up changes from another tab', () => {
    const store = makeStore()
    const unsubscribe = store.subscribe(() => {})
    expect(store.getSnapshot()).toBe(0)
    unsubscribe()

    localStorage.setItem(KEY, '9')
    window.dispatchEvent(new StorageEvent('storage', { key: KEY }))

    expect(store.getSnapshot()).toBe(9)
  })
})
