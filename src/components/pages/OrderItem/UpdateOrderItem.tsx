import { getOrderItemByIdAPI, updateOrderItemAPI } from '@/services/api.services'
import { EErrorMessage } from '@/types/enum'
import { FooterToolbar, PageContainer, ProForm, ProFormDigit } from '@ant-design/pro-components'
import { Button, Card, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageNotFound from '@/pages/NotFound'

const LayoutUpdateOrderItem = ({ idOrderItem }: { idOrderItem: string }) => {
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

  const handleSubmit = async (values: IUpdateOrderItemDTO) => {
    try {
      setLoading(true)
      const res = await updateOrderItemAPI(idOrderItem, values)
      if (res && res.data) {
        message.success(res.message)
        navigate('/order-items')
      }
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!idOrderItem) return

    const fetchOrderItemData = async () => {
      try {
        const res = await getOrderItemByIdAPI(idOrderItem)
        if (res && res.data) {
          formRef.current?.setFieldsValue(res.data)
        } else {
          setError(true)
        }
      } catch {
        message.error('Lỗi khi lấy dữ liệu mục đơn hàng !!')
        setError(true)
      }
    }

    fetchOrderItemData()
  }, [idOrderItem])

  if (error) {
    return <PageNotFound />
  }

  return (
    <PageContainer title='Cập nhật mục đơn hàng'>
      <Card>
        <ProForm
          formRef={formRef}
          submitter={{ render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar> }}
          onFinish={handleSubmit}
        >
          <ProFormDigit name='price' label='Giá' placeholder='Nhập giá' fieldProps={{ precision: 2, step: 0.1 }} />

          <ProFormDigit
            name='quantity'
            label='Số lượng'
            placeholder='Nhập số lượng'
            fieldProps={{ precision: 0, step: 1 }}
          />

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Cập nhật mục đơn hàng
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutUpdateOrderItem
