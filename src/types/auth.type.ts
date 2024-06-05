import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  accessToken: string
  refreshToken: string
}>
