import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './context/app.context'
import { Suspense, lazy, useContext } from 'react'
import path from 'src/constant/path'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import User from 'src/pages/User'
// import Home from 'src/pages/Home'
import SideBarLayout from 'src/layouts/SideBarLayout'
import EmployeeTable from 'src/pages/EmployeeTable'
import Dashboard from 'src/pages/Dashboard'
import Approval from 'src/pages/Approval'
import ApprovalForm from 'src/pages/Approval/ApprovalForm'
import Schedule from 'src/pages/Schedule'
import Profile from 'src/pages/Profile'
import AbsentForm from './pages/Apply/ApplyAbsentForm'

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
const Apply = lazy(() => import('./pages/Apply'))
const LoginLayout = lazy(() => import('./layouts/LoginLayout'))



export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.login,
      element: (
        <LoginLayout>
          <Suspense>
            <Login />
          </Suspense>
        </LoginLayout>
      )
    },
    {
      path: path.apply,
      index: true,
      element: (
        <LoginLayout>
          <Suspense>
            <Apply />
          </Suspense>
        </LoginLayout>
      )
    },
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
      path: path.profile,
      element: (
        <SideBarLayout>
          <Suspense>
            <Profile />
          </Suspense>
        </SideBarLayout>
      )
    },
    {
      path: path.absentForm,
      element: (
        <SideBarLayout>
          <Suspense>
            <AbsentForm />
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
