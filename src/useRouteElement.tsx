import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './context/app.context'
import { Suspense, lazy, useContext } from 'react'
import path from 'src/constant/path'
import LoginLayout from 'src/layouts/LoginLayout'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import User from 'src/pages/User'
// import Home from 'src/pages/Home'
import SideBarLayout from 'src/layouts/SideBarLayout'
import EmployeeTable from 'src/pages/EmployeeTable'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.home,
      element: (
        <SideBarLayout>
          <Suspense>
            <EmployeeTable />
          </Suspense>
        </SideBarLayout>
      )
    },
    {
      path: path.employees,
      index: true,
      element: (
        <SideBarLayout>
          <Suspense>
            <EmployeeTable />
          </Suspense>
        </SideBarLayout>
      )
    },
    {
      path: path.users,
      element: (
        <SideBarLayout>
          <Suspense>
            <User />
          </Suspense>
        </SideBarLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        // {
        //   path: path.home,
        //   element: (
        //     <SideBarLayout>
        //       <Suspense>
        //         <EmployeeTable />
        //       </Suspense>
        //     </SideBarLayout>
        //   )
        // },
        {
          path: path.user,
          element: (
            <MainLayout>
              <Suspense>
                <User />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <LoginLayout>
              <Suspense>
                <Login />
              </Suspense>
            </LoginLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      )
    }
  ])
  return routeElements
}
