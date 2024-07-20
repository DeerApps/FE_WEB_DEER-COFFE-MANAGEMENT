import { useQuery } from '@tanstack/react-query'
import employeeShiftApi from 'src/apis/employeeShift.api'
import path from 'src/constant/path'
import { useNewQueryConfig } from 'src/hooks/useQueryConfig'
import Pagination from 'src/pages/Dashboard/Pagination'
import { EmployeeReportConfig, EmployeeShiftDayList, EmployeeShiftListConfig } from 'src/types/employeeShift.type'
import { handleRenderNo } from 'src/utils/utils'


export default function EmployeeReport() {
  const queryConfig = useNewQueryConfig()

  const { data: employeeShiftData, isLoading } = useQuery({
    queryKey: ['employeeshift', { ...queryConfig}],
    queryFn: () => {
      return employeeShiftApi.getEmployeeRecord({ ...queryConfig} as EmployeeReportConfig)
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const employeeShiftList = employeeShiftData?.data.data as EmployeeShiftDayList
  console.log(employeeShiftList)

  return (
    <div className='min-h-[425px]'>
      {!isLoading && (
        <div className='p-2 bg-white rounded-lg mt-6 shadow-md mx-auto min-h-[425px]'>
          <div className='grid grid-cols-12 bg-gray-400/80 text-white my-2 text-lg font-medium p-4 py-2 rounded-xl text-center'>
            <div className='col-span-1'>No</div>
            <div className='col-span-5 '>Full Name</div>
            <div className='col-span-6'>Work Hour</div>
          </div>
          {employeeShiftList && (
            <div className='min-h-[310px] h-[310px]'>
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
                  <div className='col-span-5'>{item.fullName}</div>
                  <div className='col-span-6'>{item.workHour}</div>
                </div>
              ))}
            </div>
          )}
          {employeeShiftList && (
            <div className='flex justify-center '>
              <Pagination queryConfig={queryConfig} pageSize={employeeShiftList.pageCount} pathName={path.dashboard} />
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
          <div className='text-lg font-normal leading-none  text-blue-800 bg-blue-200 animate-pulse dark:bg-blue-900 dark:text-blue-200 min-h-[425px] text-center flex justify-center items-center'>
            loading...
          </div>
        </div>
      )}
    </div>
  )
}