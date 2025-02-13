import { Button } from 'antd'
import { useContext } from 'react'
import ThemeContext from './providers/ThemeContext'

const ThemeButton = () => {
  const themeContext = useContext(ThemeContext)
  // const { token } = theme.useToken()

  if (!themeContext) {
    throw new Error('ThemeButton must be wrapped with ThemeProvider')
  }

  return (
    <Button
      onClick={themeContext.toggleTheme}
      type='primary'
      style={
        {
          // backgroundColor: token.colorBgBase,
          // color: token.colorTextBase,
          // borderColor: token.colorBorder
          // color: '#fff'
        }
      }
    >
      Change Theme to {themeContext.isDarkMode ? 'Light' : 'Dark'}
    </Button>
  )
}

export default ThemeButton
