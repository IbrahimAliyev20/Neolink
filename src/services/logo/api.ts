import { get } from '@/lib/api'

export interface LogoItem {
  logo: string
  thumb_logo: string
  link: string
}

interface LogoResponse {
  data: LogoItem[]
}

export const getLogos = async (): Promise<LogoItem[]> => {
  const response = await get<LogoResponse>('/logo')
  return response.data
}
