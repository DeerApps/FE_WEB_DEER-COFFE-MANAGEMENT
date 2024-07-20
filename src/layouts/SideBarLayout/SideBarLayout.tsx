import classNames from 'classnames'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import path from 'src/constant/path'
import { AppContext } from 'src/context/app.context'
import SideBarHeader from 'src/layouts/SideBarLayout/SideBarHeader'

interface Props {
  children?: React.ReactNode
}

export default function SideBarLayout({ children }: Props) {
  let pathName = useLocation().pathname
  const { user } = useContext(AppContext)
  return (
    <div className='grid grid-cols-12 h-[100vh]'>
      <div className='py-4 px-2 col-start-1 col-span-2 '>
        <div className='flex items-center ml-3'>
          <img
            className='h-9 w-9'
            src={'https://lh3.google.com/u/0/d/1sfCMCqs5fGIfQvM4CJwWclx-d0jzaf13=w2548-h1850-iv1'}
            alt='DeerLogo'
          />
          <p className='ml-2 text-lg font-light'>DEER COFFEE</p>
        </div>
        <div className='mt-4'>
          <Link
            to={path.dashboard}
            className={classNames('', {
              '': 'Manager' === (user?.RoleName as string),
              'text-sm hidden': 'Manager' !== user?.RoleName
            })}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-white': path.dashboard === pathName,
                  'text-black hover:bg-slate-100': path.dashboard !== pathName
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6 mr-2 ml-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5'
                />
              </svg>
              Dashboard
            </div>
          </Link>
          <Link
            to={path.employees}
            className={classNames('', {
              '': 'Manager' === (user?.RoleName as string),
              'text-sm hidden': 'Manager' !== user?.RoleName
            })}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-white': path.employees === pathName,
                  'text-black hover:bg-slate-100': path.employees !== pathName
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6 mr-2 ml-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                />
              </svg>
              Employee
            </div>
          </Link>
          <Link
            to={path.schedule}
            className={classNames('', {
              '': 'Manager' === (user?.RoleName as string),
              'text-sm hidden': 'Manager' !== user?.RoleName
            })}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-white': path.schedule === pathName,
                  'text-black hover:bg-slate-100': path.schedule !== pathName
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6 mr-2 ml-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
                />
              </svg>
              Schedule
            </div>
          </Link>
          <Link
            to={path.approveAbsent}
            className={classNames('', {
              '': 'Manager' === (user?.RoleName as string),
              'text-sm hidden': 'Manager' !== user?.RoleName
            })}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-white': path.approveAbsent === pathName,
                  'text-black hover:bg-slate-100': path.approveAbsent !== pathName
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 mr-2 ml-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75'
                />
              </svg>
              Absence
            </div>
          </Link>
          <Link
            to={path.managerReport}
            className={classNames('', {
              '': 'Manager' === (user?.RoleName as string),
              'text-sm hidden': 'Manager' !== user?.RoleName
            })}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-white': path.managerReport === pathName,
                  'text-black hover:bg-slate-100': path.managerReport !== pathName
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 mr-2 ml-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z'
                />
              </svg>
              Report
            </div>
          </Link>

          <Link
            to={path.totalRport}
            className={classNames('', {
              '': 'Manager' === (user?.RoleName as string),
              'text-sm hidden': 'Manager' !== user?.RoleName
            })}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-white': path.totalRport === pathName,
                  'text-black hover:bg-slate-100': path.totalRport !== pathName
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 mr-2 ml-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
                />
              </svg>
              Total Report
            </div>
          </Link>

          <Link
            to={path.approval}
            className={classNames('', {
              '': 'Admin' === (user?.RoleName as string),
              'text-sm hidden': 'Admin' !== user?.RoleName
            })}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-white': path.approval === pathName,
                  'text-black hover:bg-slate-100': path.approval !== pathName
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6 mr-2 ml-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75'
                />
              </svg>
              Approval
            </div>
          </Link>
          <Link
            to={path.restaurant}
            className={classNames('', {
              '': 'Admin' === (user?.RoleName as string),
              'text-sm hidden': 'Admin' !== user?.RoleName
            })}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-white': path.restaurant === pathName,
                  'text-black hover:bg-slate-100': path.restaurant !== pathName
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 mr-2 ml-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z'
                />
              </svg>
              Restaurant
            </div>
          </Link>
          <Link
            to={path.schedule}
            className={classNames('', {
              '': 'Employee' === (user?.RoleName as string),
              'text-sm hidden': 'Employee' !== user?.RoleName
            })}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-white': path.schedule === pathName,
                  'text-black hover:bg-slate-100': path.schedule !== pathName
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6 mr-2 ml-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
                />
              </svg>
              Schedule
            </div>
          </Link>
          <Link
            to={path.absentForm}
            className={classNames('', {
              '': 'Employee' === (user?.RoleName as string),
              'text-sm hidden': 'Employee' !== user?.RoleName
            })}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-white': path.absentForm === pathName,
                  'text-black hover:bg-slate-100': path.absentForm !== pathName
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 mr-2 ml-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75'
                />
              </svg>
              Absence
            </div>
          </Link>
          <Link
            to={path.employeeReport}
            className={classNames('', {
              '': 'Employee' === (user?.RoleName as string),
              'text-sm hidden': 'Employee' !== user?.RoleName
            })}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-white': path.employeeReport === pathName,
                  'text-black hover:bg-slate-100': path.employeeReport !== pathName
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 mr-2 ml-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z'
                />
              </svg>
              Report
            </div>
          </Link>
          <Link
            to={path.profile}
            className={classNames('', {
              '': 'Employee' === (user?.RoleName as string),
              'text-sm hidden': 'Employee' !== user?.RoleName
            })}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-white': path.profile === pathName,
                  'text-black hover:bg-slate-100': path.profile !== pathName
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 mr-2 ml-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
              Profile
            </div>
          </Link>
        </div>
      </div>
      <div className='col-span-10 bg-sky-100'>
        <div className='h-full'>
          <SideBarHeader />
          <div className='h-[93%] p-10'>{children}</div>
        </div>
      </div>
    </div>
  )
}
