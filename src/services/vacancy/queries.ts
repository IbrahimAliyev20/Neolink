import { useQuery } from '@tanstack/react-query'
import { getVacancies, getVacancyBySlug } from './api'

export const vacancyKeys = {
  all: ['vacancy', 'all'] as const,
  bySlug: (slug: string) => ['vacancy', 'show', slug] as const,
}

export const useVacancies = () => {
  return useQuery({
    queryKey: vacancyKeys.all,
    queryFn: getVacancies,
  })
}

export const useVacancy = (slug: string) => {
  return useQuery({
    queryKey: vacancyKeys.bySlug(slug),
    queryFn: () => getVacancyBySlug(slug),
    enabled: Boolean(slug),
  })
}
