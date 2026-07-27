import { get } from '@/lib/api'

export interface PopupImageData {
  /** Full-size artwork shown in the home page welcome popup. */
  image: string
  thumb_image: string
}

interface PopupImageResponse {
  data: PopupImageData
}

/**
 * GET /popup-image — artwork for the home page welcome popup.
 * The backend serves a different image per language, so the locale is passed
 * explicitly rather than left to the client's URL sniffing.
 */
export const getPopupImage = async (locale?: string): Promise<PopupImageData> => {
  const response = await get<PopupImageResponse>(
    '/popup-image',
    locale ? { headers: { 'X-Locale': locale } } : undefined
  )
  return response.data
}
