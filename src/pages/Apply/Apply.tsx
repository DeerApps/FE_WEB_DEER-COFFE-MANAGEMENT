import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@nextui-org/react'
import { Typography } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import path from 'src/constant/path'
import { EmployeeSchema, employeeSchema } from 'src/utils/rules'
import { handleDate } from 'src/utils/utils'

const { Title } = Typography

type FormData = Pick<EmployeeSchema, 'fullName' | 'email' | 'address' | 'dateOfBirth' | 'phoneNumber'>

const schema = employeeSchema.pick([
  'fullName',
  'email',
  'address',
  'dateOfBirth',
  'phoneNumber'
])

export default function Apply() {
  const {handleSubmit, formState:{errors}, control} = useForm<FormData>({ 
    defaultValues:{ 
      fullName: '',
      email:'',
      address:'',
      dateOfBirth:new Date(),
      phoneNumber:''
      },
      resolver: yupResolver(schema)
    })

    console.log(errors)

    const onSubmit = handleSubmit((data) => {
      console.log(data)
    })

  return (
    <div className=' min-h-screen flex items-center justify-center'>
      <div className='bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md'>
        <div className='text-left mb-4'>
          <div className='flex justify-between items-end'>
            <Title level={2} className='mb-0'>
              Application Form
            </Title>
            <Link className='text-small  underline  pb-1' to={path.login}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-4 inline-block mr-1'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
              </svg>
              Already a member
            </Link>
          </div>
        </div>
        <form onSubmit={onSubmit} className=''>
          <div>
            <Title level={5}>Full name</Title>
            <Controller 
              control={control}
              name='fullName'
              render={({field}) => (
                <Input label='Full name' radius='sm' size='sm' isRequired className='w-full mb-3' onChange={field.onChange}/>
              )}
            />
          </div>
          <div>
            <Title level={5}>Email</Title>
            <Controller 
              control={control}
              name='email'
              render={({field}) => (
                <Input label='Email' radius='sm' size='sm' isRequired className='w-full mb-3' onChange={field.onChange}/>
              )}
            />
           
          </div>
          <div>
            <Title level={5}>Address</Title>
            <Controller 
              control={control}
              name='address'
              render={({field}) => (
                <Input label='Address' radius='sm' size='sm' isRequired className='w-full mb-3' onChange={field.onChange}/>
              )}
            />
          </div>
          <div>
            <Title level={5}>Date of birth</Title>
            <Controller
                  control={control}
                  name='dateOfBirth'
                  render={({ field }) => (
                    <div className='flex items-center w-full mb-2'>
                      <input
                        type='date'
                        className='w-full rounded-lg p-3 outline-none bg-gray-100 focus:border-gray-500 focus:shadow-sm'
                        value={handleDate(field.value)}
                        onChange={field.onChange}
                      />
                    </div>
                  )}
                />
          </div>
          <div>
            <Title level={5}>Phone number</Title>
            <Controller 
              control={control}
              name='phoneNumber'
              render={({field}) => (
                <Input label='Phone number' radius='sm' size='sm' isRequired className='w-full mb-3' onChange={field.onChange}/>
              )}
            />
          </div>
          <Title level={5} className='mt-0.5 text-gray-500/60 text-sm'>
            Fill in this form and we will contact you
          </Title>
          <Button aria-label='button-submit-apply' type='submit' color='primary' className='w-full'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
