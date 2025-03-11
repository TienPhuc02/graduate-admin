import { createOrderAPI, getUsersAPI, getCouponsAPI, getCoursesAPI } from '@/services/api.services'
import { EErrorMessage } from '@/types/enum'
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormSelect,
  ProFormList,
  ProFormText
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
  const [courses, setCourses] = useState<{ label: string; value: string; price?: number }[]>([])
  const [coursePrices, setCoursePrices] = useState<{ [key: string]: number }>({}) // Lưu giá khóa học theo courseId

  // Fetch danh sách người dùng
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

  // Fetch danh sách khóa học và lưu giá
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCoursesAPI()
        if (res && res.data) {
          const courseData = res.data.results.map((course: any) => ({
            label: course.title,
            value: course.id,
            price: course.price // Giả sử API trả về trường price
          }))
          setCourses(courseData)

          // Lưu giá khóa học vào object để dễ tra cứu
          const priceMap = res.data.results.reduce((acc: any, course: any) => {
            acc[course.id] = course.price
            return acc
          }, {})
          setCoursePrices(priceMap)
        }
      } catch {
        message.error('Không thể tải danh sách khóa học')
      }
    }
    fetchCourses()
  }, [])

  // Fetch danh sách mã giảm giá
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

  // Hàm xử lý tính toán totalAmount
  const calculateTotalAmount = (courseId: string, quantity: number) => {
    const price = coursePrices[courseId] || 0
    return price * quantity
  }

  // Xử lý khi giá trị form thay đổi
  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.orderItems) {
      const updatedOrderItems = allValues.orderItems.map((item: any, index: number) => {
        const { courseId, quantity } = item || {}
        if (courseId && quantity) {
          const totalAmount = calculateTotalAmount(courseId, parseInt(quantity) || 0)
          return { ...item, totalAmount }
        }
        return item
      })

      formRef.current?.setFieldsValue({ orderItems: updatedOrderItems })
    }
  }

  const handleFooterClick = async () => {
    try {
      const values = await formRef.current?.validateFields()
      handleSubmit(values)
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    }
  }

  const handleSubmit = async (values: any) => {
    console.log('🚀 ~ handleSubmit ~ values:', values)
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
          onValuesChange={handleValuesChange} // Theo dõi sự thay đổi của form
        >
          <ProFormSelect
            name='userId'
            label='Người dùng'
            placeholder='Chọn người dùng'
            options={users}
            rules={[{ required: true, message: 'Vui lòng chọn người dùng' }]}
            showSearch
          />

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
            <ProFormText
              name='quantity'
              label='Số lượng'
              placeholder='Nhập số lượng'
              rules={[{ required: true, message: 'Vui lòng nhập số lượng', type: 'number', min: 1 }]}
            />
            <ProFormText
              name='totalAmount'
              label='Tổng tiền'
              placeholder='Tổng tiền sẽ được tính tự động'
              disabled
              rules={[{ required: true, message: 'Tổng tiền không được để trống' }]}
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
