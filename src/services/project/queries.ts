import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getProjects, getProjectsByTag, getProjectBySlug } from './api'

export const projectKeys = {
  all: ['project', 'all'] as const,
  byTag: (slug: string) => ['project', 'tag', slug] as const,
  bySlug: (slug: string) => ['project', 'show', slug] as const,
}

export const useProjects = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...projectKeys.all, locale],
    queryFn: getProjects,
  })
}

export const useProjectsByTag = (slug: string | undefined) => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...projectKeys.byTag(slug ?? ''), locale],
    queryFn: () => getProjectsByTag(slug as string),
    enabled: Boolean(slug),
  })
}

export const useProject = (slug: string) => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...projectKeys.bySlug(slug), locale],
    queryFn: () => getProjectBySlug(slug),
    enabled: Boolean(slug),
  })
}
