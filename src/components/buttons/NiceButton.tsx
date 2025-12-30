import type { ReactNode } from 'react'
import './nice-button.css'

interface Props {
  children: ReactNode
  onClick?: () => void
}

const NiceButton = ({ children, onClick }: Props) => {
  return (
      <button type="button" className="button w-full" onClick={() => onClick?.()}>
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