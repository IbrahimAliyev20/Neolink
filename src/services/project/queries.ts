import { useQuery } from '@tanstack/react-query'
import { getProjects, getProjectsByTag, getProjectBySlug } from './api'

export const projectKeys = {
  all: ['project', 'all'] as const,
  byTag: (slug: string) => ['project', 'tag', slug] as const,
  bySlug: (slug: string) => ['project', 'show', slug] as const,
}

export const useProjects = () => {
  return useQuery({
    queryKey: projectKeys.all,
    queryFn: getProjects,
  })
}

export const useProjectsByTag = (slug: string | undefined) => {
  return useQuery({
    queryKey: projectKeys.byTag(slug ?? ''),
    queryFn: () => getProjectsByTag(slug as string),
    enabled: Boolean(slug),
  })
}

export const useProject = (slug: string) => {
  return useQuery({
    queryKey: projectKeys.bySlug(slug),
    queryFn: () => getProjectBySlug(slug),
    enabled: Boolean(slug),
  })
}
