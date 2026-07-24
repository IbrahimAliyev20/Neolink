import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getSectionTitles } from './api'

export const sectionTitleKeys = {
  all: ['section-title'] as const,
}

export const useSectionTitles = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...sectionTitleKeys.all, locale],
    queryFn: getSectionTitles,
  })
}

/** Convenience hook: the entry for a single section (e.g. "How We Work"). */
export const useSectionTitle = (section: string) => {
  const query = useSectionTitles()
  return {
    ...query,
    data: query.data?.find((item) => item.section === section),
  }
}
