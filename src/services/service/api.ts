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
}

interface ServiceShowResponse {
  data: ServiceApiItem
}

/** GET /services — all services, paginated (we only consume `data`). */
export const getServices = async (): Promise<ServiceApiItem[]> => {
  const response = await get<ServiceListResponse>('/services')
  return response.data
}

/** GET /service/show/{slug} — a single service's full record. */
export const getServiceBySlug = async (slug: string): Promise<ServiceApiItem> => {
  const response = await get<ServiceShowResponse>(`/service/show/${slug}`)
  return response.data
}
