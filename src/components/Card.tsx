import type { ReactNode } from 'react'
import clsx from 'clsx'

interface Props {
  className?: string
  children: ReactNode
}

const Card = ({ className, children }: Props) => {
  return (
      <div className={clsx(['p-6 bg-white rounded-lg', className])}>
        {children}
      </div>
  )
}

export default Card