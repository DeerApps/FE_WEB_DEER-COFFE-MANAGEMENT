import { useState } from 'react'
import { Calendar } from '@nextui-org/react'
import { parseDate } from '@internationalized/date'
import { getNow } from 'src/utils/utils'
import EmployeeDate from 'src/pages/Dashboard/EmployeeDate'
import ProgressBox from 'src/components/ProgressBox'

export default function Dashboard() {
  let [value, setValue] = useState(parseDate(`${getNow()}`))

  return (
    <>
      <div className='grid grid-cols-12 grid-rows-5 gap-8'>
        <div className='col-span-9 col-start-1 row-start-1 row-span-2 h-full bg-white border border-solid border-black/10 shadow-sm rounded-lg'>
          <div className='p-8 flex-col content-around h-full'>
            <ProgressBox progressValue={60} content='Checked In' />
            <ProgressBox progressValue={80} content='KPI Achieved' />
            <ProgressBox progressValue={20} content='Unpicked Shifts' />
            <ProgressBox progressValue={40} content='Pending Approval' />
          </div>
        </div>
        <div className='col-span-3 col-end-13  row-start-1 row-span-2 flex justify-end'>
          <Calendar
            className='flex justify-center item'
            calendarWidth='350px'
            aria-label='Date (Controlled)'
            value={value}
            onChange={setValue}
          />
        </div>
        <div className='col-span-12 row-span-3 flex items-end'>
          <EmployeeDate />
        </div>
      </div>
    </>
  )
}
