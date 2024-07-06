import { Button, DatePicker, Input, Textarea } from '@nextui-org/react'
import { Typography } from 'antd'

const { Title } = Typography
export default function AbsentForms() {
  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <div className='flex items-center justify-center h-full'>
      <div className='w-full'>
        <div className='text-left mb-4'>
          <Title level={3} className='pb-3'>
            Absent Form
          </Title>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <Title level={5}>Shift</Title>
            <Input label='Shift' radius='sm' size='sm' isRequired className='w-full mb-3' />
          </div>
          <div>
            <Title level={5}>Day of absence</Title>
            <DatePicker radius='sm' isRequired className='w-full mb-3' />
          </div>
          <div>
            <Title level={5}>Reason of absence</Title>
            <Textarea
              label='Reason of absence'
              placeholder='Enter your reason'
              rows={4}
            />
          </div>
          <Button aria-label='btn-submit' type='submit' color='primary' className='w-full'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
