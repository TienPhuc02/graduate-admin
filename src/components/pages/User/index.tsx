import { deleteUserAPI, getUsersAPI } from '@/services/api.services'
import { EyeOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Badge, Button, message, Popconfirm, Space, Tag, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import DetailUser from './DetailUser'
import { EBadgeStatus, EErrorMessage, ETypeUser, ESortOrder } from '@/types/enum'

const LayoutAdminUser = () => {
  const actionRef = useRef<ActionType>(null)
  const [meta, setMeta] = useState({
    current: '1',
    pageSize: '5',
    pages: 0,
    total: 0
  })
  const [selectedUser, setSelectedUser] = useState<IAdminUsers | null>(null)
  const refreshTable = () => {
    actionRef.current?.reload()
  }
  const handleViewUser = (entity: any) => {
    setSelectedUser(entity)
  }

  const handleCloseDrawer = () => {
    setSelectedUser(null)
  }
  const confirm = async (entity: IAdminUsers) => {
    try {
      const res = await deleteUserAPI(entity.id)
      message.success(res.message)
      refreshTable()
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    }
  }
  const columns: ProColumns<any>[] = [
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
      title: 'Tên đầy đủ',
      dataIndex: 'fullName',
      render: (_, record) => `${record.firstName} ${record.lastName}`,
      search: false
    },
    {
      title: 'Email',
      dataIndex: 'email',
      valueType: 'text',
      search: true,
      ellipsis: true,
      render: (email) => <Tooltip title={email}>{email}</Tooltip>
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      valueType: 'text',
      search: false,
      render: (phone) => <Tag color='blue'>{phone}</Tag>
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      render: (_, record) => {
        const role = record.role
        const color = role === ETypeUser.ADMIN ? 'red' : role === ETypeUser.STUDENT ? 'blue' : 'green'
        return <Tag color={color}>{role.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Xác minh',
      dataIndex: 'isVerified',
      render: (_, record) => (
        <Badge
          status={record.isVerified ? EBadgeStatus.ACTIVE : EBadgeStatus.INACTIVE}
          text={record.isVerified ? 'Đã xác minh' : 'Chưa xác minh'}
        />
      ),
      search: false
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isDeleted',
      render: (_, record) => (
        <Badge
          status={record.isDeleted ? EBadgeStatus.INACTIVE : EBadgeStatus.ACTIVE}
          text={record.isDeleted ? 'Đã xóa' : 'Hoạt động'}
        />
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
      title: 'Địa chỉ',
      dataIndex: 'address',
      search: false,
      ellipsis: true,
      render: (address) => <Tooltip title={address}>{address}</Tooltip>
    },
    {
      title: 'Hành động',
      valueType: 'option',
      key: 'option',
      render: (_, entity) => (
        <Space size='middle'>
          <Link to={`/user/update/${entity.id}`}>
            <Tooltip title='Chỉnh sửa'>
              <FaPencilAlt style={{ color: 'orange', cursor: 'pointer' }} />
            </Tooltip>
          </Link>
          <Popconfirm
            title='Xóa người dùng'
            description='Bạn có chắc chắn muốn xóa người dùng này?'
            onConfirm={() => confirm(entity)}
            okText='Xóa'
            cancelText='Hủy'
          >
            <Tooltip title='Xóa'>
              <FiTrash style={{ color: 'red', cursor: 'pointer' }} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title='Xem chi tiết'>
            <EyeOutlined style={{ color: '#167fff', cursor: 'pointer' }} onClick={() => handleViewUser(entity)} />
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
        editable={{
          type: 'multiple'
        }}
        request={async (params, sort) => {
          let query = ''
          if (params) {
            query += `page=${params.current}&pageSize=${params.pageSize}`
            if (params.email) {
              query += `&email=${params.email}`
            }
            if (params.lastName) {
              query += `&lastName=${params.lastName}`
            }
            if (params.createdAtRange) {
              query += `&startDate=${params.createdAtRange[0]}&endDate=${params.createdAtRange[1]}`
            }
          }
          query += `&sort=${sort?.createdAt === ESortOrder.ASC ? 'createdAt' : '-createdAt'}`
          if (sort && sort.updatedAt) {
            query += `&sort=${sort?.updatedAt === ESortOrder.ASC ? 'updatedAt' : '-updatedAt'}`
          }
          const res = await getUsersAPI(query)
          if (res.data) {
            setMeta({
              current: '' + res.data.meta?.page,
              pageSize: '' + res.data.meta?.pageSize,
              pages: res.data.meta?.totalPages as number,
              total: res.data.meta?.totalUsers as number
            })
            message.success(res.message)
          } else {
            message.error(res.message)
          }
          return {
            data: res.data?.results,
            page: 1,
            success: true,
            total: res.data?.meta?.totalUsers
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
        headerTitle='Bảng người dùng'
        toolBarRender={() => [
          <Link to='/user/create'>
            <Button
              key='button'
              icon={<PlusOutlined />}
              onClick={() => {
                actionRef.current?.reload()
              }}
              type='primary'
            >
              Thêm mới
            </Button>
          </Link>
        ]}
      />
      <DetailUser selectedUser={selectedUser} onClose={handleCloseDrawer} />
    </>
  )
}
export default LayoutAdminUser
