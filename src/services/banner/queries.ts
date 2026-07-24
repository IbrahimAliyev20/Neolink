import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getBanner } from './api'

export const bannerKeys = {
  all: ['banner'] as const,
}

export const useBanner = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...bannerKeys.all, locale],
    queryFn: getBanner,
  })
}
