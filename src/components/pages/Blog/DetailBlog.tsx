import { Drawer, Badge, Typography } from 'antd'
import { ProDescriptions } from '@ant-design/pro-components'
import { Link } from 'react-router-dom'
import { EBlogStatus } from '@/types/enum'

const { Title } = Typography

const DetailBlog = ({ selectedBlog, onClose }: { selectedBlog: IAdminBlog | null; onClose: () => void }) => {
  if (!selectedBlog) return null

  return (
    <Drawer
      title={
        <Title level={4} style={{ margin: 0 }}>
          Chi tiết bài viết
        </Title>
      }
      open={!!selectedBlog}
      onClose={onClose}
      width={1000}
      destroyOnClose
    >
      <ProDescriptions column={2} bordered>
        <ProDescriptions.Item label='ID'>{selectedBlog.id}</ProDescriptions.Item>
        <ProDescriptions.Item label='Tiêu đề'>{selectedBlog.title || 'Không có'}</ProDescriptions.Item>
        <ProDescriptions.Item label='Danh mục'>{selectedBlog.categoryBlog || 'Không xác định'}</ProDescriptions.Item>
        <ProDescriptions.Item label='Tác giả'>ID: {selectedBlog.author.id}</ProDescriptions.Item>
        <ProDescriptions.Item label='Lượt xem'>{selectedBlog.viewsBlog || 0}</ProDescriptions.Item>
        <ProDescriptions.Item label='Trạng thái'>
          <Badge
            status={
              selectedBlog.isPublished === EBlogStatus.APPROVED
                ? 'success'
                : selectedBlog.isPublished === EBlogStatus.PENDING
                  ? 'warning'
                  : 'error'
            }
            text={
              selectedBlog.isPublished === EBlogStatus.APPROVED
                ? 'Đã xuất bản'
                : selectedBlog.isPublished === EBlogStatus.PENDING
                  ? 'Bản nháp'
                  : 'Đã lưu trữ'
            }
          />
        </ProDescriptions.Item>
        {/* <ProDescriptions.Item label='Số lượng bình luận'>{selectedBlog.comments.length || 0}</ProDescriptions.Item> */}
        <ProDescriptions.Item label='Hình ảnh đại diện'>
          {selectedBlog.thumbnail ? (
            <Link to={selectedBlog.thumbnail} target='_blank'>
              Xem hình ảnh
            </Link>
          ) : (
            'Không có'
          )}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Nội dung' span={2}>
          <div dangerouslySetInnerHTML={{ __html: selectedBlog.content || 'Không có' }} />
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày tạo'>
          {new Date(selectedBlog.createdAt).toLocaleDateString()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Ngày cập nhật'>
          {new Date(selectedBlog.updatedAt).toLocaleDateString()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Trạng thái xóa'>
          <Badge
            status={selectedBlog.isDeleted ? 'error' : 'success'}
            text={selectedBlog.isDeleted ? 'Đã xóa' : 'Hoạt động'}
          />
        </ProDescriptions.Item>
        {selectedBlog.deletedAt && (
          <ProDescriptions.Item label='Ngày xóa'>
            {new Date(selectedBlog.deletedAt).toLocaleDateString()}
          </ProDescriptions.Item>
        )}
      </ProDescriptions>
    </Drawer>
  )
}

export default DetailBlog
