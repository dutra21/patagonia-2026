import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import styles from './Card.module.css'

type CardProps<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Card<T extends ElementType = 'div'>({ as, children, className, ...rest }: CardProps<T>) {
  const Component: ElementType = as ?? 'div'
  return (
    <Component className={className ? `${styles.card} ${className}` : styles.card} {...rest}>
      {children}
    </Component>
  )
}
