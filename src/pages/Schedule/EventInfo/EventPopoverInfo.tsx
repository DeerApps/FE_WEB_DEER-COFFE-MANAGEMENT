import Input from 'src/components/Input'
import { Shift } from 'src/pages/Schedule/Schedule'
import { handleDate } from 'src/utils/utils'

interface Props {
  shift: Shift
  handleOpen: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function EventPopoverInfo({ handleOpen }: Props) {
  return (
    <div className='w-[75%] h-[85%] bg-white p-6'>
      <div className='flex justify-between items-center'>
        <div className='p-2 ml-4 text-3xl font-normal text-gray-600 flex items-center'>Shift Information</div>
        <button onClick={handleOpen} className='rounded-md py-2 px-10 bg-gray-200 text-gray-500 h-[10%]'>
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
      <div className='flex w-[100%] h-[90%] justify-between my-3'>
        <div className='w-[58%] p-4 bg-gray-100'>
          <div className='flex w-full mt-5'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Id</div>
            <Input
              disabled
              className='w-[80%] pr-10'
              classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 rounded-sm disabled:bg-white'
              name='employeeID'
              placeholder='Shift Id'
            />
          </div>
          <div className='flex w-full'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Date</div>
            <Input
              disabled
              className='w-[80%] pr-10'
              classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 rounded-sm disabled:bg-white'
              name='employeeID'
              placeholder='Employee Id'
            />
          </div>
          <div className='flex w-full'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Start</div>
            <Input
              disabled
              className='w-[80%] pr-10'
              classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 rounded-sm disabled:bg-white'
              name='employeeID'
              placeholder='Datetime'
            />
          </div>
          <div className='flex w-full'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>End</div>
            <Input
              disabled
              className='w-[80%] pr-10'
              classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 rounded-sm disabled:bg-white'
              name='employeeID'
              placeholder='Employee Id'
            />
          </div>
          <div className='flex w-full'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Staff</div>
            <Input
              disabled
              className='w-[80%] pr-10'
              classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 rounded-sm disabled:bg-white'
              name='employeeID'
              placeholder='Employee Id'
            />
          </div>
          <div className='flex w-full'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Check In</div>
            <Input
              disabled
              className='w-[80%] pr-10'
              classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 rounded-sm disabled:bg-white'
              name='employeeID'
              placeholder='Employee Id'
            />
          </div>
          <div className='flex w-full'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Check Out</div>
            <Input
              disabled
              className='w-[80%] pr-10'
              classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 rounded-sm disabled:bg-white'
              name='employeeID'
              placeholder='Employee Id'
            />
          </div>
          <div className='flex w-full'>
            <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Note</div>
            <Input
              disabled
              className='w-[80%] pr-10'
              classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 rounded-sm disabled:bg-white'
              name='employeeID'
              placeholder='Employee Id'
            />
          </div>
          <div className='flex justify-start items-center'>
            <button type='submit' className='rounded-md py-3 px-4 w-[140px] bg-gray-300 mr-4 text-gray-500'>
              Edit
            </button>
          </div>
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
            <div className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'>SE171757</div>
          </div>
          <div className='flex w-full h-[7%] items-center mb-5'>
            <div className='w-[40%]'>Employee Name</div>
            <div className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'>
              Trần Đình Thiên Tân
            </div>
          </div>
          <div className='flex w-full h-[7%] items-center mb-5'>
            <div className='w-[40%]'>Employee Phone</div>
            <div className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'>0979901550</div>
          </div>
          <div className='flex w-full h-[7%] items-center mb-5'>
            <div className='w-[40%]'>Joined</div>
            <div className='w-[60%] bg-white h-full border border-gray-300 flex items-center pl-3'>
              {handleDate(new Date())}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
