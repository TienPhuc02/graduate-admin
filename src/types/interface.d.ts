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
    email: string
    password?: string
    phoneNumber?: number
    address?: string
    isVerified: boolean
    profilePicture?: string
    resetPasswordToken?: string
    resetPasswordExpires?: string
    socialProvider?: ESocialType
    isDeleted: boolean
    deletedAt?: string
    createdAt?: string
    updatedAt?: string
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
    status: string
    isDeleted: boolean
    benefits: string[]
    level: string
    price: number
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
    viewsCourse: number
    duration: number
    rating: number
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
    text: string
    likesCount: number
    parentCommentId?: string | null
    parentComment?: IAdminComment | null
    replies?: IAdminComment[]
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
  export interface IAdminBlog {
    id: string
    title: string
    content: string
    categoryBlog: string
    author: {
      id: string
    }
    viewsBlog: number
    isPublished: EBlogStatus
    comments: string[]
    thumbnail: string
    isDeleted: boolean
    deletedAt: Date
    createdAt: Date
    updatedAt: Date
  }
  export interface ICreateBlogDTO {
    title: string
    content: string
    categoryBlog: string
    author: string
    isPublished: EBlogStatus
    thumbnail: string
  }
  export interface IUpdateCommentDTO {
    text?: string
    status?: 'pending' | 'approved' | 'rejected'
  }
  export interface IUpdateBlogDTO {
    title: string
    content: string
    categoryBlog: string
    author: string
    isPublished: EBlogStatus
    thumbnail: string
  }
  interface IAdminComment {
    id: string
    user: string
    course?: string | null
    blog?: string | null
    text: string
    likesCount: number
    parentCommentId?: string | null
    isEdited: boolean
    isDeleted: boolean
    deletedAt?: string | null
    createdAt: string
    updatedAt?: string | null
    status: 'pending' | 'approved' | 'rejected'
    replies?: IAdminComment[]
  }
  export interface IAdminCoupon {
    id: string
    code: string
    discountPercentage: number
    expiryDate: string
    isDeleted: boolean
    deletedAt: string
    createdAt: string
    updatedAt: string
  }
  export interface ICreateCouponDTO {
    code: string
    discountPercentage: number
    expiryDate: Date
  }
  export interface IUpdateCouponDTO {
    code?: string
    discountPercentage?: number
    expiryDate?: Date
    isDeleted?: boolean
  }
  export interface IUpdateOrderItemDTO {
    price?: number
    quantity?: number
  }
  export interface ICreateOrderItemDTO {
    orderId: string
    courseId: string
    price: number
    quantity?: number
  }
  export interface IAdminOrderItem {
    id: string
    order: IAdminOrder
    course: IAdminCourse
    courseId: string
    price: number
    quantity?: number
    createdAt: string
    updatedAt: string
  }
  export interface IAdminOrder {
    id: string
    user: {
      id: string
      name: string
      email: string
    }
    totalAmount: number
    status: 'pending' | 'processing' | 'completed' | 'cancelled'
    orderDate: Date
    orderItems: {
      id: string
      productId: string
      quantity: number
      price: number
    }[]
    coupon?: {
      id: string
      code: string
      discount: number
    } | null
    couponId?: string | null
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    deletedAt?: string | null
  }

  export interface IUpdateOrderDTO {
    totalAmount?: number
    status?: 'pending' | 'processing' | 'completed' | 'cancelled'
    couponId?: string
  }
  export interface ICreateOrderDTO {
    userId: string
    totalAmount: number
    status: 'pending' | 'processing' | 'completed' | 'cancelled'
    orderItems: { productId: string; quantity: number }[]
    couponId?: string
  }
  export interface IUpdateLessonDTO extends ICreateLessonDTO {}
}
