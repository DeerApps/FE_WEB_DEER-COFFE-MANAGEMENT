import { yupResolver } from '@hookform/resolvers/yup'
import { Button, DatePicker, Input } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { Typography } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { parseDate } from '@internationalized/date'
import { useState } from 'react'
import employeeApi from 'src/apis/employee.api'
import path from 'src/constant/path'

import { ErrorResponse } from 'src/types/utils.type'
import { EmployeeSchema, employeeSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

const { Title } = Typography

type FormData = Pick<EmployeeSchema, 'address' | 'email' | 'fullName' | 'phoneNumber' | 'dateOfBirth'>

const schema = employeeSchema.pick(['email', 'address', 'phoneNumber', 'fullName', 'dateOfBirth'])

export default function Apply() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      phoneNumber: '',
      address: '',
      fullName: '',
      dateOfBirth: new Date()
    }
  })

  const applyEmployeeMutation = useMutation({
    mutationFn: employeeApi.applyEmployee,
    onSuccess: () => {
      toast('Please Check Your Mail!', { autoClose: 1000 })
      setIsLoading(false)
      reset()
    },
    onError: (error) => {
      setIsLoading(false)
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData] as string,
              type: 'Server'
            })
          })
        }
      } else {
      }
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      await applyEmployeeMutation.mutateAsync(data)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md'>
        <div className='text-left mb-4'>
          <div className='flex justify-between items-end'>
            <Title level={2} className='mb-0'>
              Application Form
            </Title>
            <Link className='text-small underline pb-1' to={path.login}>
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
              render={({ field }) => (
                <Input
                  label='Full name'
                  radius='sm'
                  size='sm'
                  isRequired
                  className='w-full mb-3'
                  {...field}
                  onChange={field.onChange}
                  errorMessage={errors.fullName?.message}
                  isDisabled={isLoading}
                />
              )}
            />
          </div>
          <div>
            <Title level={5}>Email</Title>
            <Controller
              control={control}
              name='email'
              render={({ field }) => (
                <Input
                  label='Email'
                  radius='sm'
                  size='sm'
                  isRequired
                  className='w-full mb-3'
                  {...field}
                  onChange={field.onChange}
                  errorMessage={errors.email?.message}
                  isDisabled={isLoading}
                />
              )}
            />
          </div>
          <div>
            <Title level={5}>Address</Title>
            <Controller
              control={control}
              name='address'
              render={({ field }) => (
                <Input
                  label='Address'
                  radius='sm'
                  size='sm'
                  isRequired
                  className='w-full mb-3'
                  {...field}
                  onChange={field.onChange}
                  errorMessage={errors.address?.message}
                  isDisabled={isLoading}
                />
              )}
            />
          </div>
          <div>
            <Title level={5}>Date of birth</Title>
            <Controller
              control={control}
              name='dateOfBirth'
              render={({ field }) => (
                <DatePicker
                  aria-label='date_of_birth_date_picker'
                  radius='sm'
                  isRequired
                  className='w-full mb-3'
                  value={parseDate(field.value.toISOString().split('T')[0])}
                  onChange={(date) => field.onChange(date.toDate('UTC'))}
                  errorMessage={errors.dateOfBirth?.message}
                  isDisabled={isLoading}
                />
              )}
            />
          </div>
          <div>
            <Title level={5}>Phone number</Title>
            <Controller
              control={control}
              name='phoneNumber'
              render={({ field }) => (
                <Input
                  label='Phone number'
                  radius='sm'
                  size='sm'
                  isRequired
                  className='w-full mb-3'
                  {...field}
                  onChange={field.onChange}
                  errorMessage={errors.phoneNumber?.message}
                  isDisabled={isLoading}
                />
              )}
            />
          </div>
          <Title level={5} className='mt-0.5 text-gray-500/60 text-sm'>
            Fill in this form and we will contact you
          </Title>
          <Button
            aria-label='button-submit-apply'
            type='submit'
            color='primary'
            className='w-full'
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
