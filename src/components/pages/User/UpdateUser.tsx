import PageNotFound from '@/pages/NotFound'
import { getUsersByIdAPI, updateUserAPI } from '@/services/api.services'
import { ETypeUser } from '@/types/enum'
import { UploadOutlined } from '@ant-design/icons'
import { FooterToolbar, PageContainer, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { Button, Card, Upload, Modal, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
type TLayoutUserProps = {
  idUser: string
}
const LayoutUpdateUser = ({ idUser }: TLayoutUserProps) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<any[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [error, setError] = useState(false)
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
      message.error('Lỗi validate:')
    }
  }

  const handleSubmit = async (values: IUpdateUserDTO) => {
    const { email, ...filteredValues } = values

    try {
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj
        setLoading(true)
        const res = await updateUserAPI(idUser, file, filteredValues as IUpdateUserDTO)
        if (res && res.data) {
          formRef.current?.resetFields()
          setFileList([])
          message.success(res.message)
          navigate('/user')
        } else {
          message.error(res.message)
        }
      } else {
        message.error('Hãy cập nhật ảnh đại diện. !!')
      }
    } catch {
      message.error('❌ Lỗi khi gửi dữ liệu:')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!idUser) return

    const fetchUserData = async () => {
      try {
        const res = await getUsersByIdAPI(idUser)
        if (res && res.data) {
          const userData = res?.data

          setTimeout(() => {
            formRef.current?.setFieldsValue({
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              phoneNumber: userData.phoneNumber,
              address: userData.address,
              role: userData.role
            })
          }, 100)

          if (userData.profilePicture) {
            setFileList([
              {
                uid: '-1',
                name: 'avatar.png',
                status: 'done',
                url: userData.profilePicture
              }
            ])
          }
        } else {
          setError(true)
        }
      } catch {
        message.error('Lỗi khi lấy dữ liệu user !!')
      }
    }

    fetchUserData()
  }, [idUser])
  if (error) {
    return <PageNotFound />
  }
  return (
    <PageContainer title='Cập nhật người dùng'>
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
          <ProFormText name='email' label='Email' placeholder='Nhập email' disabled />
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
            <img alt='Avatar Preview' style={{ width: '100%' }} src={previewImage || fileList[0]?.url} />
          </Modal>

          <FooterToolbar>
            <Button type='primary' onClick={handleFooterClick} loading={loading}>
              Cập nhật tài khoản
            </Button>
          </FooterToolbar>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default LayoutUpdateUser
