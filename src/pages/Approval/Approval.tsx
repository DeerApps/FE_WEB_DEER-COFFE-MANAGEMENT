import { Outlet } from 'react-router-dom'
import ApprovalItem from 'src/pages/Approval/ApprovalItem/ApprovalItem'

export default function Approval() {
  return (
    <div className='grid grid-cols-10 gap-4 h-full'>
      <div className='col-span-4 border border-slate-300 rounded-md p-4 bg-white'>
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
      </div>
      <div className='col-span-6 border border-slate-300 bg-white rounded-md p-4'>
        <Outlet />
      </div>
    </div>
  )
}
