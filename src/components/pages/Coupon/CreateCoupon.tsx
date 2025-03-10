import { createCouponAPI } from '@/services/api.services'
import { EErrorMessage } from '@/types/enum'
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormText,
  ProFormDigit,
  ProFormDatePicker
} from '@ant-design/pro-components'
import { Button, Card, message } from 'antd'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface ICreateCouponDTO {
  code: string
  discountPercentage: number
  expiryDate: Date
}

const LayoutCreateCoupon = () => {
  const navigate = useNavigate()
  const formRef = useRef<any>(null)
  const [loading, setLoading] = useState(false)

  const handleFooterClick = async () => {
    try {
      const values = await formRef.current?.validateFields()
      handleSubmit(values)
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    }
  }

  const handleSubmit = async (values: ICreateCouponDTO) => {
    try {
      setLoading(true)
      const res = await createCouponAPI(values)
      if (res && res.data) {
        formRef.current?.resetFields()
        message.success(res.message)
        navigate('/coupon')
      }
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer title='Tạo mã giảm giá'>
      <Card>
        <ProForm
          formRef={formRef}
          submitter={{ render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar> }}
          onFinish={handleSubmit}
        >
          <ProFormText
            name='code'
            label='Mã giảm giá'
            placeholder='Nhập mã giảm giá'
            rules={[
              { required: true, message: 'Vui lòng nhập mã giảm giá' },
              { min: 3, message: 'Mã giảm giá phải có ít nhất 3 ký tự' },
              { pattern: /^[A-Z0-9]+$/, message: 'Mã giảm giá chỉ được chứa chữ cái in hoa và số' }
            ]}
          />

          <ProFormDigit
            name='discountPercentage'
            label='Phần trăm giảm giá'
            placeholder='Nhập phần trăm giảm giá'
            rules={[
              { required: true, message: 'Vui lòng nhập phần trăm giảm giá' },
              { type: 'number', min: 0, max: 100, message: 'Phần trăm giảm giá phải nằm trong khoảng 0-100' }
            ]}
            fieldProps={{
              precision: 2,
              step: 0.1
            }}
          />

          <ProFormDatePicker
            name='expiryDate'
            label='Ngày hết hạn'
            placeholder='Chọn ngày hết hạn'
            rules={[{ required: true, message: 'Vui lòng chọn ngày hết hạn' }]}
            fieldProps={{
              format: 'YYYY-MM-DD',
              disabledDate: (current: any) => current && current < new Date(new Date().setHours(0, 0, 0, 0))
            }}
          />

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Tạo mã giảm giá
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutCreateCoupon
