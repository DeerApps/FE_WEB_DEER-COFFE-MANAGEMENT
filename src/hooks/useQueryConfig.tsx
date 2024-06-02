import { QueryConfig } from 'src/pages/Dashboard/EmployeeTable/EmployeeTable'
import useQueryParams from './useQueryParams'
import { isUndefined, omitBy } from 'lodash'

export default function useQueryConfig() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      pageNumber: queryParams.pageNumber || '1',
      pageSize: queryParams.pageSize || '9'
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
