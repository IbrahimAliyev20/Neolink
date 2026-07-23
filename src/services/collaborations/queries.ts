import { useQuery } from '@tanstack/react-query'
import { getCollaborations } from './api'

export const collaborationsKeys = {
  all: ['collaborations'] as const,
}

export const useCollaborations = () => {
  return useQuery({
    queryKey: collaborationsKeys.all,
    queryFn: getCollaborations,
  })
}
