import { get } from '@/lib/api'

export interface PopupImageData {
  /** Full-size artwork shown in the home page welcome popup. */
  image: string
  thumb_image: string
}

interface PopupImageResponse {
  data?: PopupImageData | null
}

/**
 * GET /popup-image — artwork for the home page welcome popup.
 *
 * The backend serves a different image per language, so the locale is passed
 * explicitly rather than left to the client's URL sniffing.
 *
 * Switching the popup off in the admin panel makes the endpoint answer with a
 * bare `[]` (no `data` key at all), so anything that does not carry an image is
 * normalised to `null` — React Query rejects `undefined` as query data.
 */
export const getPopupImage = async (locale?: string): Promise<PopupImageData | null> => {
  const response = await get<PopupImageResponse | unknown[]>(
    '/popup-image',
    locale ? { headers: { 'X-Locale': locale } } : undefined
  )

  if (!response || Array.isArray(response)) return null

  const data = response.data
  return data?.image?.trim() ? data : null
}
