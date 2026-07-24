import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getProjectTags } from './api'

export const projectTagsKeys = {
  all: ['project-tags'] as const,
}

export const useProjectTags = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...projectTagsKeys.all, locale],
    queryFn: getProjectTags,
  })
}
