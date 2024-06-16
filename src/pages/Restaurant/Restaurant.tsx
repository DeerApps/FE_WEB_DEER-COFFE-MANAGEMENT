import { useMutation, useQuery } from '@tanstack/react-query'
import { Key, useState } from 'react'
import { toast } from 'react-toastify'
import employeeApi from 'src/apis/employee.api'

import { Employee, EmployeeListConfig } from 'src/types/employee.type'
import { useQueryConfig } from 'src/hooks/useQueryConfig'
import { RestaurantList, RestaurantListConfig } from 'src/types/restaurant.type'
import restaurantApi from 'src/apis/restaurant.api'

export default function Restaurant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState<Employee>()
  const queryConfig = useQueryConfig()

  const { data: restaurantData, refetch } = useQuery({
    queryKey: ['restaurant', queryConfig],
    queryFn: () => {
      return restaurantApi.getRestaurant(queryConfig as RestaurantListConfig)
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const restaurantList = restaurantData?.data.data as RestaurantList

  return (
    <div className='p-2 px-2 bg-white rounded-lg shadow-md mx-auto min-h-[420px]'>
      {restaurantList && (
        <div className='grid grid-cols-12 bg-gray-400/80 text-white my-2 text-lg font-medium p-4 py-2 rounded-xl text-center'>
          <div className='col-span-1 text-left'>No</div>
          <div className='col-span-3 text-left'>Restaurant ID</div>
          <div className='col-span-3 text-left'>Restaurant Name</div>
          <div className='col-span-3 text-left'>Restaurant Manager</div>
          <div className='col-span-1 ml-6 text-left'>Action</div>
        </div>
        
      )}

      <div className='flex justify-center mt-5'>
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
      </div>
    </div>
  )
}
