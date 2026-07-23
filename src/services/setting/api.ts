import { get } from '@/lib/api'

export interface SettingData {
  sitelogo: string
  sitefavicon: string
  sitefooterlogo: string
}

interface SettingResponse {
  data: SettingData
}

export const getSetting = async (): Promise<SettingData> => {
  const response = await get<SettingResponse>('/setting')
  return response.data
}
