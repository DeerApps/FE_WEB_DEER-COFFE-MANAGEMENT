import { Outlet } from 'react-router-dom'
import ApprovalItem from 'src/pages/Approval/ApprovalItem/ApprovalItem'

export default function Approval() {
  return (
    <div className='grid grid-cols-10 gap-4 h-full'>
      <div className='col-span-4 border border-slate-300 rounded-md p-3 bg-white'>
        <div className='p-3 mb-4 border border-slate-300 shadow-lg rounded-md font-medium text-md text-gray-500 grid grid-cols-8'>
          <div className='col-span-1 border-r-2'>No</div>
          <div className='col-span-4 border-r-2 pl-3'>Employee Name</div>
          <div className='col-span-3 pl-4'>Created At</div>
        </div>
        <ApprovalItem number='01' name='Trần Đình Thiên Tân' createAt='24:00 24-12-2004' isDanger />
        <ApprovalItem number='02' name='Trần Thị Meo Meo' createAt='24:00 24-12-2004' isDanger />
        <ApprovalItem number='03' name='Trần Thị Gâu Gâu' createAt='24:00 24-12-2004' isDanger />
        <ApprovalItem number='04' name='Trần Thị Gâu Gâu' createAt='24:00 24-12-2004' />
        <ApprovalItem number='05' name='Trần Thị Gâu Gâu' createAt='24:00 24-12-2004' />
        <ApprovalItem number='06' name='Trần Thị Gâu Gâu' createAt='24:00 24-12-2004' />
        <ApprovalItem number='07' name='Trần Thị Gâu Gâu' createAt='24:00 24-12-2004' />
        <ApprovalItem number='08' name='Trần Thị Gâu Gâu' createAt='24:00 24-12-2004' />
        <ApprovalItem number='09' name='Trần Thị Gâu Gâu' createAt='24:00 24-12-2004' />
        <ApprovalItem number='10' name='Trần Thị Gâu Gâu' createAt='24:00 24-12-2004' />
        <ApprovalItem number='11' name='Trần Thị Gâu Gâu' createAt='24:00 24-12-2004' />

        <div className='flex justify-center mt-1'>
          <div className='bg-slate-300/90 px-5 rounded-md mr-1 flex items-center transition'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='white'
              className='size-7'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18' />
            </svg>
          </div>
          <div className='bg-slate-300/90 px-5 rounded-md ml-1 flex items-center transition'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='white'
              className='size-7'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
            </svg>
          </div>
        </div>
      </div>
      <div className='col-span-6 border border-slate-300 bg-white rounded-md p-4'>
        <Outlet />
      </div>
    </div>
  )
}
