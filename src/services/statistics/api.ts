import { get } from '@/lib/api'

export interface StatisticItem {
  number: string
  title: string
  description: string
}

interface StatisticsResponse {
  data: StatisticItem[]
}

export const getStatistics = async (): Promise<StatisticItem[]> => {
  const response = await get<StatisticsResponse>('/statistics')
  return response.data
}
