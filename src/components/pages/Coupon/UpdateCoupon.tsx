import { getCouponByIdAPI, updateCouponAPI } from '@/services/api.services'
import { EErrorMessage } from '@/types/enum'
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormText,
  ProFormDigit,
  ProFormDatePicker,
  ProFormSwitch
} from '@ant-design/pro-components'
import { Button, Card, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageNotFound from '@/pages/NotFound'

const LayoutUpdateCoupon = ({ idCoupon }: { idCoupon: string }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const formRef = useRef<any>(null)

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
      const res = await updateCouponAPI(idCoupon, values)
      if (res && res.data) {
        formRef.current?.resetFields()
        message.success(res.message)
        navigate('/coupons')
      }
    } catch (error) {
      message.error(EErrorMessage.ERROR_VALIDATE)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!idCoupon) return

    const fetchCouponData = async () => {
      try {
        const res = await getCouponByIdAPI(idCoupon)
        if (res && res.data) {
          formRef.current?.setFieldsValue(res.data)
        } else {
          setError(true)
        }
      } catch {
        message.error('Lỗi khi lấy dữ liệu mã giảm giá !!')
      }
    }

    fetchCouponData()
  }, [idCoupon])

  if (error) {
    return <PageNotFound />
  }

  return (
    <PageContainer title='Cập nhật mã giảm giá'>
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
            rules={[{ required: true, message: 'Vui lòng nhập mã giảm giá' }]}
          />

          <ProFormDigit
            name='discountPercentage'
            label='Phần trăm giảm giá'
            placeholder='Nhập phần trăm giảm giá'
            min={0}
            max={100}
            rules={[{ required: true, message: 'Vui lòng nhập phần trăm giảm giá' }]}
          />

          <ProFormDatePicker
            name='expiryDate'
            label='Ngày hết hạn'
            placeholder='Chọn ngày hết hạn'
            rules={[{ required: true, message: 'Vui lòng chọn ngày hết hạn' }]}
          />

          <ProFormSwitch name='isDeleted' label='Đã xóa' initialValue={false} />

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Cập nhật mã giảm giá
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutUpdateCoupon
