import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getStatistics } from './api'

export const statisticsKeys = {
  all: ['statistics'] as const,
}

export const useStatistics = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...statisticsKeys.all, locale],
    queryFn: getStatistics,
  })
}
