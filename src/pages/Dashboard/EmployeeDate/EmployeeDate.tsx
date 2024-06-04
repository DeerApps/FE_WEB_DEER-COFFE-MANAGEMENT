export default function EmployeeData() {
  const employeeList = [
    {
      id: 1,
      name: 'Alice',
      shift: 'Morning',
      time: '8:00 AM - 1:00 PM',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Bob',
      shift: 'Afternoon',
      time: '1:00 PM - 6:00 PM',
      status: 'On Break'
    },
    {
      id: 3,
      name: 'Charlie',
      shift: 'Evening',
      time: '6:00 PM - 10:00 PM',
      status: 'Available'
    },
    {
      id: 1,
      name: 'Alice',
      shift: 'Morning',
      time: '8:00 AM - 1:00 PM',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Bob',
      shift: 'Afternoon',
      time: '1:00 PM - 6:00 PM',
      status: 'On Break'
    },
    {
      id: 3,
      name: 'Charlie',
      shift: 'Evening',
      time: '6:00 PM - 10:00 PM',
      status: 'Available'
    },
    {
      id: 1,
      name: 'Alice',
      shift: 'Morning',
      time: '8:00 AM - 1:00 PM',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Bob',
      shift: 'Afternoon',
      time: '1:00 PM - 6:00 PM',
      status: 'On Break'
    }
  ]

  return (
    <div className='p-2 bg-white rounded-lg mt-6 shadow-md mx-auto min-h-[420px]'>
      <div className='grid grid-cols-12 bg-gray-400/80 text-white my-2 text-lg font-medium p-4 py-2 rounded-xl text-center'>
        <div className='col-span-2 text-left'>Employee ID</div>
        <div className='col-span-3 text-left'>Full Name</div>
        <div className='col-span-2 text-left'>Shift</div>
        <div className='col-span-3 text-left'>Time</div>
        <div className='col-span-2 text-left'>Status</div>
      </div>
      {employeeList.map((employee) => (
        <div key={employee.id} className='bg-white h-[30px] mb-1 px-4 grid grid-cols-12 text-center items-center'>
          <div className='col-span-2 text-left'>{employee.id}</div>
          <div className='col-span-3 text-left'>{employee.name}</div>
          <div className='col-span-2 text-left'>{employee.shift}</div>
          <div className='col-span-3 text-left'>{employee.time}</div>
          <div className='col-span-2 text-left'>{employee.status}</div>
        </div>
      ))}
      {/* {employeeList && (
          <div className='p-1'>
            <div className='text-lg rounded-lg min-h-[310px] font-normal leading-none  text-blue-800 bg-blue-200 animate-pulse dark:bg-blue-900 dark:text-blue-200 text-center flex justify-center items-center'>
              loading...
            </div>
          </div>
        )} */}
      <div className='flex justify-center mt-5'>
        <div className='bg-slate-200/90 px-5 rounded-md mr-1 flex items-center transition'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='white'
            className='size-7'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18' />
          </svg>
        </div>
        <div className='bg-slate-200/90 px-5 rounded-md ml-1 flex items-center transition'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='white'
            className='size-7'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
          </svg>
        </div>
      </div>
    </div>
  )
}
