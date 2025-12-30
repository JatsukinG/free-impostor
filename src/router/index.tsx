import { createBrowserRouter, Outlet } from 'react-router-dom'
import HomePage from '@/pages/main'
import GamePage from '@/pages/game'
import DashboardLayout from '@/layouts/main'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <DashboardLayout>
          <Outlet/>
        </DashboardLayout>
    ),
    children: [
      {
        path: '',
        element: <HomePage/>,
      },
      {
        path: '/game',
        element: <GamePage/>,
      },
    ],
  },
])

export default router