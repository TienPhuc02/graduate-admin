import { getItem } from '@/utils'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { IoMdBook } from 'react-icons/io'
//Admin Home
export const breadcrumbMap: Record<string, string> = {
  '/': 'Trang chủ',
  '/user': 'Người dùng',
  '/user/create': 'Tạo mới người dùng',
  '/user/update': 'Cập Nhật người dùng',
  '/course': 'Khóa học',
  '/course/create': 'Tạo mới khóa học'
}
export const keyMenuMap: Record<string, string> = {
  '/': '1',
  '/user': '2',
  '/user/create': '2',
  '/user/update': '2',
  '/course': '3',
  '/course/create': '3'
}
export const items: TMenuItem[] = [
  getItem(<Link to='/'>Trang chủ</Link>, '1', <DashboardOutlined />),
  getItem(<Link to='/user'>Người dùng</Link>, '2', <UserOutlined />),
  getItem(<Link to='/course'>Khóa học</Link>, '3', <IoMdBook />)
]
