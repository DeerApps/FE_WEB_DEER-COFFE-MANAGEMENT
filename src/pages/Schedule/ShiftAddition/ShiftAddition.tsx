import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { TimeInput } from '@nextui-org/react'
import { Time } from '@internationalized/date'
import employeeShiftApi from 'src/apis/employeeShift.api'
import Pagination from 'src/components/Pagination'
import path from 'src/constant/path'
import { useNewQueryConfig10 } from 'src/hooks/useQueryConfig'
import { EmployeeShift, EmployeeShiftDayList, EmployeeShiftListConfig } from 'src/types/employeeShift.type'
import { handleDate, handleRenderNo, handleTimeClock, toLocalISOString } from 'src/utils/utils'

interface Props {
  handleOpen: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  scheduleDate: Date
  scheduleIsMonth: boolean
}

const date = new Date()

export default function ShiftAddition({ handleOpen, scheduleDate, scheduleIsMonth }: Props) {
  const [isChoose, setIsChoose] = useState<EmployeeShift | null>(null)
  const queryConfig = useNewQueryConfig10()
  const queryClient = useQueryClient()

  // State to hold checkIn and checkOut times for each employeeShiftID
  const [timeState, setTimeState] = useState<{ [key: string]: { checkIn: string | null; checkOut: string | null } }>({})

  const { data: employeeShiftData, refetch } = useQuery({
    queryKey: ['employeeshiftreview', date],
    queryFn: () => {
      return employeeShiftApi.getEmployeeShiftByReview({
        ...queryConfig,
        dateOfWork: handleDate(date)
      } as EmployeeShiftListConfig)
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const assignAdditionShiftMutation = useMutation({
    mutationFn: employeeShiftApi.assignAdditionShift,
    onSuccess: () => {
      toast.success('Assigned Successfully!', { autoClose: 1000 })
      refetch()
      queryClient.invalidateQueries({ queryKey: ['employeeshiftevent', scheduleDate, scheduleIsMonth] })
    },
    onError: (_error) => {
      toast.error('Assignment Failed!', { autoClose: 1000 })
    }
  })

  const handleUpdate =
    (employeeShiftID: string, checkIn: string, checkOut: string) =>
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      assignAdditionShiftMutation.mutate({
        employeeShiftID: employeeShiftID,
        checkIn: checkIn as string,
        checkOut: checkOut as string
      })
      handleOpen(e)
    }

  const employeeShiftList = employeeShiftData?.data.data as EmployeeShiftDayList

  const renderEmp = () => {
    if (!employeeShiftList || employeeShiftList.data.length === 0) {
      return null
    }
    return isChoose || employeeShiftList.data[0]
  }

  const handleClick = (item: EmployeeShift) => () => {
    setIsChoose(item)
  }

  const handleOnchangeTime = (employeeShiftID: string, isCheckIn: boolean) => (time: Time) => {
    const newDate = new Date(date)
    newDate.setHours(time.hour)
    newDate.setMinutes(time.minute)
    newDate.setSeconds(time.second)
    newDate.setMilliseconds(time.millisecond)

    const updatedState = {
      ...timeState,
      [employeeShiftID]: {
        ...timeState[employeeShiftID],
        checkIn: isCheckIn ? newDate.toISOString() : timeState[employeeShiftID]?.checkIn,
        checkOut: !isCheckIn ? newDate.toISOString() : timeState[employeeShiftID]?.checkOut
      }
    }

    setTimeState(updatedState)
  }

  return (
    <div className='w-[85%] h-[95%] bg-white p-5'>
      <div className='flex justify-between items-center'>
        <div className='p-2 ml-4 text-3xl font-normal text-gray-600 flex items-center'>Shift Addition</div>
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
        {employeeShiftData && (
          <div className='w-[65%] h-[100%] p-2 bg-gray-100'>
            <div className='grid grid-cols-12 bg-gray-400/80 text-white my-3 text-lg font-normal p-4 py-2 rounded-xl text-center items-center'>
              <div className='col-span-1 text-left pl-4'>No</div>
              <div className='col-span-2 truncate'>Actual CheckIn</div>
              <div className='col-span-3 truncate'>Actual CheckOut</div>
              <div className='col-span-2'>CheckIn</div>
              <div className='col-span-2'>CheckOut</div>
              <div className='col-span-2'>Action</div>
            </div>
            <div className='min-h-[85%] h-[85%]'>
              {employeeShiftData?.data?.data?.data?.map((item, index) => (
                <div
                  key={index}
                  className='grid grid-cols-12 bg-gray-400/30 text-slate-600 my-3 text-lg font-normal p-4 py-2 rounded-xl text-center items-center'
                  onClick={handleClick(item)}
                >
                  <div className='col-span-1 text-left pl-4'>
                    {handleRenderNo(
                      employeeShiftData?.data.data.pageNumber,
                      employeeShiftData?.data.data.pageSize,
                      index
                    )}
                  </div>
                  <div className='col-span-2'>{handleTimeClock(item.actual_CheckIn)}</div>
                  <div className='col-span-3'>{handleTimeClock(item.actual_CheckOut)}</div>
                  <div className='col-span-2 flex justify-center items-center'>
                    <TimeInput
                      aria-label={`checkInAddition-${item.id}`}
                      className='w-[90%]'
                      defaultValue={
                        new Time(
                          new Date(item.actual_CheckIn).getHours(),
                          new Date(item.actual_CheckIn).getMinutes(),
                          new Date(item.actual_CheckIn).getSeconds(),
                          new Date(item.actual_CheckIn).getMilliseconds()
                        )
                      }
                      minValue={
                        new Time(
                          new Date(item.actual_CheckIn).getHours(),
                          new Date(item.actual_CheckIn).getMinutes(),
                          new Date(item.actual_CheckIn).getSeconds(),
                          new Date(item.actual_CheckIn).getMilliseconds()
                        )
                      }
                      value={
                        timeState[item.id]?.checkIn
                          ? new Time(
                              new Date(timeState[item.id].checkIn as string).getHours(),
                              new Date(timeState[item.id].checkIn as string).getMinutes(),
                              new Date(timeState[item.id].checkIn as string).getSeconds(),
                              new Date(timeState[item.id].checkIn as string).getMilliseconds()
                            )
                          : new Time(
                              new Date(item.actual_CheckIn).getHours(),
                              new Date(item.actual_CheckIn).getMinutes(),
                              new Date(item.actual_CheckIn).getSeconds(),
                              new Date(item.actual_CheckIn).getMilliseconds()
                            )
                      }
                      onChange={handleOnchangeTime(item.id, true)}
                    />
                  </div>
                  <div className='col-span-2 flex justify-center items-center'>
                    <TimeInput
                      aria-label={`checkOutAddition-${item.id}`}
                      className='w-[90%]'
                      maxValue={
                        new Time(
                          new Date(item.actual_CheckOut).getHours(),
                          new Date(item.actual_CheckOut).getMinutes(),
                          new Date(item.actual_CheckOut).getSeconds(),
                          new Date(item.actual_CheckOut).getMilliseconds()
                        )
                      }
                      value={
                        timeState[item.id]?.checkOut
                          ? new Time(
                              new Date(timeState[item.id].checkOut as string).getHours(),
                              new Date(timeState[item.id].checkOut as string).getMinutes(),
                              new Date(timeState[item.id].checkOut as string).getSeconds(),
                              new Date(timeState[item.id].checkOut as string).getMilliseconds()
                            )
                          : new Time(
                              new Date(item.actual_CheckOut).getHours(),
                              new Date(item.actual_CheckOut).getMinutes(),
                              new Date(item.actual_CheckOut).getSeconds(),
                              new Date(item.actual_CheckOut).getMilliseconds()
                            )
                      }
                      onChange={handleOnchangeTime(item.id, false)}
                    />
                  </div>
                  <div className='col-span-2'>
                    <button
                      onClick={handleUpdate(
                        item.id,
                        timeState[item.id]?.checkIn == null
                          ? toLocalISOString(new Date(item.actual_CheckIn))
                          : (timeState[item.id]?.checkIn as string),
                        timeState[item.id]?.checkOut == null
                          ? toLocalISOString(new Date(item.actual_CheckOut))
                          : (timeState[item.id]?.checkOut as string)
                      )}
                      className='bg-slate-400 px-4 py-1 rounded-md text-white'
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className='min-h-[5%] h-[5%]'>
              {employeeShiftList && (
                <div className='flex justify-center '>
                  <Pagination
                    queryConfig={queryConfig}
                    pageSize={employeeShiftList.pageCount}
                    pathName={path.schedule}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {employeeShiftData && (
          <div className='w-[33%] p-4 px-5 bg-gray-100'>
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
                value={renderEmp()?.employee.id}
                className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'
              />
            </div>
            <div className='flex w-full h-[7%] items-center mb-5'>
              <div className='w-[40%]'>Employee Name</div>
              <input
                readOnly
                value={renderEmp()?.employee.fullName}
                className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'
              />
            </div>
            <div className='flex w-full h-[7%] items-center mb-5'>
              <div className='w-[40%]'>Employee Email</div>
              <input
                readOnly
                className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'
                value={renderEmp()?.employee.email}
              />
            </div>
            <div className='flex w-full h-[7%] items-center mb-5'>
              <div className='w-[40%]'>Employee Phone</div>
              <div className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'>
                {renderEmp()?.employee.phoneNumber}
              </div>
            </div>

            <div className='flex w-full h-[7%] items-center mb-5'>
              <div className='w-[40%]'>Joined</div>
              <div className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'>
                {handleDate(renderEmp()?.employee.dateJoined)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
