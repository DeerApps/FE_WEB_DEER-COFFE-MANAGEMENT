import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { omit } from "lodash"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import restaurantApi from "src/apis/restaurant.api"
import Input from "src/components/Input"
import { useQueryConfig } from "src/hooks/useQueryConfig"
import { Restaurant } from "src/types/restaurant.type"
import { ErrorResponse } from "src/types/utils.type"
import { RestaurantSchema, restaurantSchema } from "src/utils/rules"
import { isAxiosUnprocessableEntityError } from "src/utils/utils"

interface Props {
  restaurant: Restaurant
  handleOpen: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

type FormData = Pick<
  RestaurantSchema,
  'resID' | 'manageID' | 'resAddress' | 'resChainID' | 'resName'
>

const schema = restaurantSchema.pick([
  'resID',
  'manageID',
  'resAddress',
  'resChainID',
  'resName'
])

export default function RestaurantPopoverInfo({restaurant, handleOpen}:Props) {
  const queryClient = useQueryClient()
  const queryConfig = useQueryConfig()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    defaultValues: {
      resID: restaurant.id,
      manageID:restaurant.manager.id,
      resAddress:restaurant.restaurantAddress,
      resChainID:restaurant.restaurantChainID,
      resName:restaurant.restaurantName
    },
    resolver: yupResolver(schema)
  })

  const updateRestaurantMutation = useMutation({
    mutationFn: restaurantApi.updateRestaurant,
    onSuccess: () => {
      // refetch()
      toast('Update Successfully !', { autoClose: 1000 })
      queryClient.invalidateQueries({ queryKey: ['restaurant', queryConfig] })
    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<ErrorResponse<RestaurantSchema>>(error)) {
        const formError = error.response?.data.data
        console.log(formError)
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof RestaurantSchema, {
              message: formError[key as keyof RestaurantSchema] as string,
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const onSubmit = handleSubmit((data) => {
    updateRestaurantMutation.mutate(omit(data))
  })

  return (
    <div className='w-[70%] h-[80%] bg-white p-6'>
      {/* Header + Button Leave */}
      <div className='flex justify-between items-center'>
        <div className='p-2 ml-4 text-3xl font-normal text-gray-600 flex items-center'>Restaurant Information</div>
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
                <div className='w-[30%] text-lg capitalize pt-2 pl-5'>ID</div>
                <Input
                  disabled
                  className='w-[70%] pr-10'
                  classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 rounded-sm disabled:bg-white'
                  register={register}
                  name='resID'
                  placeholder='Restaurant ID'
                  errorMessage={errors.resID?.message}
                />
              </div>
              {/* FullName */}
              <div className='flex w-full'>
                <div className='w-[30%] text-lg capitalize pt-2 pl-5'>Restaurant</div>
                <Input
                  name='resName'
                  className='w-[70%] pr-10'
                  classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  register={register}
                  placeholder='Restaurant name'
                  errorMessage={errors.resName?.message}
                />
              </div>
              {/* Email */}
              <div className='flex w-full'>
                <div className='w-[30%] text-lg capitalize pt-2 pl-5'>Restaurant Address</div>
                <Input
                  className='w-[70%] pr-10'
                  classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  register={register}
                  name='resAddress'
                  placeholder='Restaurant Address'
                  errorMessage={errors.resAddress?.message}
                />
              </div>

              {/* Phone */}
              <div className='flex w-full'>
                <div className='w-[30%] text-lg capitalize pt-2 pl-5'>Manager ID</div>
                <Input
                  className='w-[70%] pr-10'
                  classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  register={register}
                  name='manageID'
                  placeholder='Manager ID'
                  errorMessage={errors.manageID?.message}
                />
              </div>
              {/* Address */}
              <div className='flex w-full'>
                <div className='w-[30%] text-lg capitalize pt-2 pl-5'>Restaurant Chain ID</div>
                <Input
                  className='w-[70%] pr-10'
                  classNameInput='w-[100%] px-3 py-2 outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  register={register}
                  name='resChainID'
                  placeholder='Restaurant'
                  errorMessage={errors.resChainID?.message}
                />
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
  
};
