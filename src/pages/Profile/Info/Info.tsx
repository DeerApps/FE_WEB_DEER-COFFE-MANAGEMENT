import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button,DatePicker, Divider } from '@nextui-org/react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import InputFile from 'src/components/InputFile'
import { EmployeeSchema, employeeSchema } from 'src/utils/rules'

export default function Profile() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    gender: 'Male',
    dob: '1990-01-01',
    address: '123 Main St, Springfield, USA',
    avatarUrl: 'https://i.pravatar.cc/150?img=3'
  }

  type FormData = Pick<EmployeeSchema, 'fullName' | 'address' | 'phoneNumber' | 'dateOfBirth' | 'email'>

  type FormDataError = Omit<FormData, 'dateOfBirth'> & {
    dateOfBirth?: string
  }

  const profileSchema = employeeSchema.pick(['fullName', 'address', 'phoneNumber', 'dateOfBirth', 'email'])


  const formMethods = useForm<FormData>({
    defaultValues: {
      fullName: '',
      address: '',
      phoneNumber: '',
      email: '',
      dateOfBirth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError
  } = formMethods

  console.log(watch("dateOfBirth"))
  const onSubmit = handleSubmit(() => {
    console.log("123")
  })

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <div className=' flex'>
          <div className='flex flex-col w-[60%] pr-12 border-r-1'>
            <div className='w-full flex items-center'>
              <label className='w-[20%] pl-6'>Full name:</label>
              <Input
                register={register}
                defaultValue={user.name}
                className='w-[80%] mt-2'
                errorMessage={errors.address?.message}
              />
            </div>

            <div className='w-full flex items-center'>
              <label className='w-[20%] pl-6'>Email:</label>
              <Input
                type='email'
                defaultValue={user.email}
                className='w-[80%] mt-2'
                register={register}
                errorMessage={errors.email?.message}
              />
            </div>

            <div className='w-full flex items-center'>
              <label className='w-[20%] pl-6'>Phone:</label>
              <Input
                defaultValue={user.phone}
                className='w-[80%] mt-2'
                register={register}
                errorMessage={errors.phoneNumber?.message}
              />
            </div>

            <div className='w-full flex items-center'>
              <label className='w-[20%] pl-6'>DoB:</label>
              <Controller
              control={control}
              name='dateOfBirth'
              render={({ field }) => (
                <DatePicker
                  aria-label='date_of_birth_date_picker'
                  className='w-[80%] mb-4'
                  radius='sm'
                  isRequired
                  onChange={(input) => {
                    const dateString = `${input.year}-${input.month}-${input.day}`
                    return field.onChange(new Date(dateString))
                  }}
                  
                />
              )}
            />
            <div>{errors.dateOfBirth?.message}</div>
            </div>

            <div className='w-full flex items-center'>
              <label className='w-[20%] pl-6'>Address:</label>
              <Input
                defaultValue={user.address}
                className='w-[80%] mt-2'
                register={register}
                errorMessage={errors.address?.message}
              />
            </div>
          </div>

          <div className='space-y-2 flex flex-col items-center justify-center w-[40%]'>
            <Avatar src={user.avatarUrl} className='w-24 h-24' />
            <InputFile />
            <div className='text-gray-300 text-sm'>
              <p>Maximun file 1MB</p>
              <p>Accept: JPEG, PNG</p>
            </div>
          </div>
        </div>
        <div>
          <div className='space-x-4'>
            <Button color='primary' type='submit'>Update</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
