import ApprovalFormInput from 'src/pages/Approval/ApprovalForm/ApprovalFormInput'

export default function ApprovalForm() {
  return (
    <div className='grid grid-cols-5 grid-rows-12 gap-2 h-full'>
      <div className='grid row-span-8 col-span-5 border border-slate-300 px-4'>
        <div className=' p-6 flex justify-center items-center'>
          <div className=' h-[100px] w-[100px]'>
            <img
              className='h-full w-full rounded-full shadow-lg'
              src='https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-1/278005755_1019680085601433_1056774276730192726_n.jpg?stp=dst-jpg_s480x480&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGc4lNB3VSDigq8HKaO0xYh4PjqagDsWI7g-OpqAOxYjujr08gpvMSI6cWqVfgr-PUtkC0Sy12NSsu8b533_Cbz&_nc_ohc=APzjtCh_LyAQ7kNvgGOtTL2&_nc_ht=scontent.fsgn5-3.fna&cb_e2o_trans=t&oh=00_AYDS5mfxmzbVRv1i3xHSZIDQeCIhEGnLTEykwTYu83NZUQ&oe=665BF431'
              alt='EmployeePicture'
            />
          </div>
        </div>
        <ApprovalFormInput label='Full name' />
        <ApprovalFormInput label='Email' />
        <ApprovalFormInput label='Address' />
        <ApprovalFormInput label='Date of birth' />
        <ApprovalFormInput label='Phone number' />
      </div>
      <div className='grid row-span-3 col-span-5 border border-slate-300 px-4'>
        <div className='mt-3'>
          <ApprovalFormInput label='Interviewer' />
        </div>
        <ApprovalFormInput label='Interview Date' />
        <ApprovalFormInput label='Interview Location' />
      </div>
      <div className=' row-span-1 col-span-5 flex'>
        <button className='bg-sky-300 hover:bg-sky-300/80 text-white w-[200px] mr-8 rounded-lg'>Submit</button>
        <button className='bg-red-400 hover:bg-red-400/80 text-white w-[200px] rounded-lg'>Reject</button>
      </div>
    </div>
  )
}
