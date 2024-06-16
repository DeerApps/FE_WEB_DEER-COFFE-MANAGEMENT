import { Button } from '@nextui-org/react'
import Input from 'src/components/Input'

export default function Password() {
  return (
    <div className='flex flex-col'>
      <div className='w-full flex items-center'>
        <label className='w-[15%] pl-6'>Current Password:</label>
        <Input type='password' className='w-[60%] mt-4 relative' />
      </div>
      <div className='w-full flex items-center'>
        <label className='w-[15%] pl-6'>New password:</label>
        <Input type='password' className='w-[60%] mt-4 relative' />
      </div>
      <div className='w-full flex items-center'>
        <label className='w-[15%] pl-6'>Confirm password:</label>
        <Input type='password' className='w-[60%] mt-4 relative' />
      </div>
      <div className='space-x-4'>
        <Button color='primary'>Update</Button>
      </div>
    </div>
  )
}
