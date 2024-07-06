import { Button, DatePicker } from '@nextui-org/react'
import ApprovalFormItem from 'src/pages/Approval/ApprovalForm/ApprovalFormItem'
import { Form } from 'src/types/form.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import formApi from 'src/apis/form.api'
import { toast } from 'react-toastify'
import { useQueryConfig10 } from 'src/hooks/useQueryConfig'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { FormSchema, formSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'

type FormData = Pick<FormSchema, 'formResponse'> & {
  formID?: string
  isApprove?: boolean
}

export default function ApprovalForm({ form }: { form: Form | undefined }) {
  const queryConfig = useQueryConfig10()
  const queryClient = useQueryClient()
  const [isApprove, setIsApprove] = useState<boolean | 'empty'>('empty')

  console.log(isApprove)

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    defaultValues: {
      formResponse: '',
      formID: form?.id
    },
    resolver: yupResolver(formSchema)
  })

  const approveFormMutation = useMutation({
    mutationFn: formApi.approveForm,
    onSuccess: () => {
      toast.success('Submit Form Successfully!', { autoClose: 1000 })
      queryClient.invalidateQueries({ queryKey: ['formAbsents', queryConfig], exact: true })
      setIsApprove('empty')
    },
    onError: (_error) => {
      toast.error('Submit Form Fail!', { autoClose: 1000 })
    }
  })

  const onSubmit = (isApprove: boolean) =>
    handleSubmit((data) => {
      setIsApprove(isApprove)
      setValue('isApprove', isApprove)
      approveFormMutation.mutate(data as { formID: string; isApprove: boolean; formResponse: string })
    })

  return (
    <form className='grid grid-cols-5 grid-rows-12 gap-2 h-full'>
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
        <div className='space-y-7'>
          <ApprovalFormItem label='Full name' />
          <ApprovalFormItem label='Email' />
          <ApprovalFormItem label='Phone' />
          <ApprovalFormItem label='Absent Reason' />
        </div>
      </div>
      <div className='grid row-span-3 col-span-5 border border-slate-300 px-4 rounded-md space-y-4 h-full'>
        <div className='space-y-8 mt-6'>
          <div className='grid grid-cols-10'>
            <div className='col-span-3 text-lg font-normal mt-2'>Date of absent</div>
            <DatePicker isReadOnly className='col-end-11 col-span-7' />
          </div>
          <div className='flex'>
            <div className='w-[30%] text-lg font-normal mr-8 mt-2'>Form Response</div>
            <div className='w-[83%]'>
              <Input
                register={register}
                name='formResponse'
                placeholder='Form Response'
                errorMessage={errors.formResponse?.message}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=' row-span-1 col-span-5 flex'>
        <Button
          type='submit'
          onClick={onSubmit(true)}
          className='bg-gray-400/50 hover:bg-gray-400/30 text-white w-[200px] mr-8 rounded-lg hover:text-gray-600'
          isLoading={approveFormMutation.isPending && (isApprove as boolean)}
          disabled={isApprove != 'empty' && !isApprove}
        >
          Submit
        </Button>
        <Button
          type='submit'
          onClick={onSubmit(false)}
          className='bg-gray-400/50 hover:bg-gray-400/30 text-white w-[200px] rounded-lg hover:text-gray-600'
          isLoading={approveFormMutation.isPending && (!isApprove as boolean)}
          disabled={isApprove != 'empty' && isApprove}
        >
          Reject
        </Button>
      </div>
    </form>
  )
}
