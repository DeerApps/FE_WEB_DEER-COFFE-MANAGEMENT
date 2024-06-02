import { EmployeeList, EmployeeListConfig } from 'src/types/employee.type'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useQuery } from '@tanstack/react-query'
import employeeApi from 'src/apis/employee.api'
import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constant/path'

export type QueryConfig = {
  [key in keyof EmployeeListConfig]: string
}

const RoleBackground = {
  Employee: 'bg-blue-100/60',
  Admin: 'bg-gray-300/60',
  Manager: 'bg-[#C4C1D4]/40',
  SuperAdmin: 'bg-yellow-100/60'
}

export default function EmployeeTable() {
  const queryConfig = useQueryConfig()

  const { data: employeesData } = useQuery({
    queryKey: ['employee', queryConfig],
    queryFn: () => {
      return employeeApi.getEmployees(queryConfig as EmployeeListConfig)
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const page = Number(queryConfig.pageNumber)

  const employeeList = employeesData?.data.data as EmployeeList

  return (
    <div className='bg-white h-full border border-gray-300 rounded-md'>
      <div className='pt-7 px-4 flex justify-between items-center'>
        <form className='flex ml-5'>
          <div className='border border-gray-300 py-2 px-4 rounded-lg flex'>
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
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
            <input className='outline-none px-3' type='text' placeholder='Search by name...' />
          </div>
          <button className='text-gray-500 bg-gray-200 hover:bg-gray-300 ml-4 px-10 py-3 text-md font-medium rounded-lg'>
            Search
          </button>
        </form>
        <button className='border text-gray-500 bg-gray-200 hover:bg-gray-300 px-4 mr-3 text-md font-medium rounded-lg flex justify-between items-center'>
          Add New
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-10 pl-2'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
          </svg>
        </button>
      </div>
      <div className='min-h-[700px]'>
        {employeeList && (
          <div className='p-4 min-h-[625px]'>
            <div className='grid grid-cols-12 bg-gray-400/80 text-white my-3 text-lg font-medium p-4 py-2 rounded-xl text-center items-center'>
              <div className='col-span-1 text-left pl-4'>No</div>
              <div className='col-span-3'>Full Name</div>
              <div className='col-span-2'>Phone Number</div>
              <div className='col-span-2'>Role</div>
              <div className='col-span-2'>Status</div>
              <div className='col-span-2'>Action</div>
            </div>
            {employeesData?.data.data.data.map((item, index) => (
              <div
                className='bg-gray-100/80 h-[46px] mb-3 px-4 grid grid-cols-12 text-center rounded-xl items-center'
                key={item.id}
              >
                <div className='col-span-1 text-left pl-4'>{index + 1}</div>
                <div className='col-span-3'>{item.fullName}</div>
                <div className='col-span-2'>{item.phoneNumber}</div>
                <div className='col-span-2 flex items-center justify-center'>
                  <div
                    className={`rounded-full h-[30px] w-[120px] flex items-center justify-center ${RoleBackground[item.roleName] || 'bg-gray-200 '} text-center`}
                  >
                    {item.roleName}
                  </div>
                </div>
                <div className='col-span-2 flex items-center justify-center'>
                  <div className='w-[80px] flex items-center justify-start'>
                    <div
                      className={classNames('h-2 w-2 rounded-full', {
                        'bg-green-500': item.isActive,
                        'bg-red-500': !item.isActive
                      })}
                    ></div>
                    <div className='ml-2'>{item.isActive ? 'Active' : 'Paused'}</div>
                  </div>
                </div>
                <div className='col-span-2 flex justify-center'>
                  <button>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='size-8'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className='flex justify-center'>
          {page === 1 ? (
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
                pathname: path.employees,
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
          {Array(employeesData?.data.data.pageCount)
            .fill(0)
            .map((_, index) => (
              <Link
                to={{
                  pathname: path.employees,
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
          {page === (employeesData?.data.data.pageCount as number) ? (
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
                pathname: path.employees,
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
          )}
        </div>
      </div>
    </div>
  )
}
