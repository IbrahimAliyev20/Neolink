import { useQuery } from '@tanstack/react-query'
import { getBanner } from './api'

export const bannerKeys = {
  all: ['banner'] as const,
}

export const useBanner = () => {
  return useQuery({
    queryKey: bannerKeys.all,
    queryFn: getBanner,
  })
}
