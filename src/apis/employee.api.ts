import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { Employee, EmployeeList, EmployeeListConfig } from 'src/types/employee.type'

const MANAGER_URL = 'manager/employees'
const EMPLOYEE_URL = 'employee'
const employeeApi = {
  getEmployees(params: EmployeeListConfig) {
    return http.get<SuccessResponse<EmployeeList>>(MANAGER_URL, {
      params
    })
  },
  getEmployeeDetail(id: string) {
    return http.get<SuccessResponse<Employee>>(`${EMPLOYEE_URL}/${id}`)
  }
}

export default employeeApi
