import { Employee } from './employee.type'
import { Restaurant } from './restaurant.type'

export enum Status {
  OnTime,
  Late,
  EarlyLeave,
  Absent
}

export interface Shift {
  name: string
  shiftStart: number
  shiftEnd: number
  shiftDescription: string
  isActive: boolean
}

export interface EmployeeShift {
  id: string
  restaurantID: string
  employee: Employee
  name: string
  restaurant: Restaurant
  shift: Shift
  dateOfWork: string
  checkIn: Date
  checkOut: Date
  actual_CheckIn: Date
  actual_CheckOut: Date
  totalHours: Date
  isOnTime: boolean
  status: Status
  employeeNote: number
  note: string
  isEmpty: boolean
  allDay: boolean // BigCalendar
}

export interface EmployeeShiftDayList {
  data: EmployeeShift[]
  totalCount: number
  pageCount: number
  pageSize: number
  pageNumber: number
}

export interface EmployeeShiftEventList {
  data: EmployeeShiftEvent[]
  totalCount: number
  pageCount: number
  pageSize: number
  pageNumber: number
}

export interface EmployeeShiftEvent {
  id: string
  title: string
  start: Date
  end: Date
  resource?: EmployeeShift
  allDay?: boolean
}

export interface EmployeeShiftListConfig {
  pageNo?: number | string
  pageSize?: number | string
  dateOfWork?: string
  restaurantId?: string
  // sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  // order?: 'asc' | 'desc'
  // exclude?: string
  // rating_filter?: number | string
  // price_max?: number | string
  // price_min?: number | string
  // name?: string
  // category?: string
}
