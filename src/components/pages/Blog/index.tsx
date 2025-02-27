// import { deleteBlogAPI, getBlogsAPI } from '@/services/api.services'
import { getBlogsAPI } from '@/services/api.services'
import { EBadgeStatus } from '@/types/enum'
import {
  AppstoreOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  FileTextOutlined,
  PlusOutlined,
  TagOutlined,
  UserOutlined
} from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Badge, Button, message, Popconfirm, Space, Tag, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
// import DetailBlog from './DetailBlog'

const LayoutAdminBlog = () => {
  const actionRef = useRef<ActionType>(null)
  const [meta, setMeta] = useState({
    current: '1',
    pageSize: '5',
    pages: 0,
    total: 0
  })
  // const [selectedBlog, setSelectedBlog] = useState<IAdminBlog | null>(null)

  // const handleViewBlog = (entity: IAdminBlog) => {
  //   setSelectedBlog(entity)
  // }
  // const refreshTable = () => {
  //   actionRef.current?.reload()
  // }
  // const handleCloseDrawer = () => {
  //   setSelectedBlog(null)
  // }
  //   const confirm = async (entity: IAdminBlog) => {
  //     try {
  //       const res = await deleteBlogAPI(entity.id)
  //       message.success(res.message)
  //       refreshTable()
  //     } catch {
  //       message.error(EErrorMessage.ERROR_VALIDATE)
  //     }
  //   }

  const columns: ProColumns<IAdminBlog>[] = [
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
          Nội dung
        </>
      ),
      dataIndex: 'content',
      valueType: 'text',
      ellipsis: true,
      search: false,
      render: (_, record) => <div dangerouslySetInnerHTML={{ __html: record.content || 'Không có' }} />
    },
    {
      title: (
        <>
          <UserOutlined style={{ marginRight: 5, color: '#13c2c2' }} />
          Tác giả
        </>
      ),
      dataIndex: ['author', 'username'],
      valueType: 'text',
      ellipsis: true,
      search: false
    },
    {
      title: (
        <>
          <EyeOutlined style={{ marginRight: 5, color: '#1890ff' }} />
          Lượt xem
        </>
      ),
      dataIndex: 'viewsBlog',
      ellipsis: true,
      search: false,
      render: (_, record) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{record.viewsBlog.toLocaleString()}</span>
      )
    },
    {
      title: (
        <>
          <AppstoreOutlined style={{ marginRight: 5, color: '#13c2c2' }} />
          Danh mục
        </>
      ),
      dataIndex: 'categoryBlog',
      valueType: 'text',
      ellipsis: true,
      search: true
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
          <CheckCircleOutlined style={{ marginRight: 5, color: 'green' }} />
          Trạng thái xuất bản
        </>
      ),
      ellipsis: true,
      dataIndex: 'isPublished',
      valueEnum: {
        true: { text: EBadgeStatus.ACTIVE },
        false: { text: EBadgeStatus.INACTIVE }
      },
      render: (_, record) => (
        <Badge
          status={record.isPublished ? EBadgeStatus.ACTIVE : EBadgeStatus.INACTIVE}
          text={record.isPublished ? 'Đã xuất bản' : 'Chưa xuất bản'}
        />
      ),
      search: true
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
      title: 'Hành động',
      valueType: 'option',
      key: 'option',
      render: (_, entity) => (
        <Space>
          <Link to={`/blog/update/${entity.id}`}>
            <Tooltip title='Chỉnh sửa'>
              <FaPencilAlt style={{ color: 'orange', cursor: 'pointer' }} />
            </Tooltip>
          </Link>
          <Popconfirm
            title='Xóa bài viết'
            description='Bạn có chắc chắn muốn xóa bài viết này?'
            // onConfirm={() => confirm(entity)}
            okText='Xóa'
            cancelText='Hủy'
          >
            <Tooltip title='Xóa'>
              <FiTrash style={{ color: 'red', cursor: 'pointer' }} />
            </Tooltip>
          </Popconfirm>
          <Tooltip title='Xem chi tiết'>
            {/* <EyeOutlined style={{ color: '#167fff', cursor: 'pointer' }} onClick={() => handleViewBlog(entity)} /> */}
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <>
      <ProTable<IAdminBlog>
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
            if (params.isPublished) {
              query += `&isPublished=${params.isPublished}`
            }
            if (params.categoryBlog) {
              query += `&categoryBlog=${params.categoryBlog}`
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
          const res = await getBlogsAPI(query)
          if (res.data) {
            setMeta({
              current: '' + res.data.meta?.page,
              pageSize: '' + res.data.meta?.pageSize,
              pages: res.data.meta?.totalPages as number,
              total: res.data.meta?.totalBlogs as number
            })
            message.success(res.message)
          } else {
            message.error(res.message)
          }
          return {
            data: res.data?.results,
            success: true,
            total: res.data?.meta?.totalBlogs
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
        headerTitle='Bảng bài viết'
        toolBarRender={() => [
          <Link to='/blog/create'>
            <Button key='button' icon={<PlusOutlined />} type='primary'>
              Thêm mới
            </Button>
          </Link>
        ]}
      />
      {/* <DetailBlog selectedBlog={selectedBlog} onClose={handleCloseDrawer} /> */}
    </>
  )
}

export default LayoutAdminBlog
