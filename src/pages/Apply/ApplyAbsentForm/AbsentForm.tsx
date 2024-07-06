import { Card } from '@nextui-org/react'
import { Tabs, type TabsProps } from 'antd'
import AbsentForms from './AbsentForms'
import AbsentStatus from './AbsentStatus'

export default function AbsentForm() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Absent Form',
      children: <AbsentForms />,
      className: 'h-[100%]'
    },
    {
      key: '2',
      label: 'Status',
      children: <AbsentStatus />
    }
  ]

  return (
    <>
      <Card aria-label='card profile' className='max-w-6xl mx-auto p-4 shadow-none min-h-[100%] h-[100%]'>
        <Tabs defaultActiveKey='1' items={items} className='h-[100%]' />
      </Card>
    </>
  )
}
