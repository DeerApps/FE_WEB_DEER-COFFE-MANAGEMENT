import { Button} from '@nextui-org/react'
// import { useState } from 'react'
import ApprovalFormItem from 'src/pages/Approval/ApprovalForm/ApprovalFormItem'
// import { Restaurant } from 'src/types/restaurant.type'
// import { handleDate } from 'src/utils/utils'
import { Form } from 'src/types/form.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import formApi from 'src/apis/form.api'
import { toast } from 'react-toastify'
import { useQueryConfig10 } from 'src/hooks/useQueryConfig'

export default function ApprovalForm({ form }: { form: Form | undefined }) {
  const queryConfig = useQueryConfig10()
  const queryClient = useQueryClient()
  // const [restaurant, setRestaurant] = useState<Restaurant | undefined>()
  // const [date, setDate] = useState<Date>(new Date())

  const acceptFormMutation = useMutation({
    mutationFn: formApi.acceptForms,
    onSuccess: () => {
      toast('Form Submitted!', { autoClose: 1000 })
      queryClient.invalidateQueries({ queryKey: ['forms', queryConfig], exact: true })
    },
    onError: (_error) => {
      toast('Error in sending form!', { autoClose: 1000 })
    }
  })

  const acceptEmployeeMutation = useMutation({
    mutationFn: formApi.acceptEmployee,
    onSuccess: () => {
      toast('Form Submitted!', { autoClose: 1000 })
      queryClient.invalidateQueries({ queryKey: ['forms', queryConfig], exact: true })
    },
    onError: (_error) => {
      toast('Error in sending form!', { autoClose: 1000 })
    }
  })
  
  const handleSubmitForm = () => {
    // if (form?.formType == 1) {
    //   acceptFormMutation.mutate({
    //     formID: form?.id ?? '',
    //     // restaurantID: restaurant?.id ?? '',
    //     // date
    //   })
    // } else if (form?.formType == 4) {
    //   console.log('hâhh')
    //   acceptEmployeeMutation.mutate(form.id)
    // }
  }

  console.log(form?.formType)

  return (
    <div className='grid grid-cols-5 grid-rows-12 gap-2 h-full'>
      <div className='grid row-span-8 col-span-5 border border-slate-300 px-4 pb-8 rounded-md mb-2'>
        <div className=' p-4 flex justify-center items-center'>
          <div className=' h-[100px] w-[100px]'>
            <img
              className='h-full w-full rounded-full shadow-lg'
              src={form?.employee?.avatarUrl || 'https://lh3.google.com/u/0/d/1cA_e2CcO33m9Tzj4GbRMekWel9u20JGs'}
              alt='EmployeePicture'
            />
          </div>
        </div>
        <div className='space-y-6'>
          <ApprovalFormItem label='Full name' />
          <ApprovalFormItem label='Employee ID' />
          <ApprovalFormItem label='Shift' />
          <ApprovalFormItem label='Date of absence' />
          <ApprovalFormItem label='Reason'/>
        </div>
      </div>
      <div className=' row-span-1 col-span-5 flex'>
        <Button
          onClick={handleSubmitForm}
          className='bg-gray-400/50 hover:bg-gray-400/30 text-white w-[200px] mr-8 rounded-lg hover:text-gray-600'
          color='default'
          variant='flat'
          // disabled={
          //   (form?.formType == 1 && !restaurant) || acceptFormMutation.isPending || acceptEmployeeMutation.isPending
          // }
          isLoading={acceptFormMutation.isPending || acceptEmployeeMutation.isPending}
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
