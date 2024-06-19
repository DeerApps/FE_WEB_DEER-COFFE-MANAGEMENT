import { useQuery } from '@tanstack/react-query'
import employeeShiftApi from 'src/apis/employeeShift.api'
import Pagination from 'src/components/Pagination'
import path from 'src/constant/path'
import { useNewQueryConfig } from 'src/hooks/useQueryConfig'
import { EmployeeShiftDayList, EmployeeShiftListConfig } from 'src/types/employeeShift.type'
import { formatTime, handleRenderNo, handleTime } from 'src/utils/utils'

export type EmployeeShiftQueryConfig = {
  [key in keyof EmployeeShiftListConfig]: string
}

export default function EmployeeData({ shiftDate }: { shiftDate: string }) {
  const queryConfig = useNewQueryConfig()

  const { data: employeeShiftData } = useQuery({
    queryKey: ['employeeshift', { ...queryConfig, dateOfWork: shiftDate }],
    queryFn: () => {
      return employeeShiftApi.getEmployeeShift({ ...queryConfig, dateOfWork: shiftDate } as EmployeeShiftListConfig)
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const employeeShiftList = employeeShiftData?.data.data as EmployeeShiftDayList
  console.log(employeeShiftList)

  return (
    <div className='min-h-[500px]'>
      {employeeShiftList && (
        <div className='p-2 bg-white rounded-lg mt-6 shadow-md mx-auto min-h-[340px]'>
          <div className='grid grid-cols-12 bg-gray-400/80 text-white my-2 text-lg font-medium p-4 py-2 rounded-xl text-center'>
            <div className='col-span-1'>No</div>
            <div className='col-span-2 '>Full Name</div>
            <div className='col-span-2 '>Phone number</div>
            <div className='col-span-2 '>Time</div>
            <div className='col-span-2 '>CheckIn-CheckOut</div>
            <div className='col-span-2 '>Status</div>
          </div>
          <div className='min-h-[330px] h-[330px]'>
            {employeeShiftData?.data.data.data.map((item, index) => (
              <div
                className='bg-gray-100/80 h-[46px] mb-4 px-4 grid grid-cols-12 text-center rounded-xl items-center'
                key={index}
              >
                <div className='col-span-1 pl-4'>
                  {handleRenderNo(
                    employeeShiftData?.data.data.pageNumber,
                    employeeShiftData?.data.data.pageSize,
                    index
                  )}
                </div>
                <div className='col-span-2'>{item.employee.fullName}</div>
                <div className='col-span-2'>{item.employee.phoneNumber}</div>
                <div className='col-span-2'>{handleTime(item.shift.shiftStart, item.shift.shiftEnd)}</div>
                <div className='col-span-2'>
                  {formatTime(item.checkIn)} - {formatTime(item.checkOut)}
                </div>
                <div className='col-span-2'>{item.status}</div>
              </div>
            ))}
          </div>
          {employeeShiftList && (
            <div className='flex justify-center '>
              <Pagination queryConfig={queryConfig} pageSize={employeeShiftList.pageSize} pathName={path.dashboard} />
              {/* {page === 1 ? (
              <div className='bg-slate-200/90 px-5 rounded-md mr-1 flex items-center transition'>
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
            ) : (
              <Link
                to={{
                  pathname: path.dashboard,
                  search: createSearchParams({
                    ...queryConfig,
                    pageNumber: (page - 1).toString()
                  }).toString()
                }}
                className='bg-slate-300 px-5 rounded-md mr-1 transition'
              >
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
              </Link>
            )}
            {Array(employeeShiftData?.data.data.pageCount)
              .fill(0)
              .map((_, index) => (
                <Link
                  to={{
                    pathname: path.dashboard,
                    search: createSearchParams({
                      ...queryConfig,
                      pageNumber: (index + 1).toString()
                    }).toString()
                  }}
                  key={index}
                  className={classNames('px-4 rounded-md text-white mx-1 flex items-center transition', {
                    'bg-blue-300': index + 1 === page,
                    'bg-slate-300': index + 1 !== page
                  })}
                >
                  {index + 1}
                </Link>
              ))}
            {page === (employeeShiftData?.data.data.pageCount as number) ? (
              <div className='bg-slate-200/90 px-5 rounded-md ml-1 flex items-center transition'>
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
            ) : (
              <Link
                to={{
                  pathname: path.dashboard,
                  search: createSearchParams({
                    ...queryConfig,
                    pageNumber: (page + 1).toString()
                  }).toString()
                }}
                className='bg-slate-300 px-5 rounded-md ml-1 transition'
              >
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
              </Link>
            )} */}
            </div>
          )}
        </div>
      )}
      {!employeeShiftList && (
        <div className='p-4 min-h-[625px]'>
          <div className='text-lg font-normal leading-none  text-blue-800 bg-blue-200 animate-pulse dark:bg-blue-900 dark:text-blue-200 min-h-[600px] text-center flex justify-center items-center'>
            loading...
          </div>
        </div>
      )}
    </div>
  )
}
