import { createLessonAPI, getLectureAPI, getLessonByIdAPI } from '@/services/api.services'
import { EErrorMessage, EContentLessonType } from '@/types/enum'
import { UploadOutlined } from '@ant-design/icons'
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormItem,
  ProFormUploadButton
} from '@ant-design/pro-components'
import { Editor } from '@tinymce/tinymce-react'
import { Button, Card, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageNotFound from '@/pages/NotFound'

const LayoutUpdateLesson = ({ idLesson }: { idLesson: string }) => {
  const navigate = useNavigate()
  const editorRef = useRef<any>(null)
  const [loading, setLoading] = useState(false)
  const [videoFileList, setVideoFileList] = useState<any[]>([])
  const [pdfFileList, setPdfFileList] = useState<any[]>([])
  const [error, setError] = useState(false)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [pdfPreview, setPdfPreview] = useState<string | null>(null)
  const [listLecture, setListLecture] = useState<IAdminLectures[] | null>(null)
  const formRef = useRef<any>(null)

  const handleUploadChange = ({ fileList }: any, type: 'video' | 'pdf') => {
    if (type === 'video') {
      setVideoFileList(fileList)
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj
        setVideoPreview(URL.createObjectURL(file))
      }
    } else {
      setPdfFileList(fileList)
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj
        setPdfPreview(URL.createObjectURL(file))
      }
    }
  }

  const handleCustomRequest = ({ file, onSuccess }: any, type: 'video' | 'pdf') => {
    const fileURL = URL.createObjectURL(file)
    if (type === 'video') {
      setVideoPreview(fileURL)
    } else {
      setPdfPreview(fileURL)
    }

    setTimeout(() => {
      onSuccess?.('ok')
      message.success(`Upload ${type} thành công!`)
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

  const handleSubmit = async (values: ICreateLessonDTO) => {
    try {
      setLoading(true)

      const videoFile = videoFileList[0]?.originFileObj || null
      const pdfFile = pdfFileList[0]?.originFileObj || null

      if (!videoFile && !pdfFile) {
        message.error('Vui lòng tải lên ít nhất một file (video hoặc PDF)')
        return
      }
      const contentHtml = editorRef.current ? editorRef.current.getContent() : ''
      const res = await createLessonAPI(videoFile, pdfFile, {
        ...values,
        contentText: contentHtml
      })

      if (res && res.data) {
        formRef.current?.resetFields()
        setVideoFileList([])
        setPdfFileList([])
        setVideoPreview(null)
        setPdfPreview(null)
        message.success(res.message)
        navigate('/lesson')
      }
    } catch (error) {
      message.error(EErrorMessage.ERROR_VALIDATE)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchLecture = async () => {
      const res = await getLectureAPI()
      if (res && res.data) {
        setListLecture(res.data.results)
      }
    }

    fetchLecture()
  }, [])
  useEffect(() => {
    if (!idLesson) return

    const fetchLessonData = async () => {
      try {
        const res = await getLessonByIdAPI(idLesson)
        console.log('🚀 ~ fetchLectureData ~ res:', res)
        if (res && res.data) {
          const lessonData = res.data
          formRef.current?.setFieldsValue({
            title: lessonData.title,
            contentType: lessonData.contentType,
            lectureCourseId: lessonData.lectureCourse?.id
          })
          if (editorRef.current) {
            editorRef.current.setContent(lessonData.contentText || '')
          }
          setVideoPreview(() => lessonData.contentUrl as string)
          setPdfPreview(() => lessonData.pdfUrl as string)
          console.log('Video URL:', lessonData.contentUrl)
          console.log('PDF URL:', lessonData.pdfUrl)
        } else {
          setError(true)
        }
      } catch {
        message.error('Lỗi khi lấy dữ liệu bài học !!')
      }
    }

    fetchLessonData()
  }, [idLesson])
  if (error) {
    return <PageNotFound />
  }
  return (
    <PageContainer title='Tạo bài học'>
      <Card>
        <ProForm
          formRef={formRef}
          submitter={{ render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar> }}
          onFinish={handleSubmit}
        >
          <ProFormSelect
            name='lectureCourseId'
            label='Bài giảng'
            placeholder='Chọn bài giảng'
            rules={[{ required: true, message: 'Vui lòng chọn bài giảng' }]}
            options={listLecture?.map((lecture) => ({
              label: lecture.title,
              value: lecture.id
            }))}
          />

          <ProFormText
            name='title'
            label='Tiêu đề bài học'
            placeholder='Nhập tiêu đề bài học'
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài học' }]}
          />
          <ProFormSelect
            name='contentType'
            label='Các định dạng bài học'
            placeholder='Chọn các định dạng bài học'
            mode='multiple'
            options={[
              { label: EContentLessonType.VIDEO, value: 'VIDEO' },
              { label: EContentLessonType.TEXT, value: 'TEXT' },
              { label: EContentLessonType.PDF, value: 'PDF' }
            ]}
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một định dạng bài học' }]}
          />

          <ProFormItem
            name='contentText'
            label='Nội dung'
            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
          >
            <Editor
              apiKey={`${import.meta.env.VITE_API_KEY_TINYMCE}`}
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue={formRef.current?.getFieldValue('contentText') || ''}
              onEditorChange={(content) => {
                formRef.current?.setFieldsValue({ contentText: content })
              }}
              init={{
                height: 300,
                menubar: false,
                plugins: 'lists link image table code help',
                toolbar:
                  'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help'
              }}
            />
          </ProFormItem>

          <ProFormUploadButton
            name='contentUrl'
            label='Tải lên video bài giảng'
            title='Chọn video'
            icon={<UploadOutlined />}
            max={1}
            fileList={videoFileList}
            fieldProps={{
              accept: 'video/*',
              fileList: videoFileList,
              customRequest: (options) => handleCustomRequest(options, 'video'),
              onChange: (info) => handleUploadChange(info, 'video'),
              beforeUpload: () => {
                return true
              },
              onRemove: () => setVideoPreview(null)
            }}
          />

          {videoPreview && (
            <div style={{ marginTop: '20px' }}>
              <p>
                <strong>Preview Video:</strong>
              </p>
              <video controls width='300'>
                <source src={videoPreview} type='video/mp4' />
                Trình duyệt của bạn không hỗ trợ video.
              </video>
            </div>
          )}

          <ProFormUploadButton
            name='contentPdf'
            label='Tải lên PDF'
            title='Chọn PDF'
            icon={<UploadOutlined />}
            max={1}
            fileList={pdfFileList}
            fieldProps={{
              accept: 'application/pdf',
              fileList: pdfFileList,
              customRequest: (options) => handleCustomRequest(options, 'pdf'),
              onChange: (info) => handleUploadChange(info, 'pdf'),
              beforeUpload: () => {
                return true
              },
              onRemove: () => setPdfPreview(null)
            }}
          />

          {pdfPreview && (
            <div style={{ marginTop: '20px' }}>
              <p>
                <strong>Preview PDF:</strong>
              </p>
              <iframe src={pdfPreview} width='100%' height='500px'></iframe>
            </div>
          )}

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Tạo khóa học
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutUpdateLesson
