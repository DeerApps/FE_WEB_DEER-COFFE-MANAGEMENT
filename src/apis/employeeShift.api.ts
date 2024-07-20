import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import {
  EmployeeReportConfig,
  EmployeeShiftDayList,
  EmployeeShiftEvent,
  EmployeeShiftEventList,
  EmployeeShiftListConfig
} from 'src/types/employeeShift.type'

const URL = 'employeeshift'
const employeeShiftApi = {
  getEmployeeShift(params: EmployeeShiftListConfig) {
    return http.get<SuccessResponse<EmployeeShiftEventList>>(`${URL}/day`, {
      params
    })
  },
  getEmployeeShiftByWeek(params: { Date: string; isMonth?: boolean }) {
    return http.get<SuccessResponse<EmployeeShiftEvent[]>>(`${URL}/week`, {
      params
    })
  },
  getEmployeeShiftByReview(params: EmployeeShiftListConfig) {
    return http.get<SuccessResponse<EmployeeShiftDayList>>(`${URL}/review`, {
      params
    })
  },
  assignShift(body: { dateOfWork: string; checkIn: string; checkOut: string }) {
    return http.post<SuccessResponse<string>>(URL, body)
  },
  assignAdditionShift(body: { employeeShiftID: string; checkIn: string; checkOut: string }) {
    return http.post<SuccessResponse<string>>(`${URL}/assgin`, body)
  },
  lockShift(body: { dateOfWork: string; start: string; end: string; isLocked: boolean }) {
    return http.post<SuccessResponse<string>>(`${URL}/lockday`, body)
  },
  getEmployeeWorkHour(params: EmployeeShiftListConfig) {
    return http.get<SuccessResponse<EmployeeShiftDayList>>(`${URL}/work-hour`, {
      params
    })
  },
  getEmployeeRecord(params: EmployeeReportConfig) {
    return http.get<SuccessResponse<EmployeeShiftDayList>>(`${URL}/record-option`, {
      params
    })
  },
  deleteEmployeeShift(body: { shiftID: string }) {
    return http.delete<SuccessResponse<String>>(URL, {
      data: body
    })
  }
  
  // updateEmployeeShift(body: {
  //   employee: Employee
  //   restaurant: Restaurant
}



export default employeeShiftApi
