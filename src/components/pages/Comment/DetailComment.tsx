import { Drawer, Typography } from 'antd'
import { ProDescriptions } from '@ant-design/pro-components'

const { Title } = Typography

const DetailComment = ({
  selectedComment,
  onClose
}: {
  selectedComment: IAdminComment | null
  onClose: () => void
}) => {
  console.log('🚀 ~ selectedComment:', selectedComment)
  if (!selectedComment) return null

  return (
    <Drawer
      title={
        <Title level={4} style={{ margin: 0 }}>
          Chi tiết bình luận
        </Title>
      }
      open={!!selectedComment}
      onClose={onClose}
      width={1000}
      destroyOnClose
    >
      <ProDescriptions column={2} bordered>
        <ProDescriptions.Item label='ID'>{selectedComment.id}</ProDescriptions.Item>
        <ProDescriptions.Item label='Nội dung'>{selectedComment.text}</ProDescriptions.Item>
        <ProDescriptions.Item label='Người dùng'>{selectedComment?.user?.email || 'Ẩn danh'}</ProDescriptions.Item>
        <ProDescriptions.Item label='Khóa học'>{selectedComment.course?.title || 'Không có'}</ProDescriptions.Item>
        <ProDescriptions.Item label='Blog'>{selectedComment.blog?.title || 'Không có'}</ProDescriptions.Item>
        <ProDescriptions.Item label='Số lượt thích'>{selectedComment.likesCount}</ProDescriptions.Item>
        <ProDescriptions.Item label='Trạng thái'>{selectedComment.status}</ProDescriptions.Item>
        <ProDescriptions.Item label='Đã chỉnh sửa'>
          {selectedComment.isEdited ? 'Đã chỉnh sửa' : 'Chưa chỉnh sửa'}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Đã xóa'>{selectedComment.isDeleted ? 'Đã xóa' : 'Chưa xóa'}</ProDescriptions.Item>
        <ProDescriptions.Item label='Bình luận cha'>
          {selectedComment.parentCommentId || 'Không có'}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Số phản hồi'>{selectedComment.replies?.length || 0}</ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày tạo'>
          {new Date(selectedComment.createdAt).toLocaleString()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày cập nhật'>
          {new Date(selectedComment.updatedAt).toLocaleString()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày xóa'>
          {selectedComment.deletedAt ? new Date(selectedComment.deletedAt).toLocaleString() : 'Chưa xóa'}
        </ProDescriptions.Item>
      </ProDescriptions>
    </Drawer>
  )
}

export default DetailComment
