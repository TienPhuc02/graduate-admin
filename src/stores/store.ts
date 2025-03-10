import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/stores/slice/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

// Lấy kiểu của RootState và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
