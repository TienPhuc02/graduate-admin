import { getCommentsAPI } from '@/services/api.services'
import { EBadgeStatus } from '@/types/enum'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
  PlusOutlined,
  UserOutlined
} from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Badge, Button, message, Popconfirm, Space, Tag, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import { FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
// import DetailComment from './DetailComment'

const LayoutAdminComment = () => {
  const actionRef = useRef<ActionType>(null)
  const [meta, setMeta] = useState({
    current: '1',
    pageSize: '5',
    pages: 0,
    total: 0
  })
  const [selectedComment, setSelectedComment] = useState<IAdminComment | null>(null)

  const handleViewComment = (entity: IAdminComment) => {
    setSelectedComment(entity)
  }
  const refreshTable = () => {
    actionRef.current?.reload()
  }
  const handleCloseDrawer = () => {
    setSelectedComment(null)
  }
  //   const confirm = async (entity: IAdminComment) => {
  //     try {
  //       const res = await deleteCommentAPI(entity.id)
  //       message.success(res.message)
  //       refreshTable()
  //     } catch {
  //       message.error(EErrorMessage.ERROR_VALIDATE)
  //     }
  //   }

  const columns: ProColumns<IAdminComment>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      ellipsis: true,
      search: false,
      width: 48
    },
    {
      title: (
        <>
          <UserOutlined style={{ marginRight: 5, color: '#1890ff' }} />
          Người dùng
        </>
      ),
      dataIndex: ['user', 'username'],
      valueType: 'text',
      ellipsis: true,
      search: true,
      render: (_, record) => <span>{record.user?.username || 'Ẩn danh'}</span>
    },
    {
      title: (
        <>
          <MessageOutlined style={{ marginRight: 5, color: '#722ed1' }} />
          Nội dung
        </>
      ),
      dataIndex: 'text',
      valueType: 'text',
      ellipsis: true,
      search: true
    },
    {
      title: (
        <>
          <LikeOutlined style={{ marginRight: 5, color: '#fa541c' }} />
          Lượt thích
        </>
      ),
      dataIndex: 'likesCount',
      ellipsis: true,
      search: false,
      render: (_, record) => (
        <span style={{ fontWeight: 'bold', color: '#fa541c' }}>{record.likesCount.toLocaleString()}</span>
      )
    },
    {
      title: (
        <>
          <MessageOutlined style={{ marginRight: 5, color: '#13c2c2' }} />
          Bình luận cha
        </>
      ),
      dataIndex: 'parentCommentId',
      ellipsis: true,
      search: false,
      render: (_, record) => <span>{record.parentCommentId ? `ID: ${record.parentCommentId}` : 'Không có'}</span>
    },
    {
      title: (
        <>
          <ClockCircleOutlined style={{ marginRight: 5, color: '#52c41a' }} />
          Thời gian tạo
        </>
      ),
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      sorter: true,
      ellipsis: true,
      search: false
    },
    {
      title: (
        <>
          <ClockCircleOutlined style={{ marginRight: 5, color: '#faad14' }} />
          Thời gian cập nhật
        </>
      ),
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      ellipsis: true,
      search: false
    },
    {
      title: (
        <>
          <DeleteOutlined style={{ marginRight: 5, color: '#ff4d4f' }} />
          Thời gian xóa
        </>
      ),
      dataIndex: 'deletedAt',
      valueType: 'dateTime',
      ellipsis: true,
      search: false
    },
    {
      title: (
        <>
          <CheckCircleOutlined style={{ marginRight: 5, color: 'green' }} />
          Trạng thái xóa
        </>
      ),
      dataIndex: 'isDeleted',
      render: (_, record) => (
        <Tag color={record.isDeleted ? 'red' : 'green'}>{record.isDeleted ? 'Đã xóa' : 'Chưa xóa'}</Tag>
      ),
      search: false
    },
    {
      title: (
        <>
          <EditOutlined style={{ marginRight: 5, color: '#1890ff' }} />
          Đã chỉnh sửa
        </>
      ),
      dataIndex: 'isEdited',
      render: (_, record) => <Tag color={record.isEdited ? 'blue' : 'gray'}>{record.isEdited ? 'Có' : 'Không'}</Tag>,
      search: false
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      ellipsis: true,
      valueEnum: {
        pending: { text: 'Đang chờ', status: 'Default' },
        approved: { text: 'Đã duyệt', status: 'Success' },
        rejected: { text: 'Từ chối', status: 'Error' }
      },
      render: (_, record) => (
        <Badge
          status={
            record.status === 'approved'
              ? EBadgeStatus.ACTIVE
              : record.status === 'rejected'
                ? EBadgeStatus.INACTIVE
                : 'default'
          }
          text={record.status === 'approved' ? 'Đã duyệt' : record.status === 'rejected' ? 'Từ chối' : 'Đang chờ'}
        />
      ),
      search: true
    },
    {
      title: 'Khoảng thời gian tạo',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => ({
          createdAtRange: value
        })
      }
    },
    {
      title: 'Hành động',
      valueType: 'option',
      key: 'option',
      render: (_, entity) => (
        <Space>
          <Link to={`/comment/update/${entity.id}`}>
            <Tooltip title='Chỉnh sửa'>
              <EditOutlined style={{ color: 'orange', cursor: 'pointer' }} />
            </Tooltip>
          </Link>
          <Popconfirm
            title='Xóa bình luận'
            description='Bạn có chắc chắn muốn xóa bình luận này?'
            // onConfirm={() => confirm(entity)}
            okText='Xóa'
            cancelText='Hủy'
          >
            <Tooltip title='Xóa'>
              <FiTrash style={{ color: 'red', cursor: 'pointer' }} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title='Xem chi tiết'>
            <EyeOutlined style={{ color: '#167fff', cursor: 'pointer' }} onClick={() => handleViewComment(entity)} />
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <>
      <ProTable<IAdminComment>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort) => {
          let query = ''
          if (params) {
            query += `page=${params.current}&pageSize=${params.pageSize}`
            if (params.text) {
              query += `&text=${params.text}`
            }
            if (params.status) {
              query += `&status=${params.status}`
            }
            if (params['user.username']) {
              query += `&username=${params['user.username']}`
            }
            if (params.createdAtRange) {
              query += `&startDate=${params.createdAtRange[0]}&endDate=${params.createdAtRange[1]}`
            }
          }
          query += `&sort=-createdAt`
          if (sort && sort.createdAt) {
            query += `&sort=${sort.createdAt === 'ascend' ? 'createdAt' : '-createdAt'}`
          }
          const res = await getCommentsAPI(query)
          if (res.data) {
            setMeta({
              current: '' + res.data.meta?.page,
              pageSize: '' + res.data.meta?.pageSize,
              pages: res.data.meta?.totalPages as number,
              total: res.data.meta?.totalComments as number
            })
            message.success(res.message)
          } else {
            message.error(res.message)
          }
          return {
            data: res.data?.results,
            success: true,
            total: res.data?.meta?.totalComments
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
        search={{ labelWidth: 'auto' }}
        headerTitle='Bảng bình luận'
        toolBarRender={() => [
          <Link to='/comment/create'>
            <Button key='button' icon={<PlusOutlined />} type='primary'>
              Thêm mới
            </Button>
          </Link>
        ]}
      />
      {/* <DetailComment selectedComment={selectedComment} onClose={handleCloseDrawer} /> */}
    </>
  )
}

export default LayoutAdminComment
