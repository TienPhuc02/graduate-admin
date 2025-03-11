import { getOrderItemsAPI, deleteOrderItemAPI } from '@/services/api.services'
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm, Space, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import DetailOrderItem from './DetailOrderItem'

const LayoutAdminOrderItem = () => {
  const actionRef = useRef<ActionType>(null)
  const [meta, setMeta] = useState({ current: '1', pageSize: '5', pages: 0, total: 0 })
  const [selectedOrderItem, setSelectedOrderItem] = useState<IAdminOrderItem | null>(null)

  const handleViewOrderItem = (entity: IAdminOrderItem) => {
    setSelectedOrderItem(entity)
  }

  const refreshTable = () => {
    actionRef.current?.reload()
  }

  const handleCloseDrawer = () => {
    setSelectedOrderItem(null)
  }

  const confirmDelete = async (entity: IAdminOrderItem) => {
    try {
      const res = await deleteOrderItemAPI(entity.id)
      message.success(res.message)
      refreshTable()
    } catch {
      message.error('Xóa thất bại!')
    }
  }

  const columns: ProColumns<IAdminOrderItem>[] = [
    { dataIndex: 'index', valueType: 'indexBorder', width: 48 },
    { title: 'ID', dataIndex: 'id', valueType: 'text', ellipsis: true, search: false },
    { title: 'Đơn hàng', dataIndex: ['order', 'id'], valueType: 'text', ellipsis: true, search: true },
    { title: 'Khóa học', dataIndex: ['course', 'title'], valueType: 'text', ellipsis: true, search: true },
    { title: 'Giá', dataIndex: 'price', valueType: 'money', ellipsis: true, search: false },
    { title: 'Số lượng', dataIndex: 'quantity', valueType: 'digit', ellipsis: true, search: false },
    { title: 'Ngày tạo', dataIndex: 'createdAt', valueType: 'date', sorter: true, search: false },
    { title: 'Ngày cập nhật', dataIndex: 'updatedAt', valueType: 'date', sorter: true, search: false },
    {
      title: 'Hành động',
      valueType: 'option',
      key: 'option',
      render: (_, record) => (
        <Space>
          <Link to={`/order-item/update/${record.id}`}>
            <Tooltip title='Chỉnh sửa'>
              <FaPencilAlt style={{ color: 'orange', cursor: 'pointer' }} />
            </Tooltip>
          </Link>
          <Popconfirm
            title='Xóa mục đơn hàng'
            description='Bạn có chắc chắn muốn xóa mục đơn hàng này?'
            onConfirm={() => confirmDelete(record)}
            okText='Xóa'
            cancelText='Hủy'
          >
            <Tooltip title='Xóa'>
              <FiTrash style={{ color: 'red', cursor: 'pointer' }} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title='Xem chi tiết'>
            <EyeOutlined style={{ color: '#167fff', cursor: 'pointer' }} onClick={() => handleViewOrderItem(record)} />
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          let query = `page=${params.current}&pageSize=${params.pageSize}`
          if (params['order.id']) query += `&orderId=${params['order.id']}`
          if (params['course.name']) query += `&courseName=${params['course.name']}`
          query += '&sort=-createdAt'

          const res = await getOrderItemsAPI(query)
          if (res.data) {
            setMeta({
              current: '' + res.data.meta?.page,
              pageSize: '' + res.data.meta?.pageSize,
              pages: res.data.meta?.totalPages as number,
              total: res.data.meta?.totalOrderItems as number
            })
            message.success('Lấy danh sách mục đơn hàng thành công!')
          } else {
            message.error(res.message)
          }
          return { data: res.data?.results, success: true, total: res.data?.meta?.totalOrderItems }
        }}
        rowKey='id'
        pagination={{
          current: +meta.current,
          pageSize: +meta.pageSize,
          total: meta.total,
          showSizeChanger: true,
          onChange: (page) => setMeta({ ...meta, current: page + '' })
        }}
        search={{ labelWidth: 'auto' }}
        headerTitle='Bảng mục đơn hàng'
        toolBarRender={() => [
          <Link to='/order-item/create'>
            <Button key='button' icon={<PlusOutlined />} type='primary'>
              Thêm mới
            </Button>
          </Link>
        ]}
      />
      <DetailOrderItem selectedOrderItem={selectedOrderItem} onClose={handleCloseDrawer} />
    </>
  )
}

export default LayoutAdminOrderItem
