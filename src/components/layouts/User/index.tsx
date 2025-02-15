import { getUsersAPI } from '@/services/api.services'
import { dateRangeValidate } from '@/services/helper'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm } from 'antd'
import { useRef, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
const columns: ProColumns<any>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48
  },
  {
    title: 'Id',
    dataIndex: 'id',
    valueType: 'text',
    search: false,
    ellipsis: true
  },
  {
    title: 'Tên Họ',
    dataIndex: 'firstName',
    valueType: 'text',
    search: false,
    ellipsis: true
  },
  {
    title: ' Tên',
    dataIndex: 'lastName',
    valueType: 'text',
    ellipsis: true
  },
  {
    title: 'Email',
    dataIndex: 'email',
    valueType: 'text',
    search: true,
    ellipsis: true
  },
  {
    title: 'Số điện thoại',
    valueType: 'text',
    dataIndex: 'phoneNumber',
    search: false
  },
  {
    title: 'Thời gian tạo',
    key: 'created_at',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: true,
    search: false
  },
  {
    title: 'Khoảng thời gian tạo',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startDate: value[0],
          endDate: value[1]
        }
      }
    }
  },
  {
    title: 'Vai trò',
    valueType: 'text',
    dataIndex: 'role',
    search: false
  },
  {
    title: 'Thời gian cập nhật',
    dataIndex: 'updatedAt',
    key: 'updated_at',
    valueType: 'date',
    sorter: true,
    search: false
  },
  {
    title: 'Thời gian xóa',
    dataIndex: 'deletedAt',
    valueType: 'date',
    search: false
  },
  {
    title: 'Đã xóa',
    dataIndex: 'isDeleted',
    render: (_, record) => (record.isDeleted ? 'Đã xóa' : 'Chưa xóa'),
    search: false
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    search: false,
    ellipsis: true
  },
  {
    title: 'Xác minh',
    dataIndex: 'isVerified',
    render: (_, record) => (record.isVerified ? 'Đã xác minh' : 'Chưa xác minh'),
    search: false
  },
  {
    title: 'Action',
    valueType: 'option',
    key: 'option',
    render(dom, entity) {
      return (
        <div style={{ display: 'flex', gap: 20 }}>
          <FaPencilAlt style={{ color: 'orange', cursor: 'pointer' }} onClick={() => {}} />
          <Popconfirm
            title='Delete the user'
            description='Are you sure to delete this user?'
            onConfirm={() => confirm(entity)}
            okText='Yes'
            cancelText='No'
          >
            <FiTrash style={{ color: 'red', cursor: 'pointer' }} />
          </Popconfirm>
        </div>
      )
    }
  }
]

const LayoutAdminUser = () => {
  const actionRef = useRef<ActionType>(null)
  const [meta, setMeta] = useState({
    current: '1',
    pageSize: '5',
    pages: 0,
    total: 0
  })
  return (
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
            query += `&email=/${params.email}/i`
          }
          if (params.fullName) {
            query += `&lastName=/${params.lastName}/i`
          }
          const createDateRange = dateRangeValidate(params.createdAtRange)
          if (createDateRange) {
            query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`
          }
        }
        query += `&sort=-createdAt`
        if (sort && sort.createdAt) {
          query += `&sort=${sort.createdAt === 'ascend' ? 'createdAt' : '-createdAt'}`
        } else query += `&sort=-createdAt`
        const res = await getUsersAPI(query)
        if (res.data) {
          setMeta({
            current: '' + res.data.meta?.page,
            pageSize: '' + res.data.meta?.pageSize,
            pages: res.data.meta?.totalPages as number,
            total: res.data.meta?.totalUsers as number
          })
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
  )
}
export default LayoutAdminUser
