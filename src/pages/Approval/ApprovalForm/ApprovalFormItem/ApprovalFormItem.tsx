interface Props {
  label: string
  value?: string
}

export default function ApprovalFormItem({ label, value }: Props) {
  return (
    <div className='px-2 mb-2 '>
      <div className='grid grid-cols-10'>
        <div className='col-span-3 text-lg font-normal'>{label}</div>
        <div className='border col-end-11 col-span-7 border-gray-300 p-2 h-8 rounded-sm'>{value}</div>
      </div>
    </div>
  )
}
