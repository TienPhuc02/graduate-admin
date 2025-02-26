import { createBlogAPI, getUsersAPI } from '@/services/api.services'
import { EBlogStatus, EErrorMessage } from '@/types/enum'
import { UploadOutlined } from '@ant-design/icons'
import { FooterToolbar, PageContainer, ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components'
import { Button, Card, Upload, Modal, message, Image } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LayoutCreateBlog = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<any[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [listAuthors, setListAuthors] = useState<IAdminUser[] | null>(null)
  const formRef = useRef<any>(null)

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList)
  }

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const getBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })

  const handleFooterClick = async () => {
    try {
      const values = await formRef.current?.validateFields()
      handleSubmit(values)
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    }
  }

  const handleSubmit = async (values: ICreateBlogDTO) => {
    try {
      let thumbnailFile = null
      if (fileList.length > 0) {
        thumbnailFile = fileList[0].originFileObj
      }
      setLoading(true)
      const res = await createBlogAPI(thumbnailFile, values)
      if (res && res.data) {
        formRef.current?.resetFields()
        setFileList([])
        message.success(res.message)
        navigate('/blog')
      }
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    } finally {
      setLoading(false)
    }
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
    <PageContainer title='Tạo bài viết'>
      <Card>
        <ProForm
          formRef={formRef}
          submitter={{ render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar> }}
          onFinish={handleSubmit}
        >
          <ProFormSelect
            name='authorId'
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
            label='Tiêu đề bài viết'
            placeholder='Nhập tiêu đề bài viết'
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài viết' }]}
          />

          <ProFormText
            name='content'
            label='Nội dung bài viết'
            placeholder='Nhập nội dung bài viết'
            rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết' }]}
            fieldProps={{
              //   rows: 5,
              style: { resize: 'vertical' }
            }}
          />

          <ProFormText
            name='categoryBlog'
            label='Danh mục'
            placeholder='Nhập danh mục bài viết'
            rules={[{ required: true, message: 'Vui lòng nhập danh mục bài viết' }]}
          />
          <ProFormSelect
            name='isPublished'
            label='Trạng thái'
            placeholder='Chọn trạng thái'
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
            valueEnum={{
              PENDING: { text: EBlogStatus.PENDING },
              APPROVED: { text: EBlogStatus.APPROVED },
              REJECTED: { text: EBlogStatus.REJECTED }
            }}
          />
          <Upload
            name='thumbnail'
            maxCount={1}
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleUploadChange}
            onPreview={handlePreview}
            showUploadList={{ showPreviewIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh đại diện</Button>
          </Upload>

          <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
            <Image alt='Thumbnail Preview' style={{ width: '100%' }} src={previewImage || ''} />
          </Modal>

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Tạo bài viết
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutCreateBlog
