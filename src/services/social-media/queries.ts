import { useQuery } from '@tanstack/react-query'
import { getSocialMedia } from './api'

export const socialMediaKeys = {
  all: ['social-media'] as const,
}

export const useSocialMedia = () => {
  return useQuery({
    queryKey: socialMediaKeys.all,
    queryFn: getSocialMedia,
  })
}
