import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { clearLS } from 'src/utils/auth'

export default function Logout() {
  const { setIsAuthenticated, setUser, setEmployee } = useContext(AppContext)
  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setEmployee(null)
    clearLS()
  }
  return (
    <div className=' w-full p-2 flex justify-center items-center hover:bg-gray-100 rounded-lg'>
      <button
        onClick={handleLogout}
        className='h-[100%] text-md font-medium flex justify-center items-center text-red-500 '
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-5 mr-2'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
          />
        </svg>
        Logout
      </button>
    </div>
  )
}
