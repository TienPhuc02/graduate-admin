import { getMe, logoutAPI } from '@/services/api.services'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const res = await getMe()
  console.log('🚀 ~ fetchUser ~ res:', res)
  return res.data
})

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  const res = await logoutAPI()
  if (res && res.message) {
    localStorage.setItem('access_token', '')
  }
  return res
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as any,
    loading: false,
    error: undefined as string | undefined
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('access_token')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log('🚀 ~ .addCase ~ action:', action)
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Có lỗi xảy ra'
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null
      })
  }
})

export const { setUser, setLoading, logout } = authSlice.actions
export default authSlice.reducer
