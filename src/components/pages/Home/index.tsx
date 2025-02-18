import { useContext, useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import { Breadcrumb, Button, Layout, Menu, Switch, theme } from 'antd'
import ThemeContext from '../../../providers/ThemeContext'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { breadcrumbMap, items, keyMenuMap } from '@/constants'

const { Header, Content, Footer, Sider } = Layout

const LayoutAdminHome = () => {
  const location = useLocation()
  const pathName = location.pathname
  const [collapsed, setCollapsed] = useState(false)
  const [keyMenu, setKeyMenu] = useState<string>('')
  const themeContext = useContext(ThemeContext)
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgLayout }
  } = theme.useToken()
  useEffect(() => {
    setKeyMenu(keyMenuMap[pathName])
  }, [pathName])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme={themeContext?.isDarkMode ? 'dark' : 'light'}
        style={{ background: colorBgLayout }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className='demo-logo-vertical' style={{ height: '60px' }} />
        <Menu
          style={{ background: colorBgLayout }}
          theme={themeContext?.isDarkMode ? 'dark' : 'light'}
          selectedKeys={[keyMenu]}
          mode='inline'
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Button
            type='default'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 40,
              height: 40
            }}
          />
          <Switch
            checked={themeContext?.isDarkMode}
            onClick={themeContext?.toggleTheme}
            checkedChildren='Dark'
            unCheckedChildren='Light'
          />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {pathName
              .replace(/^\/+/, '')
              .split('/')
              .reduce((acc: { path: string; label: string }[], segment, index, arr) => {
                if (!segment) return acc

                const path = `/${arr.slice(0, index + 1).join('/')}`
                const label = breadcrumbMap[path] || segment

                acc.push({ path, label })
                return acc
              }, [])
              .map(({ path, label }, index, arr) => {
                const isLast = index === arr.length - 1

                return <Breadcrumb.Item key={path}>{isLast ? label : <Link to={path}>{label}</Link>}</Breadcrumb.Item>
              })}
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default LayoutAdminHome
