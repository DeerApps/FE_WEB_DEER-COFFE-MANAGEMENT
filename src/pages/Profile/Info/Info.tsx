import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button, DatePicker } from '@nextui-org/react'
import { useContext } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import InputFile from 'src/components/InputFile'
import { AppContext } from 'src/context/app.context'
import { EmployeeSchema, employeeSchema } from 'src/utils/rules'

type FormData = Pick<EmployeeSchema, 'fullName' | 'address' | 'phoneNumber' | 'dateOfBirth' | 'email'>

// type FormDataError = Omit<FormData, 'dateOfBirth'> & {
//   dateOfBirth?: string
// }

const profileSchema = employeeSchema.pick(['fullName', 'address', 'phoneNumber', 'dateOfBirth', 'email'])

export default function Profile() {
  const { employee } = useContext(AppContext)

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
    watch
  } = formMethods

  console.log(watch('dateOfBirth'))
  const onSubmit = handleSubmit(() => {
    console.log('123')
  })

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <div className='flex min-h-[400px]'>
          <div className='flex flex-col w-[60%] pr-12 border-r-1 mt-6'>
            <div className='w-full flex items-center'>
              <label className='w-[20%] pl-6'>Full name:</label>
              <Input
                register={register}
                defaultValue={employee?.fullName}
                className='w-[80%] mt-2'
                errorMessage={errors.address?.message}
              />
            </div>

            <div className='w-full flex items-center'>
              <label className='w-[20%] pl-6'>Email:</label>
              <Input
                type='email'
                defaultValue={employee?.email}
                className='w-[80%] mt-2'
                register={register}
                errorMessage={errors.email?.message}
              />
            </div>

            <div className='w-full flex items-center'>
              <label className='w-[20%] pl-6'>Phone:</label>
              <Input
                defaultValue={employee?.phoneNumber}
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
                defaultValue={employee?.address}
                className='w-[80%] mt-2'
                register={register}
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <div className='space-y-2 flex flex-col items-center justify-center w-[40%]'>
            <Avatar src={employee?.avatarUrl} className='w-24 h-24' />
            <InputFile />
            <div className='text-gray-300 text-sm'>
              <p>Maximun file 1MB</p>
              <p>Accept: JPEG, PNG</p>
            </div>
          </div>
        </div>
        <Button className='space-x-4 ml-4' size='lg' color='primary' type='submit'>
          Update
        </Button>
      </form>
    </FormProvider>
  )
}
