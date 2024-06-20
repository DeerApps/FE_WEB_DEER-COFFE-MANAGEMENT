import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { EmployeeShiftDayList, EmployeeShiftListConfig } from 'src/types/employeeShift.type'

const URL = 'employeeshift'
const employeeShiftApi = {
  getEmployeeShift(params: EmployeeShiftListConfig) {
    return http.get<SuccessResponse<EmployeeShiftDayList>>(`${URL}/day`, {
      params
    })
  },
  getEmployeeShiftByWeek(params: { Date: string }) {
    return http.get<SuccessResponse<EmployeeShiftDayList>>(`${URL}/week`, {
      params
    })
  }
  // getEmployeeShiftDetail(id: string) {
  //   return http.get<SuccessResponse<EmployeeShift>>(`${URL}/${id}`)
  // },
  // deleteEmployeeShift(body: { shiftID: string }) {
  //   return http.delete<SuccessResponse<String>>(URL, {
  //     data: body
  //   })
  // },
  // updateEmployeeShift(body: {
  //   employee: Employee
  //   restaurant: Restaurant

  // }) {
  //   return http.put<SuccessResponse<String>>(URL, body)
  // }
}

export default employeeShiftApi
