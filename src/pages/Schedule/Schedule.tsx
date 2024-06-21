import { Calendar, EventPropGetter, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import withDragAndDrop, { type EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Popover from 'src/components/Popover'
import EventPopoverInfo from 'src/pages/Schedule/EventInfo'
import { useQuery } from '@tanstack/react-query'
import employeeShiftApi from 'src/apis/employeeShift.api'
import { EmployeeShiftEvent } from 'src/types/employeeShift.type'
import ToolBar from 'src/pages/Schedule/ToolBar'

// {
//   id: '1',
//   start: moment('2024-06-29T10:00:00').toDate(),
//   end: moment('2024-06-29T11:00:00').toDate(),
//   title: 'MRI Registration'
// },

const DragAndDropCalendar = withDragAndDrop<EmployeeShiftEvent>(Calendar)

const localizer = momentLocalizer(moment)

export default function Schedule() {
  const [myEvents, setEvents] = useState<EmployeeShiftEvent[] | []>([])
  const [isEdit, setIsEdit] = useState<EmployeeShiftEvent | null>(null)

  const { data: employeeShiftData } = useQuery({
    queryKey: ['employeeshiftevent'],
    queryFn: () => {
      return employeeShiftApi.getEmployeeShiftByWeek({
        Date: '2024/06/16'
        // Date: handleDateNet(new Date())
      })
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  // useEffect(() => {
  //   if (employeeShiftData?.data.data) {
  //     setEvents(employeeShiftData?.data.data)
  //   }
  // }, [employeeShiftData])

  const myEventLists = employeeShiftData?.data.data.map((event) => ({
    ...event,
    start: new Date(event.start), // Convert to Date object
    end: new Date(event.end) // Convert to Date object
  }))
  console.log(myEventLists)

  const moveEvent = useCallback(
    (args: EventInteractionArgs<EmployeeShiftEvent>) => {
      const { event, start, end, isAllDay: droppedOnAllDaySlot = false } = args
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false
      }

      setEvents((prev: EmployeeShiftEvent[]) => {
        const existing = prev.find((ev: EmployeeShiftEvent) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev: EmployeeShiftEvent) => ev.id !== event.id)
        return [
          ...filtered,
          { ...existing, start: new Date(start), end: new Date(end), allDay: event.allDay }
        ] as EmployeeShiftEvent[]
      })
    },
    [setEvents]
  )

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const title = window.prompt(`Create New Event: `)
      if (title) {
        setEvents((prev: EmployeeShiftEvent[]) => {
          const existing = prev.find((ev: EmployeeShiftEvent) => ev.start === start && ev.end === end)
          if (!existing)
            return [...prev, { id: 111, title, start: new Date(start), end: new Date(end) }] as EmployeeShiftEvent[] // Convert to Date objects
          return [...prev]
        })
      }
    },
    [setEvents]
  )

  const handleSelectEvent = useCallback((event: EmployeeShiftEvent) => setIsEdit(event), [])

  const { defaultDate, scrollToTime } = useMemo(() => {
    // const now = new Date()
    return {
      defaultDate: new Date('2024-06-16T00:00:00'),
      scrollToTime: new Date(1970, 1, 1, 6)
    }
  }, [])

  const handleClose = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsEdit(null)
  }

  const eventPropGetter = (_: EmployeeShiftEvent, _start: Date, _end: Date, _isSelected: boolean) => {
    const style: React.CSSProperties = {
      backgroundColor: '#3174ad',
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
  }

  const handleNavigate = (date: Date) => {
    // Handle navigation to a specific date if needed
    console.log('Navigate to:', date)
  }

  const handleView = (view: string) => {
    // Handle view change (week, month, day, etc.) if needed
    console.log('Switching view to:', view)
  }

  return (
    <Popover
      className='h-full'
      initialOpen={Boolean(isEdit)}
      renderPopover={
        Boolean(isEdit) && <EventPopoverInfo employeeShift={isEdit as EmployeeShiftEvent} handleOpen={handleClose} />
      }
    >
      <div className='mb-[40px]'></div>
      <div className='border rounded-md bg-white mt-10 p-4 max-h-[700px] min-w-[80%] overflow-auto'>
        <DragAndDropCalendar
          defaultDate={defaultDate}
          dayLayoutAlgorithm='no-overlap'
          defaultView={'week'}
          className='w-[3000px]'
          events={!!myEventLists ? myEventLists : []}
          localizer={localizer}
          selectable
          onEventDrop={moveEvent}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          scrollToTime={scrollToTime}
          popup
          eventPropGetter={eventPropGetter}
          components={{
            toolbar: (props) => <ToolBar {...props} onView={handleView} />
          }}
        />
      </div>
    </Popover>
  )
}
