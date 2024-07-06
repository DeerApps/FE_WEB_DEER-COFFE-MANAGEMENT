import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@nextui-org/react'
import { FormProvider, useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import { EmployeeSchema, employeeSchema } from 'src/utils/rules'

type FormData = Pick<EmployeeSchema, 'fullName' | 'address' | 'phoneNumber' | 'dateOfBirth' | 'email'>

// type FormDataError = Omit<FormData, 'dateOfBirth'> & {
//   dateOfBirth?: string
// }

const profileSchema = employeeSchema.pick(['fullName', 'address', 'phoneNumber', 'dateOfBirth', 'email'])

export default function Password() {
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
    // register,
    // control,
    // formState: { errors },
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
        <div className='flex flex-col min-h-[400px]'>
          <div className='w-full flex items-center mt-6'>
            <label className='w-[15%] pl-6'>Current Password:</label>
            <Input type='password' className='w-[60%] mt-4 relative' />
          </div>
          <div className='w-full flex items-center'>
            <label className='w-[15%] pl-6'>New password:</label>
            <Input type='password' className='w-[60%] mt-4 relative' />
          </div>
          <div className='w-full flex items-center'>
            <label className='w-[15%] pl-6'>Confirm password:</label>
            <Input type='password' className='w-[60%] mt-4 relative' />
          </div>
        </div>
        <Button className='space-x-4 ml-4' size='lg' color='primary' type='submit'>
          Update
        </Button>
      </form>
    </FormProvider>
  )
}
