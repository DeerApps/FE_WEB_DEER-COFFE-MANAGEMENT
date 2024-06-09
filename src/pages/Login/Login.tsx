import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, Input } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { Typography } from 'antd'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import authApi from 'src/apis/authenticate.api'
import path from 'src/constant/path'
import { AppContext } from 'src/context/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { LoginSchema, loginSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

const { Title } = Typography

export default function Login() {
  const { setIsAuthenticated, setEmployee } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors }
  } = useForm<LoginSchema>({
    defaultValues: {
      employeeID: '',
      password: ''
    },
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: LoginSchema) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setEmployee(data.data.data.employeeDto)
        navigate(path.dashboard)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<LoginSchema>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginSchema, {
                message: formError[key as keyof LoginSchema],
                type: 'Server'
              })
            })
          }
        }
      }
    })
    console.log(data)
  })

  return (
    <div className='relative min-h-screen flex items-center justify-center'>
      <div className='bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md h-auto py-10'>
        <div className='text-center mb-6'>
          <Title>Deer Coffee</Title>
          <Title level={5} disabled>
            The best coffee in town
          </Title>
        </div>
        <form onSubmit={onSubmit} className='space-y-7'>
          <div>
            <Title level={5}>Email</Title>
            <Controller
              control={control}
              name='employeeID'
              render={({ field }) => (
                <Input
                  label='Employee Id'
                  radius='sm'
                  size='sm'
                  isRequired
                  className='w-full mb-3'
                  value={field.value || ''}
                  onChange={field.onChange}
                  errorMessage={errors.employeeID?.message}
                />
              )}
            />
          </div>
          <div>
            <Title level={5}>Password</Title>
            <Controller
              control={control}
              name='password'
              render={({ field }) => (
                <Input
                  label='Password'
                  radius='sm'
                  size='sm'
                  isRequired
                  className='w-full mb-3'
                  value={field.value || ''}
                  onChange={field.onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />
          </div>
          <Checkbox aria-label='checkbox remember me' className='mb-2 py-4'>
            Remember me
          </Checkbox>
          <Button aria-label='btn-login' type='submit' color='primary' className='w-full'>
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
