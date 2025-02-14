import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import { useRef } from 'react'

const columns: ProColumns<any>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48
  },
  {
    title: 'Id',
    dataIndex: 'id',
    search: false
  },
  {
    title: 'Tên Họ',
    dataIndex: 'firstName',
    search: false
  },
  {
    title: ' Tên',
    dataIndex: 'lastName'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    search: true
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    search: false
  },
  {
    title: 'Thời gian tạo',
    dataIndex: 'createdAt',
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
    dataIndex: 'role',
    search: false
  },
  {
    title: 'Thời gian cập nhật',
    dataIndex: 'updatedAt',
    search: false
  },
  {
    title: 'Thời gian xóa',
    dataIndex: 'deletedAt',
    search: false
  },
  {
    title: 'Đã xóa',
    dataIndex: 'isDeleted',
    search: false
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    search: false
  },
  {
    title: 'Xác minh',
    dataIndex: 'isVerify',
    search: false
  },
  {
    title: 'Hành động',
    valueType: 'option',
    key: 'option'
    // render: (text, record, _, action) => []
  }
]

const LayoutAdminUser = () => {
  const actionRef = useRef<ActionType>(null)
  return (
    <ProTable<any>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      editable={{
        type: 'multiple'
      }}
      rowKey='id'
      pagination={
        {
          // pageSize: 5,
          // onChange: (page) => console.log(page)
        }
      }
      search={{
        labelWidth: 'auto'
      }}
      dateFormatter='string'
      headerTitle='Bảng người dùng'
      toolBarRender={() => [
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
      ]}
    />
  )
}
export default LayoutAdminUser
