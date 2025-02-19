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
export const getUsersAPI = (query?: string) => {
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
export const getCourseByIdAPI = (idCourse: string) => {
  const urlBackend = `/course/${idCourse}`
  return axios.get<IBackendRes<IAdminCourses>>(urlBackend)
}
export const createCourseAPI = (file: File, data: ICreateCourseDTO) => {
  const bodyFormData = new FormData()

  bodyFormData.append('instructor', data.instructor)
  bodyFormData.append('title', data.title)
  bodyFormData.append('description', data.description)
  bodyFormData.append('category', data.category)
  bodyFormData.append('level', data.level)
  bodyFormData.append('price', String(data.price))

  if (file) {
    bodyFormData.append('thumbnail', file)
  }

  data.requirements.forEach((req: { requirement: string }, index: number) => {
    bodyFormData.append(`requirements[${index}]`, req.requirement)
  })

  data.benefits.forEach((ben: { benefit: string }, index: number) => {
    bodyFormData.append(`benefits[${index}]`, ben.benefit)
  })

  data.qna.forEach((qa: { question: string; answer: string }, index: number) => {
    bodyFormData.append(`qna[${index}][question]`, qa.question)
    bodyFormData.append(`qna[${index}][answer]`, qa.answer)
  })

  return axios.post('/course', bodyFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateCourseAPI = (idCourse: string, file: File, data: IUpdateCourseDTO) => {
  const bodyFormData = new FormData()

  bodyFormData.append('instructor', data.instructor)
  bodyFormData.append('title', data.title)
  bodyFormData.append('description', data.description)
  bodyFormData.append('category', data.category)
  bodyFormData.append('level', data.level)
  bodyFormData.append('price', String(data.price))

  if (file) {
    bodyFormData.append('thumbnail', file)
  }

  data.requirements.forEach((req: { requirement: string }, index: number) => {
    bodyFormData.append(`requirements[${index}]`, req.requirement)
  })

  data.benefits.forEach((ben: { benefit: string }, index: number) => {
    bodyFormData.append(`benefits[${index}]`, ben.benefit)
  })

  data.qna.forEach((qa: { question: string; answer: string }, index: number) => {
    bodyFormData.append(`qna[${index}][question]`, qa.question)
    bodyFormData.append(`qna[${index}][answer]`, qa.answer)
  })

  return axios.put(`/course/${idCourse}`, bodyFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
