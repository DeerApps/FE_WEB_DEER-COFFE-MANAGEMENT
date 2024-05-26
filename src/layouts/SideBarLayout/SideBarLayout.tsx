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
              className={classNames('py-3 px-3 rounded-lg mb-2 font-medium', {
                'bg-sky-300 text-white': path.home === pathName,
                'text-black': path.home !== pathName
              })}
            >
              Dashboard
            </div>
          </Link>
          <Link to={path.employees}>
            <div
              className={classNames('py-3 px-3 rounded-lg mb-2 font-medium', {
                'bg-sky-300 text-white': path.employees === pathName,
                'text-black': path.employees !== pathName
              })}
            >
              Employee
            </div>
          </Link>
          <Link to={path.users}>
            <div
              className={classNames('py-3 px-3 rounded-lg mb-2 font-medium', {
                'bg-sky-300 text-white': path.users === pathName,
                'text-black': path.users !== pathName
              })}
            >
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
