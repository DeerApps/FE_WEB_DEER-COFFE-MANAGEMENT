import { useSearchParams } from 'react-router-dom'

export function useQueryParams() {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}

export function useNewQueryParams() {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}
