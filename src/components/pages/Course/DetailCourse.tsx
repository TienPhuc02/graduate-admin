import { Drawer, Badge, Typography, Image } from 'antd'
import { ProDescriptions } from '@ant-design/pro-components'

const { Title } = Typography

const DetailCourse = ({ selectedCourse, onClose }: { selectedCourse: IAdminCourse | null; onClose: () => void }) => {
  if (!selectedCourse) return null

  return (
    <Drawer
      title={
        <Title level={4} style={{ margin: 0 }}>
          Chi tiết khóa học
        </Title>
      }
      open={!!selectedCourse}
      onClose={onClose}
      width={1000}
      destroyOnClose
    >
      <ProDescriptions column={2} bordered>
        <ProDescriptions.Item label='ID'>{selectedCourse.id}</ProDescriptions.Item>
        <ProDescriptions.Item label='Tên khóa học'>{selectedCourse.title}</ProDescriptions.Item>
        <ProDescriptions.Item label='Danh mục'>{selectedCourse.category}</ProDescriptions.Item>
        <ProDescriptions.Item label='Trạng thái'>
          <Badge
            status={selectedCourse.status ? 'success' : 'error'}
            text={selectedCourse.status ? 'Hoạt động' : 'Ngừng hoạt động'}
          />
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Cấp độ'>{selectedCourse.level}</ProDescriptions.Item>
        <ProDescriptions.Item label='Đánh giá'>{selectedCourse.rating}</ProDescriptions.Item>
        <ProDescriptions.Item label='Thời lượng'>{selectedCourse.duration}</ProDescriptions.Item>
        <ProDescriptions.Item label='Số lượng xem'>{selectedCourse.viewsCourse}</ProDescriptions.Item>
        <ProDescriptions.Item label='Giá'>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
            parseInt(selectedCourse.price)
          )}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Yêu cầu'>
          {selectedCourse.requirements?.join(', ') || 'Không có'}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Lợi ích'>{selectedCourse.benefits?.join(', ') || 'Không có'}</ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày tạo'>
          {new Date(selectedCourse.createdAt).toLocaleDateString()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày cập nhật'>
          {new Date(selectedCourse.updatedAt).toLocaleDateString()}
        </ProDescriptions.Item>
        {selectedCourse.deletedAt && (
          <ProDescriptions.Item label='Ngày xóa'>
            {new Date(selectedCourse.deletedAt).toLocaleDateString()}
          </ProDescriptions.Item>
        )}
        <ProDescriptions.Item label='Hỏi & Đáp'>
          {selectedCourse.qna?.length > 0 ? (
            <ul style={{ paddingLeft: 20 }}>
              {selectedCourse.qna.map((item, index) => (
                <li key={index}>
                  <strong style={{ color: '#1890ff' }}>{item.question}</strong>: {item.answer}
                </li>
              ))}
            </ul>
          ) : (
            'Không có'
          )}
        </ProDescriptions.Item>
      </ProDescriptions>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Image
          aria-label='Ảnh đại diện khóa học'
          width={300}
          style={{ borderRadius: 10, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
          src={selectedCourse.thumbnail.replace(/^http:\/\//i, 'https://')}
          alt='Thumbnail khóa học'
        />
      </div>
    </Drawer>
  )
}

export default DetailCourse
