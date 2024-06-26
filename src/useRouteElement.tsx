import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './context/app.context'
import { Suspense, lazy, useContext } from 'react'
import path from 'src/constant/path'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.dashboard} />
}

function AdminProtectedRoute() {
  const { user } = useContext(AppContext)
  return user?.RoleName == 'Admin' ? <Outlet /> : <Navigate to='/' />
}
function ManagerProtectedRoute() {
  const { user } = useContext(AppContext)
  return user?.RoleName == 'Manager' ? <Outlet /> : <Navigate to='/' />
}
// function EmployeeProtectedRoute() {
//   const { user } = useContext(AppContext)
//   return user?.RoleName == 'Employee' ? <Outlet /> : <Navigate to='/' />
// }

const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Apply = lazy(() => import('./pages/Apply'))
const LoginLayout = lazy(() => import('./layouts/LoginLayout'))
const SideBarLayout = lazy(() => import('src/layouts/SideBarLayout'))
const EmployeeTable = lazy(() => import('src/pages/EmployeeTable'))
const Dashboard = lazy(() => import('src/pages/Dashboard'))
const Approval = lazy(() => import('src/pages/Approval'))
const Schedule = lazy(() => import('src/pages/Schedule'))
const Profile = lazy(() => import('src/pages/Profile'))
const AbsentForm = lazy(() => import('./pages/Apply/ApplyAbsentForm'))
const Restaurant = lazy(() => import('src/pages/Restaurant'))

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.dashboard,
          element: (
            <SideBarLayout>
              <Suspense>
                <Dashboard />
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
          path: '',
          element: <AdminProtectedRoute />,
          children: [
            {
              path: path.restaurant,
              element: (
                <SideBarLayout>
                  <Suspense>
                    <Restaurant />
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
              )
            }
          ]
        },
        {
          path: '',
          element: <ManagerProtectedRoute />,
          children: [
            {
              path: path.employees,
              element: (
                <SideBarLayout>
                  <Suspense>
                    <EmployeeTable />
                  </Suspense>
                </SideBarLayout>
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
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          index: true,
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
          element: (
            <LoginLayout>
              <Suspense>
                <Apply />
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
