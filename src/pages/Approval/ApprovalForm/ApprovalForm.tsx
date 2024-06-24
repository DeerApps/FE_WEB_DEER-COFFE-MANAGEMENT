import { Button, DatePicker, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { useState } from 'react'
import ApprovalFormItem from 'src/pages/Approval/ApprovalForm/ApprovalFormItem'
import InfiniteScroll from './InfiniteScroll'
import { Restaurant } from 'src/types/restaurant.type'
import { handleDate } from 'src/utils/utils'
import { parseDate } from '@internationalized/date'
import { Form } from 'src/types/form.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import formApi from 'src/apis/form.api'
import { toast } from 'react-toastify'

export default function ApprovalForm({ form }: { form: Form | undefined }) {
  const queryClient = useQueryClient()
  const [restaurant, setRestaurant] = useState<Restaurant | undefined>()
  const [date, setDate] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(false)

  const acceptFormMutation = useMutation({
    mutationFn: formApi.acceptForms,
    onSuccess: () => {
      toast('Form Submitted!', { autoClose: 1000 })
      queryClient.invalidateQueries({ queryKey: ['forms'], exact: true })
      setIsLoading(false)
    },
    onError: (error) => {
      toast('Error in sending form!', { autoClose: 1000 })
      setIsLoading(false)
    }
  })

  const handleSelection = (select: Restaurant) => {
    setRestaurant(select)
  }

  const handleSubmitForm = async () => {
    setIsLoading(true)
    try {
      await acceptFormMutation.mutateAsync({
        formID: form?.id ?? '',
        restaurantID: restaurant?.id ?? '',
        date
      })
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='grid grid-cols-5 grid-rows-12 gap-2 h-full'>
      <div className='grid row-span-8 col-span-5 border border-slate-300 px-4 rounded-md mb-2'>
        <div className=' p-4 flex justify-center items-center'>
          <div className=' h-[100px] w-[100px]'>
            <img
              className='h-full w-full rounded-full shadow-lg'
              src={form?.employee?.avatarUrl || 'https://lh3.google.com/u/0/d/1cA_e2CcO33m9Tzj4GbRMekWel9u20JGs'}
              alt='EmployeePicture'
            />
          </div>
        </div>
        <div>
          <ApprovalFormItem label='Full name' value={form?.employee?.fullName} />
          <ApprovalFormItem label='Email' value={form?.employee?.email} />
          <ApprovalFormItem label='Address' value={form?.employee?.address} />
          <ApprovalFormItem label='Date of birth' value={handleDate(form?.employee?.dateOfBirth as Date)} />
          <ApprovalFormItem label='Phone number' value={form?.employee?.phoneNumber} />
        </div>
      </div>
      <div className='grid row-span-3 col-span-5 border border-slate-300 rounded-md px-4 mb-2'>
        <div className='mt-3 grid grid-cols-10 px-2 mb-2'>
          <div className='col-span-3 text-lg font-normal'>Interviewer</div>
          <div className='col-span-5 border border-gray-300 p-2 h-8 rounded-sm mr-3'>
            {restaurant?.manager.fullName}
          </div>
          <Popover key={'bottom-end'} placement={'bottom-end'} color='default'>
            <PopoverTrigger>
              <Button
                className='border col-span-2 border-gray-300 p-2 h-8 rounded-sm capitalize'
                color='default'
                variant='flat'
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-5'>
                  <path
                    fillRule='evenodd'
                    d='M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z'
                    clipRule='evenodd'
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <InfiniteScroll handleSelection={handleSelection} current={restaurant} />
            </PopoverContent>
          </Popover>
        </div>
        <ApprovalFormItem label='Interview Location' value={restaurant?.restaurantAddress} />
        <div className='px-2 mb-2 '>
          <div className='grid grid-cols-10'>
            <div className='col-span-3 text-lg font-normal'>Interview Date</div>
            <DatePicker
              aria-label='date_of_birth_date_picker'
              className='col-end-11 col-span-7'
              radius='sm'
              isRequired
              defaultValue={parseDate(handleDate(date))}
              onChange={(event) => {
                const dateString = `${event.year}-${event.month}-${event.day}`
                setDate(new Date(dateString))
              }}
            />
          </div>
        </div>
      </div>
      <div className=' row-span-1 col-span-5 flex'>
        <Button
          onClick={handleSubmitForm}
          className='bg-gray-400/50 hover:bg-gray-400/30 text-white w-[200px] mr-8 rounded-lg hover:text-gray-600'
          color='default'
          variant='flat'
          disabled={!restaurant || isLoading}
          isLoading={isLoading}
        >
          Submit
        </Button>
        <Button className='bg-gray-400/50 hover:bg-gray-400/30 text-white w-[200px] rounded-lg hover:text-gray-600'>
          Reject
        </Button>
      </div>
    </div>
  )
}
