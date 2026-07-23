import { useQuery } from '@tanstack/react-query'
import { getSetting } from './api'

export const settingKeys = {
  all: ['setting'] as const,
}

export const useSetting = () => {
  return useQuery({
    queryKey: settingKeys.all,
    queryFn: getSetting,
  })
}
