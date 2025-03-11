import { Drawer, Descriptions, Image } from 'antd'
import dayjs from 'dayjs'

const DetailUser = ({ selectedUser, onClose }: { selectedUser: IAdminUser | null; onClose: () => void }) => {
  return (
    <Drawer title='Chi tiết người dùng' open={!!selectedUser} onClose={onClose} destroyOnClose width={800}>
      {selectedUser && (
        <Descriptions column={2} bordered size='middle'>
          <Descriptions.Item label='Tên Họ'>{selectedUser.firstName}</Descriptions.Item>
          <Descriptions.Item label='Tên'>{selectedUser.lastName}</Descriptions.Item>
          <Descriptions.Item label='Email' span={2}>
            {selectedUser.email}
          </Descriptions.Item>
          <Descriptions.Item label='Số điện thoại'>{selectedUser.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label='Địa chỉ'>{selectedUser.address}</Descriptions.Item>
          <Descriptions.Item label='Vai trò'>{selectedUser.role}</Descriptions.Item>
          <Descriptions.Item label='Xác minh'>
            {selectedUser.isVerified ? '✔ Đã xác minh' : '❌ Chưa xác minh'}
          </Descriptions.Item>
          <Descriptions.Item label='Đã xóa'>{selectedUser.isDeleted ? '✔ Đã xóa' : '❌ Chưa xóa'}</Descriptions.Item>
          <Descriptions.Item label='Ngày tạo'>
            {dayjs(selectedUser.createdAt).format('DD/MM/YYYY HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label='Ngày cập nhật'>
            {dayjs(selectedUser.updatedAt).format('DD/MM/YYYY HH:mm')}
          </Descriptions.Item>
          {selectedUser.deletedAt && (
            <Descriptions.Item label='Ngày xóa' span={2}>
              {dayjs(selectedUser.deletedAt).format('DD/MM/YYYY HH:mm')}
            </Descriptions.Item>
          )}
          <Descriptions.Item label='Ảnh đại diện' span={2}>
            <Image width={200} src={selectedUser.profilePicture?.replace(/^http:\/\//i, 'https://')} />
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  )
}

export default DetailUser
