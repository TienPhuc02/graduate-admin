import { createUserAPI } from '@/services/api.services'
import { ETypeUser } from '@/types/enum'
import { UploadOutlined } from '@ant-design/icons'
import { FooterToolbar, PageContainer, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { Button, Card, Upload, Modal, message } from 'antd'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LayoutCreateUser = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<any[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
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
      message.error('Lỗi validate !!')
    }
  }

  const handleSubmit = async (values: ICreateUserDTO) => {
    try {
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj
        setLoading(true)
        const res = await createUserAPI(file, values as ICreateUserDTO)
        if (res && res.data) {
          formRef.current?.resetFields()
          setFileList([])
          message.success(res.message)
          navigate('/user')
        }
      }
    } catch {
      message.error('❌ Lỗi khi gửi dữ liệu !!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer title='Tạo người dùng'>
      <Card>
        <ProForm
          formRef={formRef}
          submitter={{ render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar> }}
          onFinish={handleSubmit}
        >
          <ProFormText
            name='firstName'
            label='Họ và tên đệm'
            placeholder='Nhập họ và tên đệm'
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên đệm' }]}
          />
          <ProFormText
            name='lastName'
            label='Tên người dùng'
            placeholder='Nhập tên'
            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
          />
          <ProFormText
            name='email'
            label='Email'
            placeholder='Nhập email'
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          />
          <ProFormText
            name='phoneNumber'
            label='Số điện thoại'
            placeholder='Nhập số điện thoại'
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          />
          <ProFormText
            name='address'
            label='Địa chỉ'
            placeholder='Nhập địa chỉ'
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          />
          <ProFormSelect
            name='role'
            label='Vai trò'
            valueEnum={{
              student: ETypeUser.STUDENT,
              admin: ETypeUser.ADMIN,
              instructor: ETypeUser.INSTRUCTOR
            }}
            placeholder='Nhập vai trò'
            rules={[{ required: true, message: 'Vui lòng nhập vai trò!' }]}
          />

          <Upload
            name='profilePicture'
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
            <img alt='Avatar Preview' style={{ width: '100%' }} src={previewImage || ''} />
          </Modal>

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Tạo tài khoản
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutCreateUser
