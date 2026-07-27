import { get } from '@/lib/api'

export interface SettingData {
  sitelogo: string
  sitefavicon: string
  sitefooterlogo: string
}

interface SettingResponse {
  data: SettingData
}

/** `locale` is passed explicitly because this also runs on the server (metadata),
 *  where the client cannot read the locale off `window.location`. */
export const getSetting = async (locale?: string): Promise<SettingData> => {
  const response = await get<SettingResponse>(
    '/setting',
    locale ? { headers: { 'X-Locale': locale } } : undefined
  )
  return response.data
}
