import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import withDragAndDrop, { type EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Popover from 'src/components/Popover'
import EventPopoverInfo from 'src/pages/Schedule/EventInfo'
import { useQuery } from '@tanstack/react-query'
import employeeShiftApi from 'src/apis/employeeShift.api'
import { handleDateNet, mapToDateTime } from 'src/utils/utils'
import { EmployeeShift } from 'src/types/employeeShift.type'

// {
//   id: '1',
//   start: moment('2024-06-29T10:00:00').toDate(),
//   end: moment('2024-06-29T11:00:00').toDate(),
//   title: 'MRI Registration'
// },

const DragAndDropCalendar = withDragAndDrop<EmployeeShift>(Calendar)

const localizer = momentLocalizer(moment)

export default function Schedule() {
  const [myEvents, setEvents] = useState<EmployeeShift[] | []>([])
  const [isEdit, setIsEdit] = useState<EmployeeShift | null>(null)

  const { data: employeeShiftData } = useQuery({
    queryKey: ['employeeshift'],
    queryFn: () => {
      return employeeShiftApi.getEmployeeShiftByWeek({
        Date: '2024/06/14'
        // Date: handleDateNet(new Date())
      })
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  useEffect(() => {
    if (employeeShiftData?.data.data.data) {
      setEvents([])
    }
  }, [employeeShiftData])

  console.log(employeeShiftData)

  const moveEvent = useCallback(
    (args: EventInteractionArgs<EmployeeShift>) => {
      const { event, start, end, isAllDay: droppedOnAllDaySlot = false } = args
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false
      }

      setEvents((prev: EmployeeShift[]) => {
        const existing = prev.find((ev: EmployeeShift) => ev.iD === event.iD) ?? {}
        const filtered = prev.filter((ev: EmployeeShift) => ev.iD !== event.iD)
        return [...filtered, { ...existing, start, end, allDay: event.allDay }] as EmployeeShift[]
      })
    },
    [setEvents]
  )

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const title = window.prompt(`Create New Event: `)
      if (title) {
        setEvents((prev: EmployeeShift[]) => {
          const existing = prev.find(
            (ev: EmployeeShift) =>
              mapToDateTime(ev.dateOfWork, ev.shift.shiftStart) === start &&
              mapToDateTime(ev.dateOfWork, ev.shift.shiftEnd) === end
          )
          if (!existing) return [...prev, { id: 111, title, start, end }] as EmployeeShift[]
          return [...prev]
        })
      }
    },
    [setEvents]
  )

  const handleSelectEvent = useCallback((event: EmployeeShift) => setIsEdit(event), [])

  const { defaultDate, scrollToTime } = useMemo(() => {
    const now = new Date()
    return {
      defaultDate: now,
      scrollToTime: new Date(1970, 1, 1, 6)
    }
  }, [])

  const handleClose = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsEdit(null)
  }

  return (
    <Popover
      className='h-full'
      initialOpen={Boolean(isEdit)}
      renderPopover={
        Boolean(isEdit) && <EventPopoverInfo employeeShift={isEdit as EmployeeShift} handleOpen={handleClose} />
      }
    >
      <DragAndDropCalendar
        defaultDate={defaultDate}
        dayLayoutAlgorithm='no-overlap'
        defaultView={'week'}
        className='border rounded-md bg-white p-4 max-h-[750px]'
        events={myEvents}
        localizer={localizer}
        selectable
        onEventDrop={moveEvent}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        scrollToTime={scrollToTime}
        popup
      />
    </Popover>
  )
}
