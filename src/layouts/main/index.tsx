import type { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
      <div className="w-full min-h-[100dvh] flex">
        <div className="mx-auto w-full max-w-sm min-h-[100dvh]">
        {children}
        </div>
      </div>
  )
}

export default DashboardLayout