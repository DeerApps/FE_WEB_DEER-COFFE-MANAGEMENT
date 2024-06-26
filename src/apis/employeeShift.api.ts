import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { EmployeeShiftDayList, EmployeeShiftEvent, EmployeeShiftListConfig } from 'src/types/employeeShift.type'

const URL = 'employeeshift'
const employeeShiftApi = {
  getEmployeeShift(params: EmployeeShiftListConfig) {
    return http.get<SuccessResponse<EmployeeShiftDayList>>(`${URL}/day`, {
      params
    })
  },
  getEmployeeShiftByWeek(params: { Date: string; isMonth?: boolean }) {
    return http.get<SuccessResponse<EmployeeShiftEvent[]>>(`${URL}/week`, {
      params
    })
  },
  assignShift(body: { dateOfWork: string; checkIn: Date; checkOut: Date }) {
    return http.post<SuccessResponse<string>>(URL, body)
  }
  // deleteEmployeeShift(body: { shiftID: string }) {
  //   return http.delete<SuccessResponse<String>>(URL, {
  //     data: body
  //   })
  // },
  // updateEmployeeShift(body: {
  //   employee: Employee
  //   restaurant: Restaurant
}

export default employeeShiftApi
