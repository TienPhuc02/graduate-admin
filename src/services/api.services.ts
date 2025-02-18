import createInstanceAxios from './customize.services'

const axios = createInstanceAxios(`${import.meta.env.VITE_BACKEND_URL}/api/v1`)
export const loginAPI = (email: string, password: string) => {
  const urlBackend = '/auth/login'
  return axios.post<IBackendRes<ILogin>>(
    urlBackend,
    { email, password },
    {
      headers: {
        delay: 1000
      }
    }
  )
}

//user
export const getUsersAPI = (query: string) => {
  const urlBackend = `/user?${query}`
  return axios.get<IBackendRes<IModelPaginate<IAdminUsers>>>(urlBackend)
}
export const getUsersByIdAPI = (idUser: string) => {
  const urlBackend = `/user/${idUser}`
  return axios.get<IBackendRes<IAdminUsers>>(urlBackend)
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
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateUserAPI = (idUser: string, file: any, data: IUpdateUserDTO) => {
  const bodyFormData = new FormData()
  bodyFormData.append('firstName', data.firstName)
  bodyFormData.append('lastName', data.lastName)
  bodyFormData.append('address', data.address)
  bodyFormData.append('phoneNumber', data.phoneNumber)
  bodyFormData.append('profilePicture', file)
  bodyFormData.append('role', data.role)
  return axios<IBackendRes<ICustomResponse<IAdminUsers>>>({
    method: 'put',
    url: `/user/${idUser}`,
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const deleteUserAPI = (idUser: string) => {
  const urlBackend = `/user/${idUser}`
  return axios.post<IBackendRes<IAdminUsers>>(urlBackend)
}

//course
export const getCoursesAPI = (query: string) => {
  const urlBackend = `/course?${query}`
  return axios.get<IBackendRes<IModelPaginate<IAdminCourses>>>(urlBackend)
}
