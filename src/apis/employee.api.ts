import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { Employee, EmployeeList, EmployeeListConfig } from 'src/types/employee.type'

const URL = 'employee'
const employeeApi = {
  getEmployees(params: EmployeeListConfig) {
    return http.get<SuccessResponse<EmployeeList>>(URL, {
      params
    })
  },
  getEmployee(id: string) {
    return http.get<SuccessResponse<Employee>>(`${URL}/${id}`)
  },
  deleteEmployee(body: { employeeID: string }) {
    return http.delete<SuccessResponse<String>>(URL, {
      data: body
    })
  },
  applyEmployee(body: { email: string; phoneNumber: string; fullName: string; dateOfBirth: Date; address: string }) {
    return http.post<SuccessResponse<String>>(`${URL}/apply`, body)
  },
  updateEmployee(body: {
    employeeID: string
    email: string
    phoneNumber: string
    address: string
    roleId: number
    fullName: string
    dateOfBirth: Date
    isActive: boolean
  }) {
    return http.put<SuccessResponse<String>>(URL, body)
  }
}

export default employeeApi
