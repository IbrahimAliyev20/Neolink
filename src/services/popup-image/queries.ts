import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getPopupImage } from './api'

export const popupImageKeys = {
  all: ['popup-image'] as const,
}

export const usePopupImage = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...popupImageKeys.all, locale],
    queryFn: () => getPopupImage(locale),
  })
}
