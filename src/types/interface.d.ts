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
  export interface IAdminUsers {
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
  export interface IAdminCourses {
    id: string
    instructor?: IAdminUsers
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

  export interface IAdminLectures {
    id: string
    course: Course
    title?: string
    lessons: IAdminLessons[]
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
    deletedAt?: Date | null
  }
  export interface IAdminLessons {
    id: string
    lectureCourse: IAdminLectures
    title?: string
    contentType: EContentLessonType[]
    contentUrl?: string
    pdfUrl?: string
    contentText?: string
    order?: number
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
    order?: number
    isDeleted?: boolean
    deletedAt?: Date
  }
}
