import { get } from '@/lib/api'

export interface SectionTitleItem {
  title: string
  description: string
  image: string
  thumb_image: string
  /** e.g. "How We Work", "Collaboration" */
  section: string
}

interface SectionTitleResponse {
  data: SectionTitleItem[]
}

export const getSectionTitles = async (): Promise<SectionTitleItem[]> => {
  const response = await get<SectionTitleResponse>('/section-title')
  return response.data
}
