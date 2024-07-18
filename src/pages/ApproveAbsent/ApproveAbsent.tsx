import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import formApi from 'src/apis/form.api'
import path from 'src/constant/path'
import { useQueryConfig10 } from 'src/hooks/useQueryConfig'
// import ApprovalForm from 'src/pages/Approval/ApprovalForm'
// import ApprovalForm from 'src/pages/Approval/ApprovalForm'
import ApprovalItem from 'src/pages/Approval/ApprovalItem/ApprovalItem'
import { Form, FormListConfig } from 'src/types/form.type'
import { handleDate, handleRenderNo } from 'src/utils/utils'
import ApproveAbsentForm from './ApproveAbsentForm'

const formTypeConfig: Record<string, string> = {
  '1': 'Apply',
  '2': 'UNWANTED',
  '3': 'EMMERGENCY',
  '4': 'Accept'
}

export default function ApproveAbsent() {
  const queryConfig = useQueryConfig10()
  const [formChoose, setFormChoose] = useState<Form | undefined>()

  const handleFormChoose = (form: Form) => {
    setFormChoose(form)
  }

  const { data: formsData } = useQuery({
    queryKey: ['formAbsents', queryConfig],
    queryFn: () => {
      return formApi.getAbsentForms(queryConfig as FormListConfig)
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const page = Number(queryConfig.pageNumber)

  const FormList = formsData?.data.data.data

  return (
    <div className='grid grid-cols-12 gap-4 h-full'>
      <div className='col-span-6 border border-slate-300 rounded-md p-3 bg-white'>
        {/* Header */}
        <div className='p-3 mb-4 border border-slate-300 shadow-lg rounded-md font-medium text-md text-gray-500 grid grid-cols-8'>
          <div className='col-span-1 border-r-2'>No</div>
          <div className='col-span-3 border-r-2 pl-3 truncate'>Employee Name</div>
          <div className='col-span-2 pl-6 border-r-2'>Type</div>
          <div className='col-span-2 pl-4 truncate'>Created At</div>
        </div>
        <div className='h-[85%] min-h-[85%]'>
          {FormList &&
            FormList.map((data, index) => {
              const no = handleRenderNo(formsData?.data.data.pageNumber, formsData?.data.data.pageSize, index)
              const formTypeString = `${data.formType}`
              const now = new Date()
              return (
                <ApprovalItem
                  handleClick={() => handleFormChoose(data)}
                  formType={formTypeConfig[formTypeString]}
                  key={index}
                  number={no}
                  createAt={handleDate(data.date)}
                  name={data?.employee?.fullName || 'Empty'}
                  isDanger={now.getDate() - new Date(data.date).getDate() > 1}
                />
              )
            })}
        </div>
        {/* Navigation Bar */}
        <div className='flex justify-center mt-3'>
          {page === 1 ? (
            <div className='bg-slate-200/90 px-5 rounded-md mr-1 flex items-center transition'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='white'
                className='size-7'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18' />
              </svg>
            </div>
          ) : (
            <Link
              to={{
                pathname: path.approveAbsent,
                search: createSearchParams({
                  ...queryConfig,
                  pageNumber: (page - 1).toString()
                }).toString()
              }}
              className='bg-slate-300 px-5 rounded-md mr-1 transition'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='white'
                className='size-7'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18' />
              </svg>
            </Link>
          )}
          {page === (formsData?.data.data.pageCount as number) ? (
            <div className='bg-slate-200/90 px-5 rounded-md ml-1 flex items-center transition'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='white'
                className='size-7'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
              </svg>
            </div>
          ) : (
            <Link
              to={{
                pathname: path.approveAbsent,
                search: createSearchParams({
                  ...queryConfig,
                  pageNumber: (page + 1).toString()
                }).toString()
              }}
              className='bg-slate-300 px-5 rounded-md ml-1 transition'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='white'
                className='size-7'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
              </svg>
            </Link>
          )}
        </div>
      </div>
      <div className='col-span-6 border border-slate-300 bg-white rounded-md p-4'>
        <ApproveAbsentForm form={formChoose} />
      </div>
    </div>
  )
}
