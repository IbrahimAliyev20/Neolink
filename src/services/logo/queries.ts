import { useQuery } from '@tanstack/react-query'
import { getLogos } from './api'

export const logoKeys = {
  all: ['logo'] as const,
}

export const useLogos = () => {
  return useQuery({
    queryKey: logoKeys.all,
    queryFn: getLogos,
  })
}
