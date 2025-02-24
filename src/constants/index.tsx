import { getItem } from '@/utils'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { IoMdBook } from 'react-icons/io'
import { MdMenuBook } from 'react-icons/md'
import { MdOutlinePlayLesson } from 'react-icons/md'
//Admin Home
export const breadcrumbMap: Record<string, string> = {
  '/': 'Trang chủ',
  '/user': 'Người dùng',
  '/user/create': 'Tạo mới người dùng',
  '/user/update': 'Cập Nhật người dùng',
  '/course': 'Khóa học',
  '/course/create': 'Tạo mới khóa học',
  '/course/update': 'Cập nhật khóa học',
  '/lecture': 'Bài giảng',
  '/lecture/create': 'Tạo mới bài giảng',
  '/lecture/update': 'Cập nhật bài giảng'
}
export const keyMenuMap: Record<string, string> = {
  '/': '1',
  '/user': '2',
  '/user/create': '2',
  '/user/update': '2',
  '/course': '3',
  '/course/create': '3',
  '/course/update': '3',
  '/lecture': '4',
  '/lecture/create': '4',
  '/lecture/update': '4',
  '/lesson': '5',
  '/lesson/create': '5',
  '/lesson/update': '5'
}
export const items: TMenuItem[] = [
  getItem(<Link to='/'>Trang chủ</Link>, '1', <DashboardOutlined />),
  getItem(<Link to='/user'>Người dùng</Link>, '2', <UserOutlined />),
  getItem(<Link to='/course'>Khóa học</Link>, '3', <IoMdBook />),
  getItem(<Link to='/lecture'>Bài giảng</Link>, '4', <MdMenuBook />),
  getItem(<Link to='/lesson'>Bài học</Link>, '5', <MdOutlinePlayLesson />)
]
