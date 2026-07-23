import { get } from '@/lib/api'

export interface HeroData {
  title: string
  description: string
  video: string
}

interface HeroResponse {
  data: HeroData
}

export const getHero = async (): Promise<HeroData> => {
  const response = await get<HeroResponse>('/hero')
  return response.data
}
