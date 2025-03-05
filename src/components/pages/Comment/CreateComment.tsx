import { createCommentAPI, getCoursesAPI, getBlogsAPI, getUsersAPI, getCommentsAPI } from '@/services/api.services'
import { EErrorMessage } from '@/types/enum'
import { Editor as TinyMCEEditor } from 'tinymce'
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  // ProFormText,
  ProFormSelect,
  ProFormItem
} from '@ant-design/pro-components'
import { Editor } from '@tinymce/tinymce-react'
import { Button, Card, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LayoutCreateComment = () => {
  const navigate = useNavigate()
  const editorRef = useRef<any>(null)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<IAdminUser[] | null>(null)
  const [courses, setCourses] = useState<IAdminCourse[] | null>(null)
  const [blogs, setBlogs] = useState<IAdminBlog[] | null>(null)
  const [comments, setComments] = useState<IAdminComment[] | null>(null)
  const formRef = useRef<any>(null)

  const handleFooterClick = async () => {
    try {
      const values = await formRef.current?.validateFields()
      handleSubmit(values)
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    }
  }

  const handleSubmit = async (values: ICreateCommentDTO) => {
    try {
      setLoading(true)

      const contentHtml = editorRef.current ? editorRef.current.getContent() : values.text
      const payload = {
        ...values,
        text: contentHtml
      }

      const res = await createCommentAPI(payload)

      if (res && res.data) {
        formRef.current?.resetFields()
        message.success(res.message)
        navigate('/comment')
      }
    } catch (error) {
      message.error(EErrorMessage.ERROR_VALIDATE)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, coursesRes, blogsRes, commentsRes] = await Promise.all([
          getUsersAPI(),
          getCoursesAPI(''),
          getBlogsAPI(''),
          getCommentsAPI('')
        ])

        if (usersRes.data) setUsers(usersRes.data.results)
        if (coursesRes.data) setCourses(coursesRes.data.results)
        if (blogsRes.data) setBlogs(blogsRes.data.results)
        if (commentsRes.data) setComments(commentsRes.data.results)
      } catch (error) {
        message.error('Không thể tải dữ liệu ban đầu')
      }
    }

    fetchData()
  }, [])

  return (
    <PageContainer title='Tạo bình luận'>
      <Card>
        <ProForm
          formRef={formRef}
          submitter={{ render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar> }}
          onFinish={handleSubmit}
        >
          <ProFormSelect
            name='userId'
            label='Người dùng'
            placeholder='Chọn người dùng'
            rules={[{ required: true, message: 'Vui lòng chọn người dùng' }]}
            options={users?.map((user) => ({
              label: user.email,
              value: user.id
            }))}
          />

          <ProFormSelect
            name='courseId'
            label='Khóa học'
            placeholder='Chọn khóa học (nếu có)'
            options={courses?.map((course) => ({
              label: course.title,
              value: course.id
            }))}
            fieldProps={{
              onChange: (value) => {
                if (value) formRef.current?.setFieldsValue({ blogId: undefined })
              }
            }}
          />

          <ProFormSelect
            name='blogId'
            label='Blog'
            placeholder='Chọn blog (nếu có)'
            options={blogs?.map((blog) => ({
              label: blog.title,
              value: blog.id
            }))}
            fieldProps={{
              onChange: (value) => {
                if (value) formRef.current?.setFieldsValue({ courseId: undefined })
              }
            }}
          />

          <ProFormSelect
            name='parentCommentId'
            label='Bình luận cha'
            placeholder='Chọn bình luận cha (nếu có)'
            options={comments?.map((comment) => ({
              label: `${comment?.text.substring(0, 20)}... (ID: ${comment.id})`,
              value: comment.id
            }))}
          />

          <ProFormItem
            name='text'
            label='Nội dung bình luận'
            rules={[{ required: true, message: 'Vui lòng nhập nội dung bình luận' }]}
          >
            <Editor
              apiKey={`${import.meta.env.VITE_API_KEY_TINYMCE}`}
              onInit={(_evt: any, editor: TinyMCEEditor) => (editorRef.current = editor)}
              init={{
                height: 300,
                menubar: false,
                plugins: 'lists link image table code help',
                toolbar:
                  'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help'
              }}
            />
          </ProFormItem>

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Tạo bình luận
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutCreateComment
