import type { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
      <div className="w-full min-h-screen flex">
        <div className="mx-auto w-full max-w-sm min-h-screen">
        {children}
        </div>
      </div>
  )
}

export default DashboardLayout