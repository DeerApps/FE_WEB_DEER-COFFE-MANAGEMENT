import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'antd'
import Title from 'antd/es/typography/Title'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import restaurantApi from 'src/apis/restaurant.api'
import { ErrorResponse } from 'src/types/utils.type'
import { RestaurantSchema, restaurantSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'


type FormData = Pick<RestaurantSchema, 'manageID' | 'resAddress' | 'resChainID' | 'resName'>

const schema = restaurantSchema.pick(['manageID', 'resAddress', 'resChainID', 'resName'])

export default function CreateRestaurant() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm<FormData>({
    defaultValues: {
      manageID: '',
      resAddress: '',
      resChainID: '',
      resName: ''
    },
    resolver: yupResolver(schema)
  })

  const createRestaurantMutation = useMutation({
    mutationFn: restaurantApi.createRestaurant,
    onSuccess: () => {
      toast('Create successfully !', { autoClose: 1000 })
    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        console.log(formError)
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData] as string,
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const onSubmit = handleSubmit((data) => {
    const mappedData = {
      restaurantChainID: data.resChainID,
      restaurantName: data.resName,
      restaurantAddress: data.resAddress,
      managerID: data.manageID
    }

    createRestaurantMutation.mutate(mappedData)

    console.log(mappedData)
  })

  return (
    <div className=' bg-white p-6'>
      <form onSubmit={onSubmit} className=''>
          <div>
            <Title level={5}>Restaurant Name</Title>
            <Controller
              control={control}
              name='resName'
              render={({ field }) => (
                <Input
                  label='Restaurant name'
                  radius='sm'
                  size='sm'
                  isRequired
                  className='w-full mb-3'
                  onChange={field.onChange}
                  errorMessage={errors.resName?.message}
                />
              )}
            />
          </div>
          <div>
            <Title level={5}>Restaurant Address</Title>
            <Controller
              control={control}
              name='resAddress'
              render={({ field }) => (
                <Input
                  label='Restaurant Address'
                  radius='sm'
                  size='sm'
                  isRequired
                  className='w-full mb-3'
                  onChange={field.onChange}
                  errorMessage={errors.resAddress?.message}
                />
              )}
            />
          </div>
          <div>
            <Title level={5}>Restaurant Chain ID</Title>
            <Controller
              control={control}
              name='resChainID'
              render={({ field }) => (
                <Input
                  label='Restaurant Chain ID'
                  radius='sm'
                  size='sm'
                  isRequired
                  className='w-full mb-3'
                  onChange={field.onChange}
                  errorMessage={errors.resChainID?.message}
                />
              )}
            />
          </div>
          <div>
            <Title level={5}>Manager ID</Title>
            <Controller
              control={control}
              name='manageID'
              render={({ field }) => (
                <Input
                  label='Manager ID'
                  radius='sm'
                  size='sm'
                  isRequired
                  className='w-full mb-3'
                  onChange={field.onChange}
                  errorMessage={errors.manageID?.message}
                />
              )}
            />
          </div>
          <Button aria-label='button-submit-apply' htmlType='submit' color='primary' className='w-full'>
            Submit
          </Button>
        </form>
      
    </div>
  )
}
