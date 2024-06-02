import React from 'react'
// import Footer from 'src/components/Footer'
// import LoginHeader from 'src/components/LoginHeader'

interface Props {
  children?: React.ReactNode
}

export default function LoginLayout({ children }: Props) {
  return (
    <div className='grid grid-cols-12 bg-sky-200'>
      <div className='col-span-7 flex justify-center items-center'>
        {/* <img src='https://lh3.google.com/u/0/d/1sfCMCqs5fGIfQvM4CJwWclx-d0jzaf13=w2548-h1850-iv1' alt='' /> */}
      </div>
      <div className='col-span-5'>{children}</div>
    </div>
  )
}
