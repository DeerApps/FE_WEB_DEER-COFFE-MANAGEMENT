import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { FormList, FormListConfig } from 'src/types/form.type'

const URL = 'form'
const formApi = {
  getForms(params: FormListConfig) {
    return http.get<SuccessResponse<FormList>>(URL, {
      params
    })
  },
  acceptForms(body: { formID: string; restaurantID: string; date: Date }) {
    return http.post<SuccessResponse<string>>(URL, body)
  },
  acceptEmployee(formID: string) {
    return http.post<SuccessResponse<string>>(`${URL}/${formID}`)
  },
  dayoffForm(body: { shiftID: string; reason: string; formType: number }) {
    return http.post<SuccessResponse<string>>(URL, body)
  },
}

export default formApi
