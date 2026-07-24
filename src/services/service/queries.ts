import { useQuery } from '@tanstack/react-query'
import { getServices, getServiceBySlug } from './api'

export const serviceKeys = {
  all: ['service', 'all'] as const,
  bySlug: (slug: string) => ['service', 'show', slug] as const,
}

export const useServices = () => {
  return useQuery({
    queryKey: serviceKeys.all,
    queryFn: getServices,
  })
}

export const useService = (slug: string) => {
  return useQuery({
    queryKey: serviceKeys.bySlug(slug),
    queryFn: () => getServiceBySlug(slug),
    enabled: Boolean(slug),
  })
}
