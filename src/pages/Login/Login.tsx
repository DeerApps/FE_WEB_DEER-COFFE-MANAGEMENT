import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { Typography } from 'antd'
import { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/authenticate.api'
import path from 'src/constant/path'
import { AppContext } from 'src/context/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { LoginSchema, loginSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import { Role } from 'src/types/employee.type'

export interface CustomJwtPayload extends JwtPayload {
  RoleName?: Role
  exp?: number
  restaurantId?: string
}

const { Title } = Typography

export default function Login() {
  const { setIsAuthenticated, setUser, setEmployee } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setEmployee(data.data.data.employeeDto)
        try {
          const decoded = jwtDecode<CustomJwtPayload>(data.data.data.accessToken)
          setUser(decoded)
        } catch (error) {
          console.error('Failed to decode JWT', error)
        }
        setIsLoading(false)
        navigate(path.dashboard)
      },
      onError: (error) => {
        setIsLoading(false) // Reset loading state on error
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
            <Title level={5}>Username</Title>
            <Controller
              control={control}
              name='employeeID'
              render={({ field }) => (
                <Input
                  label='Employee ID'
                  radius='sm'
                  size='sm'
                  isRequired
                  className='w-full mb-3'
                  value={field.value || ''}
                  onChange={field.onChange}
                  errorMessage={errors.employeeID?.message}
                  isDisabled={isLoading}
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
                  type='password'
                  radius='sm'
                  size='sm'
                  isRequired
                  className='w-full mb-3'
                  value={field.value || ''}
                  onChange={field.onChange}
                  errorMessage={errors.password?.message}
                  isDisabled={isLoading}
                />
              )}
            />
          </div>

          <Button aria-label='btn-login' type='submit' color='primary' className='w-full' isLoading={isLoading}>
            Login
          </Button>
          <div className='text-center'>
            <Link className='text-small underline' to={path.apply}>
              Not a member ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
