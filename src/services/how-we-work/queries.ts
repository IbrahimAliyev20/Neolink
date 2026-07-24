import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getHowWeWork } from './api'

export const howWeWorkKeys = {
  all: ['how-we-work'] as const,
}

export const useHowWeWork = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...howWeWorkKeys.all, locale],
    queryFn: getHowWeWork,
  })
}
