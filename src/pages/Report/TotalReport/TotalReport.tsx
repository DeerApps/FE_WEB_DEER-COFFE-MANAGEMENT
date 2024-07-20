import { Button } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import restaurantApi from 'src/apis/restaurant.api';
import * as XLSX from 'xlsx';

export default function TotalReport() {
  const { data: summary, isLoading, isError, error } = useQuery({
    queryKey: ['restaurant'],
    queryFn: () => restaurantApi.getSummary(),
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  const exportToExcel = () => {
    if (!summary) return;

    const summaryData = summary.data;

    const data = [
      {
        Employee: summaryData.totalEmployee + " hours",
        Shift: summaryData.totalShift + " hours",
        WorkHour: summaryData.totalWorkHour + " hours",
        'Late Shift': summaryData.totalLateShift + " hours",
        'On-time Shift': summaryData.totalOnTimeShift + " hours",
        'Absent Shift': summaryData.totalAbsentShift + " hours",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Summary');
    XLSX.writeFile(workbook, 'summary_report.xlsx');
  };

  if (isLoading) {
    return (
      <div className='p-4 min-h-[425px]'>
        <div className='text-lg font-normal leading-none text-blue-800 bg-blue-200 animate-pulse dark:bg-blue-900 dark:text-blue-200 min-h-[425px] text-center flex justify-center items-center'>
          Loading...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='p-4 min-h-[425px]'>
        <div className='text-lg font-normal leading-none text-red-800 bg-red-200 dark:bg-red-900 dark:text-red-200 min-h-[425px] text-center flex justify-center items-center'>
          Error: {error.message}
        </div>
      </div>
    );
  }

  const summaryData = summary?.data;

  return (
    <div className='min-h-[425px]'>
      <div className='p-2 bg-white rounded-lg mt-6 shadow-md mx-auto min-h-[425px]'>
      <div className='flex justify-end mt-4'>
              <Button
                onClick={exportToExcel}
              >
                Export to Excel
              </Button>
            </div>
        <div className='grid grid-cols-12 bg-gray-400/80 text-white my-2 text-lg font-medium p-4 py-2 rounded-xl text-center'>
          <div className='col-span-2'>Employee</div>
          <div className='col-span-2'>Shift</div>
          <div className='col-span-2'>WorkHour</div>
          <div className='col-span-2'>Late Shift</div>
          <div className='col-span-2'>On-time Shift</div>
          <div className='col-span-2'>Absent Shift</div>
        </div>
        {summaryData ? (
          <div className='min-h-[310px] h-[310px]'>
            <div className='bg-gray-100/80 h-[46px] mb-4 px-4 grid grid-cols-12 text-center rounded-xl items-center'>
              <div className='col-span-2'>{summaryData.totalEmployee}</div>
              <div className='col-span-2'>{summaryData.totalShift}</div>
              <div className='col-span-2'>{summaryData.totalWorkHour} hrs</div>
              <div className='col-span-2'>{summaryData.totalLateShift}</div>
              <div className='col-span-2'>{summaryData.totalOnTimeShift}</div>
              <div className='col-span-2'>{summaryData.totalAbsentShift}</div>
            </div>
            
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center min-h-[340px] h-[340px]'>
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
                d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
              />
            </svg>
            <p className='mt-1'>Empty</p>
          </div>
        )}
      </div>
    </div>
  );
}
