import { useLayoutEffect, useRef, type ReactNode } from 'react'
import styles from './CardGrid.module.css'

/** Responsive ordered list of cards, packed with no vertical gaps. Children must be <li> elements. */
export function CardGrid({ children }: { children: ReactNode }) {
  const listRef = useRef<HTMLOListElement>(null)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    // Items keep row order (1 2 / 3 4) and each column stacks independently.
    const pack = () => {
      const items = [...list.children] as HTMLElement[]
      const style = getComputedStyle(list)
      const columns = style.gridTemplateColumns.split(' ').filter(Boolean).length
      const gap = parseFloat(style.columnGap) || 0
      if (columns === 0) return

      const bottoms = new Array<number>(columns).fill(1)
      items.forEach((item, index) => {
        item.style.gridRowStart = ''
        item.style.gridRowEnd = ''
        const column = index % columns
        const span = Math.ceil(item.firstElementChild?.getBoundingClientRect().height ?? item.getBoundingClientRect().height) + gap
        item.style.gridColumn = String(column + 1)
        item.style.gridRowStart = String(bottoms[column] ?? 1)
        item.style.gridRowEnd = `span ${span}`
        bottoms[column] = (bottoms[column] ?? 1) + span
      })
    }

    pack()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(pack)
    observer.observe(list)
    for (const item of list.children) observer.observe(item.firstElementChild ?? item)
    return () => observer.disconnect()
  }, [children])

  return (
    <ol ref={listRef} className={styles.list}>
      {children}
    </ol>
  )
}
