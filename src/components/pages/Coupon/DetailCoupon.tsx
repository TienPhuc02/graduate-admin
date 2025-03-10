import { Drawer, Badge, Typography } from 'antd'
import { ProDescriptions } from '@ant-design/pro-components'

const { Title } = Typography

const DetailCoupon = ({ selectedCoupon, onClose }: { selectedCoupon: IAdminCoupon | null; onClose: () => void }) => {
  if (!selectedCoupon) return null

  return (
    <Drawer
      title={
        <Title level={4} style={{ margin: 0 }}>
          Chi tiết mã giảm giá
        </Title>
      }
      open={!!selectedCoupon}
      onClose={onClose}
      width={800}
      destroyOnClose
    >
      <ProDescriptions column={2} bordered>
        <ProDescriptions.Item label='ID'>{selectedCoupon.id}</ProDescriptions.Item>
        <ProDescriptions.Item label='Mã giảm giá'>{selectedCoupon.code}</ProDescriptions.Item>
        <ProDescriptions.Item label='Phần trăm giảm giá'>{selectedCoupon.discountPercentage}%</ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày hết hạn'>
          {new Date(selectedCoupon.expiryDate).toLocaleDateString()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày tạo'>
          {new Date(selectedCoupon.createdAt).toLocaleDateString()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày cập nhật'>
          {new Date(selectedCoupon.updatedAt).toLocaleDateString()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Trạng thái xóa'>
          <Badge
            status={selectedCoupon.isDeleted ? 'error' : 'success'}
            text={selectedCoupon.isDeleted ? 'Đã xóa' : 'Hoạt động'}
          />
        </ProDescriptions.Item>
        {selectedCoupon.deletedAt && (
          <ProDescriptions.Item label='Ngày xóa'>
            {new Date(selectedCoupon.deletedAt).toLocaleDateString()}
          </ProDescriptions.Item>
        )}
      </ProDescriptions>
    </Drawer>
  )
}

export default DetailCoupon
