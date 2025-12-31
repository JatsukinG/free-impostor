import type { ReactNode } from 'react'
import './nice-button.css'
import clsx from 'clsx'

interface Props {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}

const NiceButton = ({ children, disabled = false, onClick }: Props) => {
  return (
      <button
          type="button"
          disabled={!!disabled}
          className={clsx(['button w-full', disabled && 'disabled'])}
          onClick={() => onClick?.()}
      >
        <div className="points_wrapper">
          <i className="point"></i>
          <i className="point"></i>
          <i className="point"></i>
          <i className="point"></i>
          <i className="point"></i>
          <i className="point"></i>
          <i className="point"></i>
          <i className="point"></i>
          <i className="point"></i>
          <i className="point"></i>
        </div>

        <span className="inner">
          {children}
        </span>
      </button>

  )
}

export default NiceButton