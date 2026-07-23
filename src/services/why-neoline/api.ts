import { get } from '@/lib/api'

export interface WhyNeolineItem {
  title: string
  description: string
}

interface WhyNeolineResponse {
  data: WhyNeolineItem[]
}

export const getWhyNeoline = async (): Promise<WhyNeolineItem[]> => {
  const response = await get<WhyNeolineResponse>('/why-neoline')
  return response.data
}
