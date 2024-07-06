import { Button } from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Typography } from 'antd'
import { Input, DatePicker } from 'antd'
import { toast } from 'react-toastify'
import formApi from 'src/apis/form.api'
import { useQueryConfig10 } from 'src/hooks/useQueryConfig'
import { Form } from 'src/types/form.type'

const { TextArea } = Input

const { Title } = Typography
export default function AbsentForms({ form }: { form: Form | undefined }) {
  const queryConfig = useQueryConfig10()
  const queryClient = useQueryClient()

  const acceptFormMutation = useMutation({
    mutationFn: formApi.dayoffForm,
    onSuccess: () => {
      toast('Form Submitted!', { autoClose: 1000 })
      queryClient.invalidateQueries({ queryKey: ['forms', queryConfig], exact: true })
    },
    onError: (_error) => {
      toast('Error in sending form!', { autoClose: 1000 })
    }
  })

  const handleSubmitForm = () => {
    if (form?.formType == 1) {
      acceptFormMutation.mutate({
        shiftID: form?.id ?? '',
        reason: form?.reason ?? '',
        formType:form?.formType
      })
    } 
  }

  return (
    <div>
      <div className='w-full p-4'>
        <div className='text-left'>
          <Title level={3} className='pb-2'>
            Absent Form
          </Title>
        </div>
        <form onSubmit={handleSubmitForm} className='space-y-5'>
          <div>
            <Title level={5}>Employee Shift Id</Title>
            <Input placeholder='Shift' size='large' className='w-full mb-3' name=''/>
          </div>
          <div>
            <Title level={5}>Form Type</Title>
            <Input placeholder='Form Type' size='large' className='w-full mb-3' />
          </div>
          <div>
            <Title level={5}>Day of absence</Title>
            <DatePicker size='large' className='w-full mb-3' />
          </div>
          <div>
            <Title level={5}>Reason of absence</Title>
            <TextArea placeholder='Enter your reason' className='mb-4 h-auto pb-6' />
          </div>
          <Button aria-label='btn-submit' type='submit' color='primary' className='w-full'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
