import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getAbout } from './api'

export const aboutKeys = {
  all: ['about'] as const,
}

export const useAbout = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...aboutKeys.all, locale],
    queryFn: getAbout,
  })
}
