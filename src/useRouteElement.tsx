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
import Dashboard from 'src/pages/Dashboard'
import Approval from 'src/pages/Approval'
import ApprovalForm from 'src/pages/Approval/ApprovalForm'
import Schedule from 'src/pages/Schedule'

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
            <Dashboard />
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
      path: path.schedule,
      element: (
        <SideBarLayout>
          <Suspense>
            <Schedule />
          </Suspense>
        </SideBarLayout>
      )
    },
    {
      path: path.approval,
      element: (
        <SideBarLayout>
          <Suspense>
            <Approval />
          </Suspense>
        </SideBarLayout>
      ),
      children: [
        {
          path: path.approvalForm,
          element: (
            <Suspense>
              <ApprovalForm />
            </Suspense>
          )
        }
      ]
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
