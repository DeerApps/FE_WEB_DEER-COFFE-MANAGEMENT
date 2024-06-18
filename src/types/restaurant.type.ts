import { Employee } from 'src/types/employee.type'

export interface RestaurantList {
  data: Restaurant[]
  totalCount: number
  pageCount: number
  pageSize: number
  pageNumber: number
}

export interface Restaurant {
  restaurantChainID: string
  manager: Employee
  restaurantName: string
  restaurantAddress: string
  totalEmployees: number
}

export interface RestaurantListConfig {
  pageNumber?: number | string
  pageSize?: number | string
  restaurantName?: string
  restaurantAddress?: string
}
