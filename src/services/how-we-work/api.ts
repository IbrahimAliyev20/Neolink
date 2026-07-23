import { get } from '@/lib/api'

export interface HowWeWorkItem {
  title: string
  description: string
  image: string
  thumb_image: string
}

interface HowWeWorkResponse {
  data: HowWeWorkItem[]
}

export const getHowWeWork = async (): Promise<HowWeWorkItem[]> => {
  const response = await get<HowWeWorkResponse>('/how-we-work')
  return response.data
}
