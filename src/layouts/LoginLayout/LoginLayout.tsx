import React from 'react'
import { useLocation } from 'react-router-dom'
import path from 'src/constant/path'
// import Footer from 'src/components/Footer'
// import LoginHeader from 'src/components/LoginHeader'

interface Props {
  children?: React.ReactNode
}

export default function LoginLayout({ children }: Props) {
  let pathName = useLocation().pathname
  return (
    <div className='grid grid-cols-12 bg-sky-200'>
      <div className='col-span-7 flex justify-center items-center'>
        {pathName === path.apply && (
          <div>
            <h1 className='text-7xl font-bold text-sky--700'>Wanna join us?</h1>

              <h1 className='text-lg font-medium text-gray-600 mt-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-6 mr-2 inline-block items-center'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
                  </svg>
                Fill in this form to become a member of Deer Coffee
              </h1>
          </div>
        )}
        {pathName === path.login && <></>}
      </div>
      <div className='col-span-5'>{children}</div>
    </div>
  )
}
