import { useQuery } from '@tanstack/react-query'
import { getLogos, getLogosWhy } from './api'

export const logoKeys = {
  all: ['logo'] as const,
  why: ['logo', 'why'] as const,
}

export const useLogos = () => {
  return useQuery({
    queryKey: logoKeys.all,
    queryFn: getLogos,
  })
}

export const useLogosWhy = () => {
  return useQuery({
    queryKey: logoKeys.why,
    queryFn: getLogosWhy,
  })
}
