import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import withDragAndDrop, { type EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'
import { useCallback, useMemo, useState } from 'react'
import Popover from 'src/components/Popover'
import EventPopoverInfo from 'src/pages/Schedule/EventInfo'

export interface Shift {
  id: string
  start: Date
  end: Date
  allDay?: boolean
  title?: string
}

const eventsList: Shift[] = [
  {
    id: '1',
    start: moment('2024-06-29T10:00:00').toDate(),
    end: moment('2024-06-29T11:00:00').toDate(),
    title: 'MRI Registration'
  },
  {
    id: '2',
    start: moment('2024-05-29T10:00:00').toDate(),
    end: moment('2024-05-29T11:00:00').toDate(),
    title: 'MRI Registration'
  },
  {
    id: '3',
    start: moment('2024-05-29T10:00:00').toDate(),
    end: moment('2024-05-29T11:00:00').toDate(),
    title: 'MRI Registration'
  },
  {
    id: '4',
    start: moment('2024-05-29T10:00:00').toDate(),
    end: moment('2024-05-29T11:00:00').toDate(),
    title: 'MRI Registration'
  },
  {
    id: '5',
    start: moment('2024-05-29T10:00:00').toDate(),
    end: moment('2024-05-29T11:00:00').toDate(),
    title: 'MRI Registration'
  },
  {
    id: '6',
    start: moment('2024-05-29T10:00:00').toDate(),
    end: moment('2024-05-29T11:00:00').toDate(),
    title: 'MRI Registration'
  },
  {
    id: '7',
    start: moment('2024-05-29T10:00:00').toDate(),
    end: moment('2024-05-29T11:00:00').toDate(),
    title: 'MRI Registration'
  },
  {
    id: '8',
    start: moment('2024-05-28T14:00:00').toDate(),
    end: moment('2024-05-28T15:30:00').toDate(),
    title: 'ENT Appointment'
  }
]

const DragAndDropCalendar = withDragAndDrop<Shift>(Calendar)

const localizer = momentLocalizer(moment)

export default function Schedule() {
  const [myEvents, setEvents] = useState<Shift[]>(eventsList)
  const [isEdit, setIsEdit] = useState<Shift>()

  const moveEvent = useCallback(
    (args: EventInteractionArgs<Shift>) => {
      const { event, start, end, isAllDay: droppedOnAllDaySlot = false } = args
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false
      }

      setEvents((prev: Shift[]) => {
        const existing = prev.find((ev: Shift) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev: Shift) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, allDay: event.allDay }] as Shift[]
      })
    },
    [setEvents]
  )

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const title = window.prompt(`Create New Event: `)
      if (title) {
        setEvents((prev: Shift[]) => {
          const existing = prev.find((ev: Shift) => ev.start === start && ev.end === end)
          if (!existing) return [...prev, { id: eventsList.length + 1, title, start, end }] as Shift[]
          return [...prev]
        })
      }
    },
    [setEvents]
  )

  const handleSelectEvent = useCallback((event: Shift) => setIsEdit(event), [])

  const { defaultDate, scrollToTime } = useMemo(() => {
    const now = new Date()
    return {
      defaultDate: now,
      scrollToTime: new Date(1970, 1, 1, 6)
    }
  }, [])

  const handleClose = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsEdit(undefined)
  }

  return (
    <Popover
      className='h-full'
      initialOpen={Boolean(isEdit)}
      renderPopover={Boolean(isEdit) && <EventPopoverInfo shift={isEdit as Shift} handleOpen={handleClose} />}
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
