import { Employee } from 'src/types/employee.type'

export interface RestaurantList {
  data: Restaurant[]
  totalCount: number
  pageCount: number
  pageSize: number
  pageNumber: number
}

export interface Restaurant {
  id: string
  manager: Employee
  restaurantChainID: string
  restaurantName: string
  restaurantAddress: string
  totalEmployees: number
}

export interface RestaurantListConfig {
  pageNumber?: number | string
  pageSize?: number | string
  // restaurantName?: string
  // restaurantAddress?: string
}

export interface RestaurantSummary {
  totalEmployee:number
  totalShift:number
  totalWorkHour:number
  totalLateShift:number
  totalOnTimeShift:number
  totalAbsentShift:number
  totalEarlyShift:number
}