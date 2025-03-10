import { getOrderByIdAPI, updateOrderAPI } from '@/services/api.services'
import { EErrorMessage } from '@/types/enum'
import { FooterToolbar, PageContainer, ProForm, ProFormDigit, ProFormSelect } from '@ant-design/pro-components'
import { Button, Card, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageNotFound from '@/pages/NotFound'

const LayoutUpdateOrder = ({ idOrder }: { idOrder: string }) => {
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

  const handleSubmit = async (values: IUpdateOrderDTO) => {
    try {
      setLoading(true)
      const res = await updateOrderAPI(idOrder, values)
      if (res && res.data) {
        message.success(res.message)
        navigate('/orders')
      }
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!idOrder) return

    const fetchOrderData = async () => {
      try {
        const res = await getOrderByIdAPI(idOrder)
        if (res && res.data) {
          formRef.current?.setFieldsValue(res.data)
        } else {
          setError(true)
        }
      } catch {
        message.error('Lỗi khi lấy dữ liệu đơn hàng !!')
        setError(true)
      }
    }

    fetchOrderData()
  }, [idOrder])

  if (error) {
    return <PageNotFound />
  }

  return (
    <PageContainer title='Cập nhật đơn hàng'>
      <Card>
        <ProForm
          formRef={formRef}
          submitter={{ render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar> }}
          onFinish={handleSubmit}
        >
          <ProFormDigit
            name='totalAmount'
            label='Tổng tiền'
            placeholder='Nhập tổng tiền'
            fieldProps={{ precision: 2, step: 0.1 }}
          />

          <ProFormSelect
            name='status'
            label='Trạng thái'
            placeholder='Chọn trạng thái đơn hàng'
            options={[
              { label: 'Chờ xử lý', value: 'pending' },
              { label: 'Đang xử lý', value: 'processing' },
              { label: 'Hoàn thành', value: 'completed' },
              { label: 'Đã hủy', value: 'cancelled' }
            ]}
          />

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Cập nhật đơn hàng
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutUpdateOrder
