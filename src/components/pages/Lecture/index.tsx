import { deleteLectureAPI, getLectureAPI } from '@/services/api.services'
import { EyeOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Badge, Button, message, Popconfirm, Space, Tag, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import DetailLecture from './DetailLecture'

const LayoutAdminLecture = () => {
  const actionRef = useRef<ActionType>(null)
  const [meta, setMeta] = useState({
    current: '1',
    pageSize: '5',
    pages: 0,
    total: 0
  })
  const [selectedLecture, setSelectedLecture] = useState<IAdminLectures | null>(null)

  const handleViewLecture = (entity: IAdminLectures) => {
    setSelectedLecture(entity)
  }
  const refreshTable = () => {
    actionRef.current?.reload()
  }
  const handleCloseDrawer = () => {
    setSelectedLecture(null)
  }

  const confirm = async (entity: any) => {
    try {
      const res = await deleteLectureAPI(entity.id)
      message.success(res.message)
      refreshTable()
    } catch {
      message.error('Có lỗi xảy ra khi xóa khóa học.')
    }
  }

  const columns: ProColumns<IAdminLectures>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      search: false,
      ellipsis: true
    },
    {
      title: 'Tiêu đề bài giảng',
      dataIndex: 'title',
      valueType: 'text',
      search: true,
      ellipsis: true
    },
    {
      title: 'Tên khóa học',
      valueType: 'text',
      search: true,
      ellipsis: true,
      render: (_, record) => {
        const title = record?.course?.title || '-'
        return (
          <Tooltip title={title}>
            <span>{title}</span>
          </Tooltip>
        )
      }
    },
    {
      title: 'Cập nhật',
      dataIndex: 'updatedAt',
      valueType: 'date',
      sorter: true,
      search: false
    },
    {
      title: 'Thời gian xóa',
      dataIndex: 'deletedAt',
      valueType: 'dateTime',
      search: false
    },
    {
      title: 'Trạng thái xóa',
      width: 150,
      dataIndex: 'isDeleted',
      render: (_, record) => (
        <Tag color={record.isDeleted ? 'red' : 'green'}>{record.isDeleted ? 'Đã xóa' : 'Chưa xóa'}</Tag>
      ),
      search: false
    },
    {
      title: 'Số lượng bài học',
      dataIndex: 'lessons',
      search: false
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isDeleted',
      render: (_, record) => (
        <Badge status={record.isDeleted ? 'error' : 'success'} text={record.isDeleted ? 'Đã xóa' : 'Hoạt động'} />
      ),
      search: false
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: true
    },
    {
      title: 'Hành động',
      valueType: 'option',
      key: 'option',
      render: (_, entity) => (
        <Space size='middle'>
          <Link to={`/lecture/update/${entity.id}`}>
            <Tooltip title='Chỉnh sửa'>
              <FaPencilAlt style={{ color: 'orange', cursor: 'pointer' }} />
            </Tooltip>
          </Link>
          <Popconfirm
            title='Xóa bài giảng'
            description='Bạn có chắc chắn muốn xóa bài giảng này?'
            onConfirm={() => confirm(entity)}
            okText='Xóa'
            cancelText='Hủy'
          >
            <Tooltip title='Xóa'>
              <FiTrash style={{ color: 'red', cursor: 'pointer' }} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title='Xem chi tiết'>
            <EyeOutlined style={{ color: '#167fff', cursor: 'pointer' }} onClick={() => handleViewLecture(entity)} />
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
          const res = await getLectureAPI(query)
          if (res.data) {
            setMeta({
              current: '' + res.data.meta?.page,
              pageSize: '' + res.data.meta?.pageSize,
              pages: res.data.meta?.totalPages as number,
              total: res.data.meta?.totalLectures as number
            })
            message.success(res.message)
          } else {
            message.error(res.message)
          }
          return {
            data: res.data?.results,
            success: true,
            total: res.data?.meta?.totalLectures
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
        headerTitle='Danh sách bài giảng'
        toolBarRender={() => [
          <Link to='/lecture/create'>
            <Button key='button' icon={<PlusOutlined />} type='primary'>
              Thêm mới
            </Button>
          </Link>
        ]}
      />
      <DetailLecture selectedLecture={selectedLecture} onClose={handleCloseDrawer} />
    </>
  )
}

export default LayoutAdminLecture
