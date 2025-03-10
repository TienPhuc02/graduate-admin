import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './providers/ThemeContext.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.routes.tsx'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import { Provider } from 'react-redux'
import { store } from './stores/store.ts'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={viVN}>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </ConfigProvider>
  </StrictMode>
)
