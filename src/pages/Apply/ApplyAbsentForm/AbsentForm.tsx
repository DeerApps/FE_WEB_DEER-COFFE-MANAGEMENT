import { Button, DatePicker, Input, Textarea } from '@nextui-org/react'
import { Typography } from 'antd'

const { Title } = Typography
export default function AbsentForm() {
  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <div className=' flex items-center justify-center'>
      <div className='bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-4xl'>
        <div className='text-left mb-4'>
          <Title level={3} className='mb-0.5'>Absent Form</Title>
        </div>
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <Title level={5}>Full name</Title>
            <Input label='Full name' radius='sm' size='sm' isRequired className='w-full mb-3' />
          </div>
          <div>
            <Title level={5}>Employee ID</Title>
            <Input label='Employee ID' radius='sm' size='sm' isRequired className='w-full mb-3' />
          </div>
          <div>
            <Title level={5}>Shift</Title>
            <Input label='Shift' radius='sm' size='sm' isRequired className='w-full mb-3' />
          </div>
          <div>
            <Title level={5}>Day of absence</Title>
            <DatePicker radius='sm'  isRequired className='w-full mb-3' />
          </div>
          <div>
            <Title level={5}>Reason of absence</Title>
            <Textarea label='Reason of absence' placeholder='Enter your reason' className='w-full mb-3 max-h-5xl' maxRows={2}/>
          </div>
          <Button type='submit' color='primary' className='w-full'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
