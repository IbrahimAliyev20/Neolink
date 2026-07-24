import { get } from '@/lib/api'

export interface TagItem {
  name: string
  slug: string
}

interface TagsResponse {
  data: TagItem[]
}

export const getTags = async (): Promise<TagItem[]> => {
  const response = await get<TagsResponse>('/tags')
  return response.data
}
