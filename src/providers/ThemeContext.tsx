import { createContext, useState, ReactNode, useEffect } from 'react'
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
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          token: {
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
            Button: {
              colorPrimary: isDarkMode ? '#141414' : '#1677ff'
            },
            Layout: {
              triggerBg: isDarkMode ? '#000000' : '#f0f2f5',
              lightTriggerBg: isDarkMode ? '#000000' : '#f0f2f5'
            },

            Menu: {
              darkItemSelectedBg: isDarkMode ? '#1f1f1f' : '#e6f4ff',
              darkSubMenuItemBg: isDarkMode ? '#000000' : '#e6f4ff'
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
