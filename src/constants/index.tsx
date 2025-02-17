import { getItem } from '@/utils'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

//Admin Home
export const breadcrumbMap: Record<string, string> = {
  '/': 'Trang chủ',
  '/user': 'Người dùng',
  '/user/create': 'Tạo mới',
  '/user/update': 'Cập Nhật'
}
export const keyMenuMap: Record<string, string> = {
  '/': '1',
  '/user': '2',
  '/user/create': '2',
  '/user/update': '2'
}
export const items: TMenuItem[] = [
  getItem(<Link to='/'>Trang chủ</Link>, '1', <DashboardOutlined />),
  getItem(<Link to='/user'>Người dùng</Link>, '2', <UserOutlined />)
]
