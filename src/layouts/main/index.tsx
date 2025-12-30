import type { ReactNode } from 'react'
import DashboardNavbar from '@/layouts/main/components/navbar'

interface Props {
  children?: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
      <div className="w-full min-h-screen">
        {/*<DashboardNavbar/>*/}
        {children}
      </div>
  )
}

export default DashboardLayout