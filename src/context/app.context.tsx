import { createContext, useState } from 'react'
import { getAccessTokenToLS, getProfileFromLS } from 'src/utils/auth'
import { jwtDecode } from 'jwt-decode'
import { CustomJwtPayload } from 'src/pages/Login/Login'
import { Employee } from 'src/types/employee.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user: CustomJwtPayload | null
  setUser: React.Dispatch<React.SetStateAction<CustomJwtPayload | null>>
  employee: Employee | null
  setEmployee: React.Dispatch<React.SetStateAction<Employee | null>>
  reset: () => void
}

const intialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenToLS()),
  setIsAuthenticated: () => null,
  user: getAccessTokenToLS() !== '' ? jwtDecode<CustomJwtPayload>(getAccessTokenToLS()) : null,
  setUser: () => null,
  employee: getProfileFromLS(),
  setEmployee: () => null,
  reset: () => null
}

export const AppContext = createContext<AppContextInterface>(intialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(intialAppContext.isAuthenticated)
  const [user, setUser] = useState<CustomJwtPayload | null>(intialAppContext.user)
  const [employee, setEmployee] = useState<Employee | null>(intialAppContext.employee)

  const reset = () => {
    setIsAuthenticated(false)
    setUser(null)
    setEmployee(null)
  }

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, reset, user, setUser, employee, setEmployee }}>
      {children}
    </AppContext.Provider>
  )
}
