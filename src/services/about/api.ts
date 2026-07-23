import { get } from '@/lib/api'

export interface AboutData {
  title: string
  description: string
  image: string
  thumb_image: string
  title_1: string
  description_1: string
  title_2: string
  description_2: string
}

interface AboutResponse {
  data: AboutData
}

export const getAbout = async (): Promise<AboutData> => {
  const response = await get<AboutResponse>('/about')
  return response.data
}
