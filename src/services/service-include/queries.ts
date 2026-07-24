import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getServiceInclude } from './api'

export const serviceIncludeKeys = {
  bySlug: (slug: string) => ['service-include', slug] as const,
}

export const useServiceInclude = (slug: string) => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...serviceIncludeKeys.bySlug(slug), locale],
    queryFn: () => getServiceInclude(slug),
    enabled: Boolean(slug),
  })
}
