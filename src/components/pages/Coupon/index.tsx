import { deleteCouponAPI, getCouponsAPI } from '@/services/api.services'
import { EBadgeStatus, EErrorMessage } from '@/types/enum'
import {
  CalendarOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  PercentageOutlined,
  PlusOutlined,
  TagOutlined
} from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Badge, Button, message, Popconfirm, Space, Tag, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import DetailCoupon from './DetailCoupon'

const LayoutAdminCoupon = () => {
  const actionRef = useRef<ActionType>(null)
  const [meta, setMeta] = useState({
    current: '1',
    pageSize: '5',
    pages: 0,
    total: 0
  })
  const [selectedCoupon, setSelectedCoupon] = useState<IAdminCoupon | null>(null)

  const handleViewCoupon = (entity: IAdminCoupon) => {
    setSelectedCoupon(entity)
  }

  const refreshTable = () => {
    actionRef.current?.reload()
  }

  const handleCloseDrawer = () => {
    setSelectedCoupon(null)
  }

  const confirmDelete = async (entity: IAdminCoupon) => {
    try {
      const res = await deleteCouponAPI(entity.id)
      message.success(res.message)
      refreshTable()
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    }
  }

  const columns: ProColumns<IAdminCoupon>[] = [
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
          <TagOutlined style={{ marginRight: 5, color: '#1890ff' }} />
          Mã giảm giá
        </>
      ),
      dataIndex: 'code',
      valueType: 'text',
      ellipsis: true,
      search: true
    },
    {
      title: (
        <>
          <PercentageOutlined style={{ marginRight: 5, color: '#722ed1' }} />
          Phần trăm giảm
        </>
      ),
      dataIndex: 'discountPercentage',
      valueType: 'text',
      ellipsis: true,
      search: false,
      render: (_, record) => <span>{record.discountPercentage}%</span>
    },
    {
      title: (
        <>
          <CalendarOutlined style={{ marginRight: 5, color: '#fa541c' }} />
          Ngày hết hạn
        </>
      ),
      dataIndex: 'expiryDate',
      valueType: 'date',
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
      width: 150,
      dataIndex: 'isDeleted',
      render: (_, record) => (
        <Tag color={record.isDeleted ? 'red' : 'green'}>{record.isDeleted ? 'Đã xóa' : 'Chưa xóa'}</Tag>
      ),
      search: false
    },
    {
      title: (
        <>
          <DeleteOutlined style={{ marginRight: 5, color: '#ff4d4f' }} />
          Thời gian xóa
        </>
      ),
      width: 140,
      dataIndex: 'deletedAt',
      valueType: 'dateTime',
      search: false
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
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: true,
      search: false,
      ellipsis: true
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      valueType: 'date',
      sorter: true,
      search: false,
      ellipsis: true
    },
    {
      title: 'Hành động',
      valueType: 'option',
      key: 'option',
      render: (_, entity) => (
        <Space>
          <Link to={`/coupon/update/${entity.id}`}>
            <Tooltip title='Chỉnh sửa'>
              <FaPencilAlt style={{ color: 'orange', cursor: 'pointer' }} />
            </Tooltip>
          </Link>
          <Popconfirm
            title='Xóa mã giảm giá'
            description='Bạn có chắc chắn muốn xóa mã giảm giá này?'
            onConfirm={() => confirmDelete(entity)}
            okText='Xóa'
            cancelText='Hủy'
          >
            <Tooltip title='Xóa'>
              <FiTrash style={{ color: 'red', cursor: 'pointer' }} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title='Xem chi tiết'>
            <EyeOutlined style={{ color: '#167fff', cursor: 'pointer' }} onClick={() => handleViewCoupon(entity)} />
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <>
      <ProTable<IAdminCoupon>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort) => {
          let query = ''
          if (params) {
            query += `page=${params.current}&pageSize=${params.pageSize}`
            if (params.code) {
              query += `&code=${params.code}`
            }
            if (params.createdAtRange) {
              query += `&startDate=${params.createdAtRange[0]}&endDate=${params.createdAtRange[1]}`
            }
          }
          query += `&sort=-createdAt`
          if (sort && sort.createdAt) {
            query += `&sort=${sort.createdAt === 'ascend' ? 'createdAt' : '-createdAt'}`
          }
          if (sort && sort.updatedAt) {
            query += `&sort=${sort.updatedAt === 'ascend' ? 'updatedAt' : '-updatedAt'}`
          } else query += `&sort=-createdAt`

          const res = await getCouponsAPI(query)
          if (res.data) {
            setMeta({
              current: '' + res.data.meta?.page,
              pageSize: '' + res.data.meta?.pageSize,
              pages: res.data.meta?.totalPages as number,
              total: res.data.meta?.totalCoupons as number
            })
            message.success('Lấy danh sách mã giảm giá thành công !!')
          } else {
            message.error(res.message)
          }
          return {
            data: res.data?.results,
            success: true,
            total: res.data?.meta?.totalCoupons
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
        headerTitle='Bảng mã giảm giá'
        toolBarRender={() => [
          <Link to='/coupon/create'>
            <Button key='button' icon={<PlusOutlined />} type='primary'>
              Thêm mới
            </Button>
          </Link>
        ]}
      />
      <DetailCoupon selectedCoupon={selectedCoupon} onClose={handleCloseDrawer} />
    </>
  )
}

export default LayoutAdminCoupon
