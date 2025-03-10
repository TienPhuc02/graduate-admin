import { getBlogByIdAPI, getUsersAPI, updateBlogAPI } from '@/services/api.services'
import { EErrorMessage } from '@/types/enum'
import { UploadOutlined } from '@ant-design/icons'
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormUploadButton,
  ProFormItem
} from '@ant-design/pro-components'
import { Editor } from '@tinymce/tinymce-react'
import { Button, Card, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageNotFound from '@/pages/NotFound'
import { fetchAssetsAsFile } from '@/utils'

const LayoutUpdateBlog = ({ idBlog }: { idBlog: string }) => {
  const navigate = useNavigate()
  const editorRef = useRef<any>(null)
  const [loading, setLoading] = useState(false)
  const [thumbnailFileList, setThumbnailFileList] = useState<any[]>([])
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [listAuthors, setListAuthors] = useState<IAdminUser[] | null>(null)
  const [error, setError] = useState(false)
  const formRef = useRef<any>(null)

  const handleUploadChange = ({ fileList }: any) => {
    setThumbnailFileList(fileList)
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }

  const handleCustomRequest = ({ file, onSuccess }: any) => {
    const fileURL = URL.createObjectURL(file)
    setThumbnailPreview(fileURL)

    setTimeout(() => {
      onSuccess?.('ok')
      message.success('Upload ảnh thumbnail thành công!')
    }, 1000)
  }

  const handleFooterClick = async () => {
    try {
      const values = await formRef.current?.validateFields()
      handleSubmit(values)
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    }
  }

  const handleSubmit = async (values: any) => {
    try {

      const thumbnailFile = thumbnailFileList[0]?.originFileObj || null
      const contentHtml = editorRef.current ? editorRef.current.getContent() : ''

      const res = await updateBlogAPI(idBlog, thumbnailFile, {
        ...values,
        content: contentHtml
      })

      setLoading(true)
      if (res && res.data) {
        formRef.current?.resetFields()
        setThumbnailFileList([])
        setThumbnailPreview(null)
        message.success(res.message)
        navigate('/blog')
      }
    } catch (error) {
      message.error(EErrorMessage.ERROR_VALIDATE)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!idBlog) return

    const fetchBlogData = async () => {
      try {
        const res = await getBlogByIdAPI(idBlog)
        if (res && res.data) {
          const blogData = res.data
          formRef.current?.setFieldsValue({
            title: blogData.title,
            author: blogData.author.id,
            categoryBlog: blogData.categoryBlog,
            isPublished: blogData.isPublished,
            content: blogData.content
          })
          if (editorRef.current) {
            editorRef.current.setContent(blogData.content || '')
          }
          if (blogData.thumbnail) {
            fetchAssetsAsFile(blogData.thumbnail).then((file) => {
              setThumbnailFileList([
                {
                  uid: '-1',
                  name: file.name,
                  status: 'done',
                  originFileObj: file
                }
              ])
              setThumbnailPreview(blogData.thumbnail)
            })
          }
        } else {
          setError(true)
        }
      } catch {
        message.error('Lỗi khi lấy dữ liệu blog !!')
      }
    }

    fetchBlogData()
  }, [idBlog])

  if (error) {
    return <PageNotFound />
  }
  useEffect(() => {
    const fetchAuthors = async () => {
      const res = await getUsersAPI()
      if (res && res.data) {
        setListAuthors(res.data.results)
      }
    }

    fetchAuthors()
  }, [])
  return (
    <PageContainer title='Cập nhật bài blog'>
      <Card>
        <ProForm
          formRef={formRef}
          submitter={{ render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar> }}
          onFinish={handleSubmit}
        >
          <ProFormSelect
            name='author'
            label='Tác giả'
            placeholder='Chọn tác giả'
            rules={[{ required: true, message: 'Vui lòng chọn tác giả' }]}
            options={listAuthors?.map((author) => ({
              label: author.email,
              value: author.id
            }))}
          />
          <ProFormText
            name='title'
            label='Tiêu đề bài blog'
            placeholder='Nhập tiêu đề bài blog'
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài blog' }]}
          />

          <ProFormSelect
            name='categoryBlog'
            label='Danh mục blog'
            placeholder='Chọn danh mục blog'
            rules={[{ required: true, message: 'Vui lòng chọn danh mục blog' }]}
            options={[
              { label: 'Lập trình', value: 'PROGRAMMING' },
              { label: 'Thiết kế', value: 'DESIGN' },
              { label: 'Marketing', value: 'MARKETING' },
              { label: 'Kinh doanh', value: 'BUSINESS' },
              { label: 'Khoa học dữ liệu', value: 'DATA_SCIENCE' }
            ]}
          />

          <ProFormSelect
            name='isPublished'
            label='Trạng thái xuất bản'
            placeholder='Chọn trạng thái'
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái xuất bản' }]}
            options={[
              { label: 'Chờ duyệt', value: 'PENDING' },
              { label: 'Đã duyệt', value: 'APPROVED' },
              { label: 'Bị từ chối', value: 'REJECTED' }
            ]}
          />

          <ProFormItem name='content' label='Nội dung' rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}>
            <Editor
              apiKey={`${import.meta.env.VITE_API_KEY_TINYMCE}`}
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue={formRef.current?.getFieldValue('content') || ''}
              onEditorChange={(content) => {
                formRef.current?.setFieldsValue({ content: content })
              }}
              init={{
                height: 400,
                menubar: false,
                plugins: 'lists link image table code help',
                toolbar:
                  'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help'
              }}
            />
          </ProFormItem>

          <ProFormUploadButton
            name='thumbnail'
            label='Tải lên ảnh thumbnail'
            title='Chọn ảnh'
            icon={<UploadOutlined />}
            max={1}
            fileList={thumbnailFileList}
            fieldProps={{
              accept: 'image/*',
              fileList: thumbnailFileList,
              customRequest: handleCustomRequest,
              onChange: handleUploadChange,
              beforeUpload: () => true,
              onRemove: () => setThumbnailPreview(null)
            }}
          />

          {thumbnailPreview && (
            <div style={{ marginTop: '20px' }}>
              <p>
                <strong>Preview Thumbnail:</strong>
              </p>
              <img src={thumbnailPreview} alt='Thumbnail Preview' style={{ maxWidth: '300px' }} />
            </div>
          )}

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Cập nhật blog
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutUpdateBlog
