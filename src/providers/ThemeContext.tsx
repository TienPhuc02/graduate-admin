import { createContext, useState, ReactNode } from 'react'
import { ConfigProvider, theme } from 'antd'

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          token: {
            // Các token màu sắc cơ bản
            colorBgBase: isDarkMode ? '#141414' : '#ffffff',
            colorTextBase: isDarkMode ? '#ffffff' : '#141414',
            colorPrimary: isDarkMode ? '#1677ff' : '#1890ff',
            colorBorder: isDarkMode ? '#303030' : '#d9d9d9',
            colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
            colorBgElevated: isDarkMode ? '#262626' : '#ffffff',
            colorBgLayout: isDarkMode ? '#000000' : '#f0f2f5',
            colorText: isDarkMode ? '#ffffff' : '#141414',
            colorTextSecondary: isDarkMode ? '#bfbfbf' : '#595959',
            colorTextTertiary: isDarkMode ? '#8c8c8c' : '#8c8c8c',
            colorTextQuaternary: isDarkMode ? '#595959' : '#bfbfbf',
            colorFill: isDarkMode ? '#303030' : '#f0f0f0',
            colorFillSecondary: isDarkMode ? '#262626' : '#fafafa',
            colorFillTertiary: isDarkMode ? '#1f1f1f' : '#f5f5f5',
            colorFillQuaternary: isDarkMode ? '#141414' : '#e8e8e8',
            colorBorderSecondary: isDarkMode ? '#434343' : '#e8e8e8'
          },
          components: {
            // Cấu hình màu sắc cho các component cụ thể
            Button: {
              colorPrimary: isDarkMode ? '#1677ff' : '#1890ff',
              colorPrimaryHover: isDarkMode ? '#4096ff' : '#40a9ff',
              colorPrimaryActive: isDarkMode ? '#0958d9' : '#096dd9',
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414'
            },
            Input: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorBorder: isDarkMode ? '#434343' : '#d9d9d9',
              colorTextPlaceholder: isDarkMode ? '#8c8c8c' : '#bfbfbf'
            },
            Menu: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorItemBg: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorItemBgSelected: isDarkMode ? '#1677ff' : '#1890ff',
              colorItemTextSelected: isDarkMode ? '#ffffff' : '#141414',
              colorItemTextHover: isDarkMode ? '#1677ff' : '#1890ff'
            },
            Table: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorBorderSecondary: isDarkMode ? '#434343' : '#e8e8e8',
              colorFillAlter: isDarkMode ? '#262626' : '#fafafa',
              colorFillContent: isDarkMode ? '#1f1f1f' : '#f5f5f5',
              colorFillSecondary: isDarkMode ? '#262626' : '#fafafa',
              colorFillTertiary: isDarkMode ? '#1f1f1f' : '#f5f5f5',
              headerBg: isDarkMode ? '#1f1f1f' : '#fafafa',
              headerColor: isDarkMode ? '#ffffff' : '#141414',
              headerSplitColor: isDarkMode ? '#434343' : '#e8e8e8',
              bodySortBg: isDarkMode ? '#262626' : '#fafafa',
              rowHoverBg: isDarkMode ? '#262626' : '#f5f5f5',
              rowSelectedBg: isDarkMode ? '#1677ff' : '#1890ff',
              rowSelectedHoverBg: isDarkMode ? '#4096ff' : '#40a9ff'
            },
            Card: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorBorderSecondary: isDarkMode ? '#434343' : '#e8e8e8'
            },
            Tabs: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorBorderSecondary: isDarkMode ? '#434343' : '#e8e8e8',
              colorPrimary: isDarkMode ? '#1677ff' : '#1890ff'
            },
            Select: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorBorder: isDarkMode ? '#434343' : '#d9d9d9',
              colorTextPlaceholder: isDarkMode ? '#8c8c8c' : '#bfbfbf',
              colorTextQuaternary: isDarkMode ? '#595959' : '#bfbfbf'
            },
            Checkbox: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorBorder: isDarkMode ? '#434343' : '#d9d9d9',
              colorText: isDarkMode ? '#ffffff' : '#141414'
            },
            Modal: {
              colorBgMask: isDarkMode ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.45)',
              colorBgElevated: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorIcon: isDarkMode ? '#ffffff' : '#141414'
            },
            Tooltip: {
              colorBgSpotlight: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414'
            },
            Pagination: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorPrimary: isDarkMode ? '#1677ff' : '#1890ff',
              colorPrimaryHover: isDarkMode ? '#4096ff' : '#40a9ff'
            },
            Tag: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorBorder: isDarkMode ? '#434343' : '#d9d9d9'
            },
            Badge: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorBorder: isDarkMode ? '#434343' : '#d9d9d9'
            },
            Drawer: {
              colorBgElevated: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414'
            },
            Dropdown: {
              colorBgElevated: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorBorder: isDarkMode ? '#434343' : '#d9d9d9'
            },
            Steps: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorPrimary: isDarkMode ? '#1677ff' : '#1890ff'
            },
            Progress: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorPrimary: isDarkMode ? '#1677ff' : '#1890ff'
            },
            Switch: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorPrimary: isDarkMode ? '#1677ff' : '#1890ff',
              colorPrimaryHover: isDarkMode ? '#4096ff' : '#40a9ff'
            },
            Radio: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorBorder: isDarkMode ? '#434343' : '#d9d9d9',
              colorText: isDarkMode ? '#ffffff' : '#141414'
            },
            Slider: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorPrimary: isDarkMode ? '#1677ff' : '#1890ff'
            },
            Alert: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414',
              colorBorder: isDarkMode ? '#434343' : '#d9d9d9'
            },
            Message: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414'
            },
            Notification: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414'
            },
            Popover: {
              colorBgElevated: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414'
            },
            Spin: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414'
            },
            Timeline: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414'
            },
            Tree: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414'
            },
            Upload: {
              colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
              colorText: isDarkMode ? '#ffffff' : '#141414'
            }
          }
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeContext
