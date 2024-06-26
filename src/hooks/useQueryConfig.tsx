import { QueryConfig } from 'src/pages/EmployeeTable/EmployeeTable'
import { isUndefined, omitBy } from 'lodash'
import { EmployeeShiftQueryConfig } from 'src/pages/Dashboard/EmployeeDate/EmployeeDate'
import { useNewQueryParams, useQueryParams } from 'src/hooks/useQueryParams'

export function useQueryConfig() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      pageNumber: queryParams.pageNumber || '1',
      pageSize: Number(queryParams.pageSize) > 9 ? '9' : queryParams.pageSize || '9'
      // exclude: queryParams.exclude,
      // sort_by: queryParams.sort_by,
      // order: queryParams.order,
      // name: queryParams.name,
      // price_max: queryParams.price_max,
      // price_min: queryParams.price_min,
      // category: queryParams.category,
      // rating_filter: queryParams.rating_filter
    },
    isUndefined
  )

  return queryConfig
}

export function useQueryConfig10() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      pageNumber: queryParams.pageNumber || '1',
      pageSize: Number(queryParams.pageSize) > 12 ? '12' : queryParams.pageSize || '12'
    },
    isUndefined
  )

  return queryConfig
}

export function useNewQueryConfig() {
  const queryParams = useNewQueryParams()
  const newQueryConfig: EmployeeShiftQueryConfig = omitBy(
    {
      pageNo: queryParams.pageNo || '1',
      pageSize: queryParams.pageSize || '5'
    },
    isUndefined
  )
  return newQueryConfig
}
