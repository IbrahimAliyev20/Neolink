import { get } from '@/lib/api'

export interface SocialMediaItem {
  icon: string
  link: string
}

interface SocialMediaResponse {
  data: SocialMediaItem[]
}

export const getSocialMedia = async (): Promise<SocialMediaItem[]> => {
  const response = await get<SocialMediaResponse>('/social-media')
  return response.data
}
