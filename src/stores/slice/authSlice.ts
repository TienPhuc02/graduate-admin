import { getMe, logoutAPI } from '@/services/api.services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const res = await getMe()
  console.log('🚀 ~ fetchUser ~ res:', res)
  return res.data
})

export const logout = createAsyncThunk('auth/logout', async () => {
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
    // setUser: (state, action) => {
    //   console.log('🚀 ~ action:', action)
    //   state.user = action.payload
    // }
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
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  }
})

// export const { setUser } = authSlice.actions
export default authSlice.reducer
