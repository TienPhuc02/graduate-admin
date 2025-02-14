import createInstanceAxios from './customize.services'

const axios = createInstanceAxios(`${import.meta.env.VITE_BACKEND_URL}/api/v1`)
export const loginAPI = (email: string, password: string) => {
  const urlBackend = '/auth/login'
  return axios.post<IBackendRes<ICustomResponse<ILogin>>>(
    urlBackend,
    { email, password },
    {
      headers: {
        delay: 1000
      }
    }
  )
}
export const getUsersAPI = (query: string) => {
  const urlBackend = `/user?${query}`
  return axios.get<IBackendRes<IModelPaginate<IAdminUsers>>>(urlBackend)
}
