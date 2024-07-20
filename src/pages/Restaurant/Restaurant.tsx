import { useMutation, useQuery } from '@tanstack/react-query'
import { useQueryConfig } from 'src/hooks/useQueryConfig'
import { Restaurant as RestauType, RestaurantList, RestaurantListConfig } from 'src/types/restaurant.type'
import restaurantApi from 'src/apis/restaurant.api'
import { handleRenderNo } from 'src/utils/utils'
import path from 'src/constant/path'
import Pagination from 'src/components/Pagination'
import { Key } from 'node_modules/@react-types/shared/src/key'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import RestaurantPopoverInfo from './RestaurantPopoverInfo/RestaurantPopoverInfo'
import CreateRestaurant from './CreateRestaurant'
import { Modal } from 'antd'
import Popover from 'src/components/Popover'
import * as XLSX from 'xlsx'

export default function Restaurant() {
  const queryConfig = useQueryConfig()
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState<RestauType>()
  const [isCreateOpen, setIsCreateOpen] = useState(false) // State for create restaurant modal

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

  const handleCreateOpen = () => {
    setIsCreateOpen(true)
  }

  const handleCreateClose = () => {
    setIsCreateOpen(false)
  }

  const handleExport = () => {
    const dataToExport = restaurantData?.data?.data?.data.map(restaurant => ({
      ...restaurant,
      managerName: restaurant.manager.fullName,
      managerPhone: restaurant.manager.phoneNumber,
    })) || []

    const worksheet = XLSX.utils.json_to_sheet(dataToExport, { header: ['id', 'restaurantName', 'managerName', 'managerPhone'] })

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Restaurants')
    XLSX.writeFile(workbook, 'restaurants.xlsx')
  }

  

  return (
    <div className='bg-white h-full border border-gray-300 rounded-md'>
      <div className='p-5 pt-7 flex justify-between items-center'>
        <div className='flex items-center'>
          <form className='flex'>
            <div className='border border-gray-300 py-2 px-4 rounded-lg flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>
              <input className='outline-none px-3' type='text' placeholder='Search by name...' />
            </div>
            <button
              aria-label='search_bar'
              className='text-gray-500 bg-gray-200 hover:bg-gray-300 ml-4 px-10 py-3 text-md font-medium rounded-lg'
            >
              Search
            </button>
          </form>
        </div>
        <div>
          <Button onClick={handleCreateOpen}>Create new</Button>
          <Button onClick={handleExport} className='ml-2'>Export to Excel</Button>
        </div>
      </div>

      <Modal title='Create New Restaurant' visible={isCreateOpen} onCancel={handleCreateClose} footer={null}>
        <CreateRestaurant />
      </Modal>
      <div className='min-h-[700px]'>
        {restaurantList && (
          <div className='px-4 pb-0 min-h-[625px]'>
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
                className='bg-gray-100/80 h-[46px] mb-3 px-4 grid grid-cols-12 text-center rounded-xl items-center'
                key={item.id}
              >
                <div className='col-span-1'>
                  {handleRenderNo(restaurantList.pageNumber, restaurantList.pageSize, index)}
                </div>
                <div className='col-span-2 truncate'>{item.id}</div>
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
          <div className='p-4 pb-0! min-h-[625px]'>
            <div className='text-lg font-normal leading-none text-blue-800 bg-blue-200 animate-pulse dark:bg-blue-900 dark:text-blue-200 min-h-[600px] text-center flex justify-center items-center'>
              loading...
            </div>
          </div>
        )}
        {restaurantList && (
          <div className='flex justify-center'>
            <Pagination queryConfig={queryConfig} pageSize={restaurantList.pageSize} pathName={path.restaurant} />
          </div>
        )}
      </div>
    </div>
  )
}
