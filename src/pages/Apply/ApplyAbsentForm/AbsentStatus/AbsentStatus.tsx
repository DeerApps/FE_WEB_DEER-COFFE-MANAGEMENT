export default function AbsentStatus() {
  return (
    <div>
      <div className='px-4 pb-0 min-h-[400px]'>
        <div className='grid grid-cols-12 bg-gray-400/80 text-white my-2 text-lg font-medium p-4 py-2 rounded-xl text-center'>
          <div className='col-span-2'>No</div>
          <div className='col-span-3'>Application Type</div>
          <div className='col-span-3'>Created at</div>
          <div className='col-span-3'>Status</div>
        </div>
        <div
          className='bg-gray-100/80 h-[46px] mb-3 px-4 grid grid-cols-12 text-center rounded-xl items-center'
        >
          <div className='col-span-2'>1</div>
          <div className='col-span-3 truncate'>2</div>
          <div className='col-span-3'>aaaa</div>
          <div className='col-span-3'>3</div>
        </div>
      </div>
    </div>
  )
}
