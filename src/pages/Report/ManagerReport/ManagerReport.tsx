import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import employeeShiftApi from 'src/apis/employeeShift.api'
import path from 'src/constant/path'
import { useNewQueryConfig } from 'src/hooks/useQueryConfig'
import Pagination from 'src/pages/Dashboard/Pagination'
import { EmployeeShiftDayList, EmployeeShiftListConfig } from 'src/types/employeeShift.type'
import { handleRenderNo } from 'src/utils/utils'

export default function ManagerReport() {
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf('week'))

  const queryConfig = {
    ...useNewQueryConfig(),
    startDate: currentWeek.format('YYYY-MM-DD'),
    endDate: currentWeek.endOf('week').format('YYYY-MM-DD')
  }

  const { data: employeeShiftData, isLoading, refetch } = useQuery({
    queryKey: ['employeeshift', queryConfig],
    queryFn: () => {
      return employeeShiftApi.getEmployeeWorkHour(queryConfig as EmployeeShiftListConfig)
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const employeeShiftList = employeeShiftData?.data.data as EmployeeShiftDayList

  const handleNextWeek = () => {
    setCurrentWeek((prev) => prev.add(1, 'week'))
    window.location.reload();
  }

  const handlePreviousWeek = () => {
    setCurrentWeek((prev) => prev.subtract(1, 'week'))
    window.location.reload();
  }

  useEffect(() => {
    refetch()
  }, [currentWeek, refetch])

  const totalWorkHours = employeeShiftList ? employeeShiftList.data.reduce((total, item) => total + (item.workHour ?? 0), 0) : 0

  return (
    <div className='min-h-[425px]'>
      <div className='flex justify-between items-center p-4 bg-white rounded-lg mt-6 shadow-md mx-auto'>
        <button onClick={handlePreviousWeek} className='bg-gray-300 p-2 rounded'>Previous Week</button>
        <div className='text-lg font-medium'>
          {currentWeek.format('MMM DD, YYYY')} - {currentWeek.endOf('week').format('MMM DD, YYYY')}
        </div>
        <button onClick={handleNextWeek} className='bg-gray-300 p-2 rounded'>Next Week</button>
      </div>
      {!isLoading && (
        <div className='p-2 bg-white rounded-lg mt-6 shadow-md mx-auto min-h-[425px]'>
          <div className='grid grid-cols-12 bg-gray-400/80 text-white my-2 text-lg font-medium p-4 py-2 rounded-xl text-center'>
            <div className='col-span-5'>Full Name</div>
            <div className='col-span-6'>Work Hour</div>
          </div>
          {employeeShiftList && (
            <div className='min-h-[310px] h-[310px]'>
              {employeeShiftList.data.map((item, index) => (
                <div
                  className='bg-gray-100/80 h-[46px] mb-4 px-4 grid grid-cols-12 text-center rounded-xl items-center'
                  key={index}
                >
                  <div className='col-span-5'>{item.fullName}</div>
                  <div className='col-span-6'>{item.workHour ?? 0}</div>
                </div>
              ))}
            </div>
          )}
          <div className='text-right p-4 font-medium'>
            Total Work Hours: {totalWorkHours}
          </div>
          {employeeShiftList && (
            <div className='flex justify-center'>
              <Pagination queryConfig={queryConfig} pageSize={employeeShiftList.pageCount} pathName={path.managerReport} />
            </div>
          )}
          {!employeeShiftList && (
            <div className='flex flex-col justify-center items-center min-h-[340px] h-[340px]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
                />
              </svg>
              <p className='mt-1'>Empty</p>
            </div>
          )}
        </div>
      )}
      {isLoading && (
        <div className='p-4 min-h-[425px]'>
          <div className='text-lg font-normal leading-none text-blue-800 bg-blue-200 animate-pulse dark:bg-blue-900 dark:text-blue-200 min-h-[425px] text-center flex justify-center items-center'>
            loading...
          </div>
        </div>
      )}
    </div>
  )
}
