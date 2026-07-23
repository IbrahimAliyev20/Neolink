import { useQuery } from '@tanstack/react-query'
import { getHero } from './api'

export const heroKeys = {
  all: ['hero'] as const,
}

export const useHero = () => {
  return useQuery({
    queryKey: heroKeys.all,
    queryFn: getHero,
  })
}
