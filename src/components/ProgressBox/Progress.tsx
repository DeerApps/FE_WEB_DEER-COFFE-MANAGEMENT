import { Progress } from '@nextui-org/react'

export default function ProgressBox({ progressValue, content }: { progressValue: number; content: string }) {
  return (
    <div className='grid grid-cols-7 py-2'>
      <Progress className='col-span-5 py-2' size='lg' aria-label='Loading...' value={progressValue} />
      <div className=' col-end-8 col-span-2 pl-10 font-medium text-lg flex items-center'>{content}</div>
    </div>
  )
}
