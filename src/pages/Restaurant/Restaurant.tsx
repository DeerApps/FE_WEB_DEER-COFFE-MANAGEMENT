import { useMutation, useQuery } from '@tanstack/react-query'
import { useQueryConfig } from 'src/hooks/useQueryConfig'
import { Restaurant as RestauType, RestaurantList, RestaurantListConfig } from 'src/types/restaurant.type'
import restaurantApi from 'src/apis/restaurant.api'
import { handleRenderNo } from 'src/utils/utils'
import path from 'src/constant/path'
import Pagination from 'src/components/Pagination'
import Popover from 'src/components/Popover'
import { Key } from 'node_modules/@react-types/shared/src/key'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import RestaurantPopoverInfo from './RestaurantPopoverInfo/RestaurantPopoverInfo'

export default function Restaurant() {
  const queryConfig = useQueryConfig()
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState<RestauType>()

  const { data: restaurantData, refetch } = useQuery({
    queryKey: ['restaurant', queryConfig],
    queryFn: () => {
      return restaurantApi.getRestaurants(queryConfig as RestaurantListConfig)
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  const restaurantList = restaurantData?.data.data as RestaurantList
  console.log('1', restaurantList)

  // const page = Number(queryConfig.pageNumber) || 1
  const deleteRestaurantMutation = useMutation({
    mutationFn: restaurantApi.deleteRestaurant,
    onSuccess: () => {
      refetch()
      toast('Delete Successfully', { autoClose: 1000 })
    }
  })
  const handleClose = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (restaurant: RestauType) => (key: Key) => {
    if (key === 'update') {
      setIsOpen(!isOpen)
      setIsEdit(restaurant)
    } else if (key === 'delete') {
      console.log(restaurant.id.toString())
      deleteRestaurantMutation.mutate({ ID: restaurant.id.toString() })
    }
  }

  return (
    <div className='bg-white h-full border border-gray-300 rounded-md'>
      <div className='min-h-[550px]'>
        {restaurantList && (
          <div className='p-4 pb-0 min-h-[520px]'>
            <div className='grid grid-cols-12 bg-gray-400/80 text-white my-2 text-lg font-medium p-4 py-2 rounded-xl text-center'>
              <div className='col-span-1'>No</div>
              <div className='col-span-2'>Restaurant ID</div>
              <div className='col-span-3'>Restaurant Name</div>
              <div className='col-span-2'>Restaurant Manager</div>
              <div className='col-span-2'>Phone</div>
              <div className='col-span-1 ml-6'>Action</div>
            </div>
            {restaurantData?.data?.data?.data?.map((item, index) => (
              <div
                className='bg-gray-100/80 h-[46px] mb-4 px-4 grid grid-cols-12 text-center rounded-xl items-center'
                key={item.id}
              >
                <div className='col-span-1'>
                  {handleRenderNo(restaurantList.pageNumber, restaurantList.pageSize, index)}
                </div>
                <div className='col-span-2'>{item.id}</div>
                <div className='col-span-3'>{item.restaurantName}</div>
                <div className='col-span-2'>{item.manager.fullName}</div>
                <div className='col-span-2'>{item.manager.phoneNumber}</div>
                <div className='col-span-1 ml-6'>
                  <Popover
                    key={item.id}
                    initialOpen={isOpen}
                    renderPopover={isEdit && <RestaurantPopoverInfo restaurant={isEdit} handleOpen={handleClose} />}
                  >
                    <Dropdown aria-label='drow down'>
                      <DropdownTrigger aria-label='drow triger'>
                        <Button
                          aria-label='btn_open_menu'
                          fullWidth={false}
                          color='default'
                          variant='shadow'
                          size='sm'
                          className='bg-none! shadow-none!'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='size-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                            />
                          </svg>
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label='Action event example' onAction={handleSelect(item)}>
                        <DropdownItem key='update'>Update</DropdownItem>
                        <DropdownItem key='delete' className='text-danger' color='danger'>
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        )}
        {!restaurantList && (
          <div className='p-4 pb-0! max-h-[300px]'>
            <div className='text-lg font-normal leading-none  text-blue-800 bg-blue-200 animate-pulse dark:bg-blue-900 dark:text-blue-200 min-h-[600px] text-center flex justify-center items-center'>
              loading...
            </div>
          </div>
        )}
        {restaurantList && (
          <div className='flex justify-center'>
            <Pagination queryConfig={queryConfig} pageSize={restaurantList.pageSize} pathName={path.restaurant} />
            {/* {page === 1 ? (
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
              pathname: path.restaurant,
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
        {Array.from({ length: restaurantList?.pageCount || 0 }).map((_, index) => (
          <Link
            to={{
              pathname: path.restaurant,
              search: createSearchParams({
                ...queryConfig,
                pageNumber: (index + 1).toString()
              }).toString()
            }}
            key={index}
            className={classNames('px-4 rounded-md text-white mx-1 flex items-center transition', {
              'bg-blue-300': index + 1 === page,
              'bg-slate-300': index + 1 !== page
            })}
          >
            {index + 1}
          </Link>
        ))}
        {page === (restaurantList?.pageCount || 0) ? (
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
              pathname: path.restaurant,
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
        )} */}
          </div>
        )}
      </div>
    </div>
  )
}
