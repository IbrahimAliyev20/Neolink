import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getSetting } from './api'

export const settingKeys = {
  all: ['setting'] as const,
}

export const useSetting = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...settingKeys.all, locale],
    queryFn: getSetting,
  })
}
