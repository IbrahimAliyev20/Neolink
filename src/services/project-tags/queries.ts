import { useQuery } from '@tanstack/react-query'
import { getProjectTags } from './api'

export const projectTagsKeys = {
  all: ['project-tags'] as const,
}

export const useProjectTags = () => {
  return useQuery({
    queryKey: projectTagsKeys.all,
    queryFn: getProjectTags,
  })
}
