import PageNotFound from '@/pages/NotFound'
import { getCourseByIdAPI, getUsersAPI, updateCourseAPI } from '@/services/api.services'
import { ECourseCategory, EErrorMessage, ECourseLevel } from '@/types/enum'
import { fetchAssetsAsFile } from '@/utils'
import { UploadOutlined, PlusOutlined } from '@ant-design/icons'
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormList
} from '@ant-design/pro-components'
import { Button, Card, Upload, Modal, message, Image } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
type TLayoutCourseProps = {
  idCourse: string
}
const LayoutUpdateCourse = ({ idCourse }: TLayoutCourseProps) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<any[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [listInstructor, setListInstructor] = useState<IAdminUser[] | null>(null)
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
  const handleSubmit = async (values: ICreateCourseDTO) => {
    try {
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj
        setLoading(true)
        const res = await updateCourseAPI(idCourse, file, values)
        if (res && res.data) {
          formRef.current?.resetFields()
          setFileList([])
          message.success(res.message)
          navigate('/course')
        } else {
          message.error(res.message)
        }
      }
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const fetchInstructor = async () => {
      const res = await getUsersAPI()
      if (res && res.data) {
        setListInstructor(res.data.results)
      }
    }

    fetchInstructor()
  }, [])
  useEffect(() => {
    if (!idCourse) return

    const fetchCourseData = async () => {
      try {
        const res = await getCourseByIdAPI(idCourse)
        if (res && res.data) {
          const courseData = res.data
          formRef.current?.setFieldsValue({
            instructor: courseData.instructor?.id,
            title: courseData.title,
            description: courseData.description,
            category: courseData.category,
            level: courseData.level,
            price: courseData.price,
            requirements: courseData.requirements?.map((req) => ({ requirement: req })),
            benefits: courseData.benefits?.map((ben) => ({ benefit: ben })),
            qna: courseData.qna?.map((q) => ({ question: q.question, answer: q.answer }))
          })

          if (courseData.thumbnail) {
            fetchAssetsAsFile(courseData.thumbnail.replace(/^http:\/\//i, 'https://')).then((file) => {
              setFileList([
                {
                  uid: '-1',
                  name: file.name,
                  status: 'done',
                  originFileObj: file
                }
              ])
            })
          }
        } else {
          setError(true)
        }
      } catch {
        message.error('Lỗi khi lấy dữ liệu khóa học !!')
      }
    }

    fetchCourseData()
  }, [idCourse])
  if (error) {
    return <PageNotFound />
  }
  return (
    <PageContainer title='Cập nhật khóa học'>
      <Card>
        <ProForm
          formRef={formRef}
          submitter={{ render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar> }}
          onFinish={handleSubmit}
        >
          <ProFormSelect
            name='instructor'
            label='Giảng viên'
            placeholder='Chọn giảng viên'
            rules={[{ required: true, message: 'Vui lòng chọn giảng viên' }]}
            options={listInstructor?.map((instructor) => ({
              label: instructor.email,
              value: instructor.id
            }))}
          />

          <ProFormText
            name='title'
            label='Tiêu đề khóa học'
            placeholder='Nhập tiêu đề khóa học'
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề khóa học' }]}
          />
          <ProFormText
            name='description'
            label='Mô tả khóa học'
            placeholder='Nhập mô tả khóa học'
            rules={[{ required: true, message: 'Vui lòng nhập mô tả khóa học' }]}
          />
          <ProFormSelect
            name='category'
            label='Danh mục'
            valueEnum={{
              PROGRAMMING: { text: ECourseCategory.PROGRAMMING },
              DESIGN: { text: ECourseCategory.DESIGN },
              BUSINESS: { text: ECourseCategory.BUSINESS },
              MARKETING: { text: ECourseCategory.MARKETING },
              DATA_SCIENCE: { text: ECourseCategory.DATA_SCIENCE }
            }}
            placeholder='Chọn danh mục'
            rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
          />
          <ProFormSelect
            name='level'
            label='Cấp độ'
            valueEnum={{
              BEGINNER: { text: ECourseLevel.BEGINNER },
              INTERMEDIATE: { text: ECourseLevel.INTERMEDIATE },
              ADVANCED: { text: ECourseLevel.ADVANCED }
            }}
            placeholder='Chọn cấp độ'
            rules={[{ required: true, message: 'Vui lòng chọn cấp độ' }]}
          />
          <ProFormText
            name='price'
            label='Giá'
            placeholder='Nhập giá khóa học'
            rules={[{ required: true, message: 'Vui lòng nhập giá khóa học' }]}
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
            {previewImage && <Image alt='Avatar Preview' style={{ width: '10%' }} src={previewImage || ''} />}
          </Modal>
          <ProFormList
            style={{ marginTop: 20 }}
            name='requirements'
            label='Yêu cầu'
            creatorButtonProps={{
              position: 'top',
              creatorButtonText: 'Thêm yêu cầu'
            }}
            actionRender={(field, action) => [
              <Button key='copy' type='link' onClick={() => action.add(field)} icon={<PlusOutlined />}>
                Sao chép
              </Button>,
              <Button key='delete' type='link' onClick={() => action.remove(field.name)} danger>
                Xóa
              </Button>
            ]}
          >
            <ProFormText
              name={['requirement']}
              placeholder='Nhập yêu cầu'
              rules={[{ required: true, message: 'Vui lòng nhập yêu cầu' }]}
            />
          </ProFormList>

          <ProFormList
            name='benefits'
            label='Lợi ích'
            creatorButtonProps={{
              position: 'top',
              creatorButtonText: 'Thêm lợi ích'
            }}
            actionRender={(field, action) => [
              <Button key='copy' type='link' onClick={() => action.add(field)} icon={<PlusOutlined />}>
                Sao chép
              </Button>,
              <Button key='delete' type='link' onClick={() => action.remove(field.name)} danger>
                Xóa
              </Button>
            ]}
          >
            <ProFormText
              name={['benefit']}
              placeholder='Nhập lợi ích'
              rules={[{ required: true, message: 'Vui lòng nhập lợi ích' }]}
            />
          </ProFormList>
          <ProFormList
            name='qna'
            label='Câu hỏi thường gặp'
            creatorButtonProps={{
              position: 'top',
              creatorButtonText: 'Thêm câu hỏi'
            }}
            actionRender={(field, action) => [
              <Button key='copy' type='link' onClick={() => action.add(field)} icon={<PlusOutlined />}>
                Sao chép
              </Button>,
              <Button key='delete' type='link' onClick={() => action.remove(field.name)} danger>
                Xóa
              </Button>
            ]}
          >
            <ProFormText
              name='question'
              label='Câu hỏi'
              placeholder='Nhập câu hỏi'
              rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}
            />
            <ProFormText
              name='answer'
              label='Câu trả lời'
              placeholder='Nhập câu trả lời'
              rules={[{ required: true, message: 'Vui lòng nhập câu trả lời' }]}
            />
          </ProFormList>

          <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
            <img alt='Thumbnail Preview' style={{ width: '100%' }} src={previewImage || ''} />
          </Modal>

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Cập nhật khóa học
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutUpdateCourse
