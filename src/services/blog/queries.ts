import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getBlogs, getBlogsByTag, getBlogBySlug } from './api'

export const blogKeys = {
  all: ['blog', 'all'] as const,
  byTag: (slug: string) => ['blog', 'tag', slug] as const,
  bySlug: (slug: string) => ['blog', 'show', slug] as const,
}

export const useBlogs = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...blogKeys.all, locale],
    queryFn: getBlogs,
  })
}

export const useBlogsByTag = (slug: string | undefined) => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...blogKeys.byTag(slug ?? ''), locale],
    queryFn: () => getBlogsByTag(slug as string),
    enabled: Boolean(slug),
  })
}

export const useBlog = (slug: string) => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...blogKeys.bySlug(slug), locale],
    queryFn: () => getBlogBySlug(slug),
    enabled: Boolean(slug),
  })
}
