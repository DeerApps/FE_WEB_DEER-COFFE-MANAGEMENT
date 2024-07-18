import { useQuery } from '@tanstack/react-query'
import formApi from 'src/apis/form.api'
import Pagination from 'src/components/Pagination'
import path from 'src/constant/path'
import { useQueryConfig10 } from 'src/hooks/useQueryConfig'
import { FormListConfig } from 'src/types/form.type'
import { handleRenderNo, handleTimeClock } from 'src/utils/utils'

export default function AbsentStatus() {
  const queryConfig = useQueryConfig10()

  const { data: formsData } = useQuery({
    queryKey: ['formAbsents', queryConfig],
    queryFn: () => {
      return formApi.getAbsentForms(queryConfig as FormListConfig)
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const FormList = formsData?.data.data

  return (
    <div>
      <div className='px-4 pb-0 min-h-[400px]'>
        <div className='grid grid-cols-12 bg-gray-400/80 text-white my-2 text-lg font-medium p-4 py-2 rounded-xl text-center'>
          <div className='col-span-1'>No</div>
          <div className='col-span-3'>Shift Id</div>
          <div className='col-span-2'>Response</div>
          <div className='col-span-2'>Type</div>
          <div className='col-span-2'>Dated</div>
          <div className='col-span-2'>Status</div>
        </div>
        {FormList &&
          FormList.data.map((data, index) => {
            const no = handleRenderNo(formsData?.data.data.pageNumber, formsData?.data.data.pageSize, index)
            return (
              <div
                key={data.id}
                className='bg-gray-100/80 h-[46px] mb-1 px-1 grid grid-cols-12 text-center rounded-xl items-center'
              >
                <div className='col-span-1'>{no}</div>
                <div className='col-span-3'>{data.shiftId}</div>
                <div className='col-span-2'>{data.reason}</div>
                <div className='col-span-2'>{data.formType}</div>
                <div className='col-span-2'>{handleTimeClock(data.date)}</div>
                <div className='col-span-2'>{data.isApproved ? 'Approve' : 'Reject'}</div>
              </div>
            )
          })}
        {FormList && (
          <div className='flex justify-center'>
            <Pagination queryConfig={queryConfig} pageSize={FormList.pageCount} pathName={path.absentForm} />
          </div>
        )}
      </div>
    </div>
  )
}
