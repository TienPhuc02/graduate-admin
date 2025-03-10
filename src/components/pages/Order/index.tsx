import { deleteOrderAPI, getOrdersAPI } from '@/services/api.services'
import { EErrorMessage } from '@/types/enum'
import { CalendarOutlined, EyeOutlined, PlusOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm, Space, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import DetailOrder from './DetailOrder'

const LayoutAdminOrder = () => {
  const actionRef = useRef<ActionType>(null)
  const [meta, setMeta] = useState({
    current: '1',
    pageSize: '5',
    pages: 0,
    total: 0
  })
  const [selectedOrder, setSelectedOrder] = useState<IAdminOrder | null>(null)

  const handleViewOrder = (entity: IAdminOrder) => {
    setSelectedOrder(entity)
  }

  const refreshTable = () => {
    actionRef.current?.reload()
  }

  const handleCloseDrawer = () => {
    setSelectedOrder(null)
  }

  const confirmDelete = async (entity: IAdminOrder) => {
    try {
      const res = await deleteOrderAPI(entity.id)
      message.success(res.message)
      refreshTable()
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    }
  }

  const columns: ProColumns<IAdminOrder>[] = [
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
      search: false
    },
    {
      title: (
        <>
          <UserOutlined style={{ marginRight: 5, color: '#1890ff' }} />
          Người đặt hàng
        </>
      ),
      dataIndex: 'user',
      valueType: 'text',
      render: (_, record) => (
        <span>
          {record.user.name} ({record.user.email})
        </span>
      ),
      search: false
    },
    {
      title: (
        <>
          <ShoppingCartOutlined style={{ marginRight: 5, color: '#722ed1' }} />
          Tổng tiền
        </>
      ),
      dataIndex: 'totalAmount',
      valueType: 'money',
      search: false
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        pending: { text: 'Chờ xử lý', status: 'Default' },
        processing: { text: 'Đang xử lý', status: 'Processing' },
        completed: { text: 'Hoàn thành', status: 'Success' },
        cancelled: { text: 'Đã hủy', status: 'Error' }
      }
    },
    {
      title: (
        <>
          <CalendarOutlined style={{ marginRight: 5, color: '#fa541c' }} />
          Ngày đặt hàng
        </>
      ),
      dataIndex: 'orderDate',
      valueType: 'date',
      search: false
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: true,
      search: false
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      valueType: 'date',
      sorter: true,
      search: false
    },
    {
      title: 'Hành động',
      valueType: 'option',
      key: 'option',
      render: (_, entity) => (
        <Space>
          <Link to={`/order/update/${entity.id}`}>
            <Tooltip title='Chỉnh sửa'>
              <FaPencilAlt style={{ color: 'orange', cursor: 'pointer' }} />
            </Tooltip>
          </Link>
          <Popconfirm
            title='Xóa đơn hàng'
            description='Bạn có chắc chắn muốn xóa đơn hàng này?'
            onConfirm={() => confirmDelete(entity)}
            okText='Xóa'
            cancelText='Hủy'
          >
            <Tooltip title='Xóa'>
              <FiTrash style={{ color: 'red', cursor: 'pointer' }} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title='Xem chi tiết'>
            <EyeOutlined style={{ color: '#167fff', cursor: 'pointer' }} onClick={() => handleViewOrder(entity)} />
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <>
      <ProTable<IAdminOrder>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          let query = `page=${params.current}&pageSize=${params.pageSize}`
          if (params.status) {
            query += `&status=${params.status}`
          }
          query += `&sort=-createdAt`
          const res = await getOrdersAPI(query)
          if (res.data) {
            setMeta({
              current: '' + res.data.meta?.page,
              pageSize: '' + res.data.meta?.pageSize,
              pages: res.data.meta?.totalPages as number,
              total: res.data.meta?.totalOrders as number
            })
            message.success('Lấy danh sách đơn hàng thành công !!')
          } else {
            message.error(res.message)
          }
          return {
            data: res.data?.results,
            success: true,
            total: res.data?.meta?.totalOrders
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
        headerTitle='Bảng đơn hàng'
        toolBarRender={() => [
          <Link to='/order/create'>
            <Button key='button' icon={<PlusOutlined />} type='primary'>
              Thêm mới
            </Button>
          </Link>
        ]}
      />
      <DetailOrder selectedOrder={selectedOrder} onClose={handleCloseDrawer} />
    </>
  )
}

export default LayoutAdminOrder
