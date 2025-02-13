import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './providers/ThemeContext.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.routes.tsx'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={viVN}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ConfigProvider>
  </StrictMode>
)
