import { get } from '@/lib/api'

export interface FaqItem {
  question: string
  answer: string
}

interface FaqResponse {
  data: FaqItem[]
}

export const getFaqs = async (): Promise<FaqItem[]> => {
  const response = await get<FaqResponse>('/faq')
  return response.data
}
