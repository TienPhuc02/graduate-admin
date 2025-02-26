import { Drawer, Badge, Typography } from 'antd'
import { ProDescriptions } from '@ant-design/pro-components'
import { Link } from 'react-router-dom'

const { Title } = Typography

const DetailLesson = ({ selectedLesson, onClose }: { selectedLesson: IAdminLesson | null; onClose: () => void }) => {
  if (!selectedLesson) return null

  return (
    <Drawer
      title={
        <Title level={4} style={{ margin: 0 }}>
          Chi tiết bài học
        </Title>
      }
      open={!!selectedLesson}
      onClose={onClose}
      width={1000}
      destroyOnClose
    >
      <ProDescriptions column={2} bordered>
        <ProDescriptions.Item label='ID'>{selectedLesson.id}</ProDescriptions.Item>
        <ProDescriptions.Item label='Tiêu đề'>{selectedLesson.title || 'Không có'}</ProDescriptions.Item>
        <ProDescriptions.Item label='Chương học'>
          {selectedLesson.lectureCourse?.title || 'Không xác định'}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Loại nội dung'>
          {selectedLesson.contentType?.join(', ') || 'Không có'}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='URL nội dung'>
          {selectedLesson.contentUrl ? (
            <Link to={selectedLesson.contentUrl as string} target='_blank'>
              Xem video
            </Link>
          ) : (
            'Không có'
          )}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='URL PDF'>
          {selectedLesson.pdfUrl ? (
            <Link to={selectedLesson.pdfUrl as string} target='_blank'>
              Xem PDF
            </Link>
          ) : (
            'Không có'
          )}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Nội dung văn bản' span={2}>
          <div dangerouslySetInnerHTML={{ __html: selectedLesson.contentText || 'Không có' }} />
        </ProDescriptions.Item>

        <ProDescriptions.Item label='Ngày tạo'>
          {new Date(selectedLesson.createdAt).toLocaleDateString()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày cập nhật'>
          {new Date(selectedLesson.updatedAt).toLocaleDateString()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Trạng thái'>
          <Badge
            status={selectedLesson.isDeleted ? 'error' : 'success'}
            text={selectedLesson.isDeleted ? 'Đã xóa' : 'Hoạt động'}
          />
        </ProDescriptions.Item>
        {selectedLesson.deletedAt && (
          <ProDescriptions.Item label='Ngày xóa'>
            {new Date(selectedLesson.deletedAt).toLocaleDateString()}
          </ProDescriptions.Item>
        )}
      </ProDescriptions>
    </Drawer>
  )
}

export default DetailLesson
