import { useQuery } from '@tanstack/react-query'
import { getWhyNeoline } from './api'

export const whyNeolineKeys = {
  all: ['why-neoline'] as const,
}

export const useWhyNeoline = () => {
  return useQuery({
    queryKey: whyNeolineKeys.all,
    queryFn: getWhyNeoline,
  })
}
