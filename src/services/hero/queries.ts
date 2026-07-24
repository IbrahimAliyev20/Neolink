import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getHero } from './api'

export const heroKeys = {
  all: ['hero'] as const,
}

export const useHero = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...heroKeys.all, locale],
    queryFn: getHero,
  })
}
