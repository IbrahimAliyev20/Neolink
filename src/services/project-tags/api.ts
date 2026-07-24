import { get } from '@/lib/api'

export interface ProjectTagItem {
  name: string
  slug: string
}

interface ProjectTagsResponse {
  data: ProjectTagItem[]
}

export const getProjectTags = async (): Promise<ProjectTagItem[]> => {
  const response = await get<ProjectTagsResponse>('/project-tags')
  return response.data
}
