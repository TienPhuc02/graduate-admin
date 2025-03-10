import { getItem } from '@/utils'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { IoMdBook } from 'react-icons/io'
import { MdMenuBook } from 'react-icons/md'
import { MdOutlinePlayLesson } from 'react-icons/md'
import { FaRegCommentDots } from 'react-icons/fa'
import { RiAlignItemLeftLine, RiBloggerLine, RiCouponLine } from 'react-icons/ri'
import { AiOutlineBorder } from 'react-icons/ai'
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
  '/lesson': 'Bài giảng',
  '/lesson/create': 'Tạo mới bài học',
  '/lesson/update': 'Cập nhật bài học',
  '/comment': 'Bình luận',
  '/comment/create': 'Tạo mới bình luận',
  '/comment/update': 'Cập nhật bình luận',
  '/blog': 'Bài viêt',
  '/blog/create': 'Tạo mới bài viết',
  '/blog/update': 'Cập nhật bài viết',
  '/coupon': 'Mã giảm giá',
  '/coupon/create': 'Tạo mới mã giảm giá',
  '/coupon/update': 'Cập nhật mã giảm giá',
  '/order-item': 'Mục đơn hàng',
  '/order-item/create': 'Tạo mới mục đơn hàng',
  '/order-item/update': 'Cập nhật mục đơn hàng',
  '/order': 'Đơn hàng',
  '/order/create': 'Tạo mới đơn hàng',
  '/order/update': 'Cập nhật đơn hàng'
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
  '/lesson/update': '5',
  '/comment': '6',
  '/comment/create': '6',
  '/comment/update': '6',
  '/blog': '7',
  '/blog/create': '7',
  '/blog/update': '7',
  '/coupon': '8',
  '/coupon/create': '8',
  '/coupon/update': '8',
  '/order-item': '9',
  '/order-item/create': '9',
  '/order-item/update': '9',
  '/order': '10',
  '/order/create': '10',
  '/order/update': '10'
}
export const items: TMenuItem[] = [
  getItem(<Link to='/'>Trang chủ</Link>, '1', <DashboardOutlined />),
  getItem(<Link to='/user'>Người dùng</Link>, '2', <UserOutlined />),
  getItem(<Link to='/course'>Khóa học</Link>, '3', <IoMdBook />),
  getItem(<Link to='/lecture'>Bài giảng</Link>, '4', <MdMenuBook />),
  getItem(<Link to='/lesson'>Bài học</Link>, '5', <MdOutlinePlayLesson />),
  getItem(<Link to='/comment'>Bình luận</Link>, '6', <FaRegCommentDots />),
  getItem(<Link to='/blog'>Bài viết</Link>, '7', <RiBloggerLine />),
  getItem(<Link to='/coupon'>Mã giảm giá</Link>, '8', <RiCouponLine />),
  getItem(<Link to='/order-item'>Mục đơn hàng</Link>, '9', <RiAlignItemLeftLine />),
  getItem(<Link to='/order'>Đơn hàng</Link>, '10', <AiOutlineBorder />)
]
