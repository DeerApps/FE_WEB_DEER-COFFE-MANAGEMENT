import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import restaurantApi from 'src/apis/restaurant.api'
import { Restaurant, RestaurantListConfig } from 'src/types/restaurant.type'

export default function InfiniteScroll({
  handleSelection,
  current
}: {
  handleSelection: (select: Restaurant) => void
  current: Restaurant | undefined
}) {
  const [currPage, setCurrPage] = useState<number>(1)
  const [prevPage, setPrevPage] = useState<number>(0)
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([])
  const [wasLastList, setWasLastList] = useState(false)
  const listInnerRef = useRef<HTMLDivElement | null>(null)

  const queryConfig: Pick<RestaurantListConfig, 'pageNumber' | 'pageSize'> = {
    pageNumber: currPage,
    pageSize: 3
  }

  const { data: restaurantData } = useQuery({
    queryKey: ['restaurant', queryConfig],
    queryFn: () => {
      return restaurantApi.getRestaurants(queryConfig as RestaurantListConfig)
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
    enabled: !wasLastList
  })

  useEffect(() => {
    const fetchData = async () => {
      if (restaurantData?.data.data.pageNumber == restaurantData?.data.data.pageCount) {
        setWasLastList(true)
      }

      setPrevPage(currPage)
      setRestaurantList((prev) => {
        if (currPage === 1) {
          return restaurantData?.data.data.data as Restaurant[]
        } else {
          return [...prev, ...(restaurantData?.data.data.data as Restaurant[])]
        }
      })
    }
    if (!wasLastList && restaurantData && prevPage !== currPage) {
      fetchData()
    }
  }, [currPage, prevPage, restaurantData])

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1)
      }
    }
  }

  return (
    <div onScroll={onScroll} ref={listInnerRef} className='py-3 w-[21vw] h-30 overflow-y-auto'>
      {restaurantList &&
        restaurantList.map((item, index) => {
          return (
            <div className='flex items-center h-12 px-2 hover:bg-slate-100' key={index}>
              <input
                readOnly
                checked={current == item}
                type='checkbox'
                onClick={() => handleSelection(item)}
                className='h-4 w-4 border border-black rounded-lg outline-none'
              />
              <div className='text-lg ml-3 flex border-l-2 hover:border-gray-400 hover:border-l-2'>
                <div className='ml-2 mr-4 pl-2 pr-4 border-r-2 hover:border-gray-400 hover:border-r-2 w-[10vw]'>
                  {item.manager.fullName}
                </div>
                <div>{item.manager.phoneNumber}</div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
