import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Key, useState } from "react"
import { toast } from "react-toastify"
import employeeApi from "src/apis/employee.api"

import { Employee, EmployeeListConfig } from "src/types/employee.type"
import EmployeePopoverInfo from "../EmployeeTable/EmployeePopoverInfo"
import Popover from "src/components/Popover"
import { useQueryConfig } from "src/hooks/useQueryConfig"

export default function Restaurant() {

  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState<Employee>()
  const queryConfig = useQueryConfig()

  const { data: restaurantData, refetch } = useQuery({
    queryKey: ['restaurant', queryConfig],
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

  const handleSelect = (employeee: Employee) => (key: Key) => {
    if (key === 'update') {
      setIsOpen(!isOpen)
      setIsEdit(employeee)
    } else if (key === 'delete') {
      deleteEmployeeMutation.mutate({ employeeID: employeee.employeeID.toString() })
    }
  }

  const handleClose = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsOpen(!isOpen)
  }

  return(
    <div className='p-2 px-2 bg-white rounded-lg shadow-md mx-auto min-h-[420px]'>
      <div className='grid grid-cols-12 bg-gray-400/80 text-white my-2 text-lg font-medium p-4 py-2 rounded-xl text-center'>
        <div className='col-span-1 text-left'>No</div>
        <div className='col-span-3 text-left'>Restaurant ID</div>
        <div className='col-span-3 text-left'>Restaurant Name</div>
        <div className='col-span-3 text-left'>Restaurant Manager</div>
        <div className='col-span-1 ml-6 text-left'>Action</div>
      </div>
      {/* {employeeList.map((item,employee) => (
        <div 
        key={employee.id} 
        className='bg-white h-[46px] rounded-xl bg-gray-100/50 mb-3 p-3 grid grid-cols-12 text-center'>
          <div className='col-span-1 text-left'>{employee.id}</div>
          <div className='col-span-3 text-left'>{employee.name}</div>
          <div className='col-span-3 text-left'>{employee.shift}</div>
          <div className='col-span-3 text-left'>{employee.time}</div>
          <div className='col-span-1 flex justify-center'>
                  <Popover
                    key={employee.id}
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
                      <DropdownMenu aria-label='Action event example' onAction={handleSelect(items)}>
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
      {employeeList && (
          <div className='p-1'>
            <div className='text-lg rounded-lg min-h-[310px] font-normal leading-none  text-blue-800 bg-blue-200 animate-pulse dark:bg-blue-900 dark:text-blue-200 text-center flex justify-center items-center'>
              loading...
            </div>
          </div>
        )} */}
      <div className='flex justify-center mt-5'>
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
      </div>
    </div>
  )   
}
