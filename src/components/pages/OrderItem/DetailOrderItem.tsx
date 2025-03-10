import { Drawer, Typography } from 'antd'
import { ProDescriptions } from '@ant-design/pro-components'

const { Title } = Typography

const DetailOrderItem = ({
  selectedOrderItem,
  onClose
}: {
  selectedOrderItem: IAdminOrderItem | null
  onClose: () => void
}) => {
  if (!selectedOrderItem) return null

  return (
    <Drawer
      title={
        <Title level={4} style={{ margin: 0 }}>
          Chi tiết mục đơn hàng
        </Title>
      }
      open={!!selectedOrderItem}
      onClose={onClose}
      width={800}
      destroyOnClose
    >
      <ProDescriptions column={2} bordered>
        <ProDescriptions.Item label='ID'>{selectedOrderItem.id}</ProDescriptions.Item>
        <ProDescriptions.Item label='Tên đơn hàng'>{selectedOrderItem.order?.id || 'N/A'}</ProDescriptions.Item>
        <ProDescriptions.Item label='Tên khóa học'>{selectedOrderItem.course?.id || 'N/A'}</ProDescriptions.Item>
        <ProDescriptions.Item label='Mã khóa học'>{selectedOrderItem.courseId}</ProDescriptions.Item>
        <ProDescriptions.Item label='Giá'>{selectedOrderItem.price.toLocaleString()} VNĐ</ProDescriptions.Item>
        <ProDescriptions.Item label='Số lượng'>{selectedOrderItem.quantity || 1}</ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày tạo'>
          {new Date(selectedOrderItem.createdAt).toLocaleDateString()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày cập nhật'>
          {new Date(selectedOrderItem.updatedAt).toLocaleDateString()}
        </ProDescriptions.Item>
      </ProDescriptions>
    </Drawer>
  )
}

export default DetailOrderItem
