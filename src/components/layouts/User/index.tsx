import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable, TableDropdown } from '@ant-design/pro-components'
import { Button, Dropdown } from 'antd'
import { useRef } from 'react'

type GithubIssueItem = {
  url: string
  id: number
  number: number
  title: string
  labels: {
    name: string
    color: string
  }[]
  state: string
  comments: number
  created_at: string
  updated_at: string
  closed_at?: string
}

const columns: ProColumns<GithubIssueItem>[] = [
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
    // copyable: true,
    // ellipsis: true
    // tooltip: 'Tiêu đề quá dài sẽ tự động thu gọn',
    // formItemProps: {
    //   rules: [
    //     {
    //       required: true,
    //       message: 'Trường này là bắt buộc'
    //     }
    //   ]
    // }
  },
  {
    // disable: true,
    title: ' Tên',
    dataIndex: 'lastName'
    // filters: true,
    // onFilter: true,
    // ellipsis: true,
    // valueType: 'select',
    // valueEnum: {
    //   all: { text: 'Rất dài'.repeat(50) },
    //   open: {
    //     text: 'Chưa giải quyết',
    //     status: 'Error'
    //   },
    //   closed: {
    //     text: 'Đã giải quyết',
    //     status: 'Success',
    //     disabled: true
    //   },
    //   processing: {
    //     text: 'Đang xử lý',
    //     status: 'Processing'
    //   }
    // }
  },
  {
    // disable: true,
    title: 'Địa chỉ email',
    dataIndex: 'email'
    // search: false,
    // renderFormItem: (_, { defaultRender }) => {
    //   return defaultRender(_)
    // },
    // render: (_, record) => (
    //   <Space>
    //     {record.labels.map(({ name, color }) => (
    //       <Tag color={color} key={name}>
    //         {name}
    //       </Tag>
    //     ))}
    //   </Space>
    // )
  },
  {
    title: 'Số điện thoại',
    // key: 'showTime',
    dataIndex: 'phoneNumber',
    search: false
    // valueType: 'date'
    // sorter: true,
    // hideInSearch: true
  },
  {
    title: 'Thời gian tạo',
    dataIndex: 'createdAt',
    search: false
    // valueType: 'dateRange',
    // hideInTable: true,
    // search: {
    //   transform: (value) => {
    //     return {
    //       startTime: value[0],
    //       endTime: value[1]
    //     }
    //   }
    // }
  },
  {
    title: 'Khoảng Thời gian tạo',
    // dataIndex: 'createdAt',
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
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key='editable'
        onClick={() => {
          action?.startEditable?.(record.id)
        }}
      >
        Chỉnh sửa
      </a>,
      <a href={record.url} target='_blank' rel='noopener noreferrer' key='view'>
        Xem
      </a>,
      <TableDropdown
        key='actionGroup'
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: 'Sao chép' },
          { key: 'delete', name: 'Xóa' }
        ]}
      />
    ]
  }
]

const LayoutAdminUser = () => {
  const actionRef = useRef<ActionType>(null)
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      editable={{
        type: 'multiple'
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true }
        },
        onChange(value) {
          console.log('value: ', value)
        }
      }}
      rowKey='id'
      search={{
        labelWidth: 'auto'
      }}
      options={{
        setting: {
          listsHeight: 400
        }
      }}
      form={{
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime]
            }
          }
          return values
        }
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page)
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
        </Button>,
        <Dropdown
          key='menu'
          menu={{
            items: [
              {
                label: 'Mục 1',
                key: '1'
              },
              {
                label: 'Mục 2',
                key: '2'
              },
              {
                label: 'Mục 3',
                key: '3'
              }
            ]
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      ]}
    />
  )
}
export default LayoutAdminUser
