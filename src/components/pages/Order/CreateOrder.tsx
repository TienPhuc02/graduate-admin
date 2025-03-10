import { createOrderAPI, getUsersAPI, getCouponsAPI, getCoursesAPI } from '@/services/api.services'
import { EErrorMessage } from '@/types/enum'
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormSelect,
  ProFormDigit,
  ProFormList
} from '@ant-design/pro-components'
import { Button, Card, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LayoutCreateOrder = () => {
  const navigate = useNavigate()
  const formRef = useRef<any>(null)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<{ label: string; value: string }[]>([])
  const [coupons, setCoupons] = useState<{ label: string; value: string }[]>([])
  const [courses, setCourses] = useState<{ label: string; value: string }[]>([])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsersAPI()
        if (res && res.data) {
          const options = res.data.results.map((user: { id: string; email: string }) => ({
            label: user.email,
            value: user.id
          }))
          setUsers(options)
        }
      } catch {
        message.error('Không thể tải danh sách người dùng')
      }
    }
    fetchUsers()
  }, [])
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCoursesAPI()
        if (res && res.data) {
          const options = res.data.results.map((course: IAdminCourse) => ({
            label: course.title,
            value: course.id
          }))
          setCourses(options)
        }
      } catch {
        message.error('Không thể tải danh sách khóa học')
      }
    }
    fetchCourses()
  }, [])
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await getCouponsAPI()
        if (res && res.data) {
          const options = res.data.results.map((coupon: { id: string; code: string }) => ({
            label: coupon.code,
            value: coupon.id
          }))
          setCoupons(options)
        }
      } catch {
        message.error('Không thể tải danh sách mã giảm giá')
      }
    }
    fetchCoupons()
  }, [])

  const handleFooterClick = async () => {
    try {
      const values = await formRef.current?.validateFields()
      handleSubmit(values)
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true)
      const res = await createOrderAPI(values)
      if (res && res.data) {
        formRef.current?.resetFields()
        message.success(res.message)
        navigate('/orders')
      }
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer title='Tạo đơn hàng'>
      <Card>
        <ProForm
          formRef={formRef}
          submitter={{ render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar> }}
          onFinish={handleSubmit}
        >
          <ProFormSelect
            name='userId'
            label='Người dùng'
            placeholder='Chọn người dùng'
            options={users}
            rules={[{ required: true, message: 'Vui lòng chọn người dùng' }]}
            showSearch
          />

          {/* Order Status */}
          <ProFormSelect
            name='status'
            label='Trạng thái đơn hàng'
            placeholder='Chọn trạng thái'
            options={[
              { label: 'Chờ xử lý', value: 'pending' },
              { label: 'Đang xử lý', value: 'processing' },
              { label: 'Hoàn thành', value: 'completed' },
              { label: 'Hủy bỏ', value: 'cancelled' }
            ]}
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái đơn hàng' }]}
          />

          <ProFormSelect
            name='couponId'
            label='Mã giảm giá'
            placeholder='Chọn mã giảm giá (không bắt buộc)'
            options={coupons}
            allowClear
          />

          <ProFormList name='orderItems' label='Sản phẩm' creatorButtonProps={{ position: 'bottom' }}>
            <ProFormSelect
              name='courseId'
              label='Mã khóa học'
              placeholder='Chọn mã khóa học'
              options={courses}
              rules={[{ required: true, message: 'Vui lòng chọn mã khóa học' }]}
              showSearch
            />
            <ProFormDigit
              name='quantity'
              label='Số lượng'
              placeholder='Nhập số lượng'
              rules={[{ required: true, min: 1 }]}
            />
          </ProFormList>

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Tạo đơn hàng
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutCreateOrder
