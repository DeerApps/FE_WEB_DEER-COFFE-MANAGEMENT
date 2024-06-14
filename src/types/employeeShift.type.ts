import { Employee } from './employee.type'
import { Restaurant } from './restaurant.type'


export enum Status {
  OnTime,
  Late,
  EarlyLeave,
  Absent
}

export interface Shift {
  shiftID: string
  shiftName: string
  shiftStart: Date
  shiftEnd: Date
  shiftDescription: string
  shiftActive: boolean
}

export interface EmployeeShift {
  id: string
  employee: Employee
  name: string
  restaurant: Restaurant
  shift: Shift
  dateOfWork: Date
  checkIn: Date
  checkOut: Date
  actualCheckIn: Date
  actualCheckOut: Date
  totalHours: Date
  isOnTime: boolean
  status: Status
  employeeNote: number
  note: string
  isEmpty: boolean
}

export interface EmployeeShiftDayList {
  data: EmployeeShift[]
  totalCount: number
  pageCount: number
  pageSize: number
  pageNumber: number
}

export interface EmployeeShiftListConfig {
  pageNo?: number | string
  pageSize?: number | string
  dateOfWork?: Date
  restaurantId?:string
  // sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  // order?: 'asc' | 'desc'
  // exclude?: string
  // rating_filter?: number | string
  // price_max?: number | string
  // price_min?: number | string
  // name?: string
  // category?: string
}
