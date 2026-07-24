import { get } from '@/lib/api'

export interface BlogApiItem {
  name: string
  slug: string
  image: string
  thumb_image: string
  /** Rich HTML body. */
  description: string
  read_time: string | null
  /** Tag / category name, e.g. "Rəqəmsal Transformasiya". */
  tag: string
  meta_title: string
  meta_keywords: string
  meta_description: string
}

interface BlogListResponse {
  data: BlogApiItem[]
}

interface BlogShowResponse {
  data: BlogApiItem
}

/** GET /blogs — all blogs, paginated (we only consume `data`). */
export const getBlogs = async (): Promise<BlogApiItem[]> => {
  const response = await get<BlogListResponse>('/blogs')
  return response.data
}

/** GET /tag/{slug} — every blog carrying the given tag. */
export const getBlogsByTag = async (slug: string): Promise<BlogApiItem[]> => {
  const response = await get<BlogListResponse>(`/tag/${slug}`)
  return response.data
}

/** GET /blog/show/{slug} — a single blog's full record. */
export const getBlogBySlug = async (slug: string): Promise<BlogApiItem> => {
  const response = await get<BlogShowResponse>(`/blog/show/${slug}`)
  return response.data
}
