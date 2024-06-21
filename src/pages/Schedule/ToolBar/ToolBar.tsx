import { ToolbarProps } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

interface MyToolBar {
  handleBackWeek?: () => void
  handleNextWeek?: () => void
}

export default function ToolBar({
  label,
  view,
  onNavigate,
  onView,
  handleBackWeek,
  handleNextWeek
}: ToolbarProps & MyToolBar) {
  const handleBack = () => {
    onNavigate('PREV')
    if (view == 'week' && handleBackWeek) {
      handleBackWeek()
    }
  }

  const handleNext = () => {
    onNavigate('NEXT')
    if (view == 'week' && handleNextWeek) {
      handleNextWeek()
    }
  }

  return (
    <div className='flex justify-center items-center absolute py-2 top-[12%] left-[19.3%] right-[2.7%] bg-white z-30'>
      {/* <span className='rbc-toolbar-label'>{view}</span> */}
      <span className='flex justify-start w-[30%]'>
        <button className='px-4 py-2 border border-slate-300 mr-2 ml-2' type='button' onClick={handleBack}>
          Back
        </button>
        <button className='px-4 py-2 border border-slate-300' type='button' onClick={handleNext}>
          Next
        </button>
      </span>
      <span className='text-2xl w-[40%] flex justify-center'>{label}</span>
      <span className='flex justify-end w-[30%]'>
        <button className='px-4 py-2 border border-slate-300 mr-2 ml-2' type='button'>
          Week
        </button>
        <button className='px-4 py-2 border border-slate-300 mr-2 ml-2' type='button'>
          Month
        </button>
        <button className='px-4 py-2 border border-slate-300 mr-2 ml-2' type='button'>
          Day
        </button>
      </span>
    </div>
  )
}
