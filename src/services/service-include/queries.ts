import { useQuery } from '@tanstack/react-query'
import { getServiceInclude } from './api'

export const serviceIncludeKeys = {
  bySlug: (slug: string) => ['service-include', slug] as const,
}

export const useServiceInclude = (slug: string) => {
  return useQuery({
    queryKey: serviceIncludeKeys.bySlug(slug),
    queryFn: () => getServiceInclude(slug),
    enabled: Boolean(slug),
  })
}
