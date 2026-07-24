import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getVacancies, getVacancyBySlug } from './api'

export const vacancyKeys = {
  all: ['vacancy', 'all'] as const,
  bySlug: (slug: string) => ['vacancy', 'show', slug] as const,
}

export const useVacancies = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...vacancyKeys.all, locale],
    queryFn: getVacancies,
  })
}

export const useVacancy = (slug: string) => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...vacancyKeys.bySlug(slug), locale],
    queryFn: () => getVacancyBySlug(slug),
    enabled: Boolean(slug),
  })
}
