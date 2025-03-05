import { updateCommentAPI, getCommentsAPI } from '@/services/api.services'
import { EErrorMessage } from '@/types/enum'
import { Editor as TinyMCEEditor } from 'tinymce'
import { FooterToolbar, PageContainer, ProForm, ProFormSelect, ProFormItem } from '@ant-design/pro-components'
import { Editor } from '@tinymce/tinymce-react'
import { Button, Card, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LayoutUpdateComment = ({ idComment }: { idComment: string }) => {
  const navigate = useNavigate()
  const editorRef = useRef<any>(null)
  const formRef = useRef<any>(null)
  const [loading, setLoading] = useState(false)
  const [initialData, setInitialData] = useState<IAdminComment | null>(null)

  const handleSubmit = async (values: IUpdateCommentDTO) => {
    try {
      setLoading(true)
      const contentHtml = editorRef.current ? editorRef.current.getContent() : values.text
      const data = {
        ...values,
        text: contentHtml
      }

      const res = await updateCommentAPI(idComment!, data)

      if (res && res.data) {
        message.success(res.message || 'Cập nhật bình luận thành công')
        navigate('/comment')
      }
    } catch (error) {
      message.error(EErrorMessage.ERROR_VALIDATE)
    } finally {
      setLoading(false)
    }
  }

  const handleFooterClick = async () => {
    try {
      const values = await formRef.current?.validateFields()
      handleSubmit(values)
    } catch {
      message.error(EErrorMessage.ERROR_VALIDATE)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsRes = await getCommentsAPI()

        if (commentsRes.data) {
          const commentToEdit = commentsRes.data.results.find((c: IAdminComment) => c.id === idComment)
          if (commentToEdit) {
            setInitialData(commentToEdit)
            formRef.current?.setFieldsValue({
              text: commentToEdit.text,
              status: commentToEdit.status
            })
          }
        }
      } catch (error) {
        message.error('Không thể tải dữ liệu ban đầu')
      }
    }

    fetchData()
  }, [idComment])

  return (
    <PageContainer title='Cập nhật bình luận'>
      <Card>
        <ProForm
          formRef={formRef}
          submitter={{ render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar> }}
          onFinish={handleSubmit}
          initialValues={initialData || {}}
        >
          <ProFormItem
            name='text'
            label='Nội dung bình luận'
            rules={[{ required: true, message: 'Vui lòng nhập nội dung bình luận' }]}
          >
            <Editor
              apiKey={`${import.meta.env.VITE_API_KEY_TINYMCE}`}
              onInit={(_evt: any, editor: TinyMCEEditor) => (editorRef.current = editor)}
              initialValue={formRef.current?.getFieldValue('text') || ''}
              onEditorChange={(content) => {
                formRef.current?.setFieldsValue({ text: content })
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

          <ProFormSelect
            name='status'
            label='Trạng thái'
            placeholder='Chọn trạng thái'
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
            options={[
              { label: 'Chờ duyệt', value: 'pending' },
              { label: 'Đã duyệt', value: 'approved' },
              { label: 'Bị từ chối', value: 'rejected' }
            ]}
          />

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Cập nhật bình luận
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutUpdateComment
