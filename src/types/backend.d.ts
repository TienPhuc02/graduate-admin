export {}
declare global {
  interface IBackendRes<T> {
    error?: string | string[]
    message: string
    statusCode: number | string
    data?: T
  }
  interface IModelPaginate<T> {
    results: T[]
    meta:
      | {
          page: number
          pageSize: number
          totalUsers?: number
          totalPages: number
          totalCourses?: number
          totalLectures?: number
        }
      | undefined
    gotBy: IUserPayload
  }
}
