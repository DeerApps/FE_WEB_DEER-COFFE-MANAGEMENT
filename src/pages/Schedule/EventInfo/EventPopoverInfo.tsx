import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import employeeShiftApi from 'src/apis/employeeShift.api'
import { EmployeeShiftEvent } from 'src/types/employeeShift.type'
import { handleDate, handleTimeClock, toLocalISOString } from 'src/utils/utils'

interface Props {
  employeeShift: EmployeeShiftEvent
  handleOpen: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  date: Date
  isMonth: boolean
}

export default function EventPopoverInfo({ handleOpen, employeeShift, date, isMonth }: Props) {
  const queryClient = useQueryClient()

  const lockShiftMutation = useMutation({
    mutationFn: employeeShiftApi.lockShift,
    onSuccess: () => {
      toast.success('Locking Sucessfully!', { autoClose: 1000 })
      queryClient.invalidateQueries({ queryKey: ['employeeshiftevent', date, isMonth] })
    },
    onError: (_error) => {
      toast.error('Locking Fail!', { autoClose: 1000 })
    }
  })

  const deleteShiftMutation = useMutation({
    mutationFn: employeeShiftApi.deleteEmployeeShift,
    onSuccess: () => {
      toast.success('Locking Sucessfully!', { autoClose: 1000 })
      queryClient.invalidateQueries({ queryKey: ['employeeshiftevent', date, isMonth] })
    },
    onError: (_error) => {
      toast.error('Locking Fail!', { autoClose: 1000 })
    }
  })

  const handleLock = (isLock: boolean) => () => {
    lockShiftMutation.mutate({
      dateOfWork: employeeShift.resource?.dateOfWork as string,
      start: toLocalISOString(employeeShift.start),
      end: toLocalISOString(employeeShift.end),
      isLocked: isLock
    })
  }

  const handleDelete = () => {
    deleteShiftMutation.mutate({ shiftID: employeeShift.resource?.id as string })
  }

  return (
    <div className='w-[75%] h-[95%] bg-white p-5'>
      <div className='flex justify-between items-center'>
        <div className='p-2 ml-4 text-3xl font-normal text-gray-600 flex items-center'>Shift Information</div>
        <button onClick={handleOpen} className='rounded-md py-2 px-8 bg-gray-200 text-gray-500 h-[10%]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3' />
          </svg>
        </button>
      </div>
      <div className='flex w-[100%] h-[90%] justify-between my-2'>
        <div className='w-[60%] h-[100%] p-2 bg-gray-100'>
          <div className='flex w-full mt-5 mb-[4%] h-[8%]'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Id</div>
            <div className='w-[80%] ml-2 mr-10 bg-white outline-none border border-gray-300 rounded-sm pl-5 pt-2 text-md '>
              {employeeShift?.resource?.id}
            </div>
          </div>
          <div className='flex w-full mb-[4%] h-[8%]'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Date</div>
            <div className='w-[80%] ml-2 mr-10 bg-white outline-none border border-gray-300 rounded-sm pl-5 pt-2 text-md'>
              {employeeShift?.resource?.dateOfWork}
            </div>
          </div>
          <div className='flex w-full mb-[4%] h-[8%]'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Start</div>
            <div className='w-[80%] ml-2 mr-10 bg-white outline-none border border-gray-300 rounded-sm pl-5 pt-2 text-md'>
              {handleTimeClock(employeeShift?.start)}
            </div>
          </div>
          <div className='flex w-full mb-[4%] h-[8%]'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>End</div>
            <div className='w-[80%] ml-2 mr-10 bg-white outline-none border border-gray-300 rounded-sm pl-5 pt-2 text-md'>
              {handleTimeClock(employeeShift?.end)}
            </div>
          </div>
          <div className='flex w-full mb-[4%] h-[8%]'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Check In</div>
            <div className='w-[80%] ml-2 mr-10 bg-white outline-none border border-gray-300 rounded-sm pl-5 pt-2 text-md'>
              {handleTimeClock(employeeShift?.resource?.actual_CheckIn)}
            </div>
          </div>
          <div className='flex w-full mb-[4%] h-[8%]'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Check Out</div>
            <div className='w-[80%] ml-2 mr-10 bg-white outline-none border border-gray-300 rounded-sm pl-5 pt-2 text-md'>
              {handleTimeClock(employeeShift?.resource?.actual_CheckOut)}
            </div>
          </div>
          <div className='flex w-full mb-[4%] h-[8%]'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Note</div>
            <div className='w-[80%] ml-2 mr-10 bg-white outline-none border border-gray-300 rounded-sm pl-5 pt-2 text-md'>
              {employeeShift.resource?.note}
            </div>
          </div>
          <div className='ml-4 flex justify-start items-center h-[9%]'>
            <button
              type='button'
              onClick={handleLock(!employeeShift.resource?.isLocked)}
              className='rounded-md py-3 px-4 w-[140px] h-[100%] bg-yellow-200 mr-4 text-gray-500 mt-auto outline-none'
            >
              {employeeShift.resource?.isLocked != null ? 'Lock' : employeeShift.resource?.isLocked ? 'UnLock' : 'Lock'}
            </button>
            <button
              type='button'
              onClick={handleDelete}
              className='rounded-md py-3 px-4 w-[140px] h-[100%] bg-red-300 mr-4 text-gray-500 mt-auto outline-none'
            >
              Delete
            </button>
          </div>
        </div>
        <div className='w-[38%] p-4 px-5 bg-gray-100'>
          <div className='p-4 flex justify-center items-center mb-10'>
            <div className='h-[100px] w-[100px]'>
              <img
                className='h-full w-full rounded-full shadow-lg'
                src='https://picsum.photos/200/300'
                alt='EmployeePicture'
              />
            </div>
          </div>
          <div className='flex w-full h-[7%] items-center mb-5'>
            <div className='w-[40%]'>Employee Id</div>
            <div className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'>
              {employeeShift.resource?.employee.id}
            </div>
          </div>
          <div className='flex w-full h-[7%] items-center mb-5'>
            <div className='w-[40%]'>Employee Name</div>
            <div className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'>
              {employeeShift.resource?.employee.fullName}
            </div>
          </div>
          <div className='flex w-full h-[7%] items-center mb-5'>
            <div className='w-[40%]'>Employee Email</div>
            <div className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'>
              {employeeShift.resource?.employee.email}
            </div>
          </div>
          <div className='flex w-full h-[7%] items-center mb-5'>
            <div className='w-[40%]'>Employee Phone</div>
            <div className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'>
              {employeeShift.resource?.employee.phoneNumber}
            </div>
          </div>

          <div className='flex w-full h-[7%] items-center mb-5'>
            <div className='w-[40%]'>Joined</div>
            <div className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'>
              {handleDate(employeeShift.resource?.employee.dateJoined)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
