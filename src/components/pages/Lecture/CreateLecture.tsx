import { createLectureAPI, getCoursesAPI } from '@/services/api.services'
import { EErrorMessage } from '@/types/enum'
import { PlusOutlined } from '@ant-design/icons'
import { FooterToolbar, PageContainer, ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components'
import { Button, Card, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LayoutCreateLecture = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [listCourses, setListCourses] = useState<any[]>([])
  const formRef = useRef<any>(null)

  const handleFooterClick = async () => {
    try {
      const values = await formRef.current?.validateFields()
      handleSubmit(values)
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    }
  }

  const handleSubmit = async (values: { title: string; courseId: string }) => {
    console.log('🚀 ~ handleSubmit ~ values:', values)
    try {
      setLoading(true)
      const res = await createLectureAPI(values)
      if (res && res.data) {
        formRef.current?.resetFields()
        message.success(res.message)
        navigate('/lecture')
      }
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getCoursesAPI()
      if (res && res.data) {
        setListCourses(res.data.results)
      }
    }
    fetchCourses()
  }, [])

  return (
    <PageContainer title='Tạo bài giảng'>
      <Card>
        <ProForm
          formRef={formRef}
          submitter={{ render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar> }}
          onFinish={handleSubmit}
        >
          <ProFormSelect
            name='courseId'
            label='Khóa học'
            placeholder='Chọn khóa học'
            rules={[{ required: true, message: 'Vui lòng chọn khóa học' }]}
            options={listCourses.map((course) => ({
              label: course.title,
              value: course.id
            }))}
          />
          <ProFormText
            name='title'
            label='Tiêu đề bài giảng'
            placeholder='Nhập tiêu đề bài giảng'
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài giảng' }]}
          />
          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading} icon={<PlusOutlined />}>
              Tạo bài giảng
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutCreateLecture
