import { Card, theme } from 'antd'
import { useContext } from 'react'
import ThemeContext from './context/ThemeContext'

const ThemedCard = () => {
  const themeContext = useContext(ThemeContext)
  const { token } = theme.useToken() // Lấy token từ ConfigProvider

  if (!themeContext) {
    throw new Error('ThemedCard must be wrapped with ThemeProvider')
  }

  return (
    <Card
      style={{
        width: 'max-content',
        backgroundColor: token.colorBgBase,
        color: token.colorTextBase,
        borderColor: token.colorBorder
      }}
    >
      This is a {themeContext.isDarkMode ? 'Dark' : 'Light'} Themed Card
    </Card>
  )
}

export default ThemedCard
