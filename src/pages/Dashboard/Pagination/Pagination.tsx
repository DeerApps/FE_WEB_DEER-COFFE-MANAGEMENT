import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import { EmployeeShiftQueryConfig } from 'src/pages/Dashboard/EmployeeDate/EmployeeDate'

interface Props {
  queryConfig: EmployeeShiftQueryConfig
  pageSize: number
  pathName: string
}
const RANGE = 2
export default function Pagination({ queryConfig, pageSize, pathName }: Props) {
  const page = Number(queryConfig.pageNo)
  const rederPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2  border'>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='bg-white rounded px-3 py-2 shadow-sm mx-2  border'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          //Trường Hợp ... chỉ xuất hiện duy nhất Ở sau
          //Page nó nằm ở khúc đầu
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          //Page nó nằm ở khúc giữa
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          //Trường Hợp ... chỉ xuất hiện duy nhất Ở đầu
          //Page nó nằm ở khúc cuối
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: pathName,
              search: createSearchParams({
                ...queryConfig,
                pageNo: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap justify-center'>
      {page === 1 ? (
        <span className='bg-white/60 cursor-not-allowed rounded px-3 py-2 shadow-sm mx-2 border'>Prev</span>
      ) : (
        <Link
          to={{
            pathname: pathName,
            search: createSearchParams({
              ...queryConfig,
              pageNo: (page - 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Prev
        </Link>
      )}
      {rederPagination()}
      {page === pageSize ? (
        <span className='bg-white/60 cursor-not-allowed rounded px-3 py-2 shadow-sm mx-2 border'>Next</span>
      ) : (
        <Link
          to={{
            pathname: pathName,
            search: createSearchParams({
              ...queryConfig,
              pageNo: (page + 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
        >
          Next
        </Link>
      )}
    </div>
  )
}
