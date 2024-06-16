import { Employee } from "./employee.type"

export interface Restaurant {
  restaurantID: string
  restaurantName: string
  restaurantAddress: string
  manager: Employee
  totalEmployee: number
}

export interface RestaurantList {
  data: Restaurant[]
  totalCount: number
  pageCount: number
  pageSize: number
  pageNumber: number
}

export interface RestaurantListConfig {
  pageNumber?: number | string
  pageSize?: number | string
  // sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  // order?: 'asc' | 'desc'
  // exclude?: string
  // rating_filter?: number | string
  // price_max?: number | string
  // price_min?: number | string
  // name?: string
  // category?: string
}