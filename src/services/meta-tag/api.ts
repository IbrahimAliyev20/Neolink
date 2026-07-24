import type { Metadata } from 'next'
import { get } from '@/lib/api'

export interface MetaTagItem {
  page: string
  meta_title: string
  meta_description: string
  meta_keywords: string
}

interface MetaTagResponse {
  data: MetaTagItem[]
}

export const getMetaTags = async (locale?: string): Promise<MetaTagItem[]> => {
  const response = await get<MetaTagResponse>(
    '/meta-tag',
    locale ? { headers: { 'X-Locale': locale } } : undefined,
  )
  return response.data
}

/**
 * Server-side helper for `generateMetadata`: fetches the meta-tag list and
 * returns the entry for the given page ("Home", "About", "Contact", "Blog",
 * "Service", "Project") as a Next.js Metadata object. The `locale` drives the
 * `Accept-Language` sent to the backend so EN/RU pages get localized tags.
 * Falls back to the site defaults if the API is unreachable or the page is
 * missing.
 */
export const getPageMetadata = async (page: string, locale?: string): Promise<Metadata> => {
  try {
    const tags = await getMetaTags(locale)
    const tag = tags.find((t) => t.page === page)
    if (!tag) return {}

    return {
      title: tag.meta_title,
      description: tag.meta_description,
      keywords: tag.meta_keywords,
    }
  } catch {
    return {}
  }
}
