import { Employee } from './employee.type'

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
  managerID: string
  restaurantName: string
  restaurantAddress: string
  totalEmployee: number
}

export interface RestaurantListConfig {
  pageNumber?: number | string
  pageSize?: number | string
  // restaurantName?: string
  // restaurantAddress?: string
}
