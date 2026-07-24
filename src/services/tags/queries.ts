import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getTags } from './api'

export const tagsKeys = {
  all: ['tags'] as const,
}

export const useTags = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...tagsKeys.all, locale],
    queryFn: getTags,
  })
}
