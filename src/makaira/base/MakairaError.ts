export type ErrorBody = {
  message: string
  errorId: string
}

export class MakairaError extends Error {
  code: number
  cause: string
  id: string
  stack: string

  constructor(status: number, statusText: string, errorBody: ErrorBody) {
    super()
    this.code = status
    this.message = statusText
    this.cause = errorBody.message
    this.id = errorBody.errorId
    this.stack = 'fetchFromMakaira()'
  }
}
