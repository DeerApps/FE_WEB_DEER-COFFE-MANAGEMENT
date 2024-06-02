import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { Employee, EmployeeList, EmployeeListConfig } from 'src/types/employee.type'

const URL = 'Employee/manager/employees'
const employeeApi = {
  getEmployees(params: EmployeeListConfig) {
    return http.get<SuccessResponse<EmployeeList>>(URL, {
      params
    })
  },
  getEmployeeDetail(id: string) {
    return http.get<SuccessResponse<Employee>>(`${URL}/${id}`)
  }
}

export default employeeApi
