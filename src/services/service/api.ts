import { get } from '@/lib/api'

export interface ServiceApiItem {
  name: string
  slug: string
  short_description: string
  /** Rich HTML body. */
  description: string
  /** SVG illustration/icon. */
  image: string
  thumb_image: string
  /** Photo used on the home page / preview surfaces. */
  cover_image_home: string
  thumb_cover_image_home: string
  meta_title: string
  meta_keywords: string
  meta_description: string
}

interface ServiceListResponse {
  data: ServiceApiItem[]
  meta?: { current_page: number; last_page: number }
}

interface ServiceShowResponse {
  data: ServiceApiItem
}

/** One page of services plus the cursor info the "load more" button needs. */
export interface ServicePage {
  items: ServiceApiItem[]
  currentPage: number
  lastPage: number
}

/**
 * GET /services — every service, across all pages.
 *
 * The endpoint paginates at 6 per page, so a single call silently drops
 * anything past the sixth service. Surfaces that list services in full (header
 * mega-menu, home rail) need the whole set, so the remaining pages are fetched
 * in parallel once page 1 reveals how many there are.
 */
export const getServices = async (): Promise<ServiceApiItem[]> => {
  const first = await get<ServiceListResponse>('/services')
  const lastPage = first.meta?.last_page ?? 1

  if (lastPage <= 1) return first.data

  const rest = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, index) =>
      get<ServiceListResponse>('/services', { params: { page: index + 2 } })
    )
  )

  return [first.data, ...rest.map((page) => page.data)].flat()
}

/** GET /services?page=N — a single paginated page (backend serves 6 per page). */
export const getServicesPage = async (page: number): Promise<ServicePage> => {
  const response = await get<ServiceListResponse>('/services', { params: { page } })
  return {
    items: response.data,
    currentPage: response.meta?.current_page ?? page,
    lastPage: response.meta?.last_page ?? page,
  }
}

/** GET /service/show/{slug} — a single service's full record. */
export const getServiceBySlug = async (slug: string): Promise<ServiceApiItem> => {
  const response = await get<ServiceShowResponse>(`/service/show/${slug}`)
  return response.data
}
