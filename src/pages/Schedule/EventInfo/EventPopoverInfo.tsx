import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import employeeShiftApi from 'src/apis/employeeShift.api'
import { AppContext } from 'src/context/app.context'
import { EmployeeShiftEvent } from 'src/types/employeeShift.type'
import { handleDate, handleTimeClock, toLocalISOString } from 'src/utils/utils'

interface Props {
  employeeShift: EmployeeShiftEvent
  handleOpen: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  date: Date
  isMonth: boolean
}

export default function EventPopoverInfo({ handleOpen, employeeShift, date, isMonth }: Props) {
  const { user } = useContext(AppContext)
  const queryClient = useQueryClient()

  const lockShiftMutation = useMutation({
    mutationFn: employeeShiftApi.lockShift,
    onSuccess: () => {
      toast.success('Locking Shift Sucessfully!', { autoClose: 1000 })
      queryClient.invalidateQueries({ queryKey: ['employeeshiftevent', date, isMonth] })
    },
    onError: (_error) => {
      toast.error('Locking Shift Fail!', { autoClose: 1000 })
    }
  })

  const deleteShiftMutation = useMutation({
    mutationFn: employeeShiftApi.deleteEmployeeShift,
    onSuccess: () => {
      toast.success('Remove Shift Sucessfully!', { autoClose: 1000 })
      queryClient.invalidateQueries({ queryKey: ['employeeshiftevent', date, isMonth] })
    },
    onError: (_error) => {
      toast.error('Remove Shift Fail!', { autoClose: 1000 })
    }
  })

  const handleLock = (isLock: boolean) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    lockShiftMutation.mutate({
      dateOfWork: employeeShift.resource?.dateOfWork as string,
      start: toLocalISOString(employeeShift.start),
      end: toLocalISOString(employeeShift.end),
      isLocked: isLock
    })
    handleOpen(e)
  }

  const handleDelete = () => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    deleteShiftMutation.mutate({ shiftID: employeeShift.resource?.id as string })
    handleOpen(e)
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
        <div className='w-[60%] h-[100%] p-2 bg-gray-100 flex flex-col justify-center items-center'>
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
              {(employeeShift.resource?.employeeNote as number) > 0
                ? `Early leave ${Math.abs(employeeShift.resource?.employeeNote as number)} minutes`
                : `Late present ${Math.abs(employeeShift.resource?.employeeNote as number)} minutes`}
            </div>
          </div>
          {user?.RoleName != 'Employee' && (
            <div className='ml-4 flex justify-start items-center h-[9%] w-full'>
              <button
                type='button'
                onClick={handleLock(!(employeeShift.resource?.isLocked != 'False'))}
                className='rounded-md py-3 px-4 w-[140px] h-[100%] bg-slate-400 mr-4 text-white hover:bg-slate-400/80 text-lg mt-auto outline-none'
              >
                {employeeShift.resource?.isLocked == 'False' ? 'UnLock' : 'Lock'}
              </button>
              <button
                type='button'
                onClick={handleDelete()}
                className='rounded-md py-3 px-4 w-[140px] h-[100%] bg-red-300 mr-4 text-white text-lg hover:bg-red-300/80 mt-auto outline-none'
              >
                Delete
              </button>
            </div>
          )}
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
            <input
              readOnly
              value={employeeShift.resource?.employee.id}
              className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'
            />
          </div>
          <div className='flex w-full h-[7%] items-center mb-5'>
            <div className='w-[40%]'>Employee Name</div>
            <input
              readOnly
              value={employeeShift.resource?.employee.fullName}
              className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'
            />
          </div>
          <div className='flex w-full h-[7%] items-center mb-5'>
            <div className='w-[40%]'>Employee Email</div>
            <input
              readOnly
              value={employeeShift.resource?.employee.email}
              className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'
            />
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
          <div className='flex w-full h-[26%] justify-around items-center mb-5'>
            <div className='w-[48%] border shadow-md h-full'>
              {Boolean(employeeShift.resource?.checkInUrl) == false ? (
                <div className='w-full h-full flex justify-center items-center'>NotYet</div>
              ) : (
                <img
                  className='w-full h-full border border-black/25'
                  alt='img_checkin'
                  src={employeeShift.resource?.checkInUrl}
                />
              )}
            </div>
            <div className='w-[48%] border shadow-md h-full'>
              {Boolean(employeeShift.resource?.checkOutUrl) == false ? (
                <div className='w-full h-full flex justify-center items-center'>NotYet</div>
              ) : (
                <img
                  className='w-full h-full border border-black/25'
                  alt='img_checkout'
                  src={employeeShift.resource?.checkOutUrl}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
