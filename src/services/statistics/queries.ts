import { useQuery } from '@tanstack/react-query'
import { getStatistics } from './api'

export const statisticsKeys = {
  all: ['statistics'] as const,
}

export const useStatistics = () => {
  return useQuery({
    queryKey: statisticsKeys.all,
    queryFn: getStatistics,
  })
}
