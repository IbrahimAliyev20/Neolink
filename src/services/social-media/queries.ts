import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getSocialMedia } from './api'

export const socialMediaKeys = {
  all: ['social-media'] as const,
}

export const useSocialMedia = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...socialMediaKeys.all, locale],
    queryFn: getSocialMedia,
  })
}
