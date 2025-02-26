import { deleteLectureAPI, getLessonAPI } from '@/services/api.services'
import { EyeOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Badge, Button, message, Popconfirm, Space, Tag, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import DetailLesson from './DetailLesson'

const LayoutAdminLesson = () => {
  const actionRef = useRef<ActionType>(null)
  const [meta, setMeta] = useState({
    current: '1',
    pageSize: '5',
    pages: 0,
    total: 0
  })
  const [selectedLesson, setSelectedLesson] = useState<IAdminLesson | null>(null)

  const handleViewLesson = (entity: IAdminLesson) => {
    setSelectedLesson(entity)
  }
  const refreshTable = () => {
    actionRef.current?.reload()
  }
  const handleCloseDrawer = () => {
    setSelectedLesson(null)
  }

  const confirm = async (entity: IAdminLesson) => {
    try {
      const res = await deleteLectureAPI(entity.id)
      message.success(res.message)
      refreshTable()
    } catch {
      message.error('Có lỗi xảy ra khi xóa bài học.')
    }
  }

  const columns: ProColumns<IAdminLesson>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      ellipsis: true,
      search: false
    },
    {
      title: 'Bài giảng',
      dataIndex: ['lectureCourse', 'title'],
      valueType: 'text',
      ellipsis: true
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      valueType: 'text',
      ellipsis: true
    },
    {
      title: 'Loại nội dung',
      dataIndex: 'contentType',
      width: 200,
      render: (_, { contentType }) => (
        <>
          {contentType.map((type) => (
            <Tag color={type === 'VIDEO' ? 'blue' : type === 'TEXT' ? 'orange' : 'green'} key={type}>
              {type}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: 'URL Nội dung',
      dataIndex: 'contentUrl',
      search: false,
      render: (_, record) =>
        record && record.contentUrl ? (
          <Link to={record.contentUrl as string} target='_blank'>
            Xem video
          </Link>
        ) : (
          '-'
        )
    },
    {
      title: 'URL PDF',
      dataIndex: 'pdfUrl',
      search: false,
      render: (_, record) =>
        record && record.pdfUrl ? (
          <Link to={record.pdfUrl as string} target='_blank'>
            Xem PDF
          </Link>
        ) : (
          '-'
        )
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: true,
      search: false
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      valueType: 'date',
      sorter: true,
      search: false
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isDeleted',
      ellipsis: true,
      search: false,
      render: (_, { isDeleted }) => (
        <Badge status={isDeleted ? 'error' : 'success'} text={isDeleted ? 'Đã xóa' : 'Hoạt động'} />
      )
    },
    {
      title: 'Thời gian xóa',
      dataIndex: 'deletedAt',
      valueType: 'date',
      search: false
    },
    {
      title: 'Hành động',
      valueType: 'option',
      key: 'option',

      render: (_, entity) => (
        <Space size='middle'>
          <Link to={`/lesson/update/${entity.id}`}>
            <Tooltip title='Chỉnh sửa'>
              <FaPencilAlt style={{ color: 'orange', cursor: 'pointer' }} />
            </Tooltip>
          </Link>
          <Popconfirm
            title='Xóa bài học'
            description='Bạn có chắc chắn muốn xóa bài học này?'
            onConfirm={() => confirm(entity)}
            okText='Xóa'
            cancelText='Hủy'
          >
            <Tooltip title='Xóa'>
              <FiTrash style={{ color: 'red', cursor: 'pointer' }} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title='Xem chi tiết'>
            <EyeOutlined style={{ color: '#167fff', cursor: 'pointer' }} onClick={() => handleViewLesson(entity)} />
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <>
      <ProTable<any>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort) => {
          let query = `page=${params.current}&pageSize=${params.pageSize}`
          if (params.title) query += `&title=${params.title}`
          query += `&sort=${sort?.createdAt === 'ascend' ? 'createdAt' : '-createdAt'}`
          const res = await getLessonAPI(query)
          if (res.data) {
            setMeta({
              current: '' + res.data.meta?.page,
              pageSize: '' + res.data.meta?.pageSize,
              pages: res.data.meta?.totalPages as number,
              total: res.data.meta?.totalLessons as number
            })
            message.success(res.message)
          } else {
            message.error(res.message)
          }
          return {
            data: res.data?.results,
            success: true,
            total: res.data?.meta?.totalLessons
          }
        }}
        rowKey='id'
        pagination={{
          current: +meta.current,
          pageSize: +meta.pageSize,
          total: meta.total,
          showSizeChanger: true,
          onChange: (page) => {
            setMeta({ ...meta, current: page + '' })
          }
        }}
        search={{
          labelWidth: 'auto'
        }}
        dateFormatter='string'
        headerTitle='Danh sách bài học'
        toolBarRender={() => [
          <Link to='/lesson/create'>
            <Button key='button' icon={<PlusOutlined />} type='primary'>
              Thêm mới
            </Button>
          </Link>
        ]}
      />
      <DetailLesson selectedLesson={selectedLesson} onClose={handleCloseDrawer} />
    </>
  )
}

export default LayoutAdminLesson
