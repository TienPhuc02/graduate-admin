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
export const createUserAPI = (file: any, data: ICreateUserDTO) => {
  const bodyFormData = new FormData()
  bodyFormData.append('firstName', data.firstName)
  bodyFormData.append('lastName', data.lastName)
  bodyFormData.append('email', data.email)
  bodyFormData.append('address', data.address)
  bodyFormData.append('phoneNumber', data.phoneNumber)
  bodyFormData.append('profilePicture', file)
  bodyFormData.append('role', data.role)
  return axios<IBackendRes<ICustomResponse<IAdminUsers>>>({
    method: 'post',
    url: '/user',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
