import type { ReactNode } from 'react'
import clsx from 'clsx'

interface Props {
  cols?: number,
  children: ReactNode
}

const FormGrid = ({ children, cols = 1 }: Props) => {
  if (cols > 4)
    throw new Error('Invalid number of columns, allowed value is 4')

  return (
      <div className={clsx([
        'grid gap-3',
        cols === 1 && 'grid-cols-1',
        cols === 2 && 'grid-cols-1 md:grid-cols-2',
        cols === 3 && 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
        cols === 4 && 'grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-4',
      ])}>
        {children}
      </div>
  )
}

export default FormGrid