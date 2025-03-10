import { createOrderItemAPI, getOrdersAPI, getCoursesAPI } from '@/services/api.services'
import { EErrorMessage } from '@/types/enum'
import { FooterToolbar, PageContainer, ProForm, ProFormSelect, ProFormDigit } from '@ant-design/pro-components'
import { Button, Card, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface ICreateOrderItemDTO {
  orderId: string
  courseId: string
  price: number
  quantity?: number
}

const LayoutCreateOrderItem = () => {
  const navigate = useNavigate()
  const formRef = useRef<any>(null)
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<{ label: string; value: string }[]>([])
  const [courses, setCourses] = useState<{ label: string; value: string }[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrdersAPI()
        if (res && res.data) {
          const options = res.data.results.map((order: IAdminOrder) => ({
            label: `Đơn hàng #${order.id}`,
            value: order.id
          }))
          setOrders(options)
        }
      } catch {
        message.error('Không thể tải danh sách đơn hàng')
      }
    }
    fetchOrders()
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

  const handleFooterClick = async () => {
    try {
      const values = await formRef.current?.validateFields()
      handleSubmit(values)
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    }
  }

  const handleSubmit = async (values: ICreateOrderItemDTO) => {
    try {
      setLoading(true)
      const res = await createOrderItemAPI(values)
      if (res && res.data) {
        formRef.current?.resetFields()
        message.success(res.message)
        navigate('/order-items')
      }
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer title='Tạo mục đơn hàng'>
      <Card>
        <ProForm
          formRef={formRef}
          submitter={{ render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar> }}
          onFinish={handleSubmit}
        >
          {/* Select Order */}
          <ProFormSelect
            name='orderId'
            label='Mã đơn hàng'
            placeholder='Chọn mã đơn hàng'
            options={orders}
            rules={[{ required: true, message: 'Vui lòng chọn mã đơn hàng' }]}
            showSearch
          />

          {/* Select Course */}
          <ProFormSelect
            name='courseId'
            label='Mã khóa học'
            placeholder='Chọn mã khóa học'
            options={courses}
            rules={[{ required: true, message: 'Vui lòng chọn mã khóa học' }]}
            showSearch
          />

          <ProFormDigit
            name='price'
            label='Giá'
            placeholder='Nhập giá'
            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
            fieldProps={{ precision: 2, step: 0.1 }}
          />

          <ProFormDigit
            name='quantity'
            label='Số lượng'
            placeholder='Nhập số lượng'
            rules={[{ type: 'number', min: 1, message: 'Số lượng phải lớn hơn hoặc bằng 1' }]}
            fieldProps={{ precision: 0, step: 1 }}
          />

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Tạo mục đơn hàng
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutCreateOrderItem
