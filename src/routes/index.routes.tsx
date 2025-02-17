import { createBrowserRouter } from 'react-router-dom'
import AdminUser from '../pages/User'
import AdminDashBoard from '../pages/DashBoard'
import PageAdminHome from '../pages/Home'
import PageLogin from '@/pages/Login/index'
import PageCreateUser from '@/pages/User/CreateUser'
import PageUpdateUser from '@/pages/User/UpdateUser'

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
        path: 'user',
        element: <AdminUser />
      },
      {
        path: 'user/create',
        element: <PageCreateUser />
      },
      {
        path: 'user/update/:id',
        element: <PageUpdateUser />
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
