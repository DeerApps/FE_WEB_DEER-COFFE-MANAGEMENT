import InputFile from 'src/components/InputFile'
import { Employee } from 'src/types/employee.type'
import { handleDate } from 'src/utils/utils'

interface Props {
  employee: Employee
  handleOpen: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function EmployeePopoverInfo({ employee, handleOpen }: Props) {
  return (
    <div className='w-[70%] h-[80%] bg-white p-6'>
      <div className='flex justify-between items-center'>
        <div className='p-4 ml-4 text-3xl font-normal text-gray-600 flex items-center'>Employee Information</div>
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
      <div className=' py-4 h-[90%]'>
        {/* Employee Form */}
        <form className=' bg-gray-100 h-[100%] p-4'>
          <div className='max-h-[92%] h-[92%] grid grid-cols-12'>
            {/* Employee Infor */}
            <div className='col-span-8 border-r-2 py-4'>
              <div>{employee.employeeID}</div>
              <div>{employee.address}</div>
              <div>{handleDate(employee.dateOfBirth)}</div>
              <div>{employee.roleName}</div>
              <div>{employee.phoneNumber}</div>
              <div>{employee.email}</div>
              <div>{employee.fullName}</div>
              <div>{employee.isActive ? 'Active' : 'Paused'}</div>
            </div>
            {/* Employee Image */}
            <div className='col-span-4 items-center py-4'>
              <div className='flex justify-center mt-[50px]'>
                <div className='flex flex-col items-center'>
                  <div className='my-5 h-24 w-24'>
                    <img
                      // src={previewImage || getURLAvatar(avatar)}
                      src='https://picsum.photos/200/300'
                      alt='UserImage'
                      className='h-full w-full rounded-full object-cover'
                    />
                  </div>
                  <InputFile />
                  <div className='mt-3 text-gray-300'>
                    <div>Dung lượng file tối đa 1MB</div>
                    <div>Định dạng: .JPEG, .PNG</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Button Action */}
          <div className='flex justify-start items-center'>
            <button className='rounded-md py-3 px-4 w-[140px] bg-gray-300 mr-4 text-gray-500'>Edit</button>
            <button className='rounded-md py-3 px-4 w-[140px] bg-gray-300 text-gray-500'>Delete</button>
          </div>
        </form>
      </div>
    </div>
  )
}
