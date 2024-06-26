import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { Tooltip, Link } from '@nextui-org/react'
import Logout from 'src/pages/Logout'

export default function SideBarHeader() {
  const { employee } = useContext(AppContext)

  return (
    <div className='px-10 h-[7%] bg-stone-100 flex justify-end items-center'>
      <div className='px-1 mr-2 text-xl font-medium text-zinc-600'>{employee?.fullName}</div>
      <Tooltip
        content={
          <div className='flex flex-col space-y-1 w-[100px] h-[80px] justify-center '>
            <div className='flex justify-center text-blue-500 hover:bg-gray-100 rounded-lg p-2 items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-5 mr-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>

              <Link href='/profile' className='text-md'>
                Profile
              </Link>
            </div>

            <div>
              <Logout />
            </div>
          </div>
        }
        placement='bottom'
      >
        <div className='w-9 h-9 mr-0 flex-shrink-0 cursor-pointer'>
          <img src={'https://picsum.photos/200/300'} alt='avatar' className='w-full h-full object-cover rounded-full' />
        </div>
      </Tooltip>
    </div>
  )
}
