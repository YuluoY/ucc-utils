export interface HandleExceptionOptions {
  isToThrow?: boolean
  fnArgs?: any[]
  onErrorFn?: (e: any) => void | null
}

export type HandleExceptionResult<T> = Promise<[T, any]>
