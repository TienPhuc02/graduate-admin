export {}
declare global {
  export interface ICustomResponse<T> {
    success: boolean
    message: string
    data: T
  }

  //auth interface
  export interface ILogin {
    accessToken: string
    user: IUserLogin
  }
  export interface IUserLogin {
    id: string
    role: string
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber: string
    address: string
    isVerified: boolean
    profilePicture: null
    resetPasswordToken: null
    resetPasswordExpires: null
    socialProvider: string
    isDeleted: boolean
  }
  export interface IUserPayload {
    id?: string
    role?: string
    firstName?: string
    lastName?: string
    email?: string
    phoneNumber?: number
    address?: string
    profilePicture?: string
    socialProvider?: string
  }

  //user interface
  export interface IAdminUser {
    id: string
    role: ETypeUser
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    phoneNumber?: number
    address?: string
    isVerified: boolean
    profilePicture?: string
    resetPasswordToken?: string
    resetPasswordExpires?: Date
    socialProvider?: ESocialType
    isDeleted: boolean
    deletedAt?: Date
    createdAt?: Date
    updatedAt?: Date
  }
  export interface ICreateUserDTO {
    role: ETypeUser
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    address: string
    profilePicture?: string
  }
  export interface IUpdateUserDTO {
    role: ETypeUser
    firstName: string
    lastName: string
    email?: string
    phoneNumber: string
    address: string
    profilePicture?: string
  }

  //course interface
  export interface IAdminCourse {
    id: string
    instructor?: IAdminUser
    title: string
    description: string
    category: string
    qna: Qna[]
    requirements: string[]
    status: boolean
    isDeleted: boolean
    benefits: string[]
    level: string
    price: string
    thumbnail: string
    viewsCourse: number
    duration: number
    rating: number
    describe: null
    createdAt: Date
    updatedAt: Date
    deletedAt: null
    rating: null
  }

  export interface Qna {
    answer: string
    question: string
  }
  export interface ICreateCourseDTO {
    instructor: string
    title: string
    description: string
    category: ECourseCategory
    level: ECourseLevel
    price: number
    thumbnail?: File | string
    requirements: { requirement: string }[]
    benefits: { benefit: string }[]
    qna: { question: string; answer: string }[]
  }

  export interface IUpdateCourseDTO extends ICreateCourseDTO {}

  export interface IAdminLecture {
    id: string
    course: Course
    title?: string
    lessons: IAdminLesson[]
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    deletedAt?: Date | null
  }
  export interface IAdminLesson {
    id: string
    lectureCourse: IAdminLecture
    title?: string
    contentType: EContentLessonType[]
    contentUrl?: string
    pdfUrl?: string
    contentText?: string
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    deletedAt?: Date | null
  }
  export interface ICreateLessonDTO {
    title: string
    contentType: EContentLessonType[]
    contentUrl?: string
    pdfUrl?: string
    lectureCourseId: string
    contentText: string
  }
  export interface IAdminComment {
    id: string
    user: User
    course?: Course | null
    blog?: Blog | null
    text?: string | null
    likesCount: number
    parentCommentId?: string | null
    parentComment?: IComment | null
    replies?: IComment[]
    isEdited: boolean
    isDeleted: boolean
    deletedAt?: Date | null
    createdAt: Date
    updatedAt: Date
    status: 'pending' | 'approved' | 'rejected'
  }
  export interface ICreateCommentDTO {
    userId: string
    courseId?: string
    blogId?: string
    text: string
    parentCommentId?: string
  }
  export interface IUpdateLessonDTO extends ICreateLessonDTO {}
}
