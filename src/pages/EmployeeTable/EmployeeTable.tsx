import { Employee, EmployeeList, EmployeeListConfig } from 'src/types/employee.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import employeeApi from 'src/apis/employee.api'
import classNames from 'classnames'
import Popover from 'src/components/Popover'
import { useState } from 'react'
import EmployeePopoverInfo from 'src/pages/EmployeeTable/EmployeePopoverInfo'
import { handleRenderNo } from 'src/utils/utils'
import { toast } from 'react-toastify'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Key } from 'node_modules/@react-types/shared/src/key'
import Pagination from 'src/components/Pagination'
import path from 'src/constant/path'

export type QueryConfig = {
  [key in keyof EmployeeListConfig]: string
}

const RoleBackground = {
  Employee: 'bg-blue-100/60',
  Admin: 'bg-gray-300/60',
  Manager: 'bg-[#C4C1D4]/70',
  SuperAdmin: 'bg-yellow-100/60'
}

export default function EmployeeTable() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState<Employee>()
  const queryConfig = useQueryConfig()

  const { data: employeesData, refetch } = useQuery({
    queryKey: ['employee', queryConfig],
    queryFn: () => {
      return employeeApi.getEmployees(queryConfig as EmployeeListConfig)
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const deleteEmployeeMutation = useMutation({
    mutationFn: employeeApi.deleteEmployee,
    onSuccess: () => {
      refetch()
      toast('Delete Successfully', { autoClose: 1000 })
    }
  })

  const employeeList = employeesData?.data.data as EmployeeList

  const handleClose = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (employeee: Employee) => (key: Key) => {
    if (key === 'update') {
      setIsOpen(!isOpen)
      setIsEdit(employeee)
    } else if (key === 'delete') {
      deleteEmployeeMutation.mutate({ employeeID: employeee.employeeID.toString() })
    }
  }

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
          <button
            aria-label='search_bar'
            className='text-gray-500 bg-gray-200 hover:bg-gray-300 ml-4 px-10 py-3 text-md font-medium rounded-lg'
          >
            Search
          </button>
        </form>
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
                className='bg-gray-100/80 h-[46px] mb-4 px-4 grid grid-cols-12 text-center rounded-xl items-center'
                key={item.id}
              >
                <div className='col-span-1 text-left pl-4'>
                  {handleRenderNo(employeesData?.data.data.pageNumber, employeesData?.data.data.pageSize, index)}
                </div>
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
                  <Popover
                    key={item.id}
                    initialOpen={isOpen}
                    renderPopover={isEdit && <EmployeePopoverInfo employee={isEdit} handleOpen={handleClose} />}
                  >
                    <Dropdown aria-label='drow down'>
                      <DropdownTrigger aria-label='drow triger'>
                        <Button
                          aria-label='btn_open_menu'
                          fullWidth={false}
                          color='default'
                          variant='shadow'
                          size='sm'
                          className='bg-none! shadow-none!'
                        >
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
                              d='M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                            />
                          </svg>
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label='Action event example' onAction={handleSelect(item)}>
                        <DropdownItem key='update'>Update</DropdownItem>
                        <DropdownItem key='delete' className='text-danger' color='danger'>
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        )}
        {!employeeList && (
          <div className='p-4 min-h-[625px]'>
            <div className='text-lg font-normal leading-none  text-blue-800 bg-blue-200 animate-pulse dark:bg-blue-900 dark:text-blue-200 min-h-[600px] text-center flex justify-center items-center'>
              loading...
            </div>
          </div>
        )}
        {employeeList && (
          <div className='flex justify-center'>
            <Pagination queryConfig={queryConfig} pageSize={employeeList.pageSize} pathName={path.employees} />
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
          )} */}
          </div>
        )}
      </div>
    </div>
  )
}
