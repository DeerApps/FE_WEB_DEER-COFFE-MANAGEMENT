import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import path from 'src/constant/path'

interface Props {
  children?: React.ReactNode
}

export default function SideBarLayout({ children }: Props) {
  let pathName = useLocation().pathname

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
          <Link to={path.home}>
            <div
              className={classNames('py-3 px-3 rounded-lg mb-2 font-medium flex items-center', {
                'bg-sky-300 text-white': path.home === pathName,
                'text-black': path.home !== pathName
              })}
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
          <Link to={path.employees}>
            <div
              className={classNames('py-3 px-3 rounded-lg mb-2 font-medium flex items-center', {
                'bg-sky-300 text-white': path.employees === pathName,
                'text-black': path.employees !== pathName
              })}
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
          <Link to={path.users}>
            <div
              className={classNames('py-3 px-3 rounded-lg mb-2 font-medium flex items-center', {
                'bg-sky-300 text-white': path.users === pathName,
                'text-black': path.users !== pathName
              })}
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
        </div>
      </div>
      <div className='col-span-10 bg-sky-100'>
        <div className='py-3 px-10 bg-white flex justify-start items-center flex-row-reverse'>
          <div className='w-9 h-9 mr-0 flex-shrink-0'>
            <img
              src={'https://picsum.photos/200/300'}
              alt='avatar'
              className='w-full h-full object-cover rounded-full'
            />
          </div>
          <div className='px-2 mr-2 text-lg'>Tran Dinh Thien Tan</div>
        </div>
        <div className='p-10'>{children}</div>
      </div>
    </div>
  )
}
