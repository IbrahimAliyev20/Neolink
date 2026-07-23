import { useQuery } from '@tanstack/react-query'
import { getFaqs } from './api'

export const faqKeys = {
  all: ['faq'] as const,
}

export const useFaqs = () => {
  return useQuery({
    queryKey: faqKeys.all,
    queryFn: getFaqs,
  })
}
