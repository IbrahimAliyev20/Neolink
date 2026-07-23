import { useQuery } from '@tanstack/react-query'
import { getContact } from './api'

export const contactKeys = {
  all: ['contact'] as const,
}

export const useContact = () => {
  return useQuery({
    queryKey: contactKeys.all,
    queryFn: getContact,
  })
}
