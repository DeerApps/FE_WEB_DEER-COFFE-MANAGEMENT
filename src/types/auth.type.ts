import { Employee } from 'src/types/employee.type'
import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  accessToken: string
  refreshToken: string
  employeeDto: Employee
}>
