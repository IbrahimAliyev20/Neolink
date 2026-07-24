import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { getFaqs } from './api'

export const faqKeys = {
  all: ['faq'] as const,
}

export const useFaqs = () => {
  const locale = useLocale()
  return useQuery({
    queryKey: [...faqKeys.all, locale],
    queryFn: getFaqs,
  })
}
