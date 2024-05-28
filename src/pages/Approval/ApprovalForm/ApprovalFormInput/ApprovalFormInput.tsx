interface Props {
  label: string
}

export default function ApprovalFormInput({ label }: Props) {
  return (
    <div className='px-2 mb-2'>
      <div className='grid grid-cols-10'>
        <div className='col-span-3 text-lg font-normal'>{label}</div>
        <input className='border col-end-11 col-span-7 border-gray-300 p-2 rounded-sm' type='text' />
      </div>
    </div>
  )
}
