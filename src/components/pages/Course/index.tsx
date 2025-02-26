import { deleteCourseAPI, getCoursesAPI } from '@/services/api.services'
import { EBadgeStatus, ECourseCategory, EErrorMessage } from '@/types/enum'
import {
  AppstoreOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  DollarOutlined,
  EyeOutlined,
  FileTextOutlined,
  PlusOutlined,
  StarFilled,
  TagOutlined
} from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Badge, Button, message, Popconfirm, Space, Tag, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import DetailCourse from './DetailCourse'

const LayoutAdminCourse = () => {
  const actionRef = useRef<ActionType>(null)
  const [meta, setMeta] = useState({
    current: '1',
    pageSize: '5',
    pages: 0,
    total: 0
  })
  const [selectedCourse, setSelectedCourse] = useState<IAdminCourse | null>(null)

  const handleViewCourse = (entity: IAdminCourse) => {
    setSelectedCourse(entity)
  }
  const refreshTable = () => {
    actionRef.current?.reload()
  }
  const handleCloseDrawer = () => {
    setSelectedCourse(null)
  }
  const confirm = async (entity: IAdminCourse) => {
    try {
      const res = await deleteCourseAPI(entity.id)
      message.success(res.message)
      refreshTable()
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    }
  }

  const columns: ProColumns<IAdminCourse>[] = [
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
          <FileTextOutlined style={{ marginRight: 5, color: '#1890ff' }} />
          Tiêu đề
        </>
      ),
      dataIndex: 'title',
      valueType: 'text',
      ellipsis: true,
      search: true
    },
    {
      title: (
        <>
          <TagOutlined style={{ marginRight: 5, color: '#722ed1' }} />
          Mô tả
        </>
      ),
      dataIndex: 'description',
      valueType: 'text',
      ellipsis: true,
      search: false
    },
    {
      title: (
        <>
          <CalendarOutlined style={{ marginRight: 5, color: '#fa541c' }} />
          Thời gian cập nhật
        </>
      ),
      dataIndex: 'updatedAt',
      valueType: 'date',
      ellipsis: true,
      search: false
    },

    {
      title: (
        <>
          <EyeOutlined style={{ marginRight: 5, color: '#1890ff' }} />
          Số lượng xem
        </>
      ),
      dataIndex: 'viewsCourse',
      ellipsis: true,
      search: false,
      render: (_, record) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{record.viewsCourse.toLocaleString()}</span>
      )
    },
    {
      title: (
        <>
          <StarFilled style={{ marginRight: 5, color: '#fadb14' }} />
          Đánh giá
        </>
      ),
      dataIndex: 'rating',
      ellipsis: true,
      search: false,
      render: (_, record) => (
        <span style={{ fontWeight: 'bold', color: '#faad14' }}>
          {record.rating ? `${record.rating}/5 ⭐` : 'Chưa có'}
        </span>
      )
    },
    {
      title: (
        <>
          <ClockCircleOutlined style={{ marginRight: 5, color: '#52c41a' }} />
          Thời lượng
        </>
      ),
      dataIndex: 'duration',
      ellipsis: true,
      search: false,
      render: (_, record) => (
        <span style={{ fontWeight: 'bold', color: '#52c41a' }}>
          {record.duration ? `${record.duration} giờ` : 'Chưa cập nhật'}
        </span>
      )
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
          <AppstoreOutlined style={{ marginRight: 5, color: '#13c2c2' }} />
          Danh mục
        </>
      ),
      dataIndex: 'category',
      valueType: 'select',
      ellipsis: true,
      valueEnum: {
        programming: { text: ECourseCategory.PROGRAMMING },
        design: { text: ECourseCategory.DESIGN },
        business: { text: ECourseCategory.BUSINESS },
        marketing: { text: ECourseCategory.MARKETING },
        data_science: { text: ECourseCategory.DATA_SCIENCE }
      },
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
      title: 'Khoảng giá khóa học',
      valueType: 'digitRange',
      hideInTable: true,
      search: {
        transform: (value) => ({
          priceRange: value
        })
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      ellipsis: true,
      valueEnum: {
        true: { text: EBadgeStatus.ACTIVE },
        false: { text: EBadgeStatus.INACTIVE }
      },
      render: (_, record) => (
        <Badge
          status={record.status ? EBadgeStatus.ACTIVE : EBadgeStatus.INACTIVE}
          text={record.status ? 'Hoạt động' : 'Không hoạt động'}
        />
      ),
      search: true
    },
    {
      title: 'Cấp độ',
      dataIndex: 'level',
      valueType: 'select',
      valueEnum: {
        BEGINNER: { text: 'Cơ bản', status: 'Default' },
        INTERMEDIATE: { text: 'Trung cấp', status: 'Processing' },
        ADVANCED: { text: 'Nâng cao', status: 'Success' }
      },
      search: false,
      ellipsis: true
    },
    {
      title: (
        <>
          <DollarOutlined style={{ marginRight: 5, color: '#faad14' }} />
          Giá
        </>
      ),
      dataIndex: 'price',
      valueType: 'money',
      ellipsis: true,
      search: false,
      render: (_, entity) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(entity.price))
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
      title: 'Hành động',
      valueType: 'option',
      key: 'option',
      render: (_, entity) => (
        <Space>
          <Link to={`/course/update/${entity.id}`}>
            <Tooltip title='Chỉnh sửa'>
              <FaPencilAlt style={{ color: 'orange', cursor: 'pointer' }} />
            </Tooltip>
          </Link>
          <Popconfirm
            title='Xóa khóa học'
            description='Bạn có chắc chắn muốn xóa khóa học này?'
            onConfirm={() => confirm(entity)}
            okText='Xóa'
            cancelText='Hủy'
          >
            <Tooltip title='Xóa'>
              <FiTrash style={{ color: 'red', cursor: 'pointer' }} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title='Xem chi tiết'>
            <EyeOutlined style={{ color: '#167fff', cursor: 'pointer' }} onClick={() => handleViewCourse(entity)} />
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <>
      <ProTable<IAdminCourse>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort) => {
          let query = ''
          if (params) {
            query += `page=${params.current}&pageSize=${params.pageSize}`
            if (params.title) {
              query += `&title=${params.title}`
            }
            if (params.status) {
              query += `&status=${params.status}`
            }
            if (params.category) {
              query += `&category=${params.category}`
            }
            if (params.createdAtRange) {
              query += `&startDate=${params.createdAtRange[0]}&endDate=${params.createdAtRange[1]}`
            }
            if (params.priceRange) {
              query += `&minPrice=${params.priceRange[0]}&maxPrice=${params.priceRange[1]}`
            }
          }
          query += `&sort=-createdAt`
          if (sort && sort.createdAt) {
            query += `&sort=${sort.createdAt === 'ascend' ? 'createdAt' : '-createdAt'}`
          }
          if (sort && sort.updatedAt) {
            query += `&sort=${sort.updatedAt === 'ascend' ? 'updatedAt' : '-updatedAt'}`
          } else query += `&sort=-createdAt`
          const res = await getCoursesAPI(query)
          if (res.data) {
            setMeta({
              current: '' + res.data.meta?.page,
              pageSize: '' + res.data.meta?.pageSize,
              pages: res.data.meta?.totalPages as number,
              total: res.data.meta?.totalCourses as number
            })
            message.success(res.message)
          } else {
            message.error(res.message)
          }
          return {
            data: res.data?.results,
            success: true,
            total: res.data?.meta?.totalCourses
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
        headerTitle='Bảng khóa học'
        toolBarRender={() => [
          <Link to='/course/create'>
            <Button key='button' icon={<PlusOutlined />} type='primary'>
              Thêm mới
            </Button>
          </Link>
        ]}
      />
      <DetailCourse selectedCourse={selectedCourse} onClose={handleCloseDrawer} />
    </>
  )
}
export default LayoutAdminCourse
