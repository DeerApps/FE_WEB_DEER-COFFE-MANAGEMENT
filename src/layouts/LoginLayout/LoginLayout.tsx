import React from 'react'
// import Footer from 'src/components/Footer'
// import LoginHeader from 'src/components/LoginHeader'

interface Props {
  children?: React.ReactNode
}

export default function LoginLayout({ children }: Props) {
  return (
    <div>

      {children}

    </div>
  )
}
