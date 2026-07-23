import { get } from '@/lib/api'

export interface BannerData {
  title: string
  description: string
}

interface BannerResponse {
  data: BannerData
}

export const getBanner = async (): Promise<BannerData> => {
  const response = await get<BannerResponse>('/banner')
  return response.data
}
