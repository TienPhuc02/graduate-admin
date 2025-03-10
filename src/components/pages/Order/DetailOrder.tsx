import { Drawer, Typography } from 'antd'
import { ProDescriptions } from '@ant-design/pro-components'

const { Title } = Typography

const DetailOrder = ({ selectedOrder, onClose }: { selectedOrder: IAdminOrder | null; onClose: () => void }) => {
  if (!selectedOrder) return null

  return (
    <Drawer
      title={
        <Title level={4} style={{ margin: 0 }}>
          Chi tiết đơn hàng
        </Title>
      }
      open={!!selectedOrder}
      onClose={onClose}
      width={800}
      destroyOnClose
    >
      <ProDescriptions column={2} bordered>
        <ProDescriptions.Item label='ID'>{selectedOrder.id}</ProDescriptions.Item>
        <ProDescriptions.Item label='Khách hàng'>{selectedOrder.user.name}</ProDescriptions.Item>
        <ProDescriptions.Item label='Email'>{selectedOrder.user.email}</ProDescriptions.Item>
        <ProDescriptions.Item label='Tổng tiền'>{selectedOrder.totalAmount.toLocaleString()} VNĐ</ProDescriptions.Item>
        <ProDescriptions.Item label='Trạng thái'>{selectedOrder.status}</ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày đặt hàng'>
          {new Date(selectedOrder.orderDate).toLocaleDateString()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Mã giảm giá'>
          {selectedOrder.coupon ? selectedOrder.coupon.code : 'Không có'}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Giảm giá'>
          {selectedOrder.coupon ? `${selectedOrder.coupon.discount}%` : 'Không có'}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày tạo'>
          {new Date(selectedOrder.createdAt).toLocaleDateString()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày cập nhật'>
          {new Date(selectedOrder.updatedAt).toLocaleDateString()}
        </ProDescriptions.Item>
      </ProDescriptions>
    </Drawer>
  )
}

export default DetailOrder
