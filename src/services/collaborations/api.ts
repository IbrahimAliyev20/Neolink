import { get } from '@/lib/api'

export interface CollaborationItem {
  name: string
  description: string
  company: string
  profession: string
}

interface CollaborationsResponse {
  data: CollaborationItem[]
}

export const getCollaborations = async (): Promise<CollaborationItem[]> => {
  const response = await get<CollaborationsResponse>('/collaborations')
  return response.data
}
