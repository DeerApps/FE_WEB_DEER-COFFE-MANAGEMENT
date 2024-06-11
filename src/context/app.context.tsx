import { createContext, useState } from 'react'
import { Employee } from 'src/types/employee.type'
import { getAccessTokenToLS, getProfileFromLS } from 'src/utils/auth'
import { jwtDecode } from 'jwt-decode'
import { CustomJwtPayload } from 'src/pages/Login/Login'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  employee: Employee | null
  setEmployee: React.Dispatch<React.SetStateAction<Employee | null>>
  user: CustomJwtPayload | null
  reset: () => void
}

const intialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenToLS()),
  setIsAuthenticated: () => null,
  employee: getProfileFromLS(),
  setEmployee: () => null,
  user: jwtDecode<CustomJwtPayload>(getAccessTokenToLS()),
  reset: () => null
}

export const AppContext = createContext<AppContextInterface>(intialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(intialAppContext.isAuthenticated)
  const [employee, setEmployee] = useState<Employee | null>(intialAppContext.employee)
  const [user] = useState<CustomJwtPayload | null>(intialAppContext.user)

  const reset = () => {
    setIsAuthenticated(false)
    setEmployee(null)
  }

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, employee, setEmployee, reset, user }}>
      {children}
    </AppContext.Provider>
  )
}
