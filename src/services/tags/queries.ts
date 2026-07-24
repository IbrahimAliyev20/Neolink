import { useQuery } from '@tanstack/react-query'
import { getTags } from './api'

export const tagsKeys = {
  all: ['tags'] as const,
}

export const useTags = () => {
  return useQuery({
    queryKey: tagsKeys.all,
    queryFn: getTags,
  })
}
