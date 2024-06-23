import { Card } from '@nextui-org/react'
import { Tabs, type TabsProps } from 'antd';
import Info from './Info';
import Password from './Password';


export default function Profile() {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'My Profile',
      children: <Info/>,
    },
    {
      key: '2',
      label: 'Change Password',
      children: <Password/>,
    },
  ]

  return (
    <>
      <Card aria-label='card profile' className='max-w-6xl mx-auto p-4 shadow-none'>
      <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </>
  )
}
