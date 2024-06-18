import { useQuery } from '@tanstack/react-query';
import { useQueryConfig } from 'src/hooks/useQueryConfig';
import { RestaurantList, RestaurantListConfig } from 'src/types/restaurant.type';
import restaurantApi from 'src/apis/restaurant.api';
import { handleRenderNo } from 'src/utils/utils';
import { Link, createSearchParams } from 'react-router-dom';
import path from 'src/constant/path';
import classNames from 'classnames';

export default function Restaurant() {
  const queryConfig = useQueryConfig();

  const { data: restaurantData } = useQuery({
    queryKey: ['restaurant', queryConfig],
    queryFn: () => {
      return restaurantApi.getRestaurants(queryConfig as RestaurantListConfig);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  });

  const restaurantList = restaurantData?.data.data as RestaurantList;
  console.log("1",restaurantList)

  const page = Number(queryConfig.pageNumber) || 1;

  return (
    <div className='p-2 px-2 bg-white rounded-lg shadow-md mx-auto min-h-[420px]'>
      {restaurantList && (
        <div className='grid grid-cols-12 bg-gray-400/80 text-white my-2 text-lg font-medium p-4 py-2 rounded-xl text-center'>
          <div className='col-span-1'>No</div>
          <div className='col-span-3'>Restaurant ID</div>
          <div className='col-span-3 '>Restaurant Name</div>
          <div className='col-span-3'>Restaurant Manager</div>
          <div className='col-span-1 ml-6'>Action</div>
        </div>
      )}
      {restaurantData?.data?.data?.map((item, index) => (
        <div
          className='bg-gray-100/80 h-[46px] mb-4 px-4 grid grid-cols-12 text-center rounded-xl items-center'
          key={item.id}
        >
          <div className='col-span-1'>
            {handleRenderNo(restaurantList.pageNumber, restaurantList.pageSize, index)}
          </div>
          <div className='col-span-3'>{item.restaurantChainID}</div>
          <div className='col-span-3'>{item.restaurantName}</div>
          <div className='col-span-3'>{item.manager.fullName}</div>
          <div className='col-span-1 ml-6'></div>
        </div>
      ))}
      <div className='flex justify-center'>
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
        )}
      </div>
    </div>
  );
}
