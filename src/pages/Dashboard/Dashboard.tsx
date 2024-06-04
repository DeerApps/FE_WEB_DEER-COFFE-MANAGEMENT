import { useState } from 'react'
import { Calendar, Progress } from '@nextui-org/react'
import { parseDate } from '@internationalized/date'
import { getNow } from 'src/utils/utils'
import EmployeeDate from 'src/pages/Dashboard/EmployeeDate'

export default function Dashboard() {
  let [value, setValue] = useState(parseDate(`${getNow()}`))

  return (
    <>
      <div className='grid grid-cols-12 grid-rows-5 h-full'>
        <div className='mr-5 col-span-8 col-start-1 row-start-1 row-span-2 h-full bg-white border border-solid border-black/10 shadow-sm rounded-lg'>
          <div className='p-8 flex-col content-around h-full'>
            <div className='flex h-[55%] justify-between'>
              <div className='h-full w-[65%] bg-zinc-100 rounded-md py-4'>
                <div className='col-span-4 text-2xl text-gray-500 px-4 mb-4 font-medium'>PENDING APPROVAL: 60</div>
                <div className='flex justify-between mt-2 px-3'>
                  <div className='bg-gray-500/50 text-white rounded-lg p-2 px-3'>
                    <span className='text-xl'>20</span> Shift Off
                  </div>
                  <div className='bg-gray-500/50 text-white rounded-lg p-2 px-3'>
                    <span className='text-xl'>10</span> Job Apply
                  </div>
                  <div className='bg-gray-500/50 text-white rounded-lg p-2'>
                    <span className='text-xl'>30</span> Shift Change
                  </div>
                </div>
              </div>
              <div className='h-full w-[32%] bg-zinc-100 rounded-sm py-4'>
                <div className='text-2xl text-gray-500 px-4 mb-3 font-medium'>KPI ARCHIEVED</div>
                <div className='text-5xl text-gray-700 px-12 mb-4 font-medium'>40/60</div>
              </div>
            </div>
            <div className='mt-2 h-[45%]'>
              <Progress
                size='md'
                radius='md'
                classNames={{
                  base: 'max-w-2x mb-2',
                  track: 'drop-shadow-md border border-default',
                  indicator: 'bg-gradient-to-r from-sky-500 to-blue-500',
                  label: 'tracking-wider font-medium text-default-600',
                  value: 'text-foreground/60'
                }}
                label='Today Checked In'
                value={30}
                showValueLabel={true}
              />
              <Progress
                size='md'
                radius='md'
                classNames={{
                  base: 'max-w-2x',
                  track: 'drop-shadow-md border border-default',
                  indicator: 'bg-gradient-to-r from-sky-500 to-blue-500',
                  label: 'tracking-wider font-medium text-default-600',
                  value: 'text-foreground/60'
                }}
                label='Unpicked Shift'
                value={65}
                showValueLabel={true}
              />
            </div>
          </div>
        </div>
        <div className='col-span-4 col-end-13 row-start-1 row-span-2 flex justify-end'>
          <Calendar
            className='flex justify-center item'
            calendarWidth='350px'
            aria-label='Date (Controlled)'
            value={value}
            onChange={setValue}
          />
        </div>
        <div className='col-span-12 row-span-3'>
          <EmployeeDate />
        </div>
      </div>
    </>
  )
}
