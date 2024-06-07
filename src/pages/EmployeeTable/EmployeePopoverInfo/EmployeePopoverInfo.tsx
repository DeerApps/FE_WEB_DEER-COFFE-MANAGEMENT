import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputFile from 'src/components/InputFile'
import { Employee, RoleId } from 'src/types/employee.type'
import { handleDate, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { EmployeeSchema, employeeSchema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { Select, SelectItem } from '@nextui-org/react'
import { omit } from 'lodash'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import employeeApi from 'src/apis/employee.api'
import { toast } from 'react-toastify'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ErrorResponse } from 'src/types/utils.type'

interface Props {
  employee: Employee
  handleOpen: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

type FormData = Pick<
  EmployeeSchema,
  'address' | 'email' | 'employeeID' | 'fullName' | 'isActive' | 'phoneNumber' | 'roleId' | 'dateJoined' | 'dateOfBirth'
>

const schema = employeeSchema.pick([
  'email',
  'address',
  'employeeID',
  'phoneNumber',
  'roleId',
  'fullName',
  'isActive',
  'dateJoined',
  'dateOfBirth'
])

export default function EmployeePopoverInfo({ employee, handleOpen }: Props) {
  const queryClient = useQueryClient()
  const queryConfig = useQueryConfig()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError
  } = useForm<FormData>({
    defaultValues: {
      employeeID: employee.employeeID,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      address: employee.address,
      roleId: RoleId[`${employee.roleName}`],
      fullName: employee.fullName,
      dateJoined: employee.dateJoined,
      dateOfBirth: employee.dateOfBirth,
      isActive: employee.isActive
    },
    resolver: yupResolver(schema)
  })

  const updateEmployeeMutation = useMutation({
    mutationFn: employeeApi.updateEmployee,
    onSuccess: () => {
      // refetch()
      toast('Update Successfully', { autoClose: 1000 })
      queryClient.invalidateQueries({ queryKey: ['employee', queryConfig] })
    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<ErrorResponse<EmployeeSchema>>(error)) {
        const formError = error.response?.data.data
        console.log(formError)
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof EmployeeSchema, {
              message: formError[key as keyof EmployeeSchema] as string,
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const onSubmit = handleSubmit((data) => {
    updateEmployeeMutation.mutate(omit(data, ['dateJoined']))
  })

  return (
    <div className='w-[70%] h-[80%] bg-white p-6'>
      {/* Header + Button Leave */}
      <div className='flex justify-between items-center'>
        <div className='p-2 ml-4 text-3xl font-normal text-gray-600 flex items-center'>Employee Information</div>
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
      {/* Employee Form */}
      <div className=' py-4 h-[95%]'>
        <form onSubmit={onSubmit} className=' bg-gray-100 h-[100%] p-4'>
          <div className='max-h-[92%] h-[92%] grid grid-cols-12'>
            {/* Employee Infor */}
            <div className='col-span-8 border-r-2 py-4'>
              {/* EmpId */}
              <div className='flex w-full'>
                <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Id</div>
                <Input
                  disabled
                  className='w-[80%] pr-10'
                  classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 rounded-sm disabled:bg-white'
                  register={register}
                  name='employeeID'
                  placeholder='Employee Id'
                  errorMessage={errors.employeeID?.message}
                />
              </div>
              {/* FullName */}
              <div className='flex w-full'>
                <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Name</div>
                <Input
                  name='fullName'
                  className='w-[80%] pr-10'
                  classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  register={register}
                  placeholder='FullName'
                  errorMessage={errors.fullName?.message}
                />
              </div>
              {/* Email */}
              <div className='flex w-full'>
                <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Email</div>
                <Input
                  className='w-[80%] pr-10'
                  classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  register={register}
                  name='email'
                  type='email'
                  placeholder='Email'
                  errorMessage={errors.email?.message}
                />
              </div>

              {/* Phone */}
              <div className='flex w-full'>
                <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Phone</div>
                <Input
                  className='w-[80%] pr-10'
                  classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  register={register}
                  name='phoneNumber'
                  placeholder='Phone Number'
                  errorMessage={errors.phoneNumber?.message}
                />
              </div>
              {/* Address */}
              <div className='flex w-full'>
                <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Address</div>
                <Input
                  className='w-[80%] pr-10'
                  classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  register={register}
                  name='address'
                  placeholder='Address'
                  errorMessage={errors.address?.message}
                />
              </div>
              <div className='flex w-full justify-between items-center mb-5'>
                <div className='flex w-[50%] pl-5 items-center'>
                  <div className=' text-lg capitalize w-[55%]'>Role</div>
                  <Controller
                    control={control}
                    name='roleId'
                    render={({ field }) => (
                      <Select
                        className=''
                        aria-label='status selection'
                        variant='faded'
                        radius='none'
                        color='primary'
                        disallowEmptySelection
                        selectedKeys={[field.value]}
                        onChange={field.onChange}
                      >
                        <SelectItem aria-label='active info' key={1}>
                          Admin
                        </SelectItem>
                        <SelectItem aria-label='paused info' key={2}>
                          Manager
                        </SelectItem>
                        <SelectItem aria-label='paused info' key={3}>
                          Employee
                        </SelectItem>
                        {/* <SelectItem aria-label='paused info' key={4}>
                        SuperAdmin
                      </SelectItem> */}
                      </Select>
                    )}
                  />
                </div>
                <div className='flex w-[50%] pr-10 pl-5 items-center'>
                  <div className=' text-lg capitalize pr-5'>Active</div>
                  <Controller
                    control={control}
                    name='isActive'
                    render={({ field }) => (
                      <Select
                        aria-label='status selection'
                        variant='faded'
                        radius='none'
                        color='primary'
                        disallowEmptySelection
                        selectedKeys={[field.value ? 'true' : 'false']}
                        onChange={(selected) => {
                          const value = selected.target.value === 'true'
                          field.onChange(value)
                        }}
                      >
                        <SelectItem aria-label='active info' key={'true'}>
                          Active
                        </SelectItem>
                        <SelectItem aria-label='paused info' key={'false'}>
                          Paused
                        </SelectItem>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <div className='flex w-full items-start'>
                <div className='w-[20%] text-lg capitalize pl-5 pt-3'>Birthdate</div>
                <Controller
                  control={control}
                  name='dateOfBirth'
                  render={({ field }) => (
                    <div className=' w-[40%]'>
                      <div className='flex items-center'>
                        <input
                          type='date'
                          className='w-[100%] p-2 outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                          value={handleDate(field.value)}
                          onChange={(input) => {
                            const rawDate = input.target.value
                            console.log(new Date(rawDate))
                            field.onChange(new Date(rawDate))
                          }}
                        />
                      </div>
                      <div className='h-6 min-h-6 text-sm text-red-600 py-1 pl-2'>{errors.dateOfBirth?.message}</div>
                    </div>
                  )}
                />
              </div>

              <div className='flex w-full items-center'>
                <div className='w-[20%] text-lg capitalize pt-2 pl-5'>Joined</div>
                <Controller
                  control={control}
                  name='dateJoined'
                  render={({ field }) => (
                    <input
                      type='date'
                      disabled
                      className='w-[40%] p-2 outline-none border border-gray-300 rounded-sm disabled:bg-white'
                      value={handleDate(field.value)}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
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
            <button type='submit' className='rounded-md py-3 px-4 w-[140px] bg-gray-300 mr-4 text-gray-500'>
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
