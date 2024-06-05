import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const URL = 'employee'

const authApi = {
  loginAccount: (body: { employeeID: string; password: string }) => http.post<AuthResponse>(`${URL}/login`, body),
  logoutAccount: () => http.post('/logout')
}

export default authApi
