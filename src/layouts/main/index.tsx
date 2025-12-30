import type { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
      <div className="w-full min-h-screen">
        {children}
      </div>
  )
}

export default DashboardLayout