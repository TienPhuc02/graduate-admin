import { DrawerForm, ProForm, ProFormDatePicker, ProFormText } from '@ant-design/pro-components'
import { Form, Image } from 'antd'
import { useEffect } from 'react'

const DetailUser = ({ selectedUser, onClose }: { selectedUser: IAdminUser | null; onClose: () => void }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue(selectedUser)
    }
  }, [selectedUser, form])

  return (
    <DrawerForm
      title='Chi tiết người dùng'
      open={!!selectedUser}
      onOpenChange={(visible) => {
        if (!visible) {
          onClose()
        }
      }}
      form={form}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true
      }}
      submitter={false}
      width={500}
    >
      <ProForm.Group>
        <ProFormText disabled name='firstName' label='Tên Họ' />
        <ProFormText disabled name='lastName' label='Tên' />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText disabled name='email' label='Email' />
        <ProFormText disabled name='phoneNumber' label='Số điện thoại' />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText disabled name='address' label='Địa chỉ' />
        <ProFormText disabled name='role' label='Vai trò' />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText disabled name='isVerified' label='Xác minh' />
        <ProFormText disabled name='isDeleted' label='Đã xóa' />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker disabled name='createdAt' label='Ngày tạo' />
        <ProFormDatePicker disabled name='updatedAt' label='Ngày cập nhật' />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker disabled name='deletedAt' label='Ngày xóa' />
      </ProForm.Group>
      <ProForm.Group>
        <Image aria-label='Ảnh đại diện' width={200} src={selectedUser?.profilePicture} />
      </ProForm.Group>
    </DrawerForm>
  )
}
export default DetailUser
