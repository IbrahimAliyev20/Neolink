import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getContact } from './api'

export const contactKeys = {
  all: ['contact'] as const,
}

export const useContact = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...contactKeys.all, locale],
    queryFn: getContact,
  })
}
