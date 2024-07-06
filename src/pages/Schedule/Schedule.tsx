import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { useCallback, useMemo, useState } from 'react'
import Popover from 'src/components/Popover'
import EventPopoverInfo from 'src/pages/Schedule/EventInfo'
import { useMutation, useQuery } from '@tanstack/react-query'
import employeeShiftApi from 'src/apis/employeeShift.api'
import { EmployeeShiftEvent } from 'src/types/employeeShift.type'
import ToolBar from 'src/pages/Schedule/ToolBar'
import { handleDate, handleDateNet, plusDays, subtractDays, toLocalISOString } from 'src/utils/utils'
import classNames from 'classnames'
import { toast } from 'react-toastify'

const DragAndDropCalendar = withDragAndDrop<EmployeeShiftEvent>(Calendar)

const localizer = momentLocalizer(moment)

export default function Schedule() {
  const [date, setDate] = useState<Date>(new Date())
  const [isMonth, setIsMonth] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<EmployeeShiftEvent | null>(null)

  const { data: employeeShiftData, refetch } = useQuery({
    queryKey: ['employeeshiftevent', date, isMonth],
    queryFn: () => {
      return employeeShiftApi.getEmployeeShiftByWeek({
        Date: handleDateNet(date),
        isMonth: isMonth
      })
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const assignShiftMutation = useMutation({
    mutationFn: employeeShiftApi.assignShift,
    onSuccess: () => {
      toast.success('Assign Sucessfully!', { autoClose: 1000 })
      refetch()
    },
    onError: (_error) => {
      toast.error('Assign Fail!', { autoClose: 1000 })
    }
  })

  const handleActionWeek = (action: 'plus' | 'subtract') => () => {
    if (action == 'plus') {
      setDate((prev) => plusDays(prev, 7))
    } else if (action == 'subtract') {
      setDate((prev) => subtractDays(prev, 7))
    }
  }

  const handleActionMonth = (action: 'plus' | 'subtract') => () => {
    if (action == 'plus') {
      setDate((prev) => plusDays(prev, 30))
    } else if (action == 'subtract') {
      setDate((prev) => subtractDays(prev, 30))
    }
  }

  const myEventLists = employeeShiftData?.data.data.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }))

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const title = window.confirm(`Assign Shift ?`)
      if (title) {
        assignShiftMutation.mutate({
          dateOfWork: handleDate(date),
          checkIn: toLocalISOString(start),
          checkOut: toLocalISOString(end)
        })
      }
    },
    [assignShiftMutation]
  )

  const handleSelectEvent = useCallback((event: EmployeeShiftEvent) => setIsEdit(event), [])

  const { defaultDate, scrollToTime } = useMemo(() => {
    return {
      defaultDate: date,
      scrollToTime: new Date(1970, 1, 1, 6)
    }
  }, [])

  const handleClose = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsEdit(null)
  }

  const eventPropGetter = (event: EmployeeShiftEvent, _start: Date, _end: Date, _isSelected: boolean) => {
    if (event.start < new Date() && event.end < new Date()) {
      const style: React.CSSProperties = {
        backgroundColor: '#a19f9f',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
        // Allow overlapping by using CSS properties
        zIndex: 1,
        // Adjust left and width to control overlapping
        left: '0px',
        width: '100%'
      }
      return {
        style
      }
    } else if (event.resource?.employee == null) {
      const style: React.CSSProperties = {
        backgroundColor: '#eab7b7',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
        // Allow overlapping by using CSS properties
        zIndex: 1,
        // Adjust left and width to control overlapping
        left: '0px',
        width: '100%'
      }
      return {
        style
      }
    } else {
      const style: React.CSSProperties = {
        backgroundColor: '#07589f',
        borderRadius: '0px',
        opacity: 0.5,
        color: 'white',
        border: '0px',
        display: 'block',
        // Allow overlapping by using CSS properties
        zIndex: 1,
        // Adjust left and width to control overlapping
        left: '0px',
        width: '100%'
      }
      return {
        style
      }
    }
  }

  const handleView = (view: 'week' | 'month') => () => {
    if (view == 'week') {
      setIsMonth(false)
    } else if (view == 'month') {
      setIsMonth(true)
    }
  }

  const handleGoNow = () => {
    setDate(new Date())
  }

  return (
    <Popover
      className='h-full'
      initialOpen={Boolean(isEdit)}
      renderPopover={
        Boolean(isEdit) && (
          <EventPopoverInfo
            employeeShift={isEdit as EmployeeShiftEvent}
            handleOpen={handleClose}
            date={date}
            isMonth={isMonth}
          />
        )
      }
    >
      <div className='mb-[40px]'></div>
      <div
        className={classNames('border rounded-md bg-white mt-10 p-4 h-[700px] max-h-[700px] min-w-[80%]', {
          ' overflow-auto': !isMonth,
          ' overflow-hidden overflow-x-auto': isMonth
        })}
      >
        <DragAndDropCalendar
          defaultDate={defaultDate}
          dayLayoutAlgorithm='no-overlap'
          defaultView={'week'}
          className={classNames('', {
            ' w-[3000px] h-[700px]': !isMonth,
            ' w-[1150px] h-[670px]': isMonth
          })}
          events={!!myEventLists ? myEventLists : []}
          localizer={localizer}
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          scrollToTime={scrollToTime}
          popup
          eventPropGetter={eventPropGetter}
          components={{
            toolbar: (props) => (
              <ToolBar
                handleNextWeek={handleActionWeek('plus')}
                handleBackWeek={handleActionWeek('subtract')}
                handleViewMonth={handleView('month')}
                handleViewWeek={handleView('week')}
                handleBackMonth={handleActionMonth('subtract')}
                handleNextMonth={handleActionMonth('plus')}
                handleGoNow={handleGoNow}
                {...props}
              />
            )
          }}
        />
      </div>
    </Popover>
  )
}
