import { useQuery } from '@tanstack/react-query'
import { getAbout } from './api'

export const aboutKeys = {
  all: ['about'] as const,
}

export const useAbout = () => {
  return useQuery({
    queryKey: aboutKeys.all,
    queryFn: getAbout,
  })
}
