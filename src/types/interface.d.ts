export {}
declare global {
  export interface ICustomResponse<T> {
    success: boolean
    message: string
    data: T
  }

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
}
