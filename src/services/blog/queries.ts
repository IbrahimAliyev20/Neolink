import { useQuery } from '@tanstack/react-query'
import { getBlogs, getBlogsByTag, getBlogBySlug } from './api'

export const blogKeys = {
  all: ['blog', 'all'] as const,
  byTag: (slug: string) => ['blog', 'tag', slug] as const,
  bySlug: (slug: string) => ['blog', 'show', slug] as const,
}

export const useBlogs = () => {
  return useQuery({
    queryKey: blogKeys.all,
    queryFn: getBlogs,
  })
}

export const useBlogsByTag = (slug: string | undefined) => {
  return useQuery({
    queryKey: blogKeys.byTag(slug ?? ''),
    queryFn: () => getBlogsByTag(slug as string),
    enabled: Boolean(slug),
  })
}

export const useBlog = (slug: string) => {
  return useQuery({
    queryKey: blogKeys.bySlug(slug),
    queryFn: () => getBlogBySlug(slug),
    enabled: Boolean(slug),
  })
}
