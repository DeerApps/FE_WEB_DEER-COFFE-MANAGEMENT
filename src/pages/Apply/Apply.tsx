import { Button, DatePicker, Input } from '@nextui-org/react'
import { Typography } from 'antd'

const { Title } = Typography

export default function Apply() {
  const handleSubmit = (e: any) => {
    e.preventDefault()
  }
  return (
    <div className='relative min-h-screen flex items-center justify-center'>
      <div className='fixed left-40 top-1/2 transform -translate-y-1/2'>
        <h1 className='text-7xl font-bold'>Wanna join us?</h1>
      </div>
      <div className='bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md'>
        <div className='text-left mb-4'>
          <Title level={3}>Apply form</Title>
          <Title level={5} disabled className='mt-0.5'>
            Fill in this form and we will contact you
          </Title>
        </div>
        <form onSubmit={handleSubmit} className='space-y-2'>
          <div>
            <Title level={5}>Full name</Title>
            <Input label='Full name' radius='sm' size='sm' isRequired className='w-full mb-3' />
          </div>
          <div>
            <Title level={5}>Email</Title>
            <Input label='Email' radius='sm' size='sm' isRequired className='w-full mb-3' />
          </div>
          <div>
            <Title level={5}>Address</Title>
            <Input label='Address' radius='sm' size='sm' isRequired className='w-full mb-3' />
          </div>
          <div>
            <Title level={5}>Date of birth</Title>
            <DatePicker radius='sm' isRequired className='w-full mb-3' />
          </div>
          <div>
            <Title level={5}>Phone number</Title>
            <Input label='Phone number' radius='sm' size='sm' isRequired className='w-full mb-3' />
          </div>
          <Button type='submit' color='primary' className='w-full'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

