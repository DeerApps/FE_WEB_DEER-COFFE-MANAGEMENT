import { Employee } from 'src/types/employee.type'

export const localStorageEventTarget = new EventTarget()

export const saveAccessTokenAndRefreshTokenToLS = (access_token: string, refresh_token: string) => {
  localStorage.setItem('access_token', access_token)
  localStorage.setItem('refresh_token', refresh_token)
}

export const saveNewAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const removeAccessTokenToLS = () => {
  localStorage.removeItem('access_token')
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  localStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenToLS = () => localStorage.getItem('access_token') || ''
export const getRefreshTokenToLS = () => localStorage.getItem('access_token') || ''

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: Employee) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
