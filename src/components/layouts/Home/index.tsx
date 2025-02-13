import React, { useContext, useEffect, useState } from 'react'
import {
  DashboardOutlined,
  // DesktopOutlined,
  // FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonFilled,
  SunFilled,
  // TeamOutlined,
  UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd'
import ThemeContext from '../../../providers/ThemeContext'
import { Link, Outlet, useLocation } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const LayoutAdminHome = () => {
  const location = useLocation()
  const pathName = location.pathname
  const [collapsed, setCollapsed] = useState(false)
  const [breadcrumb, setBreadcrumb] = useState(pathName)
  const [keyMenu, setKeyMenu] = useState<string>('')
  const themeContext = useContext(ThemeContext)
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgLayout }
  } = theme.useToken()
  const items: MenuItem[] = [
    getItem(<Link to='/'>Trang chủ</Link>, '1', <DashboardOutlined />),
    getItem(<Link to='/user'>Người dùng</Link>, '2', <UserOutlined />)
  ]
  useEffect(() => {
    const breadcrumbMap: Record<string, string> = {
      '/': 'Trang chủ',
      '/user': 'Người dùng'
    }
    const keyMenuMap: Record<string, string> = {
      '/': '1',
      '/user': '2'
    }
    setBreadcrumb(breadcrumbMap[pathName] || 'Trang Chủ')
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
          // defaultSelectedKeys={[keyMenu]}
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
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 50,
              height: 50
            }}
          />
          <Button
            type='text'
            icon={themeContext?.isDarkMode ? <SunFilled /> : <MoonFilled />}
            onClick={themeContext?.toggleTheme}
            style={{
              fontSize: '16px',
              width: 50,
              height: 50
            }}
          />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
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
