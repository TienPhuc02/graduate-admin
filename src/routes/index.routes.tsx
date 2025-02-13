import { createBrowserRouter } from 'react-router-dom'
import AdminHome from '../pages/Home'
import AdminUser from '../pages/User'
import AdminDashBoard from '../pages/DashBoard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <AdminHome />
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
  }
])
