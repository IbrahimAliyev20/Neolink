import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getWhyNeoline } from './api'

export const whyNeolineKeys = {
  all: ['why-neoline'] as const,
}

export const useWhyNeoline = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...whyNeolineKeys.all, locale],
    queryFn: getWhyNeoline,
  })
}
