import { Employee } from 'src/types/employee.type'

export interface Form {
  id: string
  employee: Employee
  formType: number
  content: string
  date: Date
  priority: number
  isApproved: boolean
}

export interface FormList {
  data: Form[]
  totalCount: number
  pageCount: number
  pageSize: number
  pageNumber: number
}

export interface FormListConfig {
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
