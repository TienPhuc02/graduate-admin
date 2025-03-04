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
  return axios.get<IBackendRes<IModelPaginate<IAdminUser>>>(urlBackend)
}
export const getUsersByIdAPI = (idUser: string) => {
  const urlBackend = `/user/${idUser}`
  return axios.get<IBackendRes<IAdminUser>>(urlBackend)
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

  return axios<IBackendRes<ICustomResponse<IAdminUser>>>({
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
  return axios<IBackendRes<ICustomResponse<IAdminUser>>>({
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
  return axios.post<IBackendRes<IAdminUser>>(urlBackend)
}

//course
export const getCoursesAPI = (query?: string) => {
  const urlBackend = `/course?${query}`
  return axios.get<IBackendRes<IModelPaginate<IAdminCourse>>>(urlBackend)
}
export const getCourseByIdAPI = (idCourse: string) => {
  const urlBackend = `/course/${idCourse}`
  return axios.get<IBackendRes<IAdminCourse>>(urlBackend)
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
export const deleteCourseAPI = (idCourse: string) => {
  const urlBackend = `/course/${idCourse}`
  return axios.post<IBackendRes<IAdminCourse>>(urlBackend)
}

//lecture

export const getLectureAPI = (query?: string) => {
  const urlBackend = `/lecture?${query}`
  return axios.get<IBackendRes<IModelPaginate<IAdminLecture>>>(urlBackend)
}
export const createLectureAPI = ({ courseId, title }: { title: string; courseId: string }) => {
  const urlBackend = `/lecture`
  return axios.post<IBackendRes<IAdminLecture>>(urlBackend, {
    courseId,
    title
  })
}
export const getLectureByIdAPI = (idLecture: string) => {
  const urlBackend = `/lecture/${idLecture}`
  return axios.get<IBackendRes<IAdminLecture>>(urlBackend)
}
export const updateLectureAPI = ({
  courseId,
  title,
  idLecture
}: {
  title: string
  courseId: string
  idLecture: string
}) => {
  const urlBackend = `/lecture/${idLecture}`
  return axios.put<IBackendRes<IAdminLecture>>(urlBackend, {
    courseId,
    title
  })
}

export const deleteLectureAPI = (idLecture: string) => {
  const urlBackend = `/lecture/${idLecture}`
  return axios.delete<IBackendRes<IAdminLecture>>(urlBackend)
}

//lesson
export const getLessonAPI = (query?: string) => {
  const urlBackend = `/lesson?${query}`
  return axios.get<IBackendRes<IModelPaginate<IAdminLesson>>>(urlBackend)
}
export const createLessonAPI = (videoFile: File | null, pdfFile: File | null, data: ICreateLessonDTO) => {
  const bodyFormData = new FormData()

  bodyFormData.append('title', data.title)
  bodyFormData.append('lectureCourseId', data.lectureCourseId)
  bodyFormData.append('contentText', data.contentText)
  data.contentType.forEach((type) => {
    bodyFormData.append('contentType[]', type)
  })

  if (videoFile) {
    bodyFormData.append('contentUrl', videoFile)
  }

  if (pdfFile) {
    bodyFormData.append('pdfUrl', pdfFile)
  }

  return axios<IBackendRes<ICustomResponse<IAdminLesson>>>({
    method: 'post',
    url: '/lesson',
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getLessonByIdAPI = (idLesson: string) => {
  const urlBackend = `/lesson/${idLesson}`
  return axios.get<IBackendRes<IAdminLesson>>(urlBackend)
}

export const updateLessonAPI = (
  idLesson: string,
  videoFile: File | null,
  pdfFile: File | null,
  data: IUpdateLessonDTO
) => {
  const bodyFormData = new FormData()

  bodyFormData.append('title', data.title)
  bodyFormData.append('lectureCourseId', data.lectureCourseId)
  bodyFormData.append('contentText', data.contentText)
  data.contentType.forEach((type) => {
    bodyFormData.append('contentType[]', type)
  })

  if (videoFile) {
    bodyFormData.append('contentUrl', videoFile)
  }

  if (pdfFile) {
    bodyFormData.append('pdfUrl', pdfFile)
  }

  return axios<IBackendRes<ICustomResponse<IAdminLesson>>>({
    method: 'put',
    url: `/lesson/${idLesson}`,
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const deleteLessonAPI = (idLesson: string) => {
  const urlBackend = `/lesson/${idLesson}`
  return axios.delete<IBackendRes<IAdminLesson>>(urlBackend)
}



//comment

export const getCommentsAPI = (query?: string) => {
  const urlBackend = `/comment?${query}`
  return axios.get<IBackendRes<IModelPaginate<IAdminComment>>>(urlBackend)
}

export const createCommentAPI = ({
  userId,
  courseId,
  blogId,
  text,
  parentCommentId
}: {
  userId: string
  courseId?: string
  blogId?: string
  text: string
  parentCommentId?: string
}) => {
  const urlBackend = `/comment`
  return axios.post<IBackendRes<IComment>>(urlBackend, {
    userId,
    courseId,
    blogId,
    text,
    parentCommentId
  })
}

export const getCommentByIdAPI = (idComment: string) => {
  const urlBackend = `/comment/${idComment}`
  return axios.get<IBackendRes<IComment>>(urlBackend)
}

export const updateCommentAPI = ({
  idComment,
  text,
  status
}: {
  idComment: string
  text?: string
  status?: 'pending' | 'approved' | 'rejected'
}) => {
  const urlBackend = `/comment/${idComment}`
  return axios.put<IBackendRes<IComment>>(urlBackend, {
    text,
    status
  })
}

export const deleteCommentAPI = (idComment: string) => {
  const urlBackend = `/comment/${idComment}`
  return axios.delete<IBackendRes<IComment>>(urlBackend)
}



//blog
export const getBlogsAPI = (query?: string) => {
  const urlBackend = `/blog?${query}`
  return axios.get<IBackendRes<IModelPaginate<IAdminBlog>>>(urlBackend)
}
export const getBlogByIdAPI = (idBlog: string) => {
  const urlBackend = `/blog/${idBlog}`
  return axios.get<IBackendRes<IAdminBlog>>(urlBackend)
}
export const createBlogAPI = (thumbnailFile: File, data: ICreateBlogDTO) => {
  const bodyFormData = new FormData()

  bodyFormData.append('title', data.title)
  bodyFormData.append('content', data.content)
  bodyFormData.append('categoryBlog', data.categoryBlog)
  bodyFormData.append('author', data.author)
  bodyFormData.append('isPublished', data.isPublished)
  bodyFormData.append('thumbnail', thumbnailFile)
  return axios<IBackendRes<ICustomResponse<IAdminBlog>>>({
    method: 'post',
    url: `/blog`,
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const updateBlogAPI = (idBlog: string, thumbnailFile: File, data: IUpdateBlogDTO) => {
  const bodyFormData = new FormData()

  bodyFormData.append('title', data.title)
  bodyFormData.append('content', data.content)
  bodyFormData.append('categoryBlog', data.categoryBlog)
  bodyFormData.append('author', data.author)
  bodyFormData.append('isPublished', data.isPublished)
  bodyFormData.append('thumbnail', thumbnailFile)
  return axios<IBackendRes<ICustomResponse<IAdminBlog>>>({
    method: 'put',
    url: `/blog/${idBlog}`,
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const deleteBlogAPI = (idBlog: string) => {
  const urlBackend = `/blog/${idBlog}`
  return axios.delete<IBackendRes<IAdminBlog>>(urlBackend)
}
