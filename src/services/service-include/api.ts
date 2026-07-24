import { get } from '@/lib/api'

export interface ServiceIncludeItem {
  title: string
  description: string
  icon: string
  thumb_icon: string
}

interface ServiceIncludeResponse {
  data: ServiceIncludeItem[]
}

/** GET /service-include/{slug} — "what's included" items for a service. */
export const getServiceInclude = async (
  slug: string
): Promise<ServiceIncludeItem[]> => {
  const response = await get<ServiceIncludeResponse>(`/service-include/${slug}`)
  return response.data
}
