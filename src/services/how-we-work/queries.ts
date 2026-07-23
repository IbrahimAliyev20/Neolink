import { useQuery } from '@tanstack/react-query'
import { getHowWeWork } from './api'

export const howWeWorkKeys = {
  all: ['how-we-work'] as const,
}

export const useHowWeWork = () => {
  return useQuery({
    queryKey: howWeWorkKeys.all,
    queryFn: getHowWeWork,
  })
}
