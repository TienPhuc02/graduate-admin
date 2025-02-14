import { UploadOutlined } from '@ant-design/icons'
import { FooterToolbar, PageContainer, ProForm, ProFormText } from '@ant-design/pro-components'
import { Button, Card, message, Upload, Modal } from 'antd'
import { useRef, useState } from 'react'

const LayoutCreateUser = () => {
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
      console.log('Dữ liệu form từ FooterToolbar:', values)
      handleSubmit(values)
    } catch (error) {
      console.error('Lỗi validate:', error)
    }
  }

  const handleSubmit = async (values: any) => {
    console.log('🚀 ~ handleSubmit ~ values:', values)
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
          <ProFormText.Password
            name='password'
            label='Mật khẩu'
            placeholder='Nhập mật khẩu'
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { min: 8, message: 'Mật khẩu ít nhất 8 ký tự' }
            ]}
          />

          <Upload
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
