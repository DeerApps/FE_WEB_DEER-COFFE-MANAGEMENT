import { Button, DatePicker, Input } from '@nextui-org/react'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import path from 'src/constant/path'

const { Title } = Typography

export default function Apply() {
  const handleSubmit = (e: any) => {
    e.preventDefault()
  }
  return (
    <div className=' min-h-screen flex items-center justify-center'>
      <div className='bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md'>
        <div className='text-left mb-4'>
          <div className='flex justify-between items-end'>
            <Title level={2} className='mb-0'>
              Application Form
            </Title>
            <Link className='text-small  underline  pb-1' to={path.login}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-4 inline-block mr-1'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
              </svg>
              Already a member
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit} className=''>
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
            <DatePicker aria-label='date_of_birth_date_picker' radius='sm' isRequired className='w-full mb-3' />
          </div>
          <div>
            <Title level={5}>Phone number</Title>
            <Input label='Phone number' radius='sm' size='sm' isRequired className='w-full mb-3' />
          </div>
          <Title level={5} className='mt-0.5 text-gray-500/60 text-sm'>
            Fill in this form and we will contact you
          </Title>
          <Button aria-label='button-submit-apply' type='submit' color='primary' className='w-full'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
