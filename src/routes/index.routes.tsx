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
import AdminBlog from '@/pages/Blog'
import PageCreateBlog from '@/pages/Blog/CreateBlog'
import PageUpdateBlog from '@/pages/Blog/UpdateBlog'
import PageUpdateComment from '@/pages/Comment/UpdateComment'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <PageAdminHome />
      </>
    ),
    errorElement: <PageNotFound />,
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
      },
      {
        path: 'course',
        element: <AdminCourse />
      },
      {
        path: 'course/create',
        element: <PageCreateCourse />
      },
      {
        path: 'course/update/:id',
        element: <PageUpdateCourse />
      },
      {
        path: 'lecture',
        element: <AdminLecture />
      },
      {
        path: 'lecture/create',
        element: <PageCreateLecture />
      },
      {
        path: 'lecture/update/:id',
        element: <PageUpdateLecture />
      },
      {
        path: 'lesson',
        element: <AdminLesson />
      },
      {
        path: 'lesson/create',
        element: <PageCreateLesson />
      },
      {
        path: 'lesson/update/:id',
        element: <PageUpdateLesson />
      },
      {
        path: 'comment',
        element: <AdminComment />
      },
      {
        path: 'comment/create',
        element: <PageCreateComment />
      },
      {
        path: 'comment/update/:id',
        element: <PageUpdateComment />
      },
      {
        path: 'blog',
        element: <AdminBlog />
      },
      {
        path: 'blog/create',
        element: <PageCreateBlog />
      },
      {
        path: 'blog/update/:id',
        element: <PageUpdateBlog />
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
