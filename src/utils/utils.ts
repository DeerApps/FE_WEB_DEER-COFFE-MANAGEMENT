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

export function handleDate(dateTime: Date) {
  if (!dateTime) return ''
  const time = new Date(dateTime)
  const month = time.getMonth() + 1
  const date = time.getDate()
  const monthHandled = month < 10 ? `0${month}` : `${month}`
  const dateHandled = date < 10 ? `0${date}` : `${date}`
  const nowHandled = `${time.getFullYear()}-${monthHandled}-${dateHandled}`
  return nowHandled
}

export function handleDateNet(dateTime: Date) {
  const time = new Date(dateTime)
  const month = time.getMonth() + 1
  const date = time.getDate()
  const monthHandled = month < 10 ? `0${month}` : `${month}`
  const dateHandled = date < 10 ? `0${date}` : `${date}`
  const nowHandled = `${time.getFullYear()}/${monthHandled}/${dateHandled}`
  return nowHandled
}

export function handleTime(shiftStart: number, shiftEnd: number) {
  const timeStart = shiftStart < 12 ? `0${shiftStart} AM` : `${shiftStart} PM`
  const timeEnd = shiftEnd < 12 ? `0${shiftEnd} AM` : `${shiftEnd} PM`
  const timeHandled = `${timeStart} - ${timeEnd}`
  return timeHandled
}

export function formatTime(isoString: Date): string {
  const date = new Date(isoString);
  
  // Ensure the date is valid
  if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
  }

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds}`;
}



export function handleRenderNo(pageNumber: number, pageSize: number, index: number) {
  const no =
    pageSize * pageNumber - (pageSize - index) + 1 < 10
      ? '0' + (pageSize * pageNumber - (pageSize - index) + 1)
      : pageSize * pageNumber - (pageSize - index) + 1
  return no.toString()
}
