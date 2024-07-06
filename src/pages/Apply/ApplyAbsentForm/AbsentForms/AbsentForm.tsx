import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Typography } from 'antd'
import { Input, DatePicker } from 'antd'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import formApi from 'src/apis/form.api'
import { useQueryConfig10 } from 'src/hooks/useQueryConfig'
import { FormSchema, formSchema } from 'src/utils/rules'

const { TextArea } = Input

const { Title } = Typography

type FormData = Pick<FormSchema, 'formType' | 'reason'> & {
  shiftID?: string
}

const schema = formSchema.pick(['formType', 'reason'])

export default function AbsentForms() {
  const queryConfig = useQueryConfig10()
  const queryClient = useQueryClient()

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      shiftID: '',
      formType: 0,
      reason: ''
    },
    resolver: yupResolver(schema)
  })

  const createAbsentFormMutation = useMutation({
    mutationFn: formApi.createAbsentForm,
    onSuccess: () => {
      toast.success('Form Submitted!', { autoClose: 1000 })
      queryClient.invalidateQueries({ queryKey: ['forms', queryConfig], exact: true })
    },
    onError: (_error) => {
      toast.error('Error in sending form!', { autoClose: 1000 })
    }
  })

  const handleSubmitForm = handleSubmit((data) => {
    createAbsentFormMutation.mutate(data as { shiftID: string; reason: string; formType: number })
  })

  return (
    <div className='w-full p-4 h-[100%]'>
      <form onSubmit={handleSubmitForm} className='space-y-5'>
        <div>
          <Title level={5}>Employee Shift Id</Title>
          <Controller
            control={control}
            name='shiftID'
            render={({ field }) => <Input placeholder='Shift' size='large' className='w-full mb-3' {...field} />}
          />
        </div>
        <div className='h-[8%]'>
          <Title level={5}>Day of absence</Title>
          <DatePicker size='large' className='w-full mb-3' />
        </div>
        <div className='h-[8%]'>
          <Title level={5}>Form Type</Title>
          <Controller
            control={control}
            name='formType'
            render={({ field }) => (
              <Select aria-label='Favorite Animal' placeholder='Choose Form Type' className='w-full' {...field}>
                <SelectItem key={2}>Unwanted</SelectItem>
                <SelectItem key={3}>Emergency</SelectItem>
              </Select>
            )}
          />
        </div>
        <div className='h-[50%]'>
          <Title className='h-[100%]!' level={5}>
            Reason of absence
          </Title>
          <Controller
            control={control}
            name='reason'
            render={({ field }) => (
              <TextArea placeholder='Enter your reason' className='mb-4 pb-6 h-[220px]' {...field} />
            )}
          />
        </div>
        <Button aria-label='btn-submit' type='submit' color='primary' className='w-full'>
          Submit
        </Button>
      </form>
    </div>
  )
}
