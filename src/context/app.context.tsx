import { createContext, useState } from 'react'
import { getAccessTokenToLS } from 'src/utils/auth'
import { jwtDecode } from 'jwt-decode'
import { CustomJwtPayload } from 'src/pages/Login/Login'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user: CustomJwtPayload | null
  setUser: React.Dispatch<React.SetStateAction<CustomJwtPayload | null>>
  reset: () => void
}

const intialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenToLS()),
  setIsAuthenticated: () => null,
  user: getAccessTokenToLS() !== '' ? jwtDecode<CustomJwtPayload>(getAccessTokenToLS()) : null,
  setUser: () => null,
  reset: () => null
}

export const AppContext = createContext<AppContextInterface>(intialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(intialAppContext.isAuthenticated)
  const [user, setUser] = useState<CustomJwtPayload | null>(intialAppContext.user)

  const reset = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, reset, user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}
