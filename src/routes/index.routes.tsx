import { createBrowserRouter } from 'react-router-dom'
import AdminUser from '../pages/User'
import AdminDashBoard from '../pages/DashBoard'
import PageAdminHome from '../pages/Home'
import PageLogin from '@/pages/Login/index'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <PageAdminHome />
      </>
    ),
    children: [
      {
        index: true,
        element: <AdminDashBoard />
      },
      {
        path: '/user',
        element: <AdminUser />
      }
    ]
  },
  {
    path: '/login',
    element: (
      <>
        <PageLogin />
      </>
    )
  }
])
