import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getServices, getServicesPage, getServiceBySlug } from './api'

export const serviceKeys = {
  all: ['service', 'all'] as const,
  infinite: ['service', 'infinite'] as const,
  bySlug: (slug: string) => ['service', 'show', slug] as const,
}

export const useServices = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...serviceKeys.all, locale],
    queryFn: getServices,
  })
}

/** Paginated services for the listing grid — appends 6 per "load more" click. */
export const useServicesInfinite = () => {
  const locale = useLocale()
  return useInfiniteQuery({
    queryKey: [...serviceKeys.infinite, locale],
    queryFn: ({ pageParam }) => getServicesPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.lastPage ? lastPage.currentPage + 1 : undefined,
  })
}

export const useService = (slug: string) => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...serviceKeys.bySlug(slug), locale],
    queryFn: () => getServiceBySlug(slug),
    enabled: Boolean(slug),
  })
}
