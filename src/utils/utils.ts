import axios, { AxiosError } from 'axios'
import { HttpStatusCode } from 'src/constant/httpStatusCode.enum'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function getNow() {
  const now = new Date()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const monthHandled = month < 10 ? `0${month}` : `${month}`
  const dateHandled = date < 10 ? `0${date}` : `${date}`
  const nowHandled = `${now.getFullYear()}-${monthHandled}-${dateHandled}`
  return nowHandled
}
