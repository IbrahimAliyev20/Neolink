import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getCollaborations } from './api'

export const collaborationsKeys = {
  all: ['collaborations'] as const,
}

export const useCollaborations = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...collaborationsKeys.all, locale],
    queryFn: getCollaborations,
  })
}
