import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getLogos, getLogosWhy } from './api'

export const logoKeys = {
  all: ['logo'] as const,
  why: ['logo', 'why'] as const,
}

export const useLogos = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...logoKeys.all, locale],
    queryFn: getLogos,
  })
}

export const useLogosWhy = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...logoKeys.why, locale],
    queryFn: getLogosWhy,
  })
}
