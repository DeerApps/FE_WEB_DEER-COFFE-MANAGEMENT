import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { useCallback, useMemo } from 'react'

export default function Schedule() {
  const handleSelectEvent = useCallback((event: any) => window.alert(event.title), [])
  const events = [
    {
      start: moment('2024-05-29T10:00:00').toDate(),
      end: moment('2024-05-29T11:00:00').toDate(),
      title: 'MRI Registration'
    },
    {
      start: moment('2024-05-29T10:00:00').toDate(),
      end: moment('2024-05-29T11:00:00').toDate(),
      title: 'MRI Registration'
    },
    {
      start: moment('2024-05-29T10:00:00').toDate(),
      end: moment('2024-05-29T11:00:00').toDate(),
      title: 'MRI Registration'
    },
    {
      start: moment('2024-05-29T10:00:00').toDate(),
      end: moment('2024-05-29T11:00:00').toDate(),
      title: 'MRI Registration'
    },
    {
      start: moment('2024-05-29T10:00:00').toDate(),
      end: moment('2024-05-29T11:00:00').toDate(),
      title: 'MRI Registration'
    },
    {
      start: moment('2024-05-29T10:00:00').toDate(),
      end: moment('2024-05-29T11:00:00').toDate(),
      title: 'MRI Registration'
    },
    {
      start: moment('2024-05-29T10:00:00').toDate(),
      end: moment('2024-05-29T11:00:00').toDate(),
      title: 'MRI Registration'
    },
    {
      start: moment('2024-05-28T14:00:00').toDate(),
      end: moment('2024-05-28T15:30:00').toDate(),
      title: 'ENT Appointment'
    }
  ]

  const localizer = momentLocalizer(moment)
  const { defaultDate } = useMemo(() => {
    const now = new Date()
    return {
      defaultDate: now
    }
  }, [])
  return (
    <div className='h-full'>
      <Calendar
        defaultDate={defaultDate}
        className='border rounded-md bg-white p-4 max-h-[750px]'
        events={events}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        popup
      />
    </div>
  )
}
