import { Avatar, Card, Input } from '@nextui-org/react'
import { Upload, type UploadProps } from 'antd'


export default function Profile() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    gender: 'Male',
    dob: '1990-01-01',
    address: '123 Main St, Springfield, USA',
    avatarUrl: 'https://i.pravatar.cc/150?img=3'
  }

  const props: UploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text'
    }
  }
  return (
    <>
      <Card className='max-w-6xl mx-auto mt-3 p-5 bg-white rounded-lg shadow-lg'>
        <div className='flex flex-col items-center'>
          <Avatar size='lg' src={user.avatarUrl} className='mb-4' />
          <Upload {...props}>
            <h3 className='underline'>Click to upload</h3>
          </Upload>
          <h1 className='text-2xl font-bold'>{user.name}</h1>
        </div>
        <div className='mt-4'>
          <div className='flex items-center mb-2'>
            <h3 className='w-16 mr-2'>Email:</h3>
            <Input isReadOnly size='sm' type='email' defaultValue={user.email} className='max-w-5xl' />
          </div>
          <div className='flex items-center mb-2'>
            <h3 className='w-16 mr-2'>Phone:</h3>
            <Input isReadOnly size='sm' defaultValue={user.phone} className='max-w-5xl' />
          </div>
          <div className='flex items-center mb-2'>
            <h3 className='w-16 mr-2'>Gender:</h3>
            <Input isReadOnly size='sm' defaultValue={user.gender} className='max-w-5xl' />
          </div>
          <div className='flex items-center mb-2'>
            <h3 className='w-16 mr-2'>DoB:</h3>
            <Input isReadOnly size='sm' defaultValue={user.dob} className='max-w-5xl' />
          </div>
          <div className='flex items-center mb-2'>
            <h3 className='w-16 mr-2'>Address:</h3>
            <Input isReadOnly size='sm' defaultValue={user.address} className='max-w-5xl' />
          </div>
        </div>
      </Card>
    </>
  )
}
