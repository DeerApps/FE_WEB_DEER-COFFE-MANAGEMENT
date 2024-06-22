import { ToolbarProps } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { toast } from 'react-toastify'

interface MyToolBar {
  handleBackWeek?: () => void
  handleNextWeek?: () => void
  handleBackMonth?: () => void
  handleGoNow?: () => void
  handleNextMonth?: () => void
  handleViewWeek?: () => void
  handleViewMonth?: () => void
}

export default function ToolBar({
  label,
  view,
  onNavigate,
  onView,
  handleBackWeek,
  handleNextWeek,
  handleGoNow,
  handleViewMonth,
  handleViewWeek,
  handleBackMonth,
  handleNextMonth
}: ToolbarProps & MyToolBar) {
  const handleBack = () => {
    onNavigate('PREV')
    if (view == 'week' && handleBackWeek) {
      handleBackWeek()
    } else if (view == 'month' && handleBackMonth) {
      handleBackMonth()
    }
  }

  const handleNext = () => {
    onNavigate('NEXT')
    if (view == 'week' && handleNextWeek) {
      handleNextWeek()
    } else if (view == 'month' && handleNextMonth) {
      console.log(view)
      handleNextMonth()
    }
  }

  const handleWeek = () => {
    if (view == 'month' && handleViewWeek) {
      onView('week')
      handleViewWeek()
    } else {
      toast.error('Already in week view !', { autoClose: 1000 })
    }
  }

  const handleMonth = () => {
    if (view == 'week' && handleViewMonth) {
      onView('month')
      handleViewMonth()
    } else {
      toast.error('Already in month view !', { autoClose: 1000 })
    }
  }

  const handleNow = () => {
    if (handleGoNow) {
      onNavigate('TODAY')
      handleGoNow()
    }
  }

  return (
    <div className='flex justify-center items-center absolute py-2 top-[12%] left-[19.3%] right-[2.7%] bg-white z-30'>
      {/* <span className='rbc-toolbar-label'>{view}</span> */}
      <span className='flex justify-start w-[30%]'>
        <button
          className='px-4 py-2 border border-slate-300 mr-2 ml-2 hover:bg-sky-300 hover:text-white'
          type='button'
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className='px-4 py-2 border border-slate-300 mr-2 hover:bg-sky-300 hover:text-white'
          type='button'
          onClick={handleNow}
        >
          Today
        </button>
        <button
          className='px-4 py-2 border border-slate-300 hover:bg-sky-300 hover:text-white'
          type='button'
          onClick={handleNext}
        >
          Next
        </button>
      </span>
      <span className='text-2xl w-[40%] flex justify-center'>{label}</span>
      <span className='flex justify-end w-[30%]'>
        <button
          onClick={handleWeek}
          className='px-4 py-2 border border-slate-300 mr-2 ml-2 hover:bg-sky-300 hover:text-white'
          type='button'
        >
          Week
        </button>
        <button
          onClick={handleMonth}
          className='px-4 py-2 border border-slate-300 mr-2 hover:bg-sky-300 hover:text-white'
          type='button'
        >
          Month
        </button>
      </span>
    </div>
  )
}
