import { Drawer, Typography } from 'antd'
import { ProDescriptions } from '@ant-design/pro-components'

const { Title } = Typography

const DetailLecture = ({
  selectedLecture,
  onClose
}: {
  selectedLecture: IAdminLectures | null
  onClose: () => void
}) => {
  if (!selectedLecture) return null

  return (
    <Drawer
      title={
        <Title level={4} style={{ margin: 0 }}>
          Chi tiết bài giảng
        </Title>
      }
      open={!!selectedLecture}
      onClose={onClose}
      width={1000}
      destroyOnClose
    >
      <ProDescriptions column={2} bordered>
        <ProDescriptions.Item label='ID'>{selectedLecture.id}</ProDescriptions.Item>
        <ProDescriptions.Item label='Tên bài giảng'>{selectedLecture.title}</ProDescriptions.Item>
        <ProDescriptions.Item label='Tên khóa học'>{selectedLecture.course?.id}</ProDescriptions.Item>
      </ProDescriptions>
    </Drawer>
  )
}

export default DetailLecture
