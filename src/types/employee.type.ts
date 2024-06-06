type Role = string & ('Employee' | 'Admin' | 'Manager' | 'SuperAdmin')

export enum RoleId {
  Admin = 1,
  Manager = 2,
  Employee = 3,
  SuperAdmin = 4
}

export interface EmployeeList {
  data: Employee[]
  totalCount: number
  pageCount: number
  pageSize: number
  pageNumber: number
}
export interface Employee {
  id: string
  employeeID: string
  email: string
  fullName: string
  phoneNumber: string
  dateOfBirth: Date
  dateJoined: Date
  address: string
  roleName: Role
  isActive: boolean
}

export interface EmployeeListConfig {
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
