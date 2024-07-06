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

export function handleDate(dateTime: Date | undefined) {
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
  const date = new Date(isoString)

  // Ensure the date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string')
  }

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}

export function handleRenderNo(pageNumber: number, pageSize: number, index: number) {
  const no =
    pageSize * pageNumber - (pageSize - index) + 1 < 10
      ? '0' + (pageSize * pageNumber - (pageSize - index) + 1)
      : pageSize * pageNumber - (pageSize - index) + 1
  return no.toString()
}

export const mapToDateTime = (dateStr: string, time: number) => {
  const [year, month, day] = dateStr.split('-').map(Number)

  const dateTime = new Date(year, month - 1, day, time)

  return dateTime
}

export const handleTimeClock = (dateTime: string | Date | undefined) => {
  if (!dateTime) return ''

  // Convert the input to a Date object if it's not already
  const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime

  // Extract hours and minutes
  let hours = date.getHours()
  const minutes = date.getMinutes()

  // Determine AM or PM
  const ampm = hours >= 12 ? 'PM' : 'AM'

  // Convert hours to 12-hour format
  hours = hours % 12
  hours = hours ? hours : 12 // The hour '0' should be '12'

  // Format minutes with leading zero if needed
  const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes

  // Return formatted time string
  return `${hours}:${minutesFormatted} ${ampm}`
}

export const subtractDays = (date: Date, days: number) => {
  const result = new Date(date) // Create a new Date object to avoid mutating the original
  result.setDate(result.getDate() - days) // Subtract the specified number of days
  return result
}

export const plusDays = (date: Date, days: number) => {
  const result = new Date(date) // Create a new Date object to avoid mutating the original
  result.setDate(result.getDate() + days) // Subtract the specified number of days
  return result
}

export const toLocalISOString = (date: Date) => {
  const offset = date.getTimezoneOffset()
  const localDate = new Date(date.getTime() - offset * 60 * 1000)
  return localDate.toISOString() // Remove the 'Z'
}
