import Github from '@/components/commons/icons/IconGithub'
import Google from '@/components/commons/icons/IconGoogle'
import IconLogo from '@/components/commons/icons/IconLogo'
import { useAppDispatch } from '@/hooks/hookStore'
import { loginAPI } from '@/services/api.services'
import { setUser } from '@/stores/slice/authSlice'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProConfigProvider, ProFormCheckbox, ProFormText } from '@ant-design/pro-components'
import { Space, message, theme } from 'antd'
import { useNavigate } from 'react-router-dom'

const PageLogin = () => {
  const { token } = theme.useToken()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          onFinish={async (values) => {
            try {
              const res = await loginAPI(values.email, values.password)

              if (res && res.data) {
                message.success('Đăng nhập thành công!')
                navigate('/')
                dispatch(setUser(res.data.user))
                localStorage.setItem('access_token', res.data?.accessToken)
              } else {
                message.error(res.message || 'Đăng nhập thất bại, vui lòng thử lại!')
              }
            } catch (error) {
              message.error(`Có lỗi xảy ra, vui lòng thử lại! ${error}`)
            }
          }}
          logo={
            <>
              <IconLogo />
            </>
          }
          title='Edugo'
          subTitle='Nền tảng học tập trức tuyến lớn nhất thế giới'
          actions={
            <Space>
              Các phương thức đăng nhập khác
              <Google width={20} height={20} style={{ cursor: 'pointer' }} />
              <Github width={20} height={20} style={{ cursor: 'pointer' }} />
            </Space>
          }
        >
          <>
            <ProFormText
              name='email'
              required
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />
              }}
              placeholder={'abc@gmail.com'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên đăng nhập!'
                },
                {
                  type: 'email',
                  message: 'Email không hợp lệ!'
                }
              ]}
            />
            <ProFormText.Password
              name='password'
              required
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
                strengthText: 'Mật khẩu phải chứa số, chữ cái và ký tự đặc biệt, tối thiểu 8 ký tự.',
                statusRender: (value) => {
                  const getStatus = () => {
                    if (value && value.length > 12) {
                      return 'ok'
                    }
                    if (value && value.length > 6) {
                      return 'pass'
                    }
                    return 'poor'
                  }
                  const status = getStatus()
                  if (status === 'pass') {
                    return <div style={{ color: token.colorWarning }}>Mức độ: Trung bình</div>
                  }
                  if (status === 'ok') {
                    return <div style={{ color: token.colorSuccess }}>Mức độ: Mạnh</div>
                  }
                  return <div style={{ color: token.colorError }}>Mức độ: Yếu</div>
                }
              }}
              placeholder={'Mật khẩu'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!'
                }
              ]}
            />
          </>
          <div
            style={{
              marginBlockEnd: 24
            }}
          >
            <ProFormCheckbox noStyle name='autoLogin'>
              Đăng nhập tự động
            </ProFormCheckbox>
            <a
              style={{
                float: 'right'
              }}
            >
              Quên mật khẩu
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  )
}
export default PageLogin
