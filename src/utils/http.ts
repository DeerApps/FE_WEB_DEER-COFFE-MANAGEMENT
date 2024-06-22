import axios, { AxiosError, type AxiosInstance } from 'axios'
import { HttpStatusCode } from 'src/constant/httpStatusCode.enum'
import { AuthResponse } from 'src/types/auth.type'
import {
  clearLS,
  getAccessTokenToLS,
  getRefreshTokenToLS,
  saveAccessTokenAndRefreshTokenToLS,
  setProfileToLS
} from './auth'
import path from 'src/constant/path'
import config from 'src/constant/config'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  //Tại sao cần phải tạo thêm 1 Instance ở Class, Nếu lúc nào cũng phải lấy Data từ LS.
  //Data trong LS là nó lưu trong ổ cứng, SSD
  //Lưu ở code thì nó lưu trên Ram, lấy ra sẽ rất là nhanh
  // => Tối ưu bằng cách kết hợp lưu trên Ram và LS
  constructor() {
    this.accessToken = getAccessTokenToLS()
    this.refreshToken = getRefreshTokenToLS()
    this.instance = axios.create({
      baseURL: `${config.baseURL}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (`${url?.split('/')[1]}` === 'login') {
          this.accessToken = (response.data as AuthResponse).data.accessToken
          this.refreshToken = (response.data as AuthResponse).data.refreshToken
          saveAccessTokenAndRefreshTokenToLS(this.accessToken, this.refreshToken)
          setProfileToLS((response.data as AuthResponse).data.employeeDto)
        } else if (url === path.logout) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          // const data: any | undefined = error.response?.data
          // const message = data?.message || error.message
          // toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
