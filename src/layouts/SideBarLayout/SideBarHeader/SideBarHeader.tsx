import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'

export default function SideBarHeader() {
  const { employee } = useContext(AppContext)
  return (
    <div className='px-10 h-[7%] bg-stone-100 flex justify-end items-center'>
      <div className='px-2 mr-2 text-xl font-medium text-zinc-600'>{employee?.fullName}</div>
      <div className='w-9 h-9 mr-0 flex-shrink-0'>
        <img src={'https://picsum.photos/200/300'} alt='avatar' className='w-full h-full object-cover rounded-full' />
      </div>
    </div>
  )
}
