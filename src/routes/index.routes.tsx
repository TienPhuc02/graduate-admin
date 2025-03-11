import { createBrowserRouter } from 'react-router-dom'
import AdminUser from '../pages/User'
import AdminDashBoard from '../pages/DashBoard'
import PageAdminHome from '../pages/Home'
import PageLogin from '@/pages/Login/index'
import PageCreateUser from '@/pages/User/CreateUser'
import PageUpdateUser from '@/pages/User/UpdateUser'
import PageNotFound from '@/pages/NotFound'
import AdminCourse from '@/pages/Course'
import PageCreateCourse from '@/pages/Course/CreateCourse'
import PageUpdateCourse from '@/pages/Course/UpdateCourse'
import AdminLecture from '@/pages/Lecture'
import PageCreateLecture from '@/pages/Lecture/CreateLecture'
import PageUpdateLecture from '@/pages/Lecture/UpdateLecture'
import AdminLesson from '@/pages/Lesson'
import PageCreateLesson from '@/pages/Lesson/CreateLesson'
import PageUpdateLesson from '@/pages/Lesson/UpdateLesson'
import AdminComment from '@/pages/Comment'
import PageCreateComment from '@/pages/Comment/CreateComment'
import PageUpdateComment from '@/pages/Comment/UpdateComment'
import AdminBlog from '@/pages/Blog'
import PageCreateBlog from '@/pages/Blog/CreateBlog'
import PageUpdateBlog from '@/pages/Blog/UpdateBlog'
import AdminCoupon from '@/pages/Coupon'
import PageUpdateCoupon from '@/pages/Coupon/UpdateCoupon'
import PageCreateCoupon from '@/pages/Coupon/CreateCoupon'
import AdminOrderItem from '@/pages/OrderItem'
import PageCreateOrderItem from '@/pages/OrderItem/CreateOrderItem'
import PageUpdateOrderItem from '@/pages/OrderItem/UpdateOrderItem'
import AdminOrder from '@/pages/Order'
import PageCreateOrder from '@/pages/Order/CreateOrder'
import PageUpdateOrder from '@/pages/Order/UpdateOrder'
import ProtectedRoute from '@/components/commons/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageAdminHome />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <AdminDashBoard />
          </ProtectedRoute>
        )
      },
      {
        path: 'user',
        element: (
          <ProtectedRoute>
            <AdminUser />
          </ProtectedRoute>
        )
      },
      {
        path: 'user/create',
        element: (
          <ProtectedRoute>
            <PageCreateUser />
          </ProtectedRoute>
        )
      },
      {
        path: 'user/update/:id',
        element: (
          <ProtectedRoute>
            <PageUpdateUser />
          </ProtectedRoute>
        )
      },
      {
        path: 'course',
        element: (
          <ProtectedRoute>
            <AdminCourse />
          </ProtectedRoute>
        )
      },
      {
        path: 'course/create',
        element: (
          <ProtectedRoute>
            <PageCreateCourse />
          </ProtectedRoute>
        )
      },
      {
        path: 'course/update/:id',
        element: (
          <ProtectedRoute>
            <PageUpdateCourse />
          </ProtectedRoute>
        )
      },
      {
        path: 'lecture',
        element: (
          <ProtectedRoute>
            <AdminLecture />
          </ProtectedRoute>
        )
      },
      {
        path: 'lecture/create',
        element: (
          <ProtectedRoute>
            <PageCreateLecture />
          </ProtectedRoute>
        )
      },
      {
        path: 'lecture/update/:id',
        element: (
          <ProtectedRoute>
            <PageUpdateLecture />
          </ProtectedRoute>
        )
      },
      {
        path: 'lesson',
        element: (
          <ProtectedRoute>
            <AdminLesson />
          </ProtectedRoute>
        )
      },
      {
        path: 'lesson/create',
        element: (
          <ProtectedRoute>
            <PageCreateLesson />
          </ProtectedRoute>
        )
      },
      {
        path: 'lesson/update/:id',
        element: (
          <ProtectedRoute>
            <PageUpdateLesson />
          </ProtectedRoute>
        )
      },
      {
        path: 'comment',
        element: (
          <ProtectedRoute>
            <AdminComment />
          </ProtectedRoute>
        )
      },
      {
        path: 'comment/create',
        element: (
          <ProtectedRoute>
            <PageCreateComment />
          </ProtectedRoute>
        )
      },
      {
        path: 'comment/update/:id',
        element: (
          <ProtectedRoute>
            <PageUpdateComment />
          </ProtectedRoute>
        )
      },
      {
        path: 'blog',
        element: (
          <ProtectedRoute>
            <AdminBlog />
          </ProtectedRoute>
        )
      },
      {
        path: 'blog/create',
        element: (
          <ProtectedRoute>
            <PageCreateBlog />
          </ProtectedRoute>
        )
      },
      {
        path: 'blog/update/:id',
        element: (
          <ProtectedRoute>
            <PageUpdateBlog />
          </ProtectedRoute>
        )
      },
      {
        path: 'coupon',
        element: (
          <ProtectedRoute>
            <AdminCoupon />
          </ProtectedRoute>
        )
      },
      {
        path: 'coupon/create',
        element: (
          <ProtectedRoute>
            <PageCreateCoupon />
          </ProtectedRoute>
        )
      },
      {
        path: 'coupon/update/:id',
        element: (
          <ProtectedRoute>
            <PageUpdateCoupon />
          </ProtectedRoute>
        )
      },
      {
        path: 'order-item',
        element: (
          <ProtectedRoute>
            <AdminOrderItem />
          </ProtectedRoute>
        )
      },
      {
        path: 'order-item/create',
        element: (
          <ProtectedRoute>
            <PageCreateOrderItem />
          </ProtectedRoute>
        )
      },
      {
        path: 'order-item/update/:id',
        element: (
          <ProtectedRoute>
            <PageUpdateOrderItem />
          </ProtectedRoute>
        )
      },
      {
        path: 'order',
        element: (
          <ProtectedRoute>
            <AdminOrder />
          </ProtectedRoute>
        )
      },
      {
        path: 'order/create',
        element: (
          <ProtectedRoute>
            <PageCreateOrder />
          </ProtectedRoute>
        )
      },
      {
        path: 'order/update/:id',
        element: (
          <ProtectedRoute>
            <PageUpdateOrder />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <PageLogin />
  }
])
